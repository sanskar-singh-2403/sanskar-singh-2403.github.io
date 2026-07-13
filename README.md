# sanskar.github.io

Personal portfolio — a futuristic 3D experience built with:

- React 19 + TypeScript + Vite
- Three.js via @react-three/fiber
- Custom GLSL shaders (fbm nebula background, 6,000-particle morphing field)
- @react-three/postprocessing (bloom, chromatic aberration, vignette)
- Framer Motion (staggered reveals, 3D tilt cards)
- Lenis smooth scrolling driving scroll-linked 3D morphs

## Features

- Galaxy-to-sphere particle morph driven by scroll progress
- Mouse-repulsion force field on particles
- Procedural nebula rendered as a fullscreen fbm shader
- Floating torus-knot core artifact with emissive lighting
- Glassmorphism UI with animated section reveals

## Development

```bash
npm install
npm run dev      # local dev server
npm run build    # production build to dist/
```

## Deployment

Pushing to `main` triggers the GitHub Actions workflow which builds and
deploys to GitHub Pages automatically. For a user page the repo must be
named `<username>.github.io` (base path `/` is already configured).
