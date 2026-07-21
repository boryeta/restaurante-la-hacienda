import { useEffect, useState } from 'react';

export interface DeviceProfile {
  isMobile: boolean;
  /** Gama baja aproximada: pocos núcleos / pantalla táctil pequeña.
   *  Se usa para bajar la complejidad de la escena 3D. */
  isLowPower: boolean;
}

/**
 * Perfil de dispositivo para adaptar la escena 3D:
 *  - en móvil el selector funciona por tap (los botones ya lo permiten),
 *  - en gama baja reducimos DPR y sombras.
 */
export function useDeviceProfile(): DeviceProfile {
  const [profile, setProfile] = useState<DeviceProfile>(() => detect());

  useEffect(() => {
    const onResize = () => setProfile(detect());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return profile;
}

function detect(): DeviceProfile {
  if (typeof window === 'undefined') {
    return { isMobile: false, isLowPower: false };
  }
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const cores = navigator.hardwareConcurrency ?? 8;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
  const isLowPower = isMobile && (cores <= 4 || mem <= 4);
  return { isMobile, isLowPower };
}
