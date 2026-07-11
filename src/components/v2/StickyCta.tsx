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
    const onScroll = () => setShow(window.scrollY > 480);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
