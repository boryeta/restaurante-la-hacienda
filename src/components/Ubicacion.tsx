import { RESTAURANTE, DIRECCION_LINEA, MAPS_URL } from '../data/restaurante';
import { Reveal } from './Reveal';

/** Ubicación, horario completo, parking y CTA de reserva. */
export function Ubicacion() {
  const hoy = new Date().getDay(); // 0 = domingo
  // Mapear getDay() (0=Dom..6=Sáb) al orden de RESTAURANTE.horario
  const ordenDias = [0, 1, 2, 3, 4, 5, 6];
  const idxHoy = ordenDias.indexOf(hoy);

  return (
    <section id="ubicacion" className="relative bg-cal py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-[1.1fr_0.9fr] md:px-10">
        {/* Datos */}
        <Reveal>
          <p className="eyebrow">Dónde y cuándo</p>
          <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-anil sm:text-4xl md:text-5xl">
            Nuevo San Blas, Alicante
          </h2>

          <div className="mt-8 space-y-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-terracota">Dirección</p>
              <p className="mt-1 text-lg text-anil">{DIRECCION_LINEA}</p>
              <p className="mt-1 text-sm text-anil-500">
                {RESTAURANTE.direccion.parking}
              </p>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm font-medium text-terracota underline-offset-4 hover:underline"
              >
                Cómo llegar →
              </a>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-terracota">Teléfono</p>
                <a href={`tel:${RESTAURANTE.telefonoTel}`} className="mt-1 block text-lg text-anil hover:text-terracota">
                  {RESTAURANTE.telefono}
                </a>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-terracota">Email</p>
                <a
                  href={`mailto:${RESTAURANTE.email}`}
                  className="mt-1 block break-all text-lg text-anil hover:text-terracota"
                >
                  {RESTAURANTE.email}
                </a>
              </div>
            </div>
          </div>

          <a href={`tel:${RESTAURANTE.telefonoTel}`} className="btn-cta mt-8">
            Reservar mesa
          </a>
        </Reveal>

        {/* Horario */}
        <Reveal delay={0.1}>
          <div className="rounded-3xl border border-anil/10 bg-cal-50 p-7 shadow-sm">
            <p className="font-mono text-xs uppercase tracking-wider text-terracota">Horario</p>
            <ul className="mt-4 divide-y divide-anil/10">
              {RESTAURANTE.horario.map((h, i) => {
                const esHoy = i === idxHoy;
                return (
                  <li
                    key={h.dia}
                    className={`flex items-baseline justify-between gap-4 py-3 ${
                      esHoy ? 'rounded-lg bg-terracota/5 px-3' : ''
                    }`}
                  >
                    <span
                      className={`text-sm ${
                        esHoy ? 'font-semibold text-terracota' : 'text-anil'
                      }`}
                    >
                      {h.dia}
                      {esHoy && <span className="ml-2 font-mono text-[10px] uppercase">hoy</span>}
                    </span>
                    <span
                      className={`text-right font-mono text-sm tabular-nums ${
                        'cerrado' in h && h.cerrado ? 'text-anil-500/50' : 'text-anil-500'
                      }`}
                    >
                      {h.franjas.join(' · ')}
                    </span>
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 text-xs text-anil-500/70">
              Cocina de mercado: la disponibilidad de algunos platos depende del
              día. Para grupos y arroces, mejor reservar.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
