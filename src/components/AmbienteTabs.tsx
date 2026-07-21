import { motion } from 'framer-motion';
import { AMBIENTES, type AmbienteId } from '../data/ambientes';

interface Props {
  active: AmbienteId;
  onChange: (id: AmbienteId) => void;
  /** En móvil sólo tap; en escritorio también hover para previsualizar */
  hoverToPreview?: boolean;
  className?: string;
  /** Aísla el layoutId de la pastilla entre instancias distintas del selector */
  groupId?: string;
}

/**
 * El selector de los tres ambientes. Es la decisión central de la web:
 * "¿Barril, salón o terraza?". Funciona por tap (móvil) y por hover
 * (escritorio) sin perder accesibilidad de teclado.
 */
export function AmbienteTabs({
  active,
  onChange,
  hoverToPreview = false,
  className = '',
  groupId = 'default',
}: Props) {
  return (
    <div
      role="tablist"
      aria-label="Elige tu ambiente"
      className={`flex flex-wrap items-center gap-2 sm:gap-3 ${className}`}
    >
      {AMBIENTES.map((a) => {
        const isActive = a.id === active;
        return (
          <button
            key={a.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(a.id)}
            onMouseEnter={hoverToPreview ? () => onChange(a.id) : undefined}
            onFocus={hoverToPreview ? () => onChange(a.id) : undefined}
            className={`relative overflow-hidden rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracota
              ${isActive ? 'text-cal-50' : 'text-anil/70 hover:text-anil'}`}
          >
            {isActive && (
              <motion.span
                layoutId={`ambiente-pill-${groupId}`}
                className="absolute inset-0 z-0 rounded-full"
                style={{ backgroundColor: a.tint }}
                transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              />
            )}
            <span className="relative z-10">{a.nombre}</span>
          </button>
        );
      })}
    </div>
  );
}
