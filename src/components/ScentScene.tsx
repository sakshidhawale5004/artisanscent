import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer, OrbitControls } from '@react-three/drei';
import { useRef, useEffect, useState } from 'react';
import type { Group } from 'three';

function Sculpture({ reduced, colors }: { reduced: boolean; colors: string[] }) {
  const group = useRef<Group>(null);
  useFrame((_, rawDelta) => {
    if (!group.current || reduced) return;
    group.current.rotation.y += Math.min(rawDelta, 0.05) * 0.24;
    group.current.rotation.z += Math.min(rawDelta, 0.05) * 0.07;
  });
  return <group ref={group} rotation={[0.5, 0.2, 0.4]}>
    {[0, 1, 2].map(i => <mesh key={i} rotation={[i * 1.1, i * 0.65, 0]}>
      <torusGeometry args={[1.35 - i * 0.17, 0.055 + i * 0.008, 16, 96]} />
      <meshStandardMaterial color={colors[i % colors.length] ?? colors[0] ?? "gold"} metalness={0.94} roughness={0.2 + i * 0.09} />
    </mesh>)}
  </group>;
}
export default function ScentScene() {
  const [colors, setColors] = useState<string[]>([]);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const style = getComputedStyle(document.documentElement);
    const canvas = document.createElement('canvas'); canvas.width = 1; canvas.height = 1;
    const context = canvas.getContext('2d');
    if (!context) return;
    setColors(['--sculpture-gold', '--sculpture-silver', '--sculpture-green'].map(token => { context.fillStyle = style.getPropertyValue(token).trim(); context.fillRect(0,0,1,1); const pixel = context.getImageData(0,0,1,1).data; return `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`; }));
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);
  if (!colors.length) return null;
  return <Canvas camera={{ position: [0, 0, 5.4], fov: 42 }} dpr={[1, 1.5]} gl={{ alpha: true }}>
    <ambientLight intensity={0.8} />
    <directionalLight position={[3, 4, 5]} intensity={3} />
    <Environment resolution={128}><Lightformer intensity={3} position={[0, 4, 2]} scale={[8, 4, 1]} /><Lightformer intensity={2} position={[-4, 0, 2]} rotation-y={Math.PI / 2} scale={[8, 3, 1]} /></Environment>
    <Sculpture colors={colors} reduced={reduced} />
    <OrbitControls enableZoom={false} enablePan={false} />
  </Canvas>;
}
