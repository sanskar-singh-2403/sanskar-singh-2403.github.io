import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import ParticleField from './ParticleField'
import Nebula from './Nebula'
import CoreArtifact from './CoreArtifact'

export default function Scene({
  scrollProgress,
}: {
  scrollProgress: React.MutableRefObject<number>
}) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0.6, 5.2], fov: 55 }}
        dpr={[1, 2]}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        style={{ pointerEvents: 'auto' }}
        eventSource={document.body}
        eventPrefix="client"
      >
        <Suspense fallback={null}>
          <Nebula />
          <ambientLight intensity={0.15} />
          <ParticleField scrollProgress={scrollProgress} />
          <CoreArtifact scrollProgress={scrollProgress} />
          <EffectComposer multisampling={0}>
            <Bloom
              intensity={0.45}
              luminanceThreshold={0.32}
              luminanceSmoothing={0.9}
              mipmapBlur
            />
            <ChromaticAberration
              blendFunction={BlendFunction.NORMAL}
              offset={[0.0008, 0.0008]}
            />
            <Vignette eskil={false} offset={0.18} darkness={0.85} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  )
}
