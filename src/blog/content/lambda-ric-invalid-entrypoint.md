Our health check was returning a flat `{"message":"Internal server error"}`. No stack trace. No application log line. Just a 500, every single time. The service behind it was a perfectly ordinary TypeScript Express app running as a container image on AWS Lambda — the kind of thing that had been deployed a dozen times before without drama.

What followed was a multi-hour debugging session that touched almost every layer of the serverless stack: the TypeScript build, the Docker image, the Lambda Runtime Interface Client, the container manifest, function memory, and finally the one setting that actually mattered. The bug turned out to be a single mis-set configuration value. But the *reason* it was so hard to find is a genuinely good lesson in how container Lambdas actually boot — so this post walks the whole path, not just the punchline.

## The setup: a TypeScript service on Lambda

The service is a small HTTP API. The relevant shape:

```ts
// src/server.ts
import * as awsServerlessExpress from 'aws-serverless-express'
import app from './app'

const server = awsServerlessExpress.createServer(app)

export const handler = (event, context) => {
  if (event.LAMBDA_HEALTH) {
    return { success: true }
  }
  return awsServerlessExpress.proxy(server, event, context)
}
```

Standard pattern: an Express app wrapped by `aws-serverless-express` so the same app can run locally or behind API Gateway. TypeScript compiles `src/` to `dist/`, and the Lambda handler is `dist/server.handler`.

It ships as a **container image**, not a zip. The Dockerfile is built on the AWS base image:

```dockerfile
FROM public.ecr.aws/lambda/nodejs:18
WORKDIR ${LAMBDA_TASK_ROOT}
COPY . .
RUN npm install
RUN npm run build          # tsc: src -> dist
CMD [ "dist/server.handler" ]
```

CI builds this image, pushes it to ECR, and runs `aws lambda update-function-code` to point the function at the new image digest. Nothing exotic.

## The symptom that lied to us

CloudWatch showed this, and only this:

```
INIT_REPORT Init Duration: 2.93 ms  Phase: init  Status: error
Error Type: Runtime.InvalidEntrypoint
...
REPORT ... Max Memory Used: 11 MB  Status: error  Error Type: Runtime.InvalidEntrypoint
```

Three details in that log are the entire mystery:

1. **`Runtime.InvalidEntrypoint`** — sounds like "your handler path is wrong."
2. **~3 ms, INIT phase** — it dies almost instantly, during initialization, before any invoke.
3. **11 MB used, zero application logs** — our JavaScript never printed anything. Not a single `console.log`, no error stack. The process barely existed.

That combination is the tell, but only in hindsight. The name `InvalidEntrypoint` pulls you toward the handler string, and that is exactly the wrong place to look.

## How a container Lambda actually starts

To understand the bug you have to understand what happens between "Lambda receives a request" and "your `handler` runs." For a container image it is a chain of process handoffs:

1. **Lambda starts your container.** The Firecracker microVM boots and the container's configured **ENTRYPOINT** is executed.
2. **The ENTRYPOINT is the bootstrap.** On the AWS base image this is `/lambda-entrypoint.sh`, which execs `/var/runtime/bootstrap` — this is the **Runtime Interface Client (RIC)**, `aws-lambda-ric`.
3. **The RIC loads your handler.** It reads the handler string (`dist/server.handler`), `require()`s the module, and grabs the exported `handler` function.
4. **The RIC runs the invoke loop.** It polls the Lambda Runtime API for events, calls your function, and posts the response back.

Your code only enters the picture at step 3. Everything before that is the runtime bootstrap. And here is the crucial part:

> `Runtime.InvalidEntrypoint` is raised when step 1–2 fails — when Lambda cannot **start the entrypoint process at all**. It is not, despite the name, primarily about your handler being wrong. It is about the container's entrypoint command.

A wrong *handler* (bad path, missing export, a throw at module load) produces a different error: **`Runtime.ImportModuleError`**, and it comes *with a stack trace in the logs*, because by then the RIC is running and can report what went wrong. We had no stack trace. That should have told us the failure was below our code from the very start.

## The Runtime Interface Client, and why local testing misled us

The RIC is the bridge between the Lambda service and your function. Two facts about it matter here.

**Fact one: you can run the exact same runtime locally.** The AWS base images ship a Runtime Interface Emulator (RIE). You can pull the deployed image and invoke it on your laptop, and it goes through the *same* bootstrap the real Lambda uses:

```bash
docker run -d -p 9000:8080 --name svc <ecr-image>
curl "http://localhost:9000/2015-03-31/functions/function/invocations" -d '{}'
docker logs svc
```

**Fact two: the emulator uses the image's own ENTRYPOINT.** This is the subtle part. When you run the container yourself, Docker executes the ENTRYPOINT baked into the image (`/var/runtime/bootstrap`). And when we did this, the logs were beautiful:

```
(rapid) exec '/var/runtime/bootstrap' (cwd=/var/task, handler=)
INIT START(type: on-demand, phase: init)
INIT RTDONE(status: success)
INVOKE RTDONE(status: success ...)
```

INIT succeeded. The handler executed. The image was **provably perfect**. We even resolved the handler by hand inside the container:

```bash
docker run --rm --entrypoint node <image> \
  -e "console.log(typeof require('/var/task/dist/server').handler)"
# -> function
```

`dist/server.js` existed, node 18 was correct, `require(...).handler` was a `function`. So the code was right, the build was right, the image was right, and it ran flawlessly through the real runtime — everywhere except in the actual Lambda service.

That paradox is the whole point. **If the artifact is perfect but the service can't start it, the problem is not in the artifact. It's in the function's configuration** — the layer that lives outside the image and that the emulator never sees.

## Ruling things out, one layer at a time

Before we found it, we eliminated every plausible cause. This is worth listing because each one is a real failure mode for container Lambdas:

- **Architecture mismatch.** If the image is `linux/amd64` but the function is configured `arm64` (or vice versa), the runtime can't exec the binary and you get `InvalidEntrypoint`. We checked: function was `x86_64`, image was `x86_64`. Match.
- **ENTRYPOINT/CMD override showing as empty.** The console showed `ENTRYPOINT override: -`. Looked fine. (Hold that thought.)
- **A manifest list instead of a single image.** Lambda cannot run an OCI image index / manifest list — it needs a single-platform Docker V2 Schema 2 manifest. `buildx` with `--platform` can emit an index that your local `docker pull` silently resolves but Lambda rejects. We inspected the pushed manifest with `docker buildx imagetools inspect --raw`: it was a clean single manifest. Not it.
- **Stale image / digest not updated.** We confirmed the deployed `CodeSha256` matched the freshly built image. Current.
- **Memory.** The function was pinned at 128 MB. Container images have heavier cold-start overhead than zip packages, and a too-small memory setting can surface as a spawn failure. We bumped it to 1024 MB. It didn't fix the error — but the command we ran to change it is what finally exposed the real cause.

## The actual error

When you invoke a Lambda directly with the CLI (bypassing API Gateway), you get the raw function error instead of a generic gateway 500. That was the first time we saw the truth:

```json
{
  "errorType": "Runtime.InvalidEntrypoint",
  "errorMessage": "Error: ProcessSpawnFailed"
}
```

**`ProcessSpawnFailed`.** The runtime could not spawn the entrypoint process. Not "couldn't find your handler" — couldn't even *start the process* that would go looking for your handler.

And the smoking gun came from the raw function configuration (not the console — the API). Bumping the memory printed the full config back, including this:

```json
"ImageConfigResponse": {
  "ImageConfig": {
    "EntryPoint": [ "" ]
  }
}
```

There it was. The function had an **ENTRYPOINT override set to a single empty string**. Lambda was dutifully trying to execute a process named `""` instead of the image's real bootstrap. You cannot spawn a process with no name. The OS refused, the spawn failed, and Lambda reported it through its generic startup-failure label: `Runtime.InvalidEntrypoint`.

Every symptom now fits perfectly:

- **`ProcessSpawnFailed`** — literally cannot exec an empty-string command.
- **Fails at INIT in ~3 ms** — it dies at container exec, before the runtime or your code.
- **11 MB, no application logs** — the bare container, no RIC loaded, no JS run.
- **Works in the emulator** — the emulator uses the image's own ENTRYPOINT and never sees the function-level override.
- **Identical on every deploy** — `update-function-code` swaps the image but never touches `ImageConfig`, so the poisoned override survived every redeploy.

## Why the console hid it

The single cruelest part of this bug: the AWS Console rendered `EntryPoint: [""]` as:

```
ENTRYPOINT override: -
```

An empty-string array is displayed as a dash — visually identical to "no override set." So by eye, the configuration looked clean. Only the API response (`aws lambda get-function-configuration`, or the echo from an `update-function-configuration` call) shows the array literally. **Lesson: for container image config, trust the API JSON over the console.**

## The fix

Clear the image config so Lambda falls back to the image's own ENTRYPOINT and CMD:

```bash
aws lambda update-function-configuration \
  --function-name my-service \
  --image-config "{}"
```

After the update settled, the direct invoke returned `StatusCode: 200` with no `FunctionError`, and the real HTTP endpoint returned exactly what it should:

```json
{ "status": "ok", "service": "..." }
```

The empty override was gone, the `ImageConfigResponse` block vanished from the config entirely, and the container booted through its normal bootstrap.

### How the override got there

It was a manual slip during function creation in the console. Someone typed into the ENTRYPOINT override field and it ended up as a single empty string rather than unset. Because `update-function-code` never rewrites `ImageConfig`, that mistake was frozen into the function and reproduced on every subsequent deploy. If your functions are created by IaC or a `create-function` script, check that nothing passes `--image-config '{"EntryPoint":[""]}'` — an empty entry is not the same as no entry.

## Takeaways

- **`Runtime.InvalidEntrypoint` is about the container entrypoint, not (usually) your handler.** A bad handler gives you `Runtime.ImportModuleError` *with a stack trace*. No stack trace + INIT-phase death + tiny memory = the process never started.
- **`ProcessSpawnFailed` means the exec itself failed.** Look at architecture, ENTRYPOINT/CMD overrides, and the image manifest — the layers below your code.
- **The Runtime Interface Emulator is your best friend, but know its blind spot.** It exercises the image's own bootstrap. It will not reproduce a bug that lives in the *function's* configuration. If the image runs locally but fails in Lambda, suspect function config: architecture, image config, memory, role, VPC.
- **Trust the API over the console for image config.** `[""]` and `null` look the same in the UI and behave completely differently.
- **Invoke directly to see real errors.** API Gateway flattens everything to `Internal server error`. `aws lambda invoke` hands you `errorType` and `errorMessage` verbatim.

The bug was one empty string. But finding it meant understanding that a container Lambda is a chain — microVM, entrypoint, bootstrap, RIC, your module, your handler — and that "InvalidEntrypoint" points at a very specific, early link in that chain. Once you know where in the chain each error type lives, the search space collapses fast.
