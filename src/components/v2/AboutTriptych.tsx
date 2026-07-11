'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  PORTFOLIO,
  type PortfolioCategory,
  type PortfolioItem,
} from '@/data/portfolio';
import { SpotlightTile } from './SpotlightTile';

/**
 * About-page triptych — three LARGE frames that reshuffle on every load.
 *
 * The pool is drawn straight from PORTFOLIO, limited to the three
 * activation-proof categories below and to portrait/square frames (so the
 * 4:5 crops always read as intentional, never a chopped landscape). Because
 * it filters PORTFOLIO directly, any future events / influencer / on-site
 * image dropped in via the ingest workflow joins the rotation automatically,
 * and a renamed or missing file can never surface as a broken image.
 *
 * Selection happens on the client after mount, which keeps the page
 * statically cached (fast) while still giving a fresh trio on each visit.
 * Only the three chosen images are ever requested, so nothing extra loads.
 */
const INCLUDED_CATEGORIES: PortfolioCategory[] = ['events', 'influencer', 'onsite'];

const POOL: PortfolioItem[] = PORTFOLIO.filter(
  (p) => INCLUDED_CATEGORIES.includes(p.category) && p.h >= p.w,
);

function pickThree(): PortfolioItem[] {
  const pool = [...POOL];
  // Fisher–Yates shuffle, then take the first three (distinct).
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, 3);
}

export function AboutTriptych() {
  const reduce = useReducedMotion();
  // Null until mount → the frames render as empty ink mats (space reserved,
  // zero layout shift), then the chosen images fade in.
  const [items, setItems] = useState<PortfolioItem[] | null>(null);

  useEffect(() => {
    setItems(pickThree());
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
      {[0, 1, 2].map((i) => {
        const item = items?.[i];
        return (
          <motion.div
            key={i}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group v2-spot-frame"
          >
            {item ? (
              <SpotlightTile
                item={item}
                sizes="(min-width: 1024px) 400px, (min-width: 640px) 32vw, 92vw"
                aspect="aspect-[4/5]"
                loading="lazy"
              />
            ) : (
              <span className="v2-mat block w-full aspect-[4/5]" aria-hidden="true" />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
