import { AnimatePresence, motion } from 'framer-motion';
import type { AmbienteId } from '../data/ambientes';

/**
 * Alternativa a la escena 3D cuando el usuario pide movimiento reducido
 * (o si WebGL no está disponible): una selección de pestañas con crossfade
 * de "imagen". No se pierde funcionalidad — el ambiente sigue siendo elegible.
 *
 * Las ilustraciones son placeholders CSS marcados; se sustituirán por fotos
 * reales de cada ambiente (ver README).
 */

const PANELS: Record<
  AmbienteId,
  { gradient: string; motif: React.ReactNode; alt: string }
> = {
  barril: {
    gradient: 'linear-gradient(135deg, #7C341C 0%, #B5502E 55%, #C96A48 100%)',
    alt: 'Zona de barril y barra',
    motif: (
      <svg viewBox="0 0 200 200" className="h-40 w-40 opacity-90" aria-hidden>
        <ellipse cx="100" cy="150" rx="46" ry="14" fill="#F7F2E9" opacity="0.15" />
        <rect x="70" y="70" width="60" height="80" rx="10" fill="#5E3A22" />
        <rect x="70" y="86" width="60" height="6" fill="#2b2018" />
        <rect x="70" y="128" width="60" height="6" fill="#2b2018" />
        <ellipse cx="100" cy="70" rx="30" ry="9" fill="#8A5A3B" />
      </svg>
    ),
  },
  salon: {
    gradient: 'linear-gradient(135deg, #1E3A4C 0%, #3C6178 55%, #6E93A6 100%)',
    alt: 'Salón interior para grupos',
    motif: (
      <svg viewBox="0 0 200 200" className="h-40 w-40 opacity-90" aria-hidden>
        <rect x="46" y="120" width="108" height="10" rx="3" fill="#F7F2E9" />
        <rect x="52" y="130" width="96" height="26" fill="#E3D6BE" opacity="0.5" />
        <circle cx="100" cy="60" r="10" fill="#ffd9a8" />
        <line x1="100" y1="20" x2="100" y2="50" stroke="#F7F2E9" strokeWidth="2" />
        <path d="M84 62 Q100 46 116 62 Z" fill="#B5502E" />
      </svg>
    ),
  },
  terraza: {
    gradient: 'linear-gradient(135deg, #2A4B5E 0%, #3C6178 55%, #5C7E4E 100%)',
    alt: 'Terraza bajo la parra',
    motif: (
      <svg viewBox="0 0 200 200" className="h-40 w-40 opacity-90" aria-hidden>
        <circle cx="100" cy="130" r="30" fill="#E3D6BE" opacity="0.6" />
        {[50, 80, 110, 150].map((x, i) => (
          <circle key={i} cx={x} cy={50 + (i % 2) * 12} r="16" fill="#5C7E4E" />
        ))}
        {[65, 95, 130].map((x, i) => (
          <circle key={`b${i}`} cx={x} cy={62 - (i % 2) * 10} r="13" fill="#3F5E3A" />
        ))}
        <rect x="40" y="46" width="120" height="6" rx="3" fill="#5E3A22" />
      </svg>
    ),
  },
};

export function AmbienteFallback({ active }: { active: AmbienteId }) {
  const panel = PANELS[active];
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] ring-1 ring-cal-50/15 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.7)]">
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ background: panel.gradient }}
          role="img"
          aria-label={panel.alt}
        >
          {/* Sombra de parra sobre el panel, para que no sea un plano liso */}
          <div className="patio-shadows patio-shadows--light" aria-hidden />
          <div className="scale-125">{panel.motif}</div>
        </motion.div>
      </AnimatePresence>
      {/* Viñeta para separar el panel del fondo añil del hero */}
      <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] shadow-[inset_0_0_120px_rgba(0,0,0,0.35)]" />
      <span className="pointer-events-none absolute bottom-3 right-4 font-mono text-[10px] uppercase tracking-widest text-cal-50/50">
        placeholder · foto real pendiente
      </span>
    </div>
  );
}
