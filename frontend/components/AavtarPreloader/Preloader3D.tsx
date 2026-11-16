'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef, type MutableRefObject } from 'react'
import * as THREE from 'three'

type MouseVector = {
  x: number
  y: number
}

type ParticleSphereProps = {
  count?: number
  radius?: number
}

function ParticleSphere({ count = 300, radius = 1.05 }: ParticleSphereProps) {
  const pointsRef = useRef<THREE.Points | null>(null)

  const positions = useMemo(() => {
    const array = new Float32Array(count * 3)
    const goldenRatio = (1 + Math.sqrt(5)) / 2

    for (let i = 0; i < count; i += 1) {
      const y = 1 - (i / (count - 1)) * 2
      const radiusAtY = Math.sqrt(1 - y * y)
      const theta = (2 * Math.PI * i) / goldenRatio
      const x = Math.cos(theta) * radiusAtY * radius
      const z = Math.sin(theta) * radiusAtY * radius

      array[i * 3] = x
      array[i * 3 + 1] = y * radius
      array[i * 3 + 2] = z
    }

    return array
  }, [count, radius])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.08
      pointsRef.current.rotation.x = Math.sin(time * 0.05) * 0.1
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#809db1"
        size={0.03}
        sizeAttenuation
        transparent
        opacity={0.75}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function OrbitRings() {
  const ring1Ref = useRef<THREE.Group | null>(null)
  const ring2Ref = useRef<THREE.Mesh | null>(null)
  const ring3Ref = useRef<THREE.Mesh | null>(null)
  const dotsRef = useRef<Array<THREE.Mesh | null>>([])

  const dotCount = 4
  const ring1Radius = 1.6

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = time * 0.05
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = time * 0.03
      ring2Ref.current.rotation.y = -time * 0.02
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = time * 0.015
      ring3Ref.current.rotation.z = time * 0.01
    }

    dotsRef.current.forEach((dot, idx) => {
      if (!dot) return
      const offset = (idx * Math.PI * 2) / dotCount
      const angle = time * 0.4 + offset
      dot.position.x = Math.cos(angle) * ring1Radius
      dot.position.y = Math.sin(angle) * ring1Radius
    })
  })

  return (
    <group>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[ring1Radius, 0.005, 8, 128]} />
        <meshBasicMaterial color="#809db1" transparent opacity={0.1} />

        {Array.from({ length: dotCount }).map((_, idx) => (
          <mesh
            key={idx}
            ref={(el) => {
              dotsRef.current[idx] = el as THREE.Mesh | null
            }}
          >
            <sphereGeometry args={[0.025, 16, 16]} />
            <meshBasicMaterial color="#809db1" toneMapped={false} />
          </mesh>
        ))}
      </mesh>

      <mesh ref={ring2Ref} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[2.3, 0.004, 8, 128]} />
        <meshBasicMaterial color="#809db1" transparent opacity={0.05} />
      </mesh>

      <mesh ref={ring3Ref} rotation={[-Math.PI / 6, 0, Math.PI / 3]}>
        <torusGeometry args={[2.9, 0.003, 8, 128]} />
        <meshBasicMaterial color="#809db1" transparent opacity={0.02} />
      </mesh>
    </group>
  )
}

function Scene({ mouse }: { mouse: MutableRefObject<MouseVector> }) {
  const groupRef = useRef<THREE.Group | null>(null)

  useFrame(() => {
    const targetX = mouse.current.x * 0.15
    const targetY = mouse.current.y * 0.15

    if (!groupRef.current) return
    groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.05
    groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x) * 0.05
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#809db1" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#153c66" />
      <ParticleSphere count={300} radius={1.05} />
      <OrbitRings />
    </group>
  )
}

export default function Preloader3D() {
  const mouse = useRef<MouseVector>({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 60 }} gl={{ antialias: true, alpha: true }}>
        <Scene mouse={mouse} />
      </Canvas>
    </div>
  )
}
