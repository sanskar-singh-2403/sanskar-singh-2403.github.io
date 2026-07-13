import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { nebulaVertex, nebulaFragment } from './shaders'

export default function Nebula() {
  const material = useRef<THREE.ShaderMaterial>(null)
  const { size } = useThree()

  useFrame((state) => {
    if (!material.current) return
    material.current.uniforms.uTime.value = state.clock.elapsedTime
    material.current.uniforms.uResolution.value.set(size.width, size.height)
    material.current.uniforms.uMouse.value.lerp(
      new THREE.Vector2(state.pointer.x, state.pointer.y),
      0.05,
    )
  })

  return (
    <mesh renderOrder={-10} frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={material}
        vertexShader={nebulaVertex}
        fragmentShader={nebulaFragment}
        depthWrite={false}
        depthTest={false}
        uniforms={{
          uTime: { value: 0 },
          uResolution: { value: new THREE.Vector2(1, 1) },
          uMouse: { value: new THREE.Vector2(0, 0) },
        }}
      />
    </mesh>
  )
}
