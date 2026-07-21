import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RESTAURANTE } from '../data/restaurante';

const NAV = [
  { href: '#carta', label: 'Carta' },
  { href: '#domingo', label: 'Domingo' },
  { href: '#ambientes', label: 'Ambientes' },
  { href: '#ubicacion', label: 'Encontrarnos' },
];

/**
 * Cabecera fija que aparece al pasar el hero (barra de cristal translúcida con
 * navegación y CTA de reserva) + barra flotante de reserva en móvil. Mejora la
 * conversión: el "Reservar" siempre a mano sin robar protagonismo al hero.
 */
export function SiteHeader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.header
            initial={{ y: -70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -70, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-0 z-50 border-b border-anil/10 bg-cal/85 backdrop-blur-md"
          >
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3 md:px-10">
              <a href="#hero" className="font-display text-base font-medium text-anil">
                La Hacienda del Sur
              </a>

              <nav className="hidden items-center gap-7 md:flex">
                {NAV.map((n) => (
                  <a
                    key={n.href}
                    href={n.href}
                    className="text-sm text-anil-500 transition-colors hover:text-terracota"
                  >
                    {n.label}
                  </a>
                ))}
              </nav>

              <a
                href={`tel:${RESTAURANTE.telefonoTel}`}
                className="rounded-full bg-terracota px-5 py-2 text-sm font-medium text-cal-50 transition-colors hover:bg-terracota-600"
              >
                Reservar
              </a>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Barra flotante de reserva en móvil */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ y: 90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 90, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 z-50 border-t border-anil/10 bg-cal/90 p-3 backdrop-blur-md md:hidden"
            style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
          >
            <a
              href={`tel:${RESTAURANTE.telefonoTel}`}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-terracota px-6 py-3 font-medium text-cal-50"
            >
              Reservar · {RESTAURANTE.telefono}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
