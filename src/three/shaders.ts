export const particleVertex = /* glsl */ `
uniform float uTime;
uniform float uMorph;
uniform float uPixelRatio;
uniform vec3 uMouse;

attribute vec3 aPositionB;
attribute float aScale;
attribute float aRandom;

varying float vDistance;
varying float vRandom;

// simplex-ish cheap noise
float hash(vec3 p) {
  p = fract(p * 0.3183099 + 0.1);
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

void main() {
  vec3 pos = mix(position, aPositionB, uMorph);

  // organic drift
  float t = uTime * 0.35;
  pos.x += sin(t + aRandom * 6.2831) * 0.08;
  pos.y += cos(t * 1.3 + aRandom * 6.2831) * 0.08;
  pos.z += sin(t * 0.7 + aRandom * 12.566) * 0.08;

  // mouse repulsion
  vec3 toMouse = pos - uMouse;
  float d = length(toMouse);
  float force = smoothstep(1.6, 0.0, d);
  pos += normalize(toMouse + 0.0001) * force * 0.45;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;

  gl_PointSize = aScale * uPixelRatio * (28.0 / -mvPosition.z);

  vDistance = length(pos);
  vRandom = aRandom;
}
`

export const particleFragment = /* glsl */ `
uniform float uTime;

varying float vDistance;
varying float vRandom;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  float alpha = smoothstep(0.5, 0.0, d);
  alpha *= alpha;

  // color: cyan core -> violet/magenta edges
  vec3 cyan = vec3(0.0, 0.94, 1.0);
  vec3 magenta = vec3(0.71, 0.0, 1.0);
  float mixv = smoothstep(0.5, 3.2, vDistance) * 0.8 + 0.2 * sin(uTime * 0.5 + vRandom * 6.2831);
  vec3 color = mix(cyan, magenta, clamp(mixv, 0.0, 1.0));

  // twinkle
  float tw = 0.75 + 0.25 * sin(uTime * (1.0 + vRandom * 3.0) + vRandom * 40.0);

  gl_FragColor = vec4(color * 1.6, alpha * tw);
}
`

export const nebulaVertex = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`

export const nebulaFragment = /* glsl */ `
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;

varying vec2 vUv;

// hash + fbm noise
vec2 hash22(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(dot(hash22(i), f), dot(hash22(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
    mix(dot(hash22(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)), dot(hash22(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.03;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = vUv;
  vec2 p = (uv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);

  float t = uTime * 0.03;
  vec2 m = uMouse * 0.15;

  float n1 = fbm(p * 1.6 + t + m);
  float n2 = fbm(p * 2.4 - t * 1.4 + n1 * 1.5);
  float n = fbm(p * 1.2 + n2 * 1.2 - m);

  vec3 deep = vec3(0.012, 0.016, 0.035);
  vec3 cyan = vec3(0.0, 0.28, 0.36);
  vec3 violet = vec3(0.18, 0.05, 0.32);

  vec3 color = deep;
  color = mix(color, violet, smoothstep(0.1, 0.7, n1) * 0.55);
  color = mix(color, cyan, smoothstep(0.3, 0.85, n2) * 0.35);
  color += vec3(0.0, 0.9, 1.0) * pow(max(n, 0.0), 3.0) * 0.12;

  // vignette
  float vig = 1.0 - dot(p, p) * 0.55;
  color *= clamp(vig, 0.0, 1.0);

  gl_FragColor = vec4(color, 1.0);
}
`
