import { PLATOS, type Foto } from './media';

/**
 * La carta, organizada por CATEGORÍAS de comida (tapas, arroces y carnes,
 * ensaladas, postres). Todos los platos provienen de la propia guía del
 * restaurante y de comentarios de clientes; los precios son ORIENTATIVOS /
 * placeholder y deben confirmarse con el propietario antes de publicar (README).
 */

export interface Plato {
  nombre: string;
  descripcion: string;
  /** Precio orientativo — placeholder, pendiente de confirmar */
  precio: string;
  /** Marca los platos de referencia que van como protagonistas */
  estrella?: boolean;
  /** Etiqueta opcional (p.ej. "de encargo") */
  etiqueta?: string;
}

export interface CartaGrupo {
  id: string;
  /** Etiqueta corta de la pestaña */
  categoria: string;
  titulo: string;
  /** Qué es esta categoría, en una frase */
  sumario: string;
  /** Color de acento de la categoría */
  tint: string;
  /** Foto real destacada (plato estrella de la categoría) */
  fotoDestacada: Foto;
  /** Nombre del plato de la foto destacada */
  platoDestacado: string;
  platos: Plato[];
}

export const CARTA: CartaGrupo[] = [
  {
    id: 'picar',
    categoria: 'Tapas y montaditos',
    titulo: 'Tapas y montaditos',
    sumario: 'Para picar de pie o compartir: montaditos, tostas de diseño y clásicos de tapeo.',
    tint: '#B5502E',
    fotoDestacada: PLATOS.montaditos,
    platoDestacado: 'Montaditos de entraña y de secreto',
    platos: [
      {
        nombre: 'Montaditos y tostas de diseño',
        descripcion: 'Selección que cambia según el mercado. Pregunta por la del día.',
        precio: 'desde 4,50 €',
        etiqueta: 'del día',
      },
      {
        nombre: 'Croquetas de bacalao',
        descripcion: 'Cremosas por dentro, crujientes por fuera. Receta de la casa.',
        precio: '≈ 9,50 €',
      },
      {
        nombre: 'Queso de cabra dulce',
        descripcion: 'Rulo de cabra templado con un contrapunto dulce, sobre tosta.',
        precio: '≈ 8,00 €',
      },
      {
        nombre: 'Berenjenas con jamón y PX',
        descripcion: 'Bastones de berenjena fritos con jamón y reducción de Pedro Ximénez.',
        precio: '≈ 8,50 €',
      },
    ],
  },
  {
    id: 'arroces',
    categoria: 'Arroces y carnes',
    titulo: 'Arroces y carnes',
    sumario: 'Arroces de encargo, carnes a la brasa y platos de cuchara.',
    tint: '#1E3A4C',
    fotoDestacada: PLATOS.carneSalsa,
    platoDestacado: 'Rabo de toro en salsa',
    platos: [
      {
        nombre: 'Cigalas fritas con ajetes y jamón ibérico',
        descripcion:
          'Cigalas fritas con ajetes tiernos y dados de jamón ibérico. Uno de los grandes de la casa.',
        precio: 'según mercado',
        estrella: true,
      },
      {
        nombre: 'Rabo de toro en salsa',
        descripcion: 'Guisado lento hasta que se deshace, con su salsa reducida. Clásico andaluz.',
        precio: '≈ 16,50 €',
        estrella: true,
      },
      {
        nombre: 'Solomillo de atún',
        descripcion: 'Solomillo de atún marcado, en su punto. Producto por encima de todo.',
        precio: 'según mercado',
        estrella: true,
      },
      {
        nombre: 'Arroces y paellas de encargo',
        descripcion: 'Arroces melosos y paellas elaboradas al momento. Encárgalas al reservar.',
        precio: 'según nº de personas',
        etiqueta: 'de encargo',
      },
    ],
  },
  {
    id: 'frescos',
    categoria: 'Ensaladas y frescos',
    titulo: 'Ensaladas y frescos',
    sumario: 'Ensaladas de mercado y raciones frescas para ir compartiendo.',
    tint: '#3C6178',
    fotoDestacada: PLATOS.ensalada,
    platoDestacado: 'Ensalada con ventresca y PX',
    platos: [
      {
        nombre: 'Ensalada con ventresca y PX',
        descripcion:
          'Brotes con ventresca, pimientos asados, tomate y aceitunas, con reducción de Pedro Ximénez.',
        precio: '≈ 9,50 €',
      },
      {
        nombre: 'Ensaladilla rusa casera',
        descripcion: 'Hecha en casa, sin atajos. La de toda la vida, bien de punto.',
        precio: '≈ 7,00 €',
      },
      {
        nombre: 'Tabla para compartir',
        descripcion: 'Selección de ibéricos y quesos con pan de cristal. Para ir picando.',
        precio: 'desde 12,00 €',
      },
      {
        nombre: 'Fritura del día',
        descripcion: 'Pescaíto según lo que entre en el mercado esa mañana.',
        precio: 'según mercado',
        etiqueta: 'del día',
      },
    ],
  },
  {
    id: 'postres',
    categoria: 'Postres',
    titulo: 'Postres',
    sumario: 'El final dulce, todo casero.',
    tint: '#7C341C',
    fotoDestacada: PLATOS.postre,
    platoDestacado: 'Coulant de chocolate con almendras',
    platos: [
      {
        nombre: 'Coulant de chocolate',
        descripcion: 'Bizcocho templado con corazón de chocolate fundido y almendra laminada.',
        precio: '≈ 6,00 €',
        estrella: true,
      },
      {
        nombre: 'Semifrío de la casa',
        descripcion: 'Postre helado casero, suave y poco dulce. Cambia según la temporada.',
        precio: '≈ 5,50 €',
      },
      {
        nombre: 'Tarta del día',
        descripcion: 'La que salga esa mañana. Pregunta por la de hoy.',
        precio: 'consultar',
        etiqueta: 'casera',
      },
    ],
  },
];
