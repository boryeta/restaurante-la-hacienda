# La Hacienda del Sur — demo web

Demo de venta (SPA de una sola página) para **La Hacienda del Sur**, restaurante
de cocina mediterránea y española con toques andaluces en el barrio de Nuevo San
Blas, Alicante.

El eje de toda la web es el propio concepto del negocio — **«¿Barril, salón o
terraza?»** — convertido en la interacción principal: un selector 3D de los tres
ambientes en el hero, con transición de cámara animada entre cada espacio.

## Cómo arrancar

```bash
npm install
npm run dev      # http://localhost:5173
```

Otros scripts:

```bash
npm run build    # build de producción (tsc + vite)
npm run preview  # sirve el build
npm run lint     # typecheck (tsc --noEmit)
```

## Stack

- **React + Vite + TypeScript**
- **Tailwind CSS** con tokens de la paleta (cal `#F7F2E9`, añil `#1E3A4C`, terracota `#B5502E`)
- **react-three-fiber + drei** para el selector 3D de ambientes del hero
- **GSAP + ScrollTrigger** para la transición de cámara y el motivo de "luz de patio"
- **Framer Motion** para micro-interacciones (tarjetas de plato, pestañas, reveals)

## Decisiones de diseño

- **Sin cliché flamenco.** Nada de abanicos, lunares ni azulejos de flamenca. Lo
  "andaluz" vive en la paleta (cal, añil de sombra de patio, barro cocido) y en
  los platos.
- **Motivo de firma: luz y sombra de patio.** Franjas de sombra (tipo cañizo /
  toldo de rafia) que se desplazan con el scroll, como si el sol cruzara el
  patio. Implementado con una variable CSS `--patio-shift` animada por
  ScrollTrigger (con fallback CSS estático).
- **Escena 3D estilizada, no fotorrealista.** Barril, mesa de salón y terraza con
  parra, construidos sólo con primitivas para mantenerla ligera.

## Accesibilidad y rendimiento

- **`prefers-reduced-motion`:** si el usuario pide movimiento reducido, la maqueta
  3D se sustituye por la **foto real** del ambiente (sin perder la funcionalidad de
  elegir espacio). Los contadores muestran el valor final, las franjas de patio, el
  Ken Burns y el marquee quedan estáticos.
- **Sin WebGL:** mismo fallback a foto real.
- **Móvil:** el selector funciona por *tap* (no por hover). En dispositivos de
  gama baja se reduce el DPR y se desactivan sombras suaves.
- La escena 3D se carga con `import()` diferido: no se descarga si no se va a usar.

---

## ⚠️ Placeholders pendientes de confirmar con el propietario

Antes de publicar, hay que sustituir / verificar lo siguiente **con datos
confirmados directamente por el restaurante**. Todo lo marcado abajo es
provisional y está señalado como tal en el propio código.

### 1. Fotografía real — ✅ ya integrada (con matices)
Ya hay **fotos reales del local y de los platos** (en `public/media/`, optimizadas
a WebP + JPG; el catálogo está en `src/data/media.ts`). Se usan en el hero, la
galería, la carta, el domingo y el showcase de ambientes.

Lo que aún convendría mejorar:
- **Salón en alta resolución.** `salon` (400×300) sigue siendo pequeña; se trata
  con grano y gradiente, pero una versión en alta daría un salto de calidad.
  (La fachada del hero ya está en alta: `exterior-terraza`, 1920×1072.)
- **Foto real de paella / arroz.** El domingo usa ahora la foto del salón + un
  guiño al postre; falta una **foto de paella** de verdad para esa sección.
- **Más fotos por ambiente y por plato** enriquecerían la galería en marquee.
- **Cigalas y solomillo de atún** (platos estrella) aún no tienen foto propia;
  se muestran como tarjeta de texto.

### 1b. Vídeo del hero (opcional, ya preparado)
El hero está **listo para vídeo de fondo**: basta con dejar un clip en
`public/media/video/hero.mp4` y poner su ruta en la constante `HERO_VIDEO` de
`src/components/Hero.tsx`. Mientras tanto usa la foto de la fachada.

### 2. Precios de la carta
Los precios en `src/data/menu.ts` son **orientativos** (marcados con `≈` o
"según mercado"). Hay que confirmar los reales, incluido el **precio del menú del
día** (históricamente ~10 €, pero **no** lo he afirmado como vigente en ninguna
parte de la web hasta verificarlo).

### 3. Valoración actual
En `src/data/restaurante.ts`: `valoracion: 4.1` y `resenasAprox: 40`. Este dato
proviene mayoritariamente de reseñas de **2016–2017**. El negocio sigue abierto,
pero **la valoración y el nº de opiniones actuales están sin verificar**. Confirmar
el número real (o retirar el contador de la barra de confianza) antes de publicar.

### 4. Redes sociales
No se ha incluido ningún enlace a redes porque no tengo confirmado que las tengan.
Si existen (Instagram / Facebook / TikTok), añadirlas al footer
(`src/components/Footer.tsx`).

### 5. Reserva por WhatsApp
Todos los CTA de reserva usan **llamada directa** (`tel:965204335`). Si el
restaurante usa WhatsApp para reservas, se puede añadir ese canal junto al
teléfono.

### 6. Alérgenos / celiacos
La barra de confianza menciona "opciones para alergias e intolerancias" (aparece
en reseñas reales). Conviene confirmar el alcance exacto (¿carta sin gluten?,
¿aviso previo?) para afinar el texto.

### 7. Horario
El horario de `src/data/restaurante.ts` es el facilitado; conviene una última
confirmación de que sigue vigente (sobre todo festivos / temporada).

### 8. URL canónica / dominio
Las etiquetas SEO (`canonical`, OpenGraph, `sitemap.xml`) apuntan a
`https://restaurante-la-hacienda.boryeta.workers.dev/`. Si se contrata un
**dominio propio**, hay que actualizar esa URL en `index.html` y
`public/sitemap.xml`.

---

## SEO ya implementado
- **Datos estructurados JSON-LD `Restaurant`** en `index.html` (dirección, geo,
  teléfono, horario, cocina, rango de precio) → apto para resultados enriquecidos.
  *No* se incluye `aggregateRating` a propósito, porque la valoración está sin
  verificar (ver punto 3).
- **OpenGraph + Twitter Card** con la foto de la fachada.
- **`robots.txt` + `sitemap.xml`** en `public/`.
- **Imágenes** en WebP + JPG, `width/height` (buen CLS), `loading="lazy"` y `alt`
  descriptivos.

### Nota sobre las fuentes tipográficas
Las fuentes (Fraunces, Inter, IBM Plex Mono) se **auto-alojan** vía `@fontsource`
(se empaquetan en el build, sin llamadas a Google Fonts en runtime): más rápido y
sin depender de red externa.

### Optimización de imágenes
Las fotos se optimizan con `scripts/optimize-media.mjs` (usa `sharp`, se ejecuta a
mano una vez; no forma parte del build). Para procesar fotos nuevas: colócalas y
ajusta el mapa de `JOBS` en ese script, `npm i -D sharp` y `node
scripts/optimize-media.mjs`.

### Nota honesta sobre el contenido
No se han inventado testimonios con nombre, cifras de comensales ni menciones de
prensa. La prueba social se limita a la valoración agregada (pendiente de
verificar) y al "trato familiar" que sí destacan las reseñas. Tampoco se
prometen "raciones generosas" ni "esperas mínimas", para no contradecir las
reseñas reales.
