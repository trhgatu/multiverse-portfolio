'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Astronaut from '../Astronaut';
import { OrbitControls } from '@react-three/drei';

const AstronautScene = () => {
  return (
    <Canvas camera={{ position: [0, 7, 20], fov: 50 }} shadows>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 3, 2]} intensity={1.8} />
      <pointLight position={[0, 2, 3]} intensity={1.5} />

      <Suspense fallback={null}>
        <Astronaut />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
};

export default AstronautScene;
