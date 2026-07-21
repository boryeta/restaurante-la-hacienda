import { motion } from 'framer-motion';
import type { Plato } from '../data/menu';
import { RevealItem } from './Reveal';

/**
 * Tarjeta de plato. En hover "se levanta" ligeramente (no sólo una sombra
 * genérica): sube unos px, gana profundidad y el nombre vira a terracota.
 * Los platos de referencia (estrella) llevan un realce especial.
 */
export function DishCard({ plato, tint }: { plato: Plato; tint: string }) {
  return (
    <RevealItem as="article">
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        className={`group relative flex h-full flex-col rounded-2xl border bg-cal-50 p-6 transition-shadow duration-300
          ${
            plato.estrella
              ? 'border-terracota/30 shadow-[0_1px_0_rgba(181,80,46,0.2)]'
              : 'border-anil/10'
          }
          hover:shadow-[0_24px_48px_-24px_rgba(30,58,76,0.45)]`}
      >
        {/* Filo de color que aparece en hover, tono del ambiente */}
        <span
          className="absolute left-0 top-6 h-8 w-1 rounded-r-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ backgroundColor: tint }}
          aria-hidden
        />

        <div className="flex items-start justify-between gap-3">
          <h4 className="font-display text-lg font-medium leading-snug text-anil transition-colors duration-300 group-hover:text-terracota">
            {plato.nombre}
          </h4>
          {plato.estrella && (
            <span className="mt-1 shrink-0 text-terracota" title="Plato de referencia" aria-label="Plato de referencia">
              ★
            </span>
          )}
        </div>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-anil-500">{plato.descripcion}</p>

        <div className="mt-4 flex items-center justify-between">
          <span className="price">{plato.precio}</span>
          {plato.etiqueta && (
            <span className="rounded-full bg-anil/5 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-anil-500">
              {plato.etiqueta}
            </span>
          )}
        </div>
      </motion.div>
    </RevealItem>
  );
}
