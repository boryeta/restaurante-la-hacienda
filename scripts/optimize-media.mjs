/**
 * Optimiza las fotos reales del restaurante: genera WebP (ligero) + JPG de
 * respaldo en public/media, con nombres semánticos. Se ejecuta a mano una vez
 * (`node scripts/optimize-media.mjs`); las salidas se commitean. No forma parte
 * del build de producción.
 */
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const SRC = 'HACIENDA SUR RESTARUAMTE';
const OUT = 'public/media';

const JOBS = [
  // Ambientes
  { in: `${SRC}/puerta.jpg`, out: 'local/exterior-terraza', maxW: 1024 },
  { in: `${SRC}/dentro 2.jpg`, out: 'local/barril-barra', maxW: 1400 },
  { in: `${SRC}/restaurante-dentro.jpg`, out: 'local/salon', maxW: 1024 },
  // Platos
  { in: `${SRC}/plato 2.jpg`, out: 'platos/montaditos', maxW: 1400 },
  { in: `${SRC}/plato.jpg`, out: 'platos/carne-salsa', maxW: 1024 },
  { in: `${SRC}/plato 3.jpg`, out: 'platos/ensalada-px', maxW: 1024 },
  { in: `${SRC}/postre.jpg`, out: 'platos/postre', maxW: 1024 },
];

for (const job of JOBS) {
  const base = resolve(OUT, job.out);
  mkdirSync(dirname(base), { recursive: true });

  const img = sharp(job.in).rotate(); // respeta EXIF orientation
  const meta = await img.metadata();
  const width = Math.min(job.maxW, meta.width ?? job.maxW);

  await img
    .clone()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(`${base}.webp`);

  await img
    .clone()
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(`${base}.jpg`);

  // Placeholder diminuto (blur-up) en base64, se imprime para incrustar en el código
  const tiny = await img
    .clone()
    .resize({ width: 24 })
    .webp({ quality: 40 })
    .toBuffer();
  console.log(
    `${job.out}: ${width}px  ·  blur=data:image/webp;base64,${tiny.toString('base64').slice(0, 24)}…`,
  );
}

console.log('\n✓ Media optimizada en public/media');
