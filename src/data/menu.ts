import type { AmbienteId } from './ambientes';
import { PLATOS, type Foto } from './media';

/**
 * La carta se organiza según en qué ambiente tiene más sentido pedir cada plato.
 * Todos los platos citados provienen de la propia guía del restaurante y de
 * comentarios de clientes; los precios son ORIENTATIVOS / placeholder y deben
 * confirmarse con el propietario antes de publicar (ver README).
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
  ambiente: AmbienteId;
  titulo: string;
  /** Qué se pide aquí, en una frase */
  sumario: string;
  /** Foto real destacada del ambiente (plato estrella) */
  fotoDestacada: Foto;
  /** Nombre del plato de la foto destacada */
  platoDestacado: string;
  platos: Plato[];
}

export const CARTA: CartaGrupo[] = [
  {
    ambiente: 'barril',
    titulo: 'Para el barril',
    sumario: 'Tapas, montaditos y tostas de diseño para picar de pie.',
    fotoDestacada: PLATOS.montaditos,
    platoDestacado: 'Montaditos de entraña y de secreto',
    platos: [
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
      {
        nombre: 'Montaditos y tostas de diseño',
        descripcion: 'Selección que cambia según el mercado. Pregunta por la del día.',
        precio: 'desde 4,50 €',
        etiqueta: 'del día',
      },
    ],
  },
  {
    ambiente: 'salon',
    titulo: 'Para el salón',
    sumario: 'Arroces de encargo, carnes a la brasa y platos de cuchara.',
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
    ambiente: 'terraza',
    titulo: 'Para la terraza',
    sumario: 'Raciones para ir compartiendo a la sombra de la parra.',
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
      {
        nombre: 'Menú del día',
        descripcion:
          'Cocina de mercado, casera y bien elaborada. Uno de los favoritos por su relación calidad-precio.',
        precio: 'consultar',
        etiqueta: 'Mar–Vie',
      },
    ],
  },
];
