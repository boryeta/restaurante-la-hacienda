/** Datos reales del negocio. No inventar otros. */

export const RESTAURANTE = {
  nombre: 'La Hacienda del Sur',
  cocina: 'Cocina mediterránea y española con toques andaluces',
  direccion: {
    calle: 'Calle Tarragona, 12',
    barrio: 'Nuevo San Blas',
    cp: '03005',
    ciudad: 'Alicante',
    parking:
      'Parking gratuito junto al puente rojo, cerca de la casa Honda de motos.',
  },
  telefono: '965 20 43 35',
  telefonoTel: '+34965204335',
  email: 'restaurantelahaciendadelsur@gmail.com',
  aforo: 100,
  // Valoración agregada histórica (mayoría de reseñas 2016–2017).
  // Pendiente de verificar la valoración ACTUAL con el propietario.
  valoracion: 4.1,
  resenasAprox: 40,
  horario: [
    { dia: 'Domingo', franjas: ['11:30 – 16:30'] },
    { dia: 'Lunes', franjas: ['Cerrado'], cerrado: true },
    { dia: 'Martes', franjas: ['10:30 – 16:00', '20:00 – 23:30'] },
    { dia: 'Miércoles', franjas: ['10:30 – 16:00', '20:00 – 23:30'] },
    { dia: 'Jueves', franjas: ['10:30 – 16:00', '20:00 – 23:30'] },
    { dia: 'Viernes', franjas: ['11:00 – 16:00', '20:00 – 00:00'] },
    { dia: 'Sábado', franjas: ['11:00 – 16:00', '20:00 – 00:00'] },
  ],
} as const;

export const DIRECCION_LINEA = `${RESTAURANTE.direccion.calle}, ${RESTAURANTE.direccion.barrio}, ${RESTAURANTE.direccion.cp} ${RESTAURANTE.direccion.ciudad}`;

export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `La Hacienda del Sur, ${DIRECCION_LINEA}`,
)}`;
