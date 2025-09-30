import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { useApp } from '../contexts/AppContext';

const Flower: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.5) * 0.2;
    }
  });

  const petalCount = 8;
  const petals = [];

  for (let i = 0; i < petalCount; i++) {
    const angle = (i / petalCount) * Math.PI * 2;
    petals.push(
      <mesh
        key={i}
        position={[Math.cos(angle) * 0.5, 0, Math.sin(angle) * 0.5]}
        rotation={[0, angle, 0]}
      >
        <boxGeometry args={[0.3, 0.8, 0.05]} />
        <meshStandardMaterial
          color={new THREE.Color().setHSL(i / petalCount * 0.1 + 0.9, 0.8, 0.6)}
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>
    );
  }

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#FFD700" roughness={0.5} metalness={0.3} />
      </mesh>
      {petals}
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[0.05, 0.08, 2, 16]} />
        <meshStandardMaterial color="#2d5a2d" />
      </mesh>
    </group>
  );
};

const Bee: React.FC<{ position: [number, number, number]; orbitRadius: number }> = ({ position, orbitRadius }) => {
  const beeRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (beeRef.current) {
      const time = clock.elapsedTime;
      beeRef.current.position.x = position[0] + Math.cos(time * 2) * orbitRadius;
      beeRef.current.position.y = position[1] + Math.sin(time * 3) * 0.3;
      beeRef.current.position.z = position[2] + Math.sin(time * 2) * orbitRadius;
      beeRef.current.rotation.y = time * 2;
    }
  });

  return (
    <group ref={beeRef} position={position}>
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
      <mesh position={[0.1, 0, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[-0.15, 0.1, 0.1]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.3, 0.05, 0.1]} />
        <meshStandardMaterial color="#e0e0e0" transparent opacity={0.7} />
      </mesh>
      <mesh position={[-0.15, 0.1, -0.1]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.3, 0.05, 0.1]} />
        <meshStandardMaterial color="#e0e0e0" transparent opacity={0.7} />
      </mesh>
    </group>
  );
};

const Butterfly: React.FC<{ position: [number, number, number]; orbitRadius: number }> = ({ position, orbitRadius }) => {
  const butterflyRef = useRef<THREE.Group>(null);
  const wingLeftRef = useRef<THREE.Mesh>(null);
  const wingRightRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (butterflyRef.current) {
      const time = clock.elapsedTime;
      butterflyRef.current.position.x = position[0] + Math.sin(time * 1.5) * orbitRadius;
      butterflyRef.current.position.y = position[1] + Math.cos(time * 2) * 0.5;
      butterflyRef.current.position.z = position[2] + Math.cos(time * 1.5) * orbitRadius;
      butterflyRef.current.rotation.y = Math.sin(time * 1.5) * 0.5;
    }

    if (wingLeftRef.current && wingRightRef.current) {
      const wingFlap = Math.sin(clock.elapsedTime * 10) * 0.3;
      wingLeftRef.current.rotation.y = -wingFlap;
      wingRightRef.current.rotation.y = wingFlap;
    }
  });

  return (
    <group ref={butterflyRef} position={position}>
      <mesh>
        <cylinderGeometry args={[0.05, 0.05, 0.4, 8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh ref={wingLeftRef} position={[-0.2, 0, 0]}>
        <boxGeometry args={[0.4, 0.6, 0.05]} />
        <meshStandardMaterial
          color="#FF6B9D"
          side={THREE.DoubleSide}
          transparent
          opacity={0.9}
        />
      </mesh>
      <mesh ref={wingRightRef} position={[0.2, 0, 0]}>
        <boxGeometry args={[0.4, 0.6, 0.05]} />
        <meshStandardMaterial
          color="#FF6B9D"
          side={THREE.DoubleSide}
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  );
};

export const FlowerPollinator3D: React.FC = () => {
  const { t, language } = useApp();

  return (
    <div className="w-full bg-gradient-to-br from-pink-950 via-rose-900 to-purple-950 rounded-2xl p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-2">
            {language === 'bn' ? 'পরাগায়নকারীদের সাথে ফুল' : 'Flowers & Pollinators'}
          </h2>
          <p className="text-pink-200">
            {language === 'bn' ? '3D ইন্টারঅ্যাক্টিভ মডেল' : '3D Interactive Model'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-[500px] bg-gradient-to-b from-sky-900 to-green-900 rounded-xl overflow-hidden">
            <Canvas camera={{ position: [3, 2, 3], fov: 50 }}>
              <color attach="background" args={['#87CEEB']} />
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} intensity={1} />
              <pointLight position={[-5, 5, -5]} intensity={0.5} color="#FFD700" />

              <Flower />
              <Bee position={[0, 0, 0]} orbitRadius={1.5} />
              <Butterfly position={[0, 0, 0]} orbitRadius={2} />

              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
                <planeGeometry args={[10, 10]} />
                <meshStandardMaterial color="#2d5a2d" />
              </mesh>

              <OrbitControls enableZoom={true} enablePan={false} />
            </Canvas>
          </div>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl p-6 border border-yellow-500/30"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-4 h-4 bg-yellow-400 rounded-full" />
                <h3 className="text-xl font-bold text-white">
                  {language === 'bn' ? 'মৌমাছি' : 'Honey Bee'}
                </h3>
              </div>
              <p className="text-white/80 text-sm mb-2">
                {language === 'bn'
                  ? 'প্রাথমিক পরাগায়নকারী, ফসলের 70% পরাগায়ন করে'
                  : 'Primary pollinator, responsible for 70% of crop pollination'}
              </p>
              <div className="flex gap-2 mt-3">
                <span className="px-2 py-1 bg-yellow-500/30 rounded text-xs text-white">
                  {language === 'bn' ? 'সক্রিয়' : 'Active'}
                </span>
                <span className="px-2 py-1 bg-green-500/30 rounded text-xs text-white">
                  {language === 'bn' ? 'দিনের বেলা' : 'Diurnal'}
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-xl p-6 border border-pink-500/30"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-4 h-4 bg-pink-400 rounded-full" />
                <h3 className="text-xl font-bold text-white">
                  {language === 'bn' ? 'প্রজাপতি' : 'Butterfly'}
                </h3>
              </div>
              <p className="text-white/80 text-sm mb-2">
                {language === 'bn'
                  ? 'দীর্ঘ দূরত্বের পরাগায়ন এবং জেনেটিক বৈচিত্র্য'
                  : 'Long-distance pollination and genetic diversity'}
              </p>
              <div className="flex gap-2 mt-3">
                <span className="px-2 py-1 bg-pink-500/30 rounded text-xs text-white">
                  {language === 'bn' ? 'মোবাইল' : 'Mobile'}
                </span>
                <span className="px-2 py-1 bg-purple-500/30 rounded text-xs text-white">
                  {language === 'bn' ? 'রঙিন ফুল' : 'Colorful Flowers'}
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl p-6 border border-emerald-500/30"
            >
              <h4 className="text-lg font-bold text-white mb-3">
                {language === 'bn' ? 'পরাগায়ন প্রভাব' : 'Pollination Impact'}
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/70">
                    {language === 'bn' ? 'বৈশ্বিক ফসল' : 'Global Crops'}
                  </span>
                  <span className="text-white font-bold">75%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">
                    {language === 'bn' ? 'জীববৈচিত্র্য' : 'Biodiversity'}
                  </span>
                  <span className="text-white font-bold">88%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">
                    {language === 'bn' ? 'অর্থনৈতিক মূল্য' : 'Economic Value'}
                  </span>
                  <span className="text-white font-bold">$577B</span>
                </div>
              </div>
            </motion.div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
              <p className="text-white/60 text-sm">
                {language === 'bn'
                  ? '🔄 3D মডেল ঘুরানোর জন্য ড্র্যাগ করুন'
                  : '🔄 Drag to rotate 3D model'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};