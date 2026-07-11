import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { V2SectionHeader } from '@/components/v2/V2SectionHeader';
import { SERVICES, ENGAGEMENTS, PULSE } from '@/data/site';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Brand ambassadors, experiential marketing, on-site activations, sampling and product demos, mobile tours, trade show activation, influencer campaigns, fashion showcases, photography and content, branded merch and fulfillment, product launch support, and fractional field-marketing leadership.',
};

export default function V2ServicesPage() {
  return (
    <>
      <section className="pt-36 pb-12 sm:pt-44 sm:pb-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal as="p" className="v2-eyebrow">
            Services
          </Reveal>
          <Reveal as="h1">
            <span className="v2-display text-v2-lg mt-6 block leading-[0.98] max-w-4xl">
              Twelve disciplines. <em className="text-fuchsia">One standard</em> of
              execution.
            </span>
          </Reveal>
          <Reveal as="p" delay={0.1} className="mt-8 max-w-2xl text-lg text-muted">
            We staff and produce across the full brand-moment lifecycle. Book a single
            discipline, build a fully integrated team, or engage us as fractional
            field-marketing leadership for the long haul.
          </Reveal>
        </div>
      </section>

      {/* Sticky anchor mini-nav */}
      <nav
        aria-label="Service jump links"
        className="sticky top-[100px] z-30 bg-ink/90 backdrop-blur border-y border-champagne-500/20"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 overflow-x-auto">
          <ul className="flex gap-6 sm:gap-8 text-xs sm:text-sm tracking-widest uppercase whitespace-nowrap text-muted">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <a
                  href={`#${s.slug}`}
                  className="hover:text-champagne-500 transition-colors py-4 inline-block"
                >
                  {s.title}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#engagements"
                className="hover:text-gold-hi transition-colors py-4 inline-block text-champagne-500"
              >
                Engagement Models
              </a>
            </li>
            <li>
              <a
                href="#pulse"
                className="hover:text-gold-hi transition-colors py-4 inline-block text-champagne-500"
              >
                GGA Pulse
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Service roster — editorial rows with gold hairlines */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 mt-12 divide-y divide-champagne-500/15 border-y border-champagne-500/15">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} id={s.slug} as="article" className="scroll-mt-40">
              <div className="grid gap-10 lg:grid-cols-12 py-12 sm:py-14">
                <div className="lg:col-span-4">
                  <p className="v2-eyebrow">
                    {String(i + 1).padStart(2, '0')} · Service
                  </p>
                  <h2 className="v2-display text-v2-md mt-4 leading-[1.05] text-ivory-50">
                    {s.title}
                  </h2>
                  <p className="mt-5 text-muted v2-display v2-italic text-xl leading-snug">
                    {s.short}
                  </p>
                </div>
                <div className="lg:col-span-8 grid sm:grid-cols-3 gap-8">
                  <div>
                    <p className="v2-eyebrow !text-[0.65rem] !text-muted">
                      Who it&apos;s for
                    </p>
                    <p className="mt-3 leading-relaxed text-ivory-50/90">{s.who}</p>
                  </div>
                  <div>
                    <p className="v2-eyebrow !text-[0.65rem] !text-muted">
                      What you receive
                    </p>
                    <p className="mt-3 leading-relaxed text-ivory-50/90">{s.what}</p>
                  </div>
                  <div>
                    <p className="v2-eyebrow !text-[0.65rem] !text-muted">
                      Why it matters
                    </p>
                    <p className="mt-3 leading-relaxed text-ivory-50/90">{s.why}</p>
                  </div>
                  <div className="sm:col-span-3 pt-2">
                    <Link
                      href={`/v2/contact?service=${s.slug}`}
                      className="btn-cta !min-h-[44px] !px-5 !py-2.5 text-xs"
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

      {/* Engagement models — bento on plum relief */}
      <section
        id="engagements"
        className="bg-plum-700/40 border-y border-champagne-500/15 py-24 sm:py-32 scroll-mt-32"
        aria-labelledby="engagements-heading"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <V2SectionHeader
            eyebrow="Engagement models"
            title={
              <span id="engagements-heading">
                Fractional <em className="text-gold-hi">field-marketing</em> leadership.
              </span>
            }
            intro="For brands that need senior field-marketing horsepower without the full-time overhead. Three tiers — pick the one that matches the moment."
          />
          <ul className="mt-16 grid gap-3 sm:gap-4 sm:grid-cols-3">
            {ENGAGEMENTS.map((tier, i) => (
              <Reveal
                as="li"
                key={tier.slug}
                delay={i * 0.05}
                className="bg-ink/70 border border-champagne-500/15 rounded-[2px] p-8"
              >
                <p className="v2-eyebrow">{tier.cadence}</p>
                <h3 className="v2-display text-3xl mt-4 text-ivory-50">{tier.title}</h3>
                <p className="mt-4 v2-display v2-italic text-lg text-ivory-50/90 leading-snug">
                  {tier.short}
                </p>
                <p className="mt-4 text-sm text-muted leading-relaxed">{tier.body}</p>
                <ul className="mt-6 space-y-2 text-sm text-ivory-50/85">
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
                  href={`/v2/contact?service=${tier.slug}`}
                  className="link-gold mt-8 inline-flex items-center gap-2 text-xs tracking-widest uppercase py-2"
                >
                  Talk to us <span aria-hidden="true">→</span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* GGA Pulse — ivory light relief */}
      <section
        id="pulse"
        className="bg-ivory-50 text-onyx-900 py-24 sm:py-32 scroll-mt-32"
        aria-labelledby="pulse-heading"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <Reveal as="p" className="v2-eyebrow !text-plum-700">
              {PULSE.status}
            </Reveal>
            <Reveal as="h2" delay={0.05}>
              <span
                id="pulse-heading"
                className="v2-display text-v2-md mt-4 block leading-[1.05] text-onyx-900"
              >
                {PULSE.name} — <em className="text-fuchsia-deep">field intelligence</em>,
                same day.
              </span>
            </Reveal>
            <Reveal as="p" delay={0.15} className="mt-6 text-lg text-onyx-900/75 leading-relaxed">
              {PULSE.tagline}
            </Reveal>
            <Reveal as="p" delay={0.2} className="mt-4 text-onyx-900/70 leading-relaxed">
              {PULSE.body}
            </Reveal>
            <Reveal delay={0.3} className="mt-8">
              <Link href="/v2/contact?service=pulse" className="btn-cta">
                Join the waitlist <span aria-hidden="true">→</span>
              </Link>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-6">
            <div className="relative bg-ivory-100 border border-onyx-900/10 rounded-[2px] p-8 sm:p-10">
              <div className="absolute top-4 right-4 text-xs uppercase tracking-widest text-plum-700 border border-plum-700/40 px-3 py-1 rounded-full">
                {PULSE.status}
              </div>
              <p className="v2-eyebrow !text-champagne-600">What it does</p>
              <ul className="mt-6 space-y-4">
                {PULSE.bullets.map((b) => (
                  <li key={b} className="flex gap-4 items-start">
                    <span
                      className="v2-display v2-italic text-2xl text-champagne-600 leading-none"
                      aria-hidden="true"
                    >
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
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 text-center">
          <V2SectionHeader
            align="center"
            eyebrow="Build a team"
            title={
              <>
                Not sure which disciplines fit?{' '}
                <em className="text-gold-hi">Tell us the brief.</em>
              </>
            }
            intro="We'll come back with a recommended team and a same-week proposal."
          />
          <Reveal delay={0.1} className="mt-10">
            <Link href="/v2/contact" className="btn-cta">
              Start the conversation
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
