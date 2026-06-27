/**
 * SmartImage — emits a <picture> element with AVIF + WebP + JPEG sources.
 *
 * Use this anywhere you'd otherwise reach for next/image. It works
 * identically in SSR and static-export builds, takes advantage of the
 * pre-generated .avif / .webp companions in /public/images, and degrades
 * gracefully to the original JPEG on browsers without modern format support.
 *
 * The component assumes that for every `.jpg` in /public/images there is
 * a matching `.webp` and `.avif` next to it. Run scripts/optimize-images-v2.py
 * to (re)generate companions.
 */
import type { CSSProperties } from 'react';

interface SmartImageProps {
  src: string; // e.g. "/images/events/events-01.jpg"
  alt: string;
  width?: number;
  height?: number;
  /** Fill the parent — parent must have position:relative and a fixed aspect. */
  fill?: boolean;
  /** Browser hint: "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" */
  sizes?: string;
  className?: string;
  style?: CSSProperties;
  /** "lazy" (default) | "eager" — set "eager" for above-the-fold hero images. */
  loading?: 'lazy' | 'eager';
  /** "high" | "low" | "auto" — pair with loading="eager" for the LCP image. */
  fetchPriority?: 'high' | 'low' | 'auto';
  decoding?: 'async' | 'sync' | 'auto';
}

function swapExt(src: string, ext: 'avif' | 'webp'): string {
  return src.replace(/\.(jpe?g|png)$/i, `.${ext}`);
}

export function SmartImage({
  src,
  alt,
  width,
  height,
  fill = false,
  sizes,
  className,
  style,
  loading = 'lazy',
  fetchPriority = 'auto',
  decoding = 'async',
}: SmartImageProps) {
  const fillStyle: CSSProperties = fill
    ? {
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }
    : {};

  return (
    <picture>
      <source srcSet={swapExt(src, 'avif')} type="image/avif" sizes={sizes} />
      <source srcSet={swapExt(src, 'webp')} type="image/webp" sizes={sizes} />
      <img
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        className={className}
        style={{ ...fillStyle, ...style }}
        loading={loading}
        decoding={decoding}
        // React 19+ uses fetchPriority (camelCase); older React uses fetchpriority.
        // Both forms render the same attribute, so this is safe.
        {...({ fetchpriority: fetchPriority } as Record<string, string>)}
        sizes={sizes}
      />
    </picture>
  );
}
