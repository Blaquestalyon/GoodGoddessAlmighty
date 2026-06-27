'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NAV } from '@/data/site';
import { Logo } from './Logo';

export function Header() {
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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? 'bg-ivory-50/95 backdrop-blur border-b border-onyx-900/10'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <Link href="/" aria-label="Good Goddess Almighty — home" className="text-onyx-900">
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-sm tracking-widest uppercase">
            {NAV.map((item) => {
              const active =
                item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`relative py-1 transition-colors ${
                      active ? 'text-onyx-900' : 'text-onyx-900/70 hover:text-onyx-900'
                    }`}
                    aria-current={active ? 'page' : undefined}
                  >
                    {item.label}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-px bg-champagne-500 transition-all duration-300 ${
                        active ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="hidden lg:inline-flex bg-onyx-900 text-ivory-50 px-5 py-3 text-xs tracking-widest uppercase font-medium hover:bg-plum-700 transition-colors"
          >
            Book ambassadors
          </Link>
          <button
            type="button"
            className="lg:hidden -mr-2 p-2 text-onyx-900"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
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
        <nav aria-label="Mobile" className="border-t border-onyx-900/10 bg-ivory-50">
          <ul className="px-5 sm:px-8 py-6 space-y-1">
            {NAV.map((item) => {
              const active =
                item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center justify-between py-4 border-b border-onyx-900/10 text-2xl display-serif ${
                      active ? 'text-onyx-900' : 'text-onyx-900/70'
                    }`}
                    aria-current={active ? 'page' : undefined}
                  >
                    <span>{item.label}</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </li>
              );
            })}
            <li className="pt-6">
              <Link href="/contact" className="btn-primary w-full">
                Book ambassadors
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
