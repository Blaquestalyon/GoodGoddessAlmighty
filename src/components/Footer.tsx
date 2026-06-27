import Link from 'next/link';
import { NAV, SITE } from '@/data/site';
import { LogoMark } from './Logo';

export function Footer() {
  const year = new Date().getFullYear();
  const socials = Object.entries(SITE.social).filter(([, v]) => Boolean(v)) as [
    string,
    string,
  ][];

  return (
    <footer className="bg-onyx-900 text-ivory-50">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-20 pb-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <LogoMark className="h-10 w-10 text-ivory-50" />
              <span className="display-serif text-2xl">Good Goddess Almighty</span>
            </div>
            <p className="display-serif italic text-3xl mt-8 max-w-md leading-tight">
              Fearless creativity for forward-thinking brands.
            </p>
            <p className="text-ivory-50/70 mt-4 max-w-md">
              Boutique experiential marketing &amp; brand ambassador firm.
            </p>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow text-champagne-500">Explore</p>
            <ul className="mt-5 space-y-3 text-ivory-50/80">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="hover:text-champagne-500 transition-colors">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="eyebrow text-champagne-500">Contact</p>
            <ul className="mt-5 space-y-3 text-ivory-50/80">
              <li>
                <a
                  href={`mailto:${SITE.contact.email}`}
                  className="hover:text-champagne-500 transition-colors"
                >
                  {SITE.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={SITE.contact.phoneHref}
                  className="hover:text-champagne-500 transition-colors"
                >
                  {SITE.contact.phone}
                </a>
              </li>
              <li className="text-ivory-50/60">
                {SITE.contact.address.city}, {SITE.contact.address.region}
              </li>
            </ul>

            {socials.length > 0 && (
              <ul className="mt-8 flex gap-4 text-xs tracking-widest uppercase">
                {socials.map(([k, v]) => (
                  <li key={k}>
                    <a
                      href={v}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ivory-50/70 hover:text-champagne-500 transition-colors"
                    >
                      {k}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-ivory-50/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-ivory-50/50">
          <p>© {year} Good Goddess Almighty. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/privacy" className="hover:text-champagne-500 transition-colors">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-champagne-500 transition-colors">
                Terms
              </Link>
            </li>
            <li>
              <Link
                href="/accessibility"
                className="hover:text-champagne-500 transition-colors"
              >
                Accessibility
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
