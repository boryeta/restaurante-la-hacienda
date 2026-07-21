import { useCountUp } from '../hooks/useCountUp';
import { RESTAURANTE } from '../data/restaurante';
import { Reveal } from './Reveal';

/** Barra de confianza con contadores animados al entrar en viewport. */
export function TrustBar() {
  const [aforo, aforoRef] = useCountUp<HTMLSpanElement>({ to: RESTAURANTE.aforo });
  const [rating, ratingRef] = useCountUp<HTMLSpanElement>({
    to: RESTAURANTE.valoracion,
    decimals: 1,
  });

  return (
    <section className="relative border-y border-anil/10 bg-cal-100 py-10">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-8 px-6 md:grid-cols-4 md:px-10">
        {/* Aforo */}
        <Reveal className="flex flex-col">
          <span ref={aforoRef} className="font-display text-3xl font-medium text-anil md:text-4xl">
            ~{aforo}
          </span>
          <span className="mt-1 text-sm text-anil-500">personas de aforo</span>
          <span className="text-xs text-anil-500/70">bodega con selección de D.O.</span>
        </Reveal>

        {/* Valoración */}
        <Reveal className="flex flex-col" delay={0.05}>
          <span className="font-display text-3xl font-medium text-anil md:text-4xl">
            <span ref={ratingRef}>{rating}</span>
            <span className="text-terracota"> ★</span>
          </span>
          <span className="mt-1 text-sm text-anil-500">valoración media</span>
          <span className="text-xs text-anil-500/70">
            +{RESTAURANTE.resenasAprox} opiniones · trato familiar
          </span>
        </Reveal>

        {/* Parking */}
        <Reveal className="flex flex-col" delay={0.1}>
          <span className="font-display text-3xl font-medium text-anil md:text-4xl">Gratis</span>
          <span className="mt-1 text-sm text-anil-500">parking cercano</span>
          <span className="text-xs text-anil-500/70">junto al puente rojo</span>
        </Reveal>

        {/* Alergias / grupos */}
        <Reveal className="flex flex-col" delay={0.15}>
          <span className="font-display text-3xl font-medium text-anil md:text-4xl">Grupos</span>
          <span className="mt-1 text-sm text-anil-500">y celebraciones</span>
          <span className="text-xs text-anil-500/70">opciones para alergias e intolerancias</span>
        </Reveal>
      </div>
    </section>
  );
}
