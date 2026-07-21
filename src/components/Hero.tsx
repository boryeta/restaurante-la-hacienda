import { Suspense, lazy, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AMBIENTES, getAmbiente, type AmbienteId } from '../data/ambientes';
import { RESTAURANTE } from '../data/restaurante';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { useDeviceProfile } from '../hooks/useDeviceProfile';
import { hasWebGL } from '../lib/webgl';
import { AmbienteTabs } from './AmbienteTabs';
import { AmbienteFallback } from './AmbienteFallback';
import { PatioLight } from './PatioLight';

// La escena 3D se carga de forma diferida: no se descarga si no se va a usar.
const AmbienteScene = lazy(() =>
  import('../three/AmbienteScene').then((m) => ({ default: m.AmbienteScene })),
);

export function Hero() {
  const [active, setActive] = useState<AmbienteId>('salon');
  const reduced = usePrefersReducedMotion();
  const device = useDeviceProfile();

  // Sólo 3D si hay WebGL y el usuario no pidió movimiento reducido.
  const use3D = useMemo(() => !reduced && hasWebGL(), [reduced]);
  const ambiente = getAmbiente(active);

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-anil-700 text-cal-50"
    >
      {/* Luz de patio en tono claro sobre el fondo añil */}
      <PatioLight variant="light" intensity={1.1} />

      {/* Escena 3D / fallback como telón de fondo */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 transition-colors duration-1000"
          style={{
            background: `radial-gradient(120% 90% at 70% 30%, ${ambiente.tint}22, transparent 60%)`,
          }}
        />
        <div className="absolute inset-x-0 bottom-0 top-[18%] md:left-[38%] md:top-0">
          {use3D ? (
            <Suspense fallback={<SceneSkeleton />}>
              <AmbienteScene active={active} device={device} />
            </Suspense>
          ) : (
            <div className="h-full w-full p-6 md:p-10">
              <AmbienteFallback active={active} />
            </div>
          )}
        </div>
        {/* Degradado para legibilidad del texto sobre la escena */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-anil-800/80 via-anil-800/30 to-anil-800/80 md:bg-gradient-to-r md:from-anil-800/95 md:via-anil-800/50 md:to-transparent" />
      </div>

      {/* Barra superior mínima */}
      <header className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 md:px-10">
        <span className="font-display text-lg font-medium tracking-tight">
          La Hacienda del Sur
        </span>
        <a href={`tel:${RESTAURANTE.telefonoTel}`} className="hidden text-sm text-cal-50/80 hover:text-cal-50 sm:block">
          {RESTAURANTE.telefono}
        </a>
      </header>

      {/* Contenido del hero */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-6 pb-10 md:justify-center md:px-10 md:pb-24">
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow text-terracota-400"
          >
            Alicante · Nuevo San Blas
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-4 font-display text-4xl font-medium leading-[1.05] sm:text-5xl md:text-6xl"
          >
            ¿Barril, salón
            <br />o terraza?
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="mt-5 max-w-md text-base leading-relaxed text-cal-50/85 sm:text-lg"
          >
            Cocina andaluza de mercado en tres ambientes. Elige tu momento —
            nosotros ponemos el arroz, la brasa y la sombra de la parra.
          </motion.p>

          {/* Selector de ambiente: la decisión principal */}
          <div className="mt-8">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-cal-50/50">
              Elige tu ambiente
            </p>
            <div className="rounded-full bg-cal-50/95 p-1.5 shadow-lg backdrop-blur">
              <AmbienteTabs
                active={active}
                onChange={setActive}
                hoverToPreview={!device.isMobile}
                groupId="hero"
              />
            </div>

            {/* Claim del ambiente activo */}
            <div className="mt-4 min-h-[3.5rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                >
                  <p className="font-display text-xl italic text-cal-50">
                    «{ambiente.claim}»
                  </p>
                  <p className="mt-1 text-sm text-cal-50/70">{ambiente.capacidad}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href={`tel:${RESTAURANTE.telefonoTel}`} className="btn-cta">
              Reservar · {RESTAURANTE.telefono}
            </a>
            <a href="#carta" className="btn-ghost border-cal-50/30 text-cal-50 hover:bg-cal-50/10">
              Ver la carta
            </a>
          </div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className="relative z-10 hidden justify-center pb-6 md:flex">
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="font-mono text-[10px] uppercase tracking-widest2 text-cal-50/50"
        >
          Desliza
        </motion.span>
      </div>

      {/* Ayuda visual: cuántos ambientes hay (accesible) */}
      <span className="sr-only">
        {AMBIENTES.length} ambientes disponibles: {AMBIENTES.map((a) => a.nombre).join(', ')}.
      </span>
    </section>
  );
}

function SceneSkeleton() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <motion.div
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 1.4, repeat: Infinity }}
        className="font-mono text-xs uppercase tracking-widest text-cal-50/40"
      >
        Montando la mesa…
      </motion.div>
    </div>
  );
}
