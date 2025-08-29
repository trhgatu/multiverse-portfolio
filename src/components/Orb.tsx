'use client';

import { useGLTF, useAnimations } from '@react-three/drei';
import { useRef, useEffect, useMemo } from 'react';
import { Object3D } from 'three';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

const Orb = () => {
    const modelRef = useRef<Object3D>(null);
    const { scene, animations } = useGLTF('/models/orb.glb');
    const cloned = useMemo(() => scene.clone(true), [scene]);
    const { actions } = useAnimations(animations, cloned);

    const posRef = useRef({ x: 4, y: 2, z: 6 });
    const rotRef = useRef({ x: 0, y: 0, z: 0 });
    const scaleRef = useRef(2);
    const scrollProgressRef = useRef(0);

    useEffect(() => {
        Object.values(actions).forEach((action) => {
            if (action) {
                action
                    .reset()
                    .setLoop(THREE.LoopRepeat, Infinity)
                    .setEffectiveTimeScale(1)
                    .play();
            }
        });

        return () => {
            Object.values(actions).forEach((action) => {
                if (action) {
                    action.stop();
                }
            });
        };
    }, [actions]);

    useEffect(() => {
        const target = { x: 4, y: 2, z: 6 };
        const rotTarget = { x: 0, y: 0, z: 0 };
        const scaleTarget = { value: 2 };

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#about",
                start: "top bottom",
                end: "+=250vh",
                scrub: 2,
                onUpdate: (self) => {
                    scrollProgressRef.current = self.progress;
                }
            },
            onUpdate: () => {
                posRef.current.x = target.x;
                posRef.current.y = target.y;
                posRef.current.z = target.z;

                rotRef.current.x = rotTarget.x;
                rotRef.current.y = rotTarget.y;
                rotRef.current.z = rotTarget.z;

                scaleRef.current = scaleTarget.value;

                Object.values(actions).forEach((action) => {
                    if (action) {
                        action.timeScale = Math.max(0.3, scrollProgressRef.current + 0.7);
                    }
                });
            }
        });
        tl.to(target, {
            x: 0,
            y: 0,
            z: 1,
            ease: "power3.inOut",
        })

            .to(rotTarget, {
                x: Math.PI * 0.5,
                y: Math.PI * 4,
                z: Math.PI * 0.3,
                ease: "power3.inOut",
            }, 0)

            .to(scaleTarget, {
                value: 1.2,
                ease: "power3.inOut",
            }, 0);

        return () => {
            tl.kill();
        };
    }, [actions]);

    useFrame((state) => {
        if (modelRef.current) {
            modelRef.current.rotation.y += 0.008;

            const { x, y, z } = posRef.current;
            modelRef.current.position.lerp(
                new THREE.Vector3(x, y, z),
                0.08
            );

            const { x: rx, z: rz } = rotRef.current;
            modelRef.current.rotation.x = THREE.MathUtils.lerp(
                modelRef.current.rotation.x,
                rx,
                0.04
            );
            modelRef.current.rotation.z = THREE.MathUtils.lerp(
                modelRef.current.rotation.z,
                rz,
                0.04
            );

            const currentScale = modelRef.current.scale.x;
            const targetScale = scaleRef.current;
            const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.06);
            modelRef.current.scale.setScalar(newScale);

            if (scrollProgressRef.current > 0) {
                const progress = scrollProgressRef.current;

                const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.05 * progress;
                modelRef.current.scale.addScalar(pulse);

                const waveX = Math.sin(state.clock.elapsedTime * 2 + progress * Math.PI) * 0.003 * progress;
                const waveZ = Math.cos(state.clock.elapsedTime * 1.7 + progress * Math.PI) * 0.003 * progress;

                modelRef.current.rotation.x += waveX;
                modelRef.current.rotation.z += waveZ;
            }
        }
    });

    return (
        <primitive ref={modelRef} object={cloned} scale={[2, 2, 2]} />
    );
};

export default Orb;
