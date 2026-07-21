import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AMBIENTES, getAmbiente, type AmbienteId } from '../data/ambientes';
import { RESTAURANTE } from '../data/restaurante';
import { AMBIENTE_FOTO } from '../data/media';
import { AmbienteTabs } from './AmbienteTabs';
import { PatioLight } from './PatioLight';
import { Img } from './Img';
import { MagneticButton } from './MagneticButton';
import { Parallax } from './Parallax';

/**
 * Hero cinematográfico con foto REAL del local. El selector de ambiente
 * (Barril / Salón / Terraza) funde la foto de fondo entre los tres espacios —
 * la decisión central del negocio, ahora con imagen de verdad.
 *
 * Preparado para vídeo: si algún día hay un clip, basta con poner su ruta en
 * HERO_VIDEO y se reproduce de fondo en bucle mudo (con la foto como respaldo).
 */
const HERO_VIDEO: string | null = null; // p.ej. '/media/video/hero.mp4'

export function Hero() {
  const [active, setActive] = useState<AmbienteId>('terraza');
  const ambiente = getAmbiente(active);
  const foto = AMBIENTE_FOTO[active];

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-anil-800 text-cal-50"
    >
      {/* Fondo: vídeo (si existe) o foto real que se funde entre ambientes */}
      <div className="absolute inset-0 z-0">
        {HERO_VIDEO ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={AMBIENTE_FOTO.terraza.jpg}
          >
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
        ) : (
          <AnimatePresence mode="sync">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: 'easeInOut' }}
              className="absolute inset-0 overflow-hidden"
            >
              <Parallax amount={30} className="absolute inset-0">
                <Img
                  foto={foto}
                  priority
                  sizes="100vw"
                  className="h-[118%] w-full"
                  imgClassName="ken-burns"
                />
              </Parallax>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Tratamiento: sólo lo justo para leer el texto, dejando ver más la foto */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-anil-900/85 via-anil-900/30 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-anil-900/75 to-transparent" />
        <div className="grain pointer-events-none absolute inset-0 opacity-60" />
        <PatioLight variant="light" intensity={0.85} />
      </div>

      {/* Barra superior */}
      <header className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 md:px-10">
        <span className="font-display text-lg font-medium tracking-tight">La Hacienda del Sur</span>
        <a
          href={`tel:${RESTAURANTE.telefonoTel}`}
          className="hidden items-center gap-2 text-sm text-cal-50/80 transition-colors hover:text-cal-50 sm:flex"
        >
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-terracota" />
          {RESTAURANTE.telefono}
        </a>
      </header>

      {/* Contenido */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-6 pb-12 md:pb-20 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="eyebrow text-terracota-400"
        >
          Restaurante &amp; tapería · Nuevo San Blas, Alicante
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mt-4 max-w-2xl font-display text-5xl font-medium leading-[1.02] [text-shadow:_0_2px_28px_rgba(12,23,31,0.55)] sm:text-6xl md:text-7xl"
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

        {/* Selector de ambiente: funde la foto real de fondo */}
        <div className="mt-8">
          <div className="inline-flex rounded-full bg-cal-50/95 p-1.5 shadow-xl backdrop-blur">
            <AmbienteTabs active={active} onChange={setActive} groupId="hero" />
          </div>

          <div className="mt-4 min-h-[3.25rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                <p className="font-display text-xl italic text-cal-50">«{ambiente.claim}»</p>
                <p className="mt-1 text-sm text-cal-50/70">{ambiente.capacidad}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <MagneticButton href={`tel:${RESTAURANTE.telefonoTel}`} className="btn-cta">
            Reservar · {RESTAURANTE.telefono}
          </MagneticButton>
          <a href="#carta" className="btn-ghost border-cal-50/30 text-cal-50 hover:bg-cal-50/10">
            Ver la carta
          </a>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className="relative z-10 flex justify-center pb-6">
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="font-mono text-[10px] uppercase tracking-widest2 text-cal-50/50"
        >
          Desliza
        </motion.span>
      </div>

      <span className="sr-only">
        {AMBIENTES.length} ambientes disponibles: {AMBIENTES.map((a) => a.nombre).join(', ')}.
      </span>
    </section>
  );
}
