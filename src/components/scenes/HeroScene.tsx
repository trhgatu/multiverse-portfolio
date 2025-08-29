'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import {
  OrbitControls,
  Environment,
  ContactShadows
} from '@react-three/drei';
import Astronaut from '../Astronaut';
import * as THREE from 'three';

const HeroScene = () => {
  return (
    <Canvas
      camera={{ position: [0, 5, 15], fov: 50 }}
      shadows
      gl={{
        toneMapping: THREE.ACESFilmicToneMapping,
        outputColorSpace: THREE.SRGBColorSpace,
      }}
    >

      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[0, 5, 10]} intensity={1.2} />

      <Suspense fallback={null}>
        <Environment preset="sunset" />
        <Astronaut />
      </Suspense>

      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={0.4}
        scale={20}
        blur={2.5}
        far={10}
      />

      <OrbitControls />
    </Canvas>
  );
};

export default HeroScene;
