import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CARTA } from '../data/menu';
import { DishCard } from './DishCard';
import { RevealGroup, Reveal } from './Reveal';
import { PatioLight } from './PatioLight';
import { Img } from './Img';
import { AnimatedHeading } from './AnimatedHeading';

/**
 * La carta, por CATEGORÍAS de comida (tapas, arroces y carnes, ensaladas,
 * postres), con foto real destacada de cada categoría junto a las tarjetas.
 */
export function Carta() {
  const [activeId, setActiveId] = useState('arroces');
  const grupo = CARTA.find((g) => g.id === activeId) ?? CARTA[1];

  return (
    <section id="carta" className="relative overflow-hidden bg-cal py-20 md:py-28">
      <PatioLight intensity={0.8} />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Nuestra carta</p>
          <AnimatedHeading
            text="Cocina de mercado, casera"
            className="mt-3 font-display text-3xl font-medium leading-tight text-anil sm:text-4xl md:text-5xl"
          />
          <p className="mt-4 text-base leading-relaxed text-anil-500 md:text-lg">
            Bien elaborada y sin postureo. Elige una categoría y échale un ojo —
            desde los montaditos de la barra hasta los arroces de encargo y el
            final dulce.
          </p>
        </Reveal>

        {/* Pestañas de categoría */}
        <div
          role="tablist"
          aria-label="Categorías de la carta"
          className="mt-8 flex flex-wrap gap-2 rounded-2xl border border-anil/10 bg-cal-50 p-1.5 shadow-sm sm:inline-flex sm:rounded-full"
        >
          {CARTA.map((g) => {
            const isActive = g.id === activeId;
            return (
              <button
                key={g.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(g.id)}
                className={`relative overflow-hidden rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracota ${
                  isActive ? 'text-cal-50' : 'text-anil/70 hover:text-anil'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="carta-cat-pill"
                    className="absolute inset-0 z-0 rounded-full"
                    style={{ backgroundColor: g.tint }}
                    transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{g.categoria}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          {/* Foto real destacada */}
          <AnimatePresence mode="wait">
            <motion.figure
              key={activeId}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="group relative overflow-hidden rounded-3xl shadow-[0_30px_60px_-30px_rgba(30,58,76,0.55)]"
            >
              <Img
                foto={grupo.fotoDestacada}
                className="aspect-[4/5] w-full lg:aspect-auto lg:h-full"
                imgClassName="transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-anil-900/90 via-anil-900/30 to-transparent p-6 pt-20">
                <span className="font-mono text-[10px] uppercase tracking-widest text-terracota-400">
                  Lo más pedido
                </span>
                <p className="mt-1 font-display text-2xl font-medium text-cal-50">
                  {grupo.platoDestacado}
                </p>
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          {/* Tarjetas de plato */}
          <div>
            <AnimatePresence mode="wait">
              <motion.p
                key={activeId}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.3 }}
                className="mb-5 font-display text-lg italic text-anil-500"
              >
                {grupo.sumario}
              </motion.p>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <RevealGroup key={activeId} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {grupo.platos.map((plato) => (
                  <DishCard key={plato.nombre} plato={plato} tint={grupo.tint} />
                ))}
              </RevealGroup>
            </AnimatePresence>
          </div>
        </div>

        <p className="mt-10 max-w-2xl text-sm text-anil-500/80">
          <span className="font-mono text-terracota">·</span> De martes a viernes,
          <strong className="font-medium text-anil"> menú del día</strong>. Los
          precios son orientativos y varían con el mercado; arroces y paellas,
          siempre de encargo al reservar. Consúltanos alérgenos: adaptamos platos a
          intolerancias.
        </p>
      </div>

      {/* Transición suave hacia "Domingo en familia" */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-40 translate-y-1">
        <svg className="h-full w-full" viewBox="0 0 1440 160" preserveAspectRatio="none" aria-hidden>
          <path
            d="M0,64 C240,120 480,20 720,52 C960,84 1200,150 1440,96 L1440,160 L0,160 Z"
            fill="#F1E4CE"
          />
        </svg>
      </div>
    </section>
  );
}
