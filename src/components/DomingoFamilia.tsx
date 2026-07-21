import { motion } from 'framer-motion';
import { Reveal } from './Reveal';
import { RESTAURANTE } from '../data/restaurante';

/**
 * Domingo en familia: el menú especial de domingo, las paellas de encargo y
 * las celebraciones (bautizos, comuniones, comidas de empresa). Tono cálido.
 * Entra desde la onda de color de la sección anterior — sin corte brusco.
 */
export function DomingoFamilia() {
  return (
    <section
      id="domingo"
      className="relative overflow-hidden bg-[#F1E4CE] py-20 md:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-2 md:px-10">
        {/* Texto */}
        <Reveal className="order-2 md:order-1">
          <p className="eyebrow">Domingo en familia</p>
          <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-anil sm:text-4xl md:text-5xl">
            El día de juntar las mesas
          </h2>
          <p className="mt-4 text-base leading-relaxed text-anil-500 md:text-lg">
            El domingo es de las familias. Menú especial pensado para venir con
            niños —los tratamos con mimo— y paellas de encargo que salen a la
            mesa recién hechas. También montamos aquí las celebraciones:
            bautizos, comuniones y comidas de empresa.
          </p>

          <ul className="mt-8 space-y-4">
            {[
              {
                t: 'Menú especial de domingo',
                d: 'Pensado para familias, con opciones para los más pequeños.',
              },
              {
                t: 'Paellas y arroces de encargo',
                d: 'Encárgalos al reservar y los tenemos listos a tu hora.',
              },
              {
                t: 'Celebraciones',
                d: 'Bautizos, comuniones y comidas de empresa en el salón.',
              },
            ].map((item) => (
              <li key={item.t} className="flex gap-4">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-terracota" aria-hidden />
                <div>
                  <p className="font-display text-lg text-anil">{item.t}</p>
                  <p className="text-sm text-anil-500">{item.d}</p>
                </div>
              </li>
            ))}
          </ul>

          <a href={`tel:${RESTAURANTE.telefonoTel}`} className="btn-cta mt-8">
            Encargar paella · {RESTAURANTE.telefono}
          </a>
        </Reveal>

        {/* Bloque visual: "mantel" de domingo con placeholder */}
        <Reveal className="order-1 md:order-2" delay={0.1}>
          <motion.div
            whileHover={{ rotate: -0.6, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-40px_rgba(30,58,76,0.5)]"
            style={{
              background:
                'radial-gradient(120% 120% at 30% 20%, #C96A48 0%, #B5502E 40%, #7C341C 100%)',
            }}
          >
            {/* Sombra de parra sobre el "mantel" */}
            <div className="patio-shadows patio-shadows--light" aria-hidden />
            {/* Paella estilizada como placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <PaellaMotif />
            </div>
            <span className="absolute bottom-4 left-5 font-mono text-[10px] uppercase tracking-widest text-cal-50/60">
              placeholder · foto de paella real pendiente
            </span>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

function PaellaMotif() {
  return (
    <svg viewBox="0 0 240 240" className="h-64 w-64" aria-hidden>
      <circle cx="120" cy="120" r="96" fill="#5E3A22" />
      <circle cx="120" cy="120" r="86" fill="#C98A2E" />
      <circle cx="120" cy="120" r="86" fill="url(#rice)" opacity="0.5" />
      {/* Asas */}
      <circle cx="20" cy="120" r="10" fill="#5E3A22" />
      <circle cx="220" cy="120" r="10" fill="#5E3A22" />
      {/* Ingredientes */}
      {[
        [90, 90],
        [150, 100],
        [120, 150],
        [80, 140],
        [160, 150],
        [110, 90],
      ].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="10" ry="6" fill={i % 2 ? '#B5502E' : '#7C1E2B'} />
      ))}
      {[100, 140, 120].map((x, i) => (
        <rect key={`p${i}`} x={x} y={70 + i * 30} width="26" height="6" rx="3" fill="#3F5E3A" />
      ))}
      <defs>
        <pattern id="rice" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.1" fill="#E3D6BE" />
        </pattern>
      </defs>
    </svg>
  );
}
