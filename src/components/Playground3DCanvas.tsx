import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import { useRef } from 'react';
import type { Group, Mesh } from 'three';

interface Playground3DProps {
  color: string;
  particleColor: string;
  accent: string;
}

function PerfumeFlacon({ color, accent }: { color: string; accent: string }) {
  const bottleGroup = useRef<Group>(null);
  const liquidMesh = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (!bottleGroup.current) return;
    // Gentle floating breathing rotation
    bottleGroup.current.rotation.y += delta * 0.35;
    if (liquidMesh.current) {
      liquidMesh.current.position.y = -0.15 + Math.sin(state.clock.elapsedTime * 1.5) * 0.03;
    }
  });

  return (
    <group ref={bottleGroup} position={[0, -0.2, 0]}>
      {/* Outer Luxury Crystal Glass Flacon */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 2.1, 0.9]} />
        <meshPhysicalMaterial
          roughness={0.08}
          transmission={0.9}
          thickness={0.6}
          ior={1.5}
          color="#ffffff"
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* Fragrance Essence Liquid Inside */}
      <mesh ref={liquidMesh} position={[0, -0.15, 0]}>
        <boxGeometry args={[1.32, 1.65, 0.74]} />
        <meshStandardMaterial
          color={color}
          roughness={0.25}
          metalness={0.15}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* Golden Collar */}
      <mesh position={[0, 1.15, 0]}>
        <cylinderGeometry args={[0.32, 0.34, 0.22, 32]} />
        <meshStandardMaterial
          color="#d4af37"
          metalness={0.95}
          roughness={0.18}
        />
      </mesh>

      {/* Golden Atomizer Spray Cap */}
      <mesh position={[0, 1.42, 0]}>
        <cylinderGeometry args={[0.26, 0.26, 0.35, 32]} />
        <meshStandardMaterial
          color="#e6ca65"
          metalness={0.92}
          roughness={0.2}
        />
      </mesh>

      {/* Celestial Golden Halos */}
      <mesh rotation={[Math.PI / 2.8, 0, 0]} position={[0, 0, 0]}>
        <torusGeometry args={[1.6, 0.02, 16, 64]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh rotation={[-Math.PI / 3, 0.4, 0]} position={[0, 0, 0]}>
        <torusGeometry args={[1.85, 0.015, 16, 64]} />
        <meshStandardMaterial color={accent} metalness={0.85} roughness={0.3} />
      </mesh>
    </group>
  );
}

function FloatingMist({ count = 28, color }: { count?: number; color: string }) {
  const points = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!points.current) return;
    points.current.rotation.y -= delta * 0.15;
    points.current.rotation.x = Math.sin(delta) * 0.05;
  });

  return (
    <group ref={points}>
      {Array.from({ length: count }).map((_, i) => {
        const phi = Math.acos(-1 + (2 * i) / count);
        const theta = Math.sqrt(count * Math.PI) * phi;
        const radius = 2.1 + (i % 4) * 0.3;
        const x = radius * Math.cos(theta) * Math.sin(phi);
        const y = radius * Math.sin(theta) * Math.sin(phi) * 0.8 + 0.2;
        const z = radius * Math.cos(phi);
        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[0.045 + (i % 3) * 0.02, 12, 12]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? '#f3e5ab' : color}
              emissive={color}
              emissiveIntensity={0.6}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default function Playground3DCanvas({ color, particleColor, accent }: Playground3DProps) {
  return (
    <Canvas
      camera={{ position: [0, 0.2, 4.8], fov: 44 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={1.1} />
      <directionalLight position={[4, 5, 4]} intensity={2.8} />
      <directionalLight position={[-4, -2, -3]} intensity={1.2} color="#f9eed0" />
      <pointLight position={[0, 2, 2]} intensity={2} color="#ffe599" />
      
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.5}>
        <PerfumeFlacon color={color} accent={accent} />
        <FloatingMist color={particleColor} />
      </Float>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.7}
      />
    </Canvas>
  );
}
