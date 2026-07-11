import Link from 'next/link';
import { NAV, SITE } from '@/data/site';

export function V2Footer() {
  const year = new Date().getFullYear();
  const socials = Object.entries(SITE.social).filter(([, v]) => Boolean(v)) as [
    string,
    string,
  ][];

  return (
    <footer className="bg-obsidian text-ivory-50 border-t border-champagne-500/20">
      {/* Closing CTA */}
      <div className="mx-auto max-w-4xl px-5 sm:px-8 pt-24 pb-20 text-center">
        <p className="v2-eyebrow">Let&apos;s build something</p>
        <h2 className="v2-display text-v2-lg mt-6 leading-[1.0]">
          Ready to make your brand <em className="text-gold-hi">unforgettable</em>?
        </h2>
        <p className="mt-6 text-lg text-muted max-w-2xl mx-auto leading-relaxed">
          Tell us about the moment you&apos;re building. We&apos;ll put together a
          tailored team and a same-week proposal.
        </p>
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <Link href="/contact" className="btn-cta">
            Start a project
          </Link>
          <a href={SITE.contact.phoneHref} className="btn-outline">
            Call {SITE.contact.phone}
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-16 pb-10 border-t border-champagne-500/15">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/brand/gga-logo.jpg"
                alt=""
                aria-hidden="true"
                className="h-10 w-10 object-contain shrink-0"
              />
              <span className="v2-display text-2xl">Good Goddess Almighty</span>
            </div>
            <p className="v2-display v2-italic text-3xl mt-8 max-w-md leading-tight">
              Fearless creativity for forward-thinking brands.
            </p>
            <p className="text-muted mt-4 max-w-md">
              Boutique experiential marketing &amp; brand ambassador firm.
            </p>
          </div>

          <div className="lg:col-span-3">
            <p className="v2-eyebrow">Explore</p>
            <ul className="mt-5 space-y-3 text-muted">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="hover:text-champagne-500 transition-colors py-1 inline-block"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="v2-eyebrow">Contact</p>
            <ul className="mt-5 space-y-3 text-muted">
              <li>
                <a
                  href={`mailto:${SITE.contact.email}`}
                  className="hover:text-champagne-500 transition-colors py-1 inline-block break-all"
                >
                  {SITE.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={SITE.contact.phoneHref}
                  className="hover:text-champagne-500 transition-colors py-1 inline-block"
                >
                  {SITE.contact.phone}
                </a>
              </li>
              <li className="text-muted/80">
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
                      className="text-muted hover:text-champagne-500 transition-colors"
                    >
                      {k}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-champagne-500/15 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-muted/80">
          <p>© {year} Good Goddess Almighty. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/privacy" className="hover:text-champagne-500 transition-colors py-1 inline-block">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-champagne-500 transition-colors py-1 inline-block">
                Terms
              </Link>
            </li>
            <li>
              <Link
                href="/accessibility"
                className="hover:text-champagne-500 transition-colors py-1 inline-block"
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
