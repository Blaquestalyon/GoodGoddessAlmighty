import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { SectionHeader } from '@/components/SectionHeader';
import {
  PREVIEW_SERVICES,
  PREVIEW_ENGAGEMENTS,
  PREVIEW_PULSE,
} from '@/data/preview-site';

export const metadata: Metadata = {
  title: 'Services — Preview',
  description:
    'Proposed full service roster: brand ambassadors, experiential marketing, on-site activations, sampling, mobile tours, trade shows, influencer campaigns, fashion, photography, branded merch, product launch support, and fractional field-marketing leadership.',
};

export default function PreviewServicesPage() {
  return (
    <>
      <section className="pt-32 pb-12 sm:pt-40 sm:pb-16 bg-ivory-50">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal as="p" className="eyebrow text-champagne-600">
            Services
          </Reveal>
          <Reveal as="h1">
            <span className="display-serif text-display-lg mt-6 block leading-[0.98] max-w-4xl">
              Twelve disciplines.{' '}
              <em className="text-plum-700">One standard</em> of execution.
            </span>
          </Reveal>
          <Reveal as="p" delay={0.1} className="mt-8 max-w-2xl text-lg text-onyx-900/75">
            We staff and produce across the full brand-moment lifecycle. Book a single
            discipline, build a fully integrated team, or engage us as fractional
            field-marketing leadership for the long haul.
          </Reveal>
        </div>
      </section>

      {/* Sticky anchor mini-nav */}
      <nav
        aria-label="Service jump links"
        className="sticky top-16 z-30 bg-ivory-50/95 backdrop-blur border-y border-onyx-900/10"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-3 overflow-x-auto">
          <ul className="flex gap-6 sm:gap-8 text-xs sm:text-sm tracking-widest uppercase whitespace-nowrap text-onyx-900/70">
            {PREVIEW_SERVICES.map((s) => (
              <li key={s.slug}>
                <a
                  href={`#${s.slug}`}
                  className="hover:text-onyx-900 transition-colors py-1 inline-block"
                >
                  {s.title}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#engagements"
                className="hover:text-onyx-900 transition-colors py-1 inline-block text-plum-700"
              >
                Engagement Models
              </a>
            </li>
            <li>
              <a
                href="#pulse"
                className="hover:text-onyx-900 transition-colors py-1 inline-block text-plum-700"
              >
                GGA Pulse
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Service grid */}
      <section className="bg-ivory-50 pb-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 space-y-px bg-onyx-900/10 border border-onyx-900/10 mt-12">
          {PREVIEW_SERVICES.map((s, i) => (
            <Reveal key={s.slug} id={s.slug} as="article" className="bg-ivory-50 scroll-mt-32">
              <div className="grid gap-10 lg:grid-cols-12 p-7 sm:p-10 lg:p-14">
                <div className="lg:col-span-4">
                  <p className="eyebrow text-champagne-600">
                    {String(i + 1).padStart(2, '0')} · Service
                  </p>
                  <h2 className="display-serif text-display-md mt-4 leading-[1.05]">
                    {s.title}
                  </h2>
                  <p className="mt-5 text-onyx-900/75 italic display-serif text-xl leading-snug">
                    {s.short}
                  </p>
                </div>
                <div className="lg:col-span-8 grid sm:grid-cols-3 gap-8 text-onyx-900/80">
                  <div>
                    <p className="eyebrow text-onyx-900/50">Who it&apos;s for</p>
                    <p className="mt-3 leading-relaxed">{s.who}</p>
                  </div>
                  <div>
                    <p className="eyebrow text-onyx-900/50">What you receive</p>
                    <p className="mt-3 leading-relaxed">{s.what}</p>
                  </div>
                  <div>
                    <p className="eyebrow text-onyx-900/50">Why it matters</p>
                    <p className="mt-3 leading-relaxed">{s.why}</p>
                  </div>
                  <div className="sm:col-span-3 pt-2">
                    <Link
                      href={`/contact?service=${s.slug}`}
                      className="inline-flex items-center gap-2 text-sm uppercase tracking-widest border-b border-onyx-900 pb-1 hover:gap-3 transition-all"
                    >
                      {s.cta} <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Engagement models / fractional leadership */}
      <section
        id="engagements"
        className="bg-onyx-900 text-ivory-50 py-24 sm:py-32 scroll-mt-32"
        aria-labelledby="engagements-heading"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeader
            light
            eyebrow="Engagement models"
            title={
              <span id="engagements-heading">
                Fractional <em className="text-champagne-500">field-marketing</em> leadership.
              </span>
            }
            intro="For brands that need senior field-marketing horsepower without the full-time overhead. Three tiers — pick the one that matches the moment."
          />
          <ul className="mt-16 grid gap-px bg-ivory-50/10 sm:grid-cols-3 overflow-hidden">
            {PREVIEW_ENGAGEMENTS.map((tier, i) => (
              <Reveal as="li" key={tier.slug} delay={i * 0.05} className="bg-onyx-900 p-8">
                <p className="eyebrow text-champagne-500">{tier.cadence}</p>
                <h3 className="display-serif text-3xl mt-4">{tier.title}</h3>
                <p className="mt-4 display-serif italic text-lg text-ivory-50/85 leading-snug">
                  {tier.short}
                </p>
                <p className="mt-4 text-sm text-ivory-50/70 leading-relaxed">{tier.body}</p>
                <ul className="mt-6 space-y-2 text-sm text-ivory-50/80">
                  {tier.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="text-champagne-500 mt-1" aria-hidden="true">
                        ✦
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/contact?service=${tier.slug}`}
                  className="mt-8 inline-flex items-center gap-2 text-xs tracking-widest uppercase text-champagne-500 hover:gap-3 transition-all border-b border-champagne-500/60 pb-1"
                >
                  Talk to us <span aria-hidden="true">→</span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* GGA Pulse — coming soon */}
      <section
        id="pulse"
        className="bg-ivory-100 py-24 sm:py-32 scroll-mt-32"
        aria-labelledby="pulse-heading"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <Reveal as="p" className="eyebrow text-plum-700">
              {PREVIEW_PULSE.status}
            </Reveal>
            <Reveal as="h2" delay={0.05}>
              <span
                id="pulse-heading"
                className="display-serif text-display-md mt-4 block leading-[1.05]"
              >
                {PREVIEW_PULSE.name} — <em className="text-plum-700">field intelligence</em>,
                same day.
              </span>
            </Reveal>
            <Reveal as="p" delay={0.15} className="mt-6 text-lg text-onyx-900/75 leading-relaxed">
              {PREVIEW_PULSE.tagline}
            </Reveal>
            <Reveal as="p" delay={0.2} className="mt-4 text-onyx-900/70 leading-relaxed">
              {PREVIEW_PULSE.body}
            </Reveal>
            <Reveal delay={0.3} className="mt-8">
              <Link
                href="/contact?service=pulse"
                className="inline-flex items-center gap-2 text-sm uppercase tracking-widest border-b border-onyx-900 pb-1 hover:gap-3 transition-all"
              >
                Join the waitlist <span aria-hidden="true">→</span>
              </Link>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-6">
            <div className="relative bg-ivory-50 border border-onyx-900/10 p-8 sm:p-10">
              <div className="absolute top-4 right-4 text-xs uppercase tracking-widest text-plum-700 border border-plum-700/40 px-3 py-1 rounded-full">
                {PREVIEW_PULSE.status}
              </div>
              <p className="eyebrow text-champagne-600">What it does</p>
              <ul className="mt-6 space-y-4">
                {PREVIEW_PULSE.bullets.map((b) => (
                  <li key={b} className="flex gap-4 items-start">
                    <span className="display-serif italic text-2xl text-champagne-600 leading-none">
                      ✦
                    </span>
                    <span className="text-onyx-900/80 leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-plum-700 text-ivory-50 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 text-center">
          <SectionHeader
            light
            align="center"
            eyebrow="Build a team"
            title={
              <>
                Not sure which disciplines fit?{' '}
                <em className="text-champagne-500">Tell us the brief.</em>
              </>
            }
            intro="We&apos;ll come back with a recommended team and a same-week proposal."
          />
          <Reveal delay={0.1} className="mt-10">
            <Link href="/contact" className="btn-ghost-light">
              Start the conversation
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
