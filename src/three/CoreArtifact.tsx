import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

export default function CoreArtifact({
  scrollProgress,
}: {
  scrollProgress: React.MutableRefObject<number>
}) {
  const group = useRef<THREE.Group>(null)
  const inner = useRef<THREE.Mesh>(null)
  const outer = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (inner.current) {
      inner.current.rotation.x = t * 0.25
      inner.current.rotation.y = t * 0.35
    }
    if (outer.current) {
      outer.current.rotation.x = -t * 0.12
      outer.current.rotation.z = t * 0.18
      const pulse = 1 + Math.sin(t * 1.4) * 0.03
      outer.current.scale.setScalar(pulse)
    }
    if (group.current) {
      // fade the artifact down as the particles morph in on scroll
      const s = Math.max(1 - scrollProgress.current * 2.0, 0)
      group.current.scale.setScalar(0.001 + s)
      group.current.position.y = -scrollProgress.current * 3
    }
  })

  return (
    <Float speed={1.6} rotationIntensity={0.4} floatIntensity={0.7}>
      <group ref={group}>
        <mesh ref={inner}>
          <torusKnotGeometry args={[0.55, 0.16, 220, 36, 2, 3]} />
          <meshStandardMaterial
            color="#050810"
            metalness={0.95}
            roughness={0.12}
            emissive="#00f0ff"
            emissiveIntensity={0.22}
          />
        </mesh>
        <mesh ref={outer}>
          <icosahedronGeometry args={[1.25, 1]} />
          <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.14} />
        </mesh>
        <pointLight color="#00f0ff" intensity={6} distance={6} />
        <pointLight color="#b400ff" intensity={4} distance={8} position={[2, -1, 1]} />
      </group>
    </Float>
  )
}
