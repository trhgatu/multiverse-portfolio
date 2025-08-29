'use client';

import { useGLTF } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import { Group } from 'three';
import { useFrame } from '@react-three/fiber';

const Astronaut = () => {
  const modelRef = useRef<Group>(null);
  const { scene } = useGLTF('/models/space_boi.glb');

  useEffect(() => {
    scene.traverse((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
    });
    scene.scale.set(1.5, 1.5, 1.5);
    scene.position.set(0, -3.5, 0);
  }, [scene]);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005;
    }
  });

  return <primitive ref={modelRef} object={scene} />;
};

export default Astronaut;
