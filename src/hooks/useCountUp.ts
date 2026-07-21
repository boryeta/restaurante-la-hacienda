import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

interface Options {
  to: number;
  decimals?: number;
  durationMs?: number;
}

/**
 * Contador animado que arranca cuando el elemento entra en viewport.
 * Devuelve [valorFormateado, ref]. Respeta prefers-reduced-motion
 * (en ese caso muestra el valor final directamente).
 */
export function useCountUp<T extends HTMLElement>({
  to,
  decimals = 0,
  durationMs = 1600,
}: Options): [string, React.RefObject<T>] {
  const ref = useRef<T>(null);
  const [value, setValue] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      setValue(to);
      return;
    }
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let started = false;

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / durationMs);
        // easeOutCubic
        const eased = 1 - Math.pow(1 - t, 3);
        setValue(to * eased);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          started = true;
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, durationMs, reduced]);

  return [value.toFixed(decimals), ref];
}
