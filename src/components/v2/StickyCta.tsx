'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

/**
 * Sticky mobile CTA bar — appears after the visitor scrolls past the hero,
 * hidden on ≥lg screens (the header CTA covers desktop). Hidden on the
 * contact page itself, where the form is the CTA.
 */
export function StickyCta() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    // If the page has an in-content CTA (the home hero), only reveal the
    // floating bar once that CTA has scrolled up out of view, so the two
    // "Book..." actions are never on screen together and never read as a
    // duplicate. Pages without a hero CTA fall back to a scroll-distance
    // trigger. This component is lg:hidden, so all of this is mobile-only.
    const anchor = document.getElementById('hero-cta');
    if (anchor && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        ([entry]) =>
          setShow(!entry.isIntersecting && entry.boundingClientRect.top < 0),
        { threshold: 0 },
      );
      io.observe(anchor);
      return () => io.disconnect();
    }
    const onScroll = () => setShow(window.scrollY > 520);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  if (pathname.startsWith('/contact')) return null;

  return (
    <div
      className={`lg:hidden fixed inset-x-0 bottom-0 z-40 transition-transform duration-500 ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="bg-obsidian/95 backdrop-blur border-t border-champagne-500/25 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <Link href="/contact" className="btn-cta w-full">
          Book ambassadors
        </Link>
      </div>
    </div>
  );
}
