import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

/**
 * Desplazamiento parallax vertical suave con el scroll (profundidad). El hijo
 * debería sobresalir un poco de su contenedor (`overflow-hidden` + escala) para
 * que no se vean bordes. Se anula con prefers-reduced-motion.
 */
export function Parallax({
  children,
  amount = 60,
  className = '',
}: {
  children: ReactNode;
  amount?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -amount / 10 },
        {
          yPercent: amount / 10,
          ease: 'none',
          scrollTrigger: {
            trigger: el.parentElement ?? el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [amount, reduced]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
