'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { PORTFOLIO, type PortfolioItem } from '@/data/portfolio';
import { SpotlightTile } from './SpotlightTile';

/**
 * About-page triptych — three LARGE frames that reshuffle on every load.
 *
 * The pool is a curated set of portrait-oriented frames, each resolved
 * against PORTFOLIO and filtered — so a renamed or missing file simply
 * drops out of the pool and a broken image can never render. Selection
 * happens on the client after mount, which keeps the page statically
 * cached (fast) while still giving a fresh trio on each visit. Only the
 * three chosen images are ever requested, so nothing extra is downloaded.
 */
const POOL: PortfolioItem[] = [
  'onsite-17.jpg', 'onsite-19.jpg', 'onsite-20.jpg', 'onsite-21.jpg',
  'onsite-22.jpg', 'onsite-24.jpg', 'onsite-25.jpg', 'onsite-26.jpg',
  'events-27.jpg', 'events-28.jpg', 'events-29.jpg',
  'fashion-03.jpg', 'fashion-04.jpg', 'fashion-08.jpg', 'fashion-09.jpg', 'fashion-12.jpg',
  'influencer-08.jpg', 'influencer-09.jpg', 'influencer-10.jpg', 'influencer-11.jpg',
  'photo-04.jpg', 'photo-09.jpg', 'photo-16.jpg', 'photo-24.jpg', 'photo-34.jpg', 'photo-35.jpg',
]
  .map((s) => PORTFOLIO.find((p) => p.src.endsWith(s)))
  .filter((p): p is PortfolioItem => Boolean(p));

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
