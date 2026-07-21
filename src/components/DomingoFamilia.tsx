import { motion } from 'framer-motion';
import { Reveal } from './Reveal';
import { RESTAURANTE } from '../data/restaurante';
import { LOCAL, PLATOS } from '../data/media';
import { Img } from './Img';
import { AnimatedHeading } from './AnimatedHeading';

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
          <AnimatedHeading
            text="El día de juntar las mesas"
            className="mt-3 font-display text-3xl font-medium leading-tight text-anil sm:text-4xl md:text-5xl"
          />
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

        {/* Bloque visual: foto real del salón + guiño al postre */}
        <Reveal className="order-1 md:order-2" delay={0.1}>
          <motion.div
            whileHover={{ rotate: -0.6, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="relative aspect-[4/5] w-full"
          >
            <Img
              foto={LOCAL.salon}
              className="grain h-full w-full rounded-[2rem] shadow-[0_40px_80px_-40px_rgba(30,58,76,0.55)]"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
            {/* Sombra de parra sobre la foto */}
            <div className="patio-shadows patio-shadows--light pointer-events-none rounded-[2rem]" aria-hidden />

            {/* Inset con el postre, como remate dulce del domingo */}
            <motion.figure
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute -bottom-6 -left-4 w-40 overflow-hidden rounded-2xl border-4 border-[#F1E4CE] shadow-xl sm:w-48"
            >
              <Img foto={PLATOS.postre} className="aspect-square w-full" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-anil-900/70 px-3 py-1.5 font-mono text-[9px] uppercase tracking-widest text-cal-50/80">
                …y de postre
              </figcaption>
            </motion.figure>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
