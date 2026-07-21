/**
 * Los tres ambientes son el eje narrativo de toda la web.
 * Concepto literal del propio restaurante:
 *   "¿Barril, salón o terraza? Elige tu momento y lugar ideal."
 */

export type AmbienteId = 'barril' | 'salon' | 'terraza';

export interface Ambiente {
  id: AmbienteId;
  nombre: string;
  /** Tagline corto que aparece en la pestaña / hero */
  claim: string;
  /** Para qué momento sirve — usado en la sección de detalle */
  paraQue: string;
  descripcion: string;
  capacidad: string;
  /** Color de acento que "colorea" la UI cuando el ambiente está activo */
  tint: string;
  /** Posición focal de la cámara 3D para este ambiente [x, y, z] */
  cameraPos: [number, number, number];
  /** Punto al que mira la cámara [x, y, z] */
  lookAt: [number, number, number];
}

export const AMBIENTES: Ambiente[] = [
  {
    id: 'barril',
    nombre: 'Barril',
    claim: 'Tapear de pie, sin prisa',
    paraQue: 'El primer vino de la tarde, el after work, el tapeo rápido.',
    descripcion:
      'La zona más informal de la casa: barra y barriles altos para picar algo de pie, con montaditos, tostas de diseño y una copa de la bodega. El sitio para dejarse caer sin reserva y sin protocolo.',
    capacidad: 'Barra y barriles altos · sin reserva',
    tint: '#B5502E',
    cameraPos: [-5.4, 1.7, 5.4],
    lookAt: [-6, 0.75, 0],
  },
  {
    id: 'salon',
    nombre: 'Salón',
    claim: 'La mesa larga de los nuestros',
    paraQue: 'La comida de grupo, la celebración, la sobremesa que no acaba.',
    descripcion:
      'El salón interior para sentarse a comer de verdad: arroces y paellas de encargo, carnes a la brasa y la mesa larga de las celebraciones. Aquí caben las comidas de empresa, las comuniones y los bautizos.',
    capacidad: 'Hasta ~100 personas · ideal para grupos y eventos',
    tint: '#1E3A4C',
    cameraPos: [0.6, 1.9, 5.6],
    lookAt: [0, 0.7, 0],
  },
  {
    id: 'terraza',
    nombre: 'Terraza',
    claim: 'A la sombra de la parra',
    paraQue: 'El tapeo largo al aire libre, cuando aprieta el sol de Alicante.',
    descripcion:
      'La terraza para el tapeo tranquilo bajo la parra: raciones para ir compartiendo, cervezas frías y esa luz de tarde que se filtra entre las hojas. El ambiente para alargar la mesa sin mirar el reloj.',
    capacidad: 'Terraza exterior · tapeo y raciones',
    tint: '#3C6178',
    cameraPos: [6.6, 1.8, 5.4],
    lookAt: [6, 0.7, 0],
  },
];

export const getAmbiente = (id: AmbienteId): Ambiente =>
  AMBIENTES.find((a) => a.id === id) as Ambiente;
