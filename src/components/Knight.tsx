import { useGLTF } from '@react-three/drei';
import { useRef, useEffect, useMemo } from 'react';
import { Group, Mesh, Bone, Vector3, Vector2, Plane, Object3D, Euler, MathUtils } from 'three';
import { useFrame } from '@react-three/fiber';

export const Knight = () => {
  const { scene } = useGLTF('/models/the_forgotten_knight.glb');
  const innerRef = useRef<Group>(null);

  const mouse = useRef({ x: 0, y: 0 });

  const tmpObj = useMemo(() => new Object3D(), []);
  const target = useMemo(() => new Vector3(), []);
  const headWorld = useMemo(() => new Vector3(), []);

  const lookPlane = useMemo(() => new Plane(new Vector3(0, 0, 1), -1.2), []);

  const knightRefs = useRef({
    head: null as Bone | null,
    cape: [] as Bone[],
  });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as Mesh).isMesh) {
        const mesh = child as Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
      if (child.type === 'Bone') {
        const name = child.name.toLowerCase();
        if (name.includes('head') || name.includes('helmet')) knightRefs.current.head = child as Bone;
        if (name.includes('cape') || name.includes('cloak')) knightRefs.current.cape.push(child as Bone);
      }
    });
  }, [scene]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const refs = knightRefs.current;
    if (innerRef.current) {
      const floatY = Math.sin(t * 0.8) * 0.025;
      const floatX = Math.sin(t * 0.6) * 0.015;
      innerRef.current.position.set(floatX, floatY, 0);
      innerRef.current.rotation.y = Math.sin(t * 0.4) * 0.02;

      const breathe = 1 + Math.sin(t * 2.5) * 0.008;
      innerRef.current.scale.setScalar(1.5 * breathe);
    }
    if (refs.head) {
      const { raycaster, camera, pointer } = state;
      const px = pointer.x || mouse.current.x;
      const py = pointer.y || mouse.current.y;

      raycaster.setFromCamera(new Vector2(px, py), camera);
      const hit = raycaster.ray.intersectPlane(lookPlane, target);

      if (hit) {
        refs.head.getWorldPosition(headWorld);
        target.y = MathUtils.clamp(target.y, headWorld.y - 0.4, headWorld.y + 0.6);
        tmpObj.position.copy(headWorld);
        tmpObj.lookAt(target);

        refs.head.quaternion.slerp(tmpObj.quaternion, 0.15);

        const e = new Euler().setFromQuaternion(refs.head.quaternion, 'YXZ');
        const maxYaw = MathUtils.degToRad(35);
        const maxPitch = MathUtils.degToRad(20);
        e.y = MathUtils.clamp(e.y, -maxYaw, maxYaw);
        e.x = MathUtils.clamp(e.x, -maxPitch, maxPitch);
        refs.head.quaternion.setFromEuler(e);

        refs.head.updateMatrixWorld(true);
      }
    }

    refs.cape.forEach((capeBone, index) => {
      const phase = index * Math.PI * 0.3;
      capeBone.rotation.x = Math.sin(t * 1.6 + phase) * 0.15;
      capeBone.rotation.z = Math.sin(t * 1.2 + phase) * 0.08;
      capeBone.rotation.y = Math.cos(t * 0.8 + phase) * 0.03;
    });
  });

  return (
    <group position={[0, 0, 0]}>
      <group ref={innerRef}>
        <primitive object={scene} scale={1.5} />
      </group>
    </group>
  );
};

useGLTF.preload('/models/the_forgotten_knight.glb');