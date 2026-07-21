import { motion, type Variants } from 'framer-motion';
import { createElement } from 'react';

/**
 * Titular con revelado por palabras: cada palabra "sube" desde debajo de una
 * máscara al entrar en viewport. Refinado y editorial. Framer respeta
 * prefers-reduced-motion (además del CSS global que neutraliza transiciones).
 */
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const word: Variants = {
  hidden: { y: '110%' },
  show: { y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function AnimatedHeading({
  text,
  className = '',
  as = 'h2',
}: {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}) {
  const words = text.split(' ');
  return createElement(
    motion[as],
    {
      className,
      variants: container,
      initial: 'hidden',
      whileInView: 'show',
      viewport: { once: true, margin: '-60px' },
    },
    words.map((w, i) => (
      <span key={i} className="inline-block overflow-hidden align-bottom">
        <motion.span variants={word} className="inline-block">
          {w}
          {i < words.length - 1 ? ' ' : ''}
        </motion.span>
      </span>
    )),
  );
}
