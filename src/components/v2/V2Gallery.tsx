'use client';

import { SmartImage } from '@/components/SmartImage';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CATEGORIES, PORTFOLIO, type PortfolioCategory } from '@/data/portfolio';
import { SpotlightTile, captionFor } from './SpotlightTile';

type Filter = PortfolioCategory | 'all';

/**
 * SPOTLIGHT gallery — the proof engine.
 * Fixed-aspect tiles (zero CLS), ink matting + shared grade, one caption
 * system (verbatim brand context where portfolio.ts has it), and a fully
 * accessible lightbox: arrows/ESC, focus trap, visible focus, counter,
 * focus returned to the opening tile on close.
 */
export function V2Gallery() {
  const [filter, setFilter] = useState<Filter>('all');
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLUListElement>(null);
  const prevFilter = useRef<Filter>('all');

  const items = useMemo(
    () => (filter === 'all' ? PORTFOLIO : PORTFOLIO.filter((p) => p.category === filter)),
    [filter],
  );

  const close = useCallback(() => {
    setOpen(null);
    // Return focus to the tile that opened the lightbox.
    openerRef.current?.focus();
    openerRef.current = null;
  }, []);
  const next = useCallback(
    () => setOpen((v) => (v === null ? null : (v + 1) % items.length)),
    [items.length],
  );
  const prev = useCallback(
    () => setOpen((v) => (v === null ? null : (v - 1 + items.length) % items.length)),
    [items.length],
  );

  // Keyboard control + focus trap
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      } else if (e.key === 'ArrowRight') {
        next();
      } else if (e.key === 'ArrowLeft') {
        prev();
      } else if (e.key === 'Tab') {
        // Trap focus inside the dialog.
        const dialog = dialogRef.current;
        if (!dialog) return;
        const focusables = dialog.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    // Move focus into the dialog.
    closeBtnRef.current?.focus();
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, close, next, prev]);

  // Reset lightbox when the filter changes; if the visitor filtered from
  // deep in the page (sticky bar), bring them back to the top of the grid
  // so the freshly filtered set starts in view.
  useEffect(() => {
    setOpen(null);
    if (prevFilter.current === filter) return;
    prevFilter.current = filter;
    const grid = gridRef.current;
    if (!grid) return;
    const top = grid.getBoundingClientRect().top + window.scrollY - 240;
    if (window.scrollY > top) {
      window.scrollTo({ top: Math.max(0, top), behavior: reduce ? 'auto' : 'smooth' });
    }
  }, [filter, reduce]);

  const active = open !== null ? items[open] : null;
  const activeCaption = active ? captionFor(active) : null;

  return (
    <>
      {/* Filter chips — pill radius is reserved for chips/tags.
          Sticky below the fixed header so filtering is one tap away at any
          scroll depth in the 123-tile grid. */}
      <div
        className="sticky top-[72px] z-30 flex flex-wrap items-center gap-2 sm:gap-3 mt-12 mb-10 py-4 -mx-5 px-5 sm:-mx-8 sm:px-8 bg-ink/95 backdrop-blur border-b border-champagne-500/15"
        role="tablist"
        aria-label="Portfolio filters"
      >
        <FilterChip
          current={filter}
          value="all"
          label={`All · ${PORTFOLIO.length}`}
          setFilter={setFilter}
        />
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
        <p className="v2-display v2-italic text-xl text-muted mb-8">
          {CATEGORIES.find((c) => c.id === filter)?.description}
        </p>
      )}

      {/* Fixed-aspect grid — zero CLS, ink matting coheres the mixed set */}
      <ul ref={gridRef} className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <AnimatePresence>
          {items.map((item, i) => (
            <motion.li
              key={`${filter}-${item.src}`}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.02, 0.4) }}
            >
              <button
                type="button"
                onClick={(e) => {
                  openerRef.current = e.currentTarget;
                  setOpen(i);
                }}
                className="group v2-spot-frame relative block w-full text-left"
                aria-label={`Open ${item.alt} in lightbox`}
                aria-haspopup="dialog"
              >
                <SpotlightTile
                  item={item}
                  sizes="(min-width: 1024px) 400px, 48vw"
                  aspect="aspect-[4/5]"
                />
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {/* Lightbox */}
      <AnimatePresence>
        {active && open !== null && (
          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-obsidian/95 backdrop-blur"
            role="dialog"
            aria-modal="true"
            aria-label={`Portfolio image viewer — ${active.alt}`}
            onClick={close}
          >
            <button
              ref={closeBtnRef}
              type="button"
              onClick={close}
              className="absolute top-4 right-4 z-10 p-3 min-h-[44px] min-w-[44px] text-ivory-50 hover:text-champagne-500 transition-colors"
              aria-label="Close viewer"
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <path
                  d="M6 6L22 22M22 6L6 22"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <div
              className="absolute top-6 left-5 z-10 text-muted text-xs uppercase tracking-widest"
              aria-live="polite"
            >
              {open + 1} / {items.length}
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 z-10 p-3 min-h-[44px] min-w-[44px] text-ivory-50 hover:text-champagne-500 transition-colors"
              aria-label="Previous image"
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <path
                  d="M20 6L10 16L20 26"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 z-10 p-3 min-h-[44px] min-w-[44px] text-ivory-50 hover:text-champagne-500 transition-colors"
              aria-label="Next image"
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <path
                  d="M12 6L22 16L12 26"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div
              className="absolute inset-0 flex items-center justify-center px-12 pt-16 pb-24 sm:px-16"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                key={active.src}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                className="relative w-full h-full max-w-6xl"
              >
                <SmartImage
                  src={active.src}
                  alt={active.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  loading="eager"
                  fetchPriority="high"
                />
              </motion.div>
            </div>

            <div className="absolute bottom-5 inset-x-0 px-6 text-center pointer-events-none">
              <p className="v2-eyebrow !text-[0.62rem]">{activeCaption?.category}</p>
              {activeCaption?.brand && (
                <p className="mt-1.5 text-ivory-50 text-sm leading-snug max-w-2xl mx-auto">
                  {activeCaption.brand}
                </p>
              )}
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
      className={`min-h-[44px] px-5 py-2.5 text-xs uppercase tracking-widest border rounded-full transition-colors ${
        active
          ? 'bg-fuchsia text-ink border-fuchsia font-semibold'
          : 'bg-transparent text-ivory-50 border-champagne-500/40 hover:border-champagne-500'
      }`}
    >
      {label}
    </button>
  );
}
