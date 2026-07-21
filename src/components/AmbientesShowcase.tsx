import { Suspense, lazy, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { getAmbiente, type AmbienteId } from '../data/ambientes';
import { AMBIENTE_FOTO } from '../data/media';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { useDeviceProfile } from '../hooks/useDeviceProfile';
import { hasWebGL } from '../lib/webgl';
import { AmbienteTabs } from './AmbienteTabs';
import { PatioLight } from './PatioLight';
import { Reveal } from './Reveal';
import { Img } from './Img';

const AmbienteScene = lazy(() =>
  import('../three/AmbienteScene').then((m) => ({ default: m.AmbienteScene })),
);

/**
 * "Los tres ambientes" en profundidad: la pieza 3D interactiva (escena
 * estilizada con transición de cámara) emparejada con la FOTO REAL de cada
 * espacio. Stylized ⇄ real, controlado por el mismo selector.
 */
export function AmbientesShowcase() {
  const [active, setActive] = useState<AmbienteId>('salon');
  const reduced = usePrefersReducedMotion();
  const device = useDeviceProfile();
  const use3D = useMemo(() => !reduced && hasWebGL(), [reduced]);

  const ambiente = getAmbiente(active);
  const foto = AMBIENTE_FOTO[active];

  return (
    <section id="ambientes" className="relative overflow-hidden bg-anil-700 py-20 text-cal-50 md:py-28">
      <PatioLight variant="light" intensity={1} />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-terracota-400">Tres ambientes, una casa</p>
          <h2 className="mt-3 font-display text-3xl font-medium leading-tight sm:text-4xl md:text-5xl">
            Explóralo antes de venir
          </h2>
          <p className="mt-4 text-base leading-relaxed text-cal-50/80 md:text-lg">
            Gira la escena y cambia de ambiente: a la izquierda, una maqueta 3D de
            cada espacio; a la derecha, cómo es de verdad. Barril, salón o terraza
            — tú eliges dónde sentarte.
          </p>
        </Reveal>

        {/* Selector */}
        <div className="mt-8 inline-flex rounded-full border border-cal-50/15 bg-anil-800/60 p-1.5 backdrop-blur">
          <AmbienteTabs active={active} onChange={setActive} groupId="showcase" />
        </div>

        {/* Par: 3D estilizado | foto real */}
        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* 3D */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-cal-50/10 bg-anil-800">
            <span className="absolute left-4 top-4 z-10 rounded-full bg-anil-900/70 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-cal-50/70 backdrop-blur">
              Maqueta 3D
            </span>
            {use3D ? (
              <Suspense
                fallback={
                  <div className="flex h-full items-center justify-center font-mono text-xs uppercase tracking-widest text-cal-50/40">
                    Montando la mesa…
                  </div>
                }
              >
                <AmbienteScene active={active} device={device} />
              </Suspense>
            ) : (
              // Sin WebGL / movimiento reducido: mostramos la foto real también aquí
              <Img foto={foto} className="h-full w-full" />
            )}
          </div>

          {/* Foto real */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-cal-50/10">
            <span className="absolute left-4 top-4 z-10 rounded-full bg-anil-900/70 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-cal-50/70 backdrop-blur">
              El local de verdad
            </span>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="h-full w-full"
              >
                <Img foto={foto} className="h-full w-full" sizes="(max-width: 1024px) 100vw, 50vw" />
              </motion.div>
            </AnimatePresence>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-anil-900/85 to-transparent p-5 pt-16">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <h3 className="font-display text-2xl font-medium">{ambiente.nombre}</h3>
                  <p className="font-display text-base italic text-terracota-400">«{ambiente.claim}»</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Detalle del ambiente activo */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8 grid grid-cols-1 gap-6 rounded-3xl border border-cal-50/10 bg-anil-800/50 p-7 md:grid-cols-3 md:p-9"
          >
            <div className="md:col-span-2">
              <p className="text-xs uppercase tracking-wider text-cal-50/40">Sobre el ambiente</p>
              <p className="mt-2 text-base leading-relaxed text-cal-50/85">{ambiente.descripcion}</p>
            </div>
            <div className="border-t border-cal-50/10 pt-4 md:border-l md:border-t-0 md:pl-6 md:pt-0">
              <p className="text-xs uppercase tracking-wider text-cal-50/40">Para</p>
              <p className="mt-2 text-sm text-cal-50/85">{ambiente.paraQue}</p>
              <p className="mt-3 font-mono text-xs text-cal-50/55">{ambiente.capacidad}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
