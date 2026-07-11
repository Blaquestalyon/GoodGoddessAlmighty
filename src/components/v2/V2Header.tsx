'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NAV } from '@/data/site';

/**
 * SPOTLIGHT site header — solid ink with gold hairline, fuchsia
 * "Book ambassadors" CTA visible at every breakpoint (mobile included).
 */
export function V2Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-ink/90 backdrop-blur transition-all duration-500 border-b ${
        scrolled || open ? 'border-champagne-500/25' : 'border-champagne-500/10'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-4 sm:px-8">
        <Link
          href="/"
          aria-label="Good Goddess Almighty — home"
          className="flex items-center gap-3 text-ivory-50 min-h-[44px]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/brand/gga-logo.jpg"
            alt=""
            aria-hidden="true"
            className="h-9 w-9 sm:h-10 sm:w-10 object-contain shrink-0"
          />
          <span className="v2-display text-lg sm:text-xl leading-none tracking-tight whitespace-nowrap">
            Good Goddess Almighty
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-sm tracking-widest uppercase">
            {NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`relative py-2 inline-block transition-colors ${
                      active ? 'text-ivory-50' : 'text-muted hover:text-ivory-50'
                    }`}
                    aria-current={active ? 'page' : undefined}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute bottom-0 left-0 h-px bg-champagne-500 transition-all duration-300 ${
                        active ? 'w-full' : 'w-0'
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Fuchsia CTA — visible on mobile too */}
          <Link
            href="/contact"
            className="btn-cta !min-h-[44px] !px-4 !py-2.5 sm:!px-5 text-[0.7rem] sm:text-xs"
          >
            Book ambassadors
          </Link>
          <button
            type="button"
            className="lg:hidden -mr-2 p-3 text-ivory-50"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <path
                d={open ? 'M6 6L22 22M22 6L6 22' : 'M4 9H24M4 19H24'}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div
        id="mobile-nav"
        className={`lg:hidden overflow-hidden transition-[max-height] duration-500 ease-out ${
          open ? 'max-h-[80vh]' : 'max-h-0'
        }`}
      >
        <nav aria-label="Mobile" className="border-t border-champagne-500/20 bg-ink">
          <ul className="px-5 sm:px-8 py-6 space-y-1">
            {NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center justify-between py-4 border-b border-champagne-500/15 text-2xl v2-display ${
                      active ? 'text-ivory-50' : 'text-muted'
                    }`}
                    aria-current={active ? 'page' : undefined}
                  >
                    <span>{item.label}</span>
                    <span aria-hidden="true" className="text-champagne-500">
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
            <li className="pt-6">
              <Link href="/contact" className="btn-cta w-full">
                Book ambassadors
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
