import { motion, useScroll, useSpring } from 'framer-motion';

/** Barra de progreso de lectura, fina, en terracota, fija arriba. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-terracota"
      aria-hidden
    />
  );
}
