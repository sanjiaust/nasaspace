import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';
import { BloomObservation } from '../lib/supabase';

interface Globe3DProps {
  observations: BloomObservation[];
  onSelectObservation?: (obs: BloomObservation) => void;
}

const EarthGlobe: React.FC<{ observations: BloomObservation[] }> = ({ observations }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.001;
    }
  });

  const textureLoader = useMemo(() => new THREE.TextureLoader(), []);

  const earthTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;

    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1a4d2e');
    gradient.addColorStop(0.5, '#2d5a3d');
    gradient.addColorStop(1, '#1a3d2e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#2a5f4a';
    for (let i = 0; i < 5000; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      ctx.fillRect(x, y, 2, 2);
    }

    return new THREE.CanvasTexture(canvas);
  }, []);

  const bloomPoints = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const colors: number[] = [];
    const sizes: number[] = [];

    observations.forEach((obs) => {
      const lat = obs.location.lat * (Math.PI / 180);
      const lng = obs.location.lng * (Math.PI / 180);
      const radius = 2.02;

      const x = radius * Math.cos(lat) * Math.cos(lng);
      const y = radius * Math.sin(lat);
      const z = radius * Math.cos(lat) * Math.sin(lng);

      points.push(new THREE.Vector3(x, y, z));

      const intensity = obs.bloom_intensity / 10;
      colors.push(1, intensity * 0.5, intensity * 0.8);
      sizes.push(0.05 + intensity * 0.05);
    });

    return { points, colors, sizes };
  }, [observations]);

  const pointsGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setFromPoints(bloomPoints.points);
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(bloomPoints.colors, 3));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(bloomPoints.sizes, 1));
    return geometry;
  }, [bloomPoints]);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ff9999" />

      <Sphere ref={meshRef} args={[2, 64, 64]}>
        <meshStandardMaterial
          map={earthTexture}
          roughness={0.7}
          metalness={0.2}
        />
      </Sphere>

      <points ref={pointsRef} geometry={pointsGeometry}>
        <pointsMaterial
          size={0.08}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      <mesh>
        <sphereGeometry args={[2.01, 64, 64]} />
        <meshBasicMaterial
          color="#88ccff"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
    </>
  );
};

export const Globe3D: React.FC<Globe3DProps> = ({ observations }) => {
  return (
    <div className="w-full h-[600px] bg-gradient-to-b from-slate-900 to-slate-800 rounded-2xl overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <color attach="background" args={['#0a0a1a']} />
        <EarthGlobe observations={observations} />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={3}
          maxDistance={8}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};