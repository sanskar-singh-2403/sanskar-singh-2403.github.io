import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { particleVertex, particleFragment } from './shaders'

const COUNT = 6000

function galaxyPositions(count: number): Float32Array {
  const arr = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const radius = Math.pow(Math.random(), 0.7) * 3.4
    const branch = i % 4
    const branchAngle = (branch / 4) * Math.PI * 2
    const spin = radius * 1.1
    const spread = () => Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.55
    arr[i * 3] = Math.cos(branchAngle + spin) * radius + spread()
    arr[i * 3 + 1] = spread() * 0.6
    arr[i * 3 + 2] = Math.sin(branchAngle + spin) * radius + spread()
  }
  return arr
}

function spherePositions(count: number): Float32Array {
  const arr = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    // fibonacci sphere with jitter shells
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = i * 2.399963229728653
    const shell = 2.2 + Math.pow(Math.random(), 2) * 0.7
    arr[i * 3] = Math.cos(theta) * r * shell
    arr[i * 3 + 1] = y * shell
    arr[i * 3 + 2] = Math.sin(theta) * r * shell
  }
  return arr
}

interface Props {
  scrollProgress: React.MutableRefObject<number>
}

export default function ParticleField({ scrollProgress }: Props) {
  const points = useRef<THREE.Points>(null)
  const material = useRef<THREE.ShaderMaterial>(null)
  const { gl } = useThree()
  const mouse3 = useRef(new THREE.Vector3(50, 50, 0))

  const { positions, positionsB, scales, randoms } = useMemo(() => {
    const scales = new Float32Array(COUNT)
    const randoms = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) {
      scales[i] = 0.5 + Math.random() * 1.5
      randoms[i] = Math.random()
    }
    return {
      positions: galaxyPositions(COUNT),
      positionsB: spherePositions(COUNT),
      scales,
      randoms,
    }
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (material.current) {
      material.current.uniforms.uTime.value = t
      // morph galaxy -> sphere as user scrolls
      const target = Math.min(scrollProgress.current * 2.2, 1)
      const u = material.current.uniforms.uMorph
      u.value += (target - u.value) * 0.04

      // project mouse into world space near z=0 plane
      const { pointer, camera } = state
      const vec = new THREE.Vector3(pointer.x, pointer.y, 0.5)
      vec.unproject(camera)
      const dir = vec.sub(camera.position).normalize()
      const dist = -camera.position.z / dir.z
      mouse3.current.copy(camera.position).add(dir.multiplyScalar(dist))
      material.current.uniforms.uMouse.value.lerp(mouse3.current, 0.08)
    }
    if (points.current) {
      points.current.rotation.y = t * 0.04 + scrollProgress.current * 2.4
      points.current.rotation.x = Math.sin(t * 0.1) * 0.08 + scrollProgress.current * 0.5
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aPositionB" args={[positionsB, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
        <bufferAttribute attach="attributes-aRandom" args={[randoms, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        vertexShader={particleVertex}
        fragmentShader={particleFragment}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          uTime: { value: 0 },
          uMorph: { value: 0 },
          uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
          uMouse: { value: new THREE.Vector3(50, 50, 0) },
        }}
      />
    </points>
  )
}
