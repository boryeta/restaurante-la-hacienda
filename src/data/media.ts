/**
 * Mapa central de las fotos reales del restaurante (optimizadas a WebP + JPG en
 * public/media). Todas provienen del propio local; los `alt` describen la imagen
 * para accesibilidad y SEO.
 */

export interface Foto {
  webp: string;
  jpg: string;
  alt: string;
  w: number;
  h: number;
  /** Color de respaldo mientras carga (tono coherente con la imagen) */
  bg: string;
}

const L = '/media/local';
const P = '/media/platos';

export const LOCAL = {
  exterior: {
    webp: `${L}/exterior-terraza.webp`,
    jpg: `${L}/exterior-terraza.jpg`,
    alt: 'Fachada de La Hacienda del Sur con sus toldos rojos y la terraza en la Calle Tarragona, Alicante, a la luz de la tarde',
    w: 1920,
    h: 1072,
    bg: '#7c341c',
  },
  barril: {
    webp: `${L}/barril-barra.webp`,
    jpg: `${L}/barril-barra.jpg`,
    alt: 'Barra rústica de piedra con barriles de vino, copas colgando y botellas de la bodega',
    w: 900,
    h: 500,
    bg: '#3a2c20',
  },
  salon: {
    webp: `${L}/salon.webp`,
    jpg: `${L}/salon.jpg`,
    alt: 'Salón interior con mesas de madera natural, lámparas de mimbre y plantas colgantes junto a los ventanales',
    w: 800,
    h: 600,
    bg: '#2e3a2a',
  },
} as const satisfies Record<string, Foto>;

export const PLATOS = {
  montaditos: {
    webp: `${P}/montaditos.webp`,
    jpg: `${P}/montaditos.jpg`,
    alt: 'Dos montaditos sobre servilleta de La Hacienda del Sur: uno de entraña con flor de sal y otro de secreto con pimiento verde y alioli',
    w: 1200,
    h: 747,
    bg: '#5e3a22',
  },
  carneSalsa: {
    webp: `${P}/carne-salsa.webp`,
    jpg: `${P}/carne-salsa.jpg`,
    alt: 'Carne guisada en salsa oscura reducida, acompañada de patatas fritas, en plato blanco',
    w: 512,
    h: 384,
    bg: '#4a2f1e',
  },
  ensalada: {
    webp: `${P}/ensalada-px.webp`,
    jpg: `${P}/ensalada-px.jpg`,
    alt: 'Ensalada de brotes con ventresca, pimientos asados, tomate y aceitunas, aliñada con reducción de Pedro Ximénez',
    w: 756,
    h: 800,
    bg: '#3f5e3a',
  },
  postre: {
    webp: `${P}/postre.webp`,
    jpg: `${P}/postre.jpg`,
    alt: 'Tabla de postres caseros: semifrío, coulant de chocolate con almendras y helado con fresas sobre pizarra',
    w: 446,
    h: 448,
    bg: '#2a1c16',
  },
} as const satisfies Record<string, Foto>;

/** Foto real que representa cada ambiente (la "terraza" es la fachada con el toldo). */
export const AMBIENTE_FOTO: Record<'barril' | 'salon' | 'terraza', Foto> = {
  barril: LOCAL.barril,
  salon: LOCAL.salon,
  terraza: LOCAL.exterior,
};
