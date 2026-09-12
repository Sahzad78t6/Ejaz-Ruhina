import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { AdaptiveDpr } from '@react-three/drei'
import * as THREE from 'three'

function IslamicMandala() {
  const group = useRef()
  const rings = useRef([])

  const ringData = useMemo(() => [
    { radius: 2.0, tube: 0.025, color: '#c9a84c', speed: 0.25, axis: [1, 0, 0] },
    { radius: 2.0, tube: 0.025, color: '#e8c96d', speed: -0.18, axis: [0, 1, 0] },
    { radius: 2.0, tube: 0.025, color: '#2d9f67', speed: 0.32, axis: [0.7, 0.7, 0] },
    { radius: 2.8, tube: 0.018, color: '#c9a84c', speed: -0.15, axis: [0, 0, 1] },
    { radius: 2.8, tube: 0.018, color: '#fff8e0', speed: 0.20, axis: [0.5, 0.5, 0.7] },
    { radius: 1.3, tube: 0.03, color: '#e8c96d', speed: -0.40, axis: [0, 1, 0] },
  ], [])

  const orbs = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    angle: (i / 12) * Math.PI * 2,
    radius: 1.8,
    speed: 0.2 + Math.random() * 0.15,
    size: 0.04 + Math.random() * 0.06,
    color: ['#c9a84c', '#e8c96d', '#2d9f67', '#fff8e0'][i % 4],
    offset: Math.random() * Math.PI * 2,
  })), [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (group.current) {
      group.current.rotation.y = t * 0.08
      group.current.position.y = Math.sin(t * 0.4) * 0.15
    }

    rings.current.forEach((mesh, i) => {
      if (!mesh) return
      const d = ringData[i]
      mesh.rotation.x = t * d.speed * d.axis[0]
      mesh.rotation.y = t * d.speed * d.axis[1]
      mesh.rotation.z = t * d.speed * d.axis[2]
    })
  })

  return (
    <group ref={group}>
      {ringData.map((d, i) => (
        <mesh key={i} ref={el => rings.current[i] = el}>
          <torusGeometry args={[d.radius, d.tube, 16, 120]} />
          <meshStandardMaterial color={d.color} metalness={0.95} roughness={0.05} emissive={d.color} emissiveIntensity={0.4} />
        </mesh>
      ))}

      {/* Floating light orbs */}
      {orbs.map((orb, i) => (
        <OrbMesh key={i} orb={orb} />
      ))}

      {/* Faceted gold & emerald center gem */}
      <mesh>
        <octahedronGeometry args={[0.26, 0]} />
        <meshStandardMaterial color="#e8c96d" metalness={1} roughness={0} emissive="#c9a84c" emissiveIntensity={1.6} />
      </mesh>

      {/* Inner emerald-gold glow sphere */}
      <mesh>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshStandardMaterial color="#2d9f67" transparent opacity={0.35} emissive="#1b7a4e" emissiveIntensity={2} />
      </mesh>
    </group>
  )
}

function OrbMesh({ orb }) {
  const mesh = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (mesh.current) {
      mesh.current.position.x = Math.cos(orb.angle + t * orb.speed) * orb.radius
      mesh.current.position.y = Math.sin(t * orb.speed * 0.5 + orb.offset) * 0.4
      mesh.current.position.z = Math.sin(orb.angle + t * orb.speed) * orb.radius * 0.4
      mesh.current.scale.setScalar(1 + Math.sin(t * 2 + orb.offset) * 0.15)
    }
  })
  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[orb.size, 8, 8]} />
      <meshStandardMaterial color={orb.color} emissive={orb.color} emissiveIntensity={1.2} metalness={0.8} roughness={0.1} />
    </mesh>
  )
}

function VolumetricParticles({ count = 250 }) {
  const mesh = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const data = useMemo(() => Array.from({ length: count }, () => ({
    theta: Math.random() * Math.PI * 2,
    phi: Math.acos(2 * Math.random() - 1),
    radius: 1.5 + Math.random() * 4,
    speed: (Math.random() - 0.5) * 0.004,
    phiSpeed: (Math.random() - 0.5) * 0.003,
    size: 0.015 + Math.random() * 0.04,
    color: new THREE.Color(['#c9a84c', '#e8c96d', '#2d9f67', '#fff8e0', '#d4af60'][Math.floor(Math.random() * 5)]),
    offset: Math.random() * Math.PI * 2,
  })), [count])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (!mesh.current) return
    data.forEach((p, i) => {
      p.theta += p.speed + Math.sin(t * 0.2 + p.offset) * 0.002
      p.phi += p.phiSpeed

      const x = p.radius * Math.sin(p.phi) * Math.cos(p.theta)
      const y = p.radius * Math.cos(p.phi) + Math.sin(t * 0.5 + p.offset) * 0.3
      const z = p.radius * Math.sin(p.phi) * Math.sin(p.theta)

      dummy.position.set(x, y, z)
      dummy.scale.setScalar(p.size * (0.8 + Math.sin(t + p.offset) * 0.2))
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
      if (mesh.current.instanceColor) mesh.current.setColorAt(i, p.color)
    })
    mesh.current.instanceMatrix.needsUpdate = true
    if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshStandardMaterial transparent opacity={0.8} emissive="#c9a84c" emissiveIntensity={0.5} />
    </instancedMesh>
  )
}

function GoldDustStream({ count = 35 }) {
  const mesh = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const particles = useMemo(() => Array.from({ length: count }, (_, i) => ({
    x: (Math.random() - 0.5) * 12,
    y: -5 + Math.random() * 12,
    z: (Math.random() - 0.5) * 5,
    speed: 0.005 + Math.random() * 0.012,
    spin: (Math.random() - 0.5) * 0.03,
    drift: (Math.random() - 0.5) * 0.01,
    offset: Math.random() * Math.PI * 2,
    waveAmp: 0.5 + Math.random() * 1.5,
    color: new THREE.Color(['#c9a84c', '#e8c96d', '#2d9f67', '#fff8e0', '#d4af60'][i % 5])
  })), [count])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (!mesh.current) return
    particles.forEach((p, i) => {
      p.y += p.speed
      p.x += p.drift + Math.sin(t + p.offset) * 0.005
      if (p.y > 6) { p.y = -5; p.x = (Math.random() - 0.5) * 12 }

      dummy.position.set(p.x + Math.sin(t * 0.5 + p.offset) * p.waveAmp * 0.3, p.y, p.z)
      dummy.rotation.z = t * p.spin + p.offset
      dummy.rotation.x = Math.sin(t * 0.3 + p.offset) * 0.5
      dummy.scale.setScalar(0.06 + Math.sin(t + p.offset) * 0.02)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
      if (mesh.current.instanceColor) mesh.current.setColorAt(i, p.color)
    })
    mesh.current.instanceMatrix.needsUpdate = true
    if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <circleGeometry args={[0.5, 6]} />
      <meshStandardMaterial transparent opacity={0.75} side={THREE.DoubleSide} emissive="#c9a84c" emissiveIntensity={0.5} />
    </instancedMesh>
  )
}

function Lights() {
  const spot1 = useRef()
  const spot2 = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (spot1.current) {
      spot1.current.position.x = Math.sin(t * 0.3) * 5
      spot1.current.position.z = Math.cos(t * 0.3) * 5
    }
    if (spot2.current) {
      spot2.current.position.x = Math.sin(t * 0.3 + Math.PI) * 5
      spot2.current.position.z = Math.cos(t * 0.3 + Math.PI) * 5
    }
  })

  return (
    <>
      <ambientLight intensity={0.35} color="#fff4e0" />
      <pointLight position={[0, 0, 3]} intensity={3} color="#c9a84c" distance={10} />
      <spotLight ref={spot1} position={[5, 5, 5]} angle={0.3} penumbra={0.8} intensity={4} color="#e8c96d" castShadow={false} />
      <spotLight ref={spot2} position={[-5, 3, 5]} angle={0.3} penumbra={0.8} intensity={3} color="#2d9f67" />
      <pointLight position={[0, -3, 2]} intensity={2} color="#1b7a4e" distance={8} />
      <pointLight position={[3, 2, -2]} intensity={1.5} color="#fff8e0" distance={6} />
    </>
  )
}

export default function Scene3D() {
  return (
    <Canvas
      style={{ position: 'absolute', inset: 0 }}
      camera={{ position: [0, 0, 7], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <AdaptiveDpr pixelated />
      <Lights />
      <IslamicMandala />
      <VolumetricParticles count={250} />
      <GoldDustStream count={35} />
    </Canvas>
  )
}
