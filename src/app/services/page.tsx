import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { SectionHeader } from '@/components/SectionHeader';
import { SERVICES } from '@/data/site';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Brand ambassadors, experiential marketing, on-site activations, event staffing, influencer campaigns, fashion showcases, photography and product launch support.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <>
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-24 bg-ivory-50">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal as="p" className="eyebrow text-champagne-600">
            Services
          </Reveal>
          <Reveal as="h1">
            <span className="display-serif text-display-lg mt-6 block leading-[0.98] max-w-4xl">
              Eight disciplines.{' '}
              <em className="text-plum-700">One standard</em> of execution.
            </span>
          </Reveal>
          <Reveal as="p" delay={0.1} className="mt-8 max-w-2xl text-lg text-onyx-900/75">
            We staff and produce across the full brand-moment lifecycle. Book a single
            discipline, or build a fully integrated team.
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory-50 pb-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 space-y-px bg-onyx-900/10 border border-onyx-900/10">
          {SERVICES.map((s, i) => (
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
