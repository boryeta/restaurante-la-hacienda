import { RESTAURANTE, DIRECCION_LINEA } from '../data/restaurante';
import { MagneticButton } from './MagneticButton';

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-anil-800 text-cal-50">
      {/* CTA final */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 text-center md:px-10 md:py-28">
        <p className="eyebrow text-terracota-400">Te guardamos sitio</p>
        <h2 className="mx-auto mt-4 max-w-3xl font-display text-3xl font-medium leading-tight sm:text-4xl md:text-5xl">
          Barril, salón o terraza.
          <br />
          Tú eliges el momento.
        </h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <MagneticButton href={`tel:${RESTAURANTE.telefonoTel}`} className="btn-cta">
            Reservar · {RESTAURANTE.telefono}
          </MagneticButton>
          <a
            href={`mailto:${RESTAURANTE.email}`}
            className="btn-ghost border-cal-50/30 text-cal-50 hover:bg-cal-50/10"
          >
            Escribir un email
          </a>
        </div>
      </div>

      {/* Pie */}
      <div className="relative z-10 border-t border-cal-50/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 md:flex-row md:items-start md:justify-between md:px-10">
          <div>
            <p className="font-display text-lg">{RESTAURANTE.nombre}</p>
            <p className="mt-1 max-w-xs text-sm text-cal-50/60">{RESTAURANTE.cocina}.</p>
          </div>
          <div className="text-sm text-cal-50/70">
            <p>{DIRECCION_LINEA}</p>
            <p className="mt-1">{RESTAURANTE.direccion.parking}</p>
          </div>
          <div className="text-sm text-cal-50/70">
            <a href={`tel:${RESTAURANTE.telefonoTel}`} className="block hover:text-cal-50">
              {RESTAURANTE.telefono}
            </a>
            <a href={`mailto:${RESTAURANTE.email}`} className="block break-all hover:text-cal-50">
              {RESTAURANTE.email}
            </a>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-6 pb-8 md:px-10">
          <p className="text-xs text-cal-50/40">
            © {new Date().getFullYear()} {RESTAURANTE.nombre}. Demo de diseño web —
            contenido y fotografías pendientes de confirmar con el
            establecimiento.
          </p>
        </div>
      </div>
    </footer>
  );
}
