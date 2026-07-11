import { SmartImage } from '@/components/SmartImage';
import { CATEGORIES, type PortfolioItem } from '@/data/portfolio';

/**
 * One caption system for every tile.
 *
 * Brand/campaign context is surfaced VERBATIM from the portfolio.ts alt text
 * where it exists (e.g. "Houston Astros partnership activation with LoDo
 * branded ambassador and Sun Cruiser display"). Where the alt is a generic
 * "frame N" placeholder, only the category label is shown — brands are never
 * fabricated.
 */
export function captionFor(item: PortfolioItem): {
  brand: string | null;
  category: string;
} {
  const category =
    CATEGORIES.find((c) => c.id === item.category)?.label ?? item.category;
  const m = item.alt.match(/ — (.+)$/);
  const brand = m && !/^frame \d+$/i.test(m[1]) ? m[1] : null;
  return { brand, category };
}

interface TileProps {
  item: PortfolioItem;
  sizes: string;
  /** Tailwind aspect class for the fixed-ratio frame (zero CLS). */
  aspect?: string;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  /** Show the caption at rest (featured strip) instead of on hover. */
  captionAlways?: boolean;
}

/**
 * SPOTLIGHT gallery tile — fixed aspect, ink matting, shared grade,
 * gradient scrim, category + verbatim brand caption. The interactive
 * wrapper (button/link) is supplied by the parent with `.v2-spot-frame`.
 */
export function SpotlightTile({
  item,
  sizes,
  aspect = 'aspect-[4/5]',
  loading = 'lazy',
  fetchPriority = 'auto',
  captionAlways = false,
}: TileProps) {
  const { brand, category } = captionFor(item);
  return (
    <span className={`v2-mat relative block w-full ${aspect}`}>
      <span className="v2-grade absolute inset-0 block overflow-hidden">
        <span className="v2-spot absolute inset-0 block">
          <SmartImage
            src={item.src}
            alt={item.alt}
            fill
            sizes={sizes}
            className="object-cover"
            loading={loading}
            fetchPriority={fetchPriority}
          />
        </span>
        <span aria-hidden="true" className="v2-vignette absolute inset-0 block" />
        <span
          aria-hidden="true"
          className="v2-scrim absolute inset-x-0 bottom-0 block h-2/3"
        />
      </span>
      {/* Caption */}
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 bottom-0 block p-4 sm:p-5 text-left transition-all duration-500 ${
          captionAlways
            ? ''
            : 'translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100'
        }`}
      >
        <span className="v2-eyebrow block !text-[0.62rem]">{category}</span>
        {brand && (
          <span className="mt-1.5 block text-ivory-50 text-sm leading-snug line-clamp-2">
            {brand}
          </span>
        )}
      </span>
    </span>
  );
}
