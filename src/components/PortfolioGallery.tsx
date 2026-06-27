'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { CATEGORIES, PORTFOLIO, type PortfolioCategory } from '@/data/portfolio';

type Filter = PortfolioCategory | 'all';

export function PortfolioGallery() {
  const [filter, setFilter] = useState<Filter>('all');
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();

  const items = useMemo(
    () => (filter === 'all' ? PORTFOLIO : PORTFOLIO.filter((p) => p.category === filter)),
    [filter],
  );

  // Lightbox keyboard control
  const close = useCallback(() => setOpen(null), []);
  const next = useCallback(
    () => setOpen((v) => (v === null ? null : (v + 1) % items.length)),
    [items.length],
  );
  const prev = useCallback(
    () => setOpen((v) => (v === null ? null : (v - 1 + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, close, next, prev]);

  // Reset lightbox when filter changes
  useEffect(() => {
    setOpen(null);
  }, [filter]);

  const active = open !== null ? items[open] : null;

  return (
    <>
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-12 mb-10" role="tablist" aria-label="Portfolio filters">
        <FilterChip current={filter} value="all" label={`All · ${PORTFOLIO.length}`} setFilter={setFilter} />
        {CATEGORIES.map((c) => {
          const count = PORTFOLIO.filter((p) => p.category === c.id).length;
          return (
            <FilterChip
              key={c.id}
              current={filter}
              value={c.id}
              label={`${c.label} · ${count}`}
              setFilter={setFilter}
            />
          );
        })}
      </div>

      {/* Active filter description */}
      {filter !== 'all' && (
        <p className="display-serif italic text-xl text-onyx-900/70 mb-8">
          {CATEGORIES.find((c) => c.id === filter)?.description}
        </p>
      )}

      {/* Masonry-like CSS columns grid */}
      <ul className="columns-1 sm:columns-2 lg:columns-3 gap-3 sm:gap-4 [column-fill:_balance]">
        <AnimatePresence>
          {items.map((item, i) => {
            const ratio = item.h / item.w; // for aspect padding
            return (
              <motion.li
                key={`${filter}-${item.src}`}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.02, 0.4) }}
                className="mb-3 sm:mb-4 break-inside-avoid"
              >
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  className="group relative block w-full overflow-hidden bg-onyx-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory-50"
                  style={{ aspectRatio: `${item.w} / ${item.h}` }}
                  aria-label={`Open ${item.alt} in lightbox`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <span
                    className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-onyx-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    aria-hidden="true"
                  >
                    <span className="eyebrow text-ivory-50">
                      {CATEGORIES.find((c) => c.id === item.category)?.label}
                    </span>
                  </span>
                  {/* Aspect spacer to prevent CLS in column layout */}
                  <span aria-hidden="true" style={{ display: 'block', paddingBottom: `${ratio * 100}%` }} />
                </button>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>

      {/* Lightbox */}
      <AnimatePresence>
        {active && open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-onyx-900/95 backdrop-blur"
            role="dialog"
            aria-modal="true"
            aria-label="Portfolio image viewer"
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              className="absolute top-5 right-5 z-10 p-3 text-ivory-50 hover:text-champagne-500 transition-colors"
              aria-label="Close viewer"
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <path d="M6 6L22 22M22 6L6 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <div className="absolute top-5 left-5 z-10 text-ivory-50/70 text-xs uppercase tracking-widest">
              {open + 1} / {items.length}
            </div>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-10 p-3 text-ivory-50 hover:text-champagne-500 transition-colors"
              aria-label="Previous image"
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <path d="M20 6L10 16L20 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-10 p-3 text-ivory-50 hover:text-champagne-500 transition-colors"
              aria-label="Next image"
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <path d="M12 6L22 16L12 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div
              className="absolute inset-0 flex items-center justify-center p-12 sm:p-16"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                key={active.src}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                className="relative w-full h-full max-w-6xl"
              >
                <Image
                  src={active.src}
                  alt={active.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </motion.div>
            </div>
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-ivory-50/70 text-xs uppercase tracking-widest text-center px-6">
              {CATEGORIES.find((c) => c.id === active.category)?.label}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function FilterChip({
  current,
  value,
  label,
  setFilter,
}: {
  current: Filter;
  value: Filter;
  label: string;
  setFilter: (v: Filter) => void;
}) {
  const active = current === value;
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={() => setFilter(value)}
      className={`px-4 py-2 text-xs uppercase tracking-widest border transition-colors ${
        active
          ? 'bg-onyx-900 text-ivory-50 border-onyx-900'
          : 'bg-transparent text-onyx-900 border-onyx-900/30 hover:border-onyx-900'
      }`}
    >
      {label}
    </button>
  );
}
