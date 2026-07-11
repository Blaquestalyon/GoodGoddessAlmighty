'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { PORTFOLIO } from '@/data/portfolio';
import { SpotlightTile } from './SpotlightTile';

/**
 * The homepage featured cut — the one scroll-driven moment.
 *
 * The section pins while the visitor scrolls, and the strip rides
 * horizontally through ALL of its frames — first tile to last — before
 * the page releases and continues. GPU transform only. With
 * prefers-reduced-motion the pin is dropped entirely and the strip
 * renders as a native horizontally-scrollable row.
 *
 * Every frame carries verbatim brand context from portfolio.ts — this is
 * the proof engine, surfaced high on the page. Each tile routes into the
 * full gallery.
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

function Tiles() {
  return (
    <>
      {FEATURED.map((item, i) => (
        <li key={item.src} className="w-[68vw] sm:w-[42vw] lg:w-[24rem] shrink-0">
          <Link
            href="/work"
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
    </>
  );
}

export function FeaturedStrip() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [shift, setShift] = useState(0);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  // Ride the full track: first tile flush left at 0 → last tile flush right at 1.
  const x = useTransform(scrollYProgress, [0, 1], [0, -shift]);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const vp = viewportRef.current;
      if (!track || !vp) return;
      setShift(Math.max(0, track.scrollWidth - vp.clientWidth));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [reduce]);

  // Reduced motion: no pinning, no scroll-linked transform — a plain
  // horizontally-scrollable row the visitor swipes through natively.
  if (reduce) {
    return (
      <div className="overflow-x-auto">
        <ul className="flex gap-4 sm:gap-5 w-max px-5 sm:px-8 pb-4">
          <Tiles />
        </ul>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="relative h-[300vh]">
      <div
        ref={viewportRef}
        className="sticky top-0 flex h-screen items-center overflow-hidden"
      >
        <motion.ul
          ref={trackRef}
          style={{ x }}
          className="flex gap-4 sm:gap-5 w-max px-5 sm:px-8 will-change-transform"
        >
          <Tiles />
        </motion.ul>
      </div>
    </div>
  );
}
