'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { PORTFOLIO } from '@/data/portfolio';
import { SpotlightTile } from './SpotlightTile';

/**
 * The homepage featured cut — the one scroll-driven moment.
 *
 * A wall of real activation photography that drifts horizontally as the
 * visitor scrolls through the section (GPU transform only, honors
 * prefers-reduced-motion). Every frame here carries verbatim brand context
 * from portfolio.ts — this is the proof engine, surfaced high on the page.
 * Each tile routes into the full gallery.
 */
const FEATURED_SRCS = [
  'onsite-18.jpg', // Houston Astros × LoDo × Sun Cruiser
  'onsite-22.jpg', // Jameson Triple Triple
  'events-29.jpg', // Jameson "Matchday is Bigger in Texas"
  'onsite-19.jpg', // Total Wine × LoDo × Rambler
  'onsite-24.jpg', // Tequila Rose
  'onsite-23.jpg', // LoDo at Whole Foods Market
  'influencer-10.jpg', // creator lifestyle activation
  'onsite-20.jpg', // Cutwater × LoDo
];

const FEATURED = FEATURED_SRCS.map(
  (s) => PORTFOLIO.find((p) => p.src.endsWith(s))!,
).filter(Boolean);

export function FeaturedStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.ul
        style={reduce ? undefined : { x }}
        className="flex gap-4 sm:gap-5 w-max pl-5 sm:pl-8 pr-5 will-change-transform"
      >
        {FEATURED.map((item, i) => (
          <li key={item.src} className="w-[68vw] sm:w-[42vw] lg:w-[24rem] shrink-0">
            <Link
              href="/v2/work"
              className="group v2-spot-frame block"
              aria-label={`${item.alt} — see the full portfolio`}
            >
              <SpotlightTile
                item={item}
                sizes="(min-width: 1024px) 384px, (min-width: 640px) 42vw, 68vw"
                aspect="aspect-[4/5]"
                loading={i < 3 ? 'eager' : 'lazy'}
                captionAlways
              />
            </Link>
          </li>
        ))}
      </motion.ul>
    </div>
  );
}
