import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, SoftShadows } from '@react-three/drei';
import * as THREE from 'three';
import type { AmbienteId } from '../data/ambientes';
import { BarrilScene, SalonScene, TerrazaScene } from './models';
import { CameraRig } from './CameraRig';
import type { DeviceProfile } from '../hooks/useDeviceProfile';

const POS = { barril: -6, salon: 0, terraza: 6 };

/** Ligerísimo parallax con el puntero para dar sensación de que la escena "se puede girar". */
function ParallaxGroup({ children, enabled }: { children: React.ReactNode; enabled: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current || !enabled) return;
    const targetY = state.pointer.x * 0.12;
    const targetX = -state.pointer.y * 0.05;
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.05;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.05;
  });
  return <group ref={group}>{children}</group>;
}

interface Props {
  active: AmbienteId;
  device: DeviceProfile;
}

export function AmbienteScene({ active, device }: Props) {
  const dpr: [number, number] = device.isLowPower ? [1, 1.4] : [1, 2];

  return (
    <Canvas
      shadows={!device.isLowPower}
      dpr={dpr}
      gl={{ antialias: !device.isLowPower, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 1.9, 5.6], fov: 42 }}
      style={{ touchAction: 'pan-y' }}
    >
      {/* Sombras suaves sólo si no es gama baja */}
      {!device.isLowPower && <SoftShadows size={12} samples={8} focus={0.9} />}

      {/* Luz cálida de patio andaluz: cielo cálido / suelo de cal, sin depender de HDR externos */}
      <hemisphereLight args={['#ffe9cf', '#e3d6be', 0.9]} />
      <ambientLight intensity={0.35} color="#fff3e0" />
      <directionalLight
        position={[4, 6, 3]}
        intensity={2.1}
        color="#ffe6c2"
        castShadow={!device.isLowPower}
        shadow-mapSize={device.isLowPower ? 512 : 1024}
        shadow-bias={-0.0004}
      />
      <directionalLight position={[-4, 3, -2]} intensity={0.5} color="#9db8c9" />

      <Suspense fallback={null}>
        <ParallaxGroup enabled={!device.isMobile}>
          <BarrilScene x={POS.barril} />
          <SalonScene x={POS.salon} />
          <TerrazaScene x={POS.terraza} />
        </ParallaxGroup>
      </Suspense>

      {!device.isLowPower && (
        <>
          <ContactShadows position={[POS.barril, 0, 0]} opacity={0.4} scale={4} blur={2.4} far={2} color="#1E3A4C" />
          <ContactShadows position={[POS.salon, 0, 0]} opacity={0.4} scale={5} blur={2.4} far={2} color="#1E3A4C" />
          <ContactShadows position={[POS.terraza, 0, 0]} opacity={0.4} scale={4} blur={2.4} far={2} color="#1E3A4C" />
        </>
      )}

      <CameraRig active={active} />
    </Canvas>
  );
}
