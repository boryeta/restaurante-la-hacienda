import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

/**
 * Intro de apertura: una cortina añil con la marca que se retira hacia arriba
 * revelando el hero. Primera impresión de web premium. Se muestra una vez por
 * sesión y se omite por completo con prefers-reduced-motion.
 */
export function IntroCurtain() {
  const reduced = usePrefersReducedMotion();
  const [done, setDone] = useState(true);

  useEffect(() => {
    if (reduced) return;
    if (sessionStorage.getItem('intro-seen') === '1') return;
    setDone(false);
    const t = setTimeout(() => {
      setDone(true);
      sessionStorage.setItem('intro-seen', '1');
    }, 1650);
    return () => clearTimeout(t);
  }, [reduced]);

  if (reduced) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-anil-800 text-cal-50"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Luz de patio sobre la cortina, para coherencia con el hero */}
          <div className="patio-shadows patio-shadows--light" aria-hidden />

          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-mono text-[11px] uppercase tracking-widest2 text-terracota-400"
          >
            Nuevo San Blas · Alicante
          </motion.span>

          <motion.span
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-3 font-display text-3xl font-medium sm:text-5xl"
          >
            La Hacienda del Sur
          </motion.span>

          {/* Línea que se dibuja */}
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.4, ease: 'easeInOut' }}
            className="mt-5 h-px w-40 origin-left bg-cal-50/40"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
