import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { AMBIENTES, type AmbienteId } from '../data/ambientes';

/**
 * Mueve la cámara suavemente entre las tres "escenas" (Barril / Salón / Terraza)
 * usando GSAP — nunca un corte brusco. Anima la posición de la cámara y un punto
 * de mira (lookAt) de forma independiente, con un easing tipo "power3".
 */
export function CameraRig({ active }: { active: AmbienteId }) {
  const { camera } = useThree();
  const lookAt = useRef(new THREE.Vector3(...AMBIENTES[1].lookAt));
  const first = useRef(true);

  useEffect(() => {
    const target = AMBIENTES.find((a) => a.id === active) ?? AMBIENTES[1];

    if (first.current) {
      // Coloca la cámara en la posición inicial sin animar
      camera.position.set(...target.cameraPos);
      lookAt.current.set(...target.lookAt);
      first.current = false;
      return;
    }

    const posTween = gsap.to(camera.position, {
      x: target.cameraPos[0],
      y: target.cameraPos[1],
      z: target.cameraPos[2],
      duration: 1.25,
      ease: 'power3.inOut',
    });

    const lookTween = gsap.to(lookAt.current, {
      x: target.lookAt[0],
      y: target.lookAt[1],
      z: target.lookAt[2],
      duration: 1.25,
      ease: 'power3.inOut',
    });

    return () => {
      posTween.kill();
      lookTween.kill();
    };
  }, [active, camera]);

  useFrame(() => {
    camera.lookAt(lookAt.current);
  });

  return null;
}
