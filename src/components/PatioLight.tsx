import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

/**
 * Motivo de firma: luz y sombra de patio andaluz.
 * Franjas de sombra proyectada (como un techo de cañizo / toldo de rafia) que
 * se desplazan sutilmente con el scroll, como si el sol cruzara el patio.
 * No usa azulejos ni iconografía flamenca — la "andaluza" está en la luz.
 */
export function PatioLight({
  variant = 'dark',
  intensity = 1,
}: {
  variant?: 'dark' | 'light';
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    // Al hacer scroll sobre la sección, la variable --patio-shift desplaza
    // las franjas de sombra: el "sol" se mueve.
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { '--patio-shift': `${-60 * intensity}px` },
        {
          '--patio-shift': `${60 * intensity}px`,
          ease: 'none',
          scrollTrigger: {
            trigger: el.parentElement ?? el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [reduced, intensity]);

  return (
    <div
      ref={ref}
      className={`patio-shadows ${variant === 'light' ? 'patio-shadows--light' : ''}`}
      aria-hidden
    />
  );
}
