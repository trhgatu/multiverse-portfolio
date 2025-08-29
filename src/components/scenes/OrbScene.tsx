'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Orb from '../Orb';
import { Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const OrbScene = () => {
    return (
        <Canvas
            camera={{ position: [0, 5, 15], fov: 35 }}
            shadows
            gl={{
                toneMapping: THREE.ACESFilmicToneMapping,
                outputColorSpace: THREE.SRGBColorSpace,
            }}
        >
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
                <Orb />
            </Suspense>

            <ContactShadows
                position={[0, -1.5, 0]}
                opacity={0.4}
                scale={20}
                blur={2.5}
                far={10}
            />
        </Canvas>
    );
};

export default OrbScene;
