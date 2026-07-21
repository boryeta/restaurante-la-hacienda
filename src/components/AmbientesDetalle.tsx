import { motion } from 'framer-motion';
import { AMBIENTES } from '../data/ambientes';
import { Reveal, RevealGroup, RevealItem } from './Reveal';
import { PatioLight } from './PatioLight';

/**
 * Los tres ambientes, esta vez en profundidad: para qué ocasión sirve cada uno,
 * su capacidad orientativa y su ambiente. Cierra el círculo del concepto Barril
 * / Salón / Terraza que abre el hero.
 */
export function AmbientesDetalle() {
  return (
    <section id="ambientes" className="relative overflow-hidden bg-anil-700 py-20 text-cal-50 md:py-28">
      <PatioLight variant="light" intensity={1} />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-terracota-400">Tres ambientes, una casa</p>
          <h2 className="mt-3 font-display text-3xl font-medium leading-tight sm:text-4xl md:text-5xl">
            Elige tu momento y tu sitio
          </h2>
          <p className="mt-4 text-base leading-relaxed text-cal-50/80 md:text-lg">
            No es lo mismo dejarse caer a tapear de pie que sentar a toda la
            familia en el salón. Por eso La Hacienda del Sur se organiza en tres
            espacios, cada uno con su ritmo.
          </p>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {AMBIENTES.map((a, i) => (
            <RevealItem key={a.id}>
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-cal-50/10 bg-anil-800/60 p-8 backdrop-blur-sm"
              >
                {/* Franja de color del ambiente */}
                <span
                  className="absolute inset-x-0 top-0 h-1"
                  style={{ backgroundColor: a.tint }}
                  aria-hidden
                />
                <span className="font-mono text-xs text-cal-50/40">0{i + 1}</span>
                <h3 className="mt-2 font-display text-2xl font-medium">{a.nombre}</h3>
                <p className="mt-1 font-display text-base italic text-terracota-400">
                  «{a.claim}»
                </p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-cal-50/75">
                  {a.descripcion}
                </p>
                <div className="mt-6 border-t border-cal-50/10 pt-4">
                  <p className="text-xs uppercase tracking-wider text-cal-50/40">Para</p>
                  <p className="mt-1 text-sm text-cal-50/85">{a.paraQue}</p>
                  <p className="mt-3 font-mono text-xs text-cal-50/55">{a.capacidad}</p>
                </div>
              </motion.article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
