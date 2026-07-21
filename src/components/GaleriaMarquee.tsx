import { LOCAL, PLATOS, type Foto } from '../data/media';
import { Reveal } from './Reveal';
import { Img } from './Img';

/**
 * Galería en marquee horizontal infinito con las fotos reales del local y los
 * platos. Se pausa al pasar el ratón y se detiene con prefers-reduced-motion.
 * Es el "carrusel de fotos" en clave premium: cinta continua, no flechas.
 */
const FILA: Foto[] = [
  PLATOS.montaditos,
  LOCAL.barril,
  PLATOS.carneSalsa,
  LOCAL.salon,
  PLATOS.ensalada,
  LOCAL.exterior,
  PLATOS.postre,
];

export function GaleriaMarquee() {
  // Duplicamos la fila para que el bucle a -50% sea continuo
  const fotos = [...FILA, ...FILA];

  return (
    <section className="relative overflow-hidden bg-anil-900 py-16 md:py-20">
      <Reveal className="mx-auto mb-10 max-w-7xl px-6 md:px-10">
        <p className="eyebrow text-terracota-400">Del mercado a la mesa</p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-medium leading-tight text-cal-50 sm:text-4xl">
          Un vistazo a la casa
        </h2>
      </Reveal>

      <div
        className="group relative flex w-full overflow-hidden"
        role="group"
        aria-label="Galería de fotos del restaurante y sus platos"
      >
        {/* Difuminado en los bordes */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-anil-900 to-transparent md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-anil-900 to-transparent md:w-32" />

        <ul className="marquee-track flex shrink-0 items-stretch gap-4 pr-4">
          {fotos.map((foto, i) => (
            <li
              key={i}
              aria-hidden={i >= FILA.length}
              className="w-[70vw] shrink-0 sm:w-[46vw] md:w-[30vw] lg:w-[24vw]"
            >
              <Img
                foto={foto}
                className="aspect-[4/3] h-full w-full rounded-2xl border border-cal-50/10"
                imgClassName="transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 640px) 70vw, (max-width: 1024px) 46vw, 24vw"
              />
            </li>
          ))}
        </ul>
      </div>

      <p className="mx-auto mt-8 max-w-7xl px-6 text-center font-mono text-[11px] uppercase tracking-widest text-cal-50/40 md:px-10">
        Pasa el ratón para pausar
      </p>
    </section>
  );
}
