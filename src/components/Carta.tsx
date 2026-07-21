import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CARTA } from '../data/menu';
import { getAmbiente, type AmbienteId } from '../data/ambientes';
import { AmbienteTabs } from './AmbienteTabs';
import { DishCard } from './DishCard';
import { Reveal, RevealGroup } from './Reveal';
import { PatioLight } from './PatioLight';
import { Img } from './Img';

/**
 * La carta organizada por ambiente, ahora con foto real destacada del plato
 * estrella de cada espacio junto a las tarjetas.
 */
export function Carta() {
  const [active, setActive] = useState<AmbienteId>('salon');
  const grupo = CARTA.find((g) => g.ambiente === active) ?? CARTA[1];
  const ambiente = getAmbiente(active);

  return (
    <section id="carta" className="relative overflow-hidden bg-cal py-20 md:py-28">
      <PatioLight intensity={0.8} />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">La carta, por ambiente</p>
          <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-anil sm:text-4xl md:text-5xl">
            Cada plato pide su sitio
          </h2>
          <p className="mt-4 text-base leading-relaxed text-anil-500 md:text-lg">
            Cocina de mercado, casera y bien elaborada. Elige un ambiente y te
            enseñamos lo que mejor cae en él — desde los montaditos de la barra
            hasta los arroces de encargo del salón.
          </p>
        </Reveal>

        <div className="mt-8 inline-flex rounded-full border border-anil/10 bg-cal-50 p-1.5 shadow-sm">
          <AmbienteTabs active={active} onChange={setActive} groupId="carta" />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          {/* Foto real destacada */}
          <AnimatePresence mode="wait">
            <motion.figure
              key={active}
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
                  Lo más pedido · {ambiente.nombre}
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
                key={active}
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
              <RevealGroup key={active} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {grupo.platos.map((plato) => (
                  <DishCard key={plato.nombre} plato={plato} tint={ambiente.tint} />
                ))}
              </RevealGroup>
            </AnimatePresence>
          </div>
        </div>

        <p className="mt-10 max-w-2xl text-sm text-anil-500/80">
          <span className="font-mono text-terracota">·</span> Los precios son
          orientativos y varían con el mercado. Arroces y paellas, siempre de
          encargo al reservar. Consúltanos alérgenos: adaptamos platos a
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
