import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CARTA } from '../data/menu';
import { AMBIENTES, getAmbiente, type AmbienteId } from '../data/ambientes';
import { AmbienteTabs } from './AmbienteTabs';
import { DishCard } from './DishCard';
import { Reveal, RevealGroup } from './Reveal';
import { PatioLight } from './PatioLight';

/**
 * La carta no es una lista plana: se organiza según en qué ambiente tiene
 * más sentido pedir cada plato. Tapas para el barril, arroces y carnes para
 * el salón, raciones para compartir en la terraza.
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

        {/* Selector de ambiente de la carta */}
        <div className="mt-8 inline-flex rounded-full border border-anil/10 bg-cal-50 p-1.5 shadow-sm">
          <AmbienteTabs active={active} onChange={setActive} groupId="carta" />
        </div>

        {/* Sumario del grupo activo */}
        <div className="mt-6 min-h-[2rem]">
          <AnimatePresence mode="wait">
            <motion.p
              key={active}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.3 }}
              className="font-display text-lg italic text-anil-500"
            >
              {grupo.sumario}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Rejilla de platos — se re-anima al cambiar de ambiente */}
        <AnimatePresence mode="wait">
          <RevealGroup
            key={active}
            className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {grupo.platos.map((plato) => (
              <DishCard key={plato.nombre} plato={plato} tint={ambiente.tint} />
            ))}
          </RevealGroup>
        </AnimatePresence>

        <p className="mt-10 max-w-2xl text-sm text-anil-500/80">
          <span className="font-mono text-terracota">·</span> Los precios son
          orientativos y varían con el mercado. Arroces y paellas, siempre de
          encargo al reservar. Consúltanos alérgenos: adaptamos platos a
          intolerancias.
        </p>
      </div>

      {/* Transición suave hacia "Domingo en familia": onda de color que funde
          esta sección con la siguiente en lugar de un corte recto. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-40 translate-y-1">
        <svg
          className="h-full w-full"
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M0,64 C240,120 480,20 720,52 C960,84 1200,150 1440,96 L1440,160 L0,160 Z"
            fill="#F1E4CE"
          />
        </svg>
      </div>

      <span className="sr-only">
        Carta organizada por los {AMBIENTES.length} ambientes del restaurante.
      </span>
    </section>
  );
}
