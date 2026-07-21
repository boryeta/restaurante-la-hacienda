import { useState } from 'react';
import type { Foto } from '../data/media';

interface Props {
  foto: Foto;
  className?: string;
  imgClassName?: string;
  /** true = carga inmediata (hero); por defecto lazy */
  priority?: boolean;
  sizes?: string;
}

/**
 * Imagen responsive con WebP + respaldo JPG, carga diferida y fundido de entrada
 * sobre un color de respaldo (evita el "flash" en blanco). Mantiene el ratio con
 * width/height para no provocar saltos de layout (mejor CLS / SEO).
 */
export function Img({ foto, className = '', imgClassName = '', priority = false, sizes }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor: foto.bg }}
    >
      <picture>
        <source srcSet={foto.webp} type="image/webp" />
        <img
          src={foto.jpg}
          alt={foto.alt}
          width={foto.w}
          height={foto.h}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          sizes={sizes}
          onLoad={() => setLoaded(true)}
          className={`h-full w-full object-cover transition-[opacity,transform] duration-700 ease-out ${
            loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          } ${imgClassName}`}
        />
      </picture>
    </div>
  );
}
