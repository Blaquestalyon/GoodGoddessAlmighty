import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { V2SectionHeader } from '@/components/v2/V2SectionHeader';
import { AboutTriptych } from '@/components/v2/AboutTriptych';
import { PILLARS, SITE } from '@/data/site';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Good Goddess Almighty is a boutique brand ambassador and experiential marketing firm — built on training, presentation, and brand-safe representation.',
  alternates: { canonical: '/about' },
};

const STATS = [
  {
    k: 'Brand-first',
    v: 'Every ambassador trained on your tone, your talking points, your no-go topics — before they meet a guest.',
  },
  {
    k: 'Producer-led',
    v: 'A senior producer leads on-site. Your point of contact during planning is your point of contact on the day.',
  },
  {
    k: 'Same-week content',
    v: 'Editorial-grade photo and short-form video delivered while the moment is still in feed.',
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-36 pb-16 sm:pt-44 sm:pb-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal as="p" className="v2-eyebrow">
              About
            </Reveal>
            <Reveal as="h1">
              <span className="v2-display text-v2-lg mt-6 block leading-[0.98]">
                A boutique firm built on{' '}
                <em className="text-fuchsia">training, taste,</em> and trust.
              </span>
            </Reveal>
            <Reveal
              as="p"
              delay={0.1}
              className="mt-8 max-w-2xl text-lg text-muted leading-relaxed"
            >
              Good Goddess Almighty is a brand ambassador and experiential marketing firm.
              We work with brands that want their in-person presence to be as considered as
              their visual identity — and we hire, train, and prepare the people who deliver it.
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="pb-24" aria-labelledby="mission-heading">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid gap-12 lg:grid-cols-12 items-start">
          <div className="lg:col-span-5">
            <V2SectionHeader
              eyebrow="Mission"
              title={
                <span id="mission-heading">
                  Bold, memorable, <em className="text-gold-hi">brand-safe</em>{' '}
                  representation.
                </span>
              }
            />
          </div>
          <div className="lg:col-span-7 space-y-6 text-lg leading-relaxed text-ivory-50/85">
            <Reveal as="p">
              We exist because the gap between a great brand and a great brand experience is
              almost always a people problem. The right ambassador can turn a fast moment
              into a real connection. The wrong one can quietly cost you a customer.
            </Reveal>
            <Reveal as="p" delay={0.1}>
              So we cast carefully. We train every ambassador on your brand specifically,
              not just on the script. We dress and direct them to match the room. And we
              show up on the day with a producer leading the team — not just managing it.
            </Reveal>
            <Reveal as="p" delay={0.2}>
              The result is an in-person experience that reflects the brand you&apos;ve
              worked hard to build — and content from the day that lets you keep telling
              the story afterwards.
            </Reveal>
          </div>
        </div>
      </section>

      {/* Image triptych — three large frames, reshuffled on every load */}
      <section className="pb-24" aria-hidden="true">
        <AboutTriptych />
      </section>

      {/* Why boutique — plum relief bento */}
      <section
        className="bg-plum-700/40 border-y border-champagne-500/15 py-24 sm:py-32"
        aria-labelledby="boutique-heading"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal as="p" className="v2-eyebrow">
              Why boutique
            </Reveal>
            <Reveal>
              <h2 id="boutique-heading" className="v2-display text-v2-md mt-4 block">
                The boutique <em className="text-fuchsia">advantage</em>.
              </h2>
            </Reveal>
            <Reveal as="p" delay={0.1} className="mt-6 text-muted text-lg leading-relaxed">
              Large staffing agencies operate at scale. Premium brands need something
              different.
            </Reveal>
          </div>
          <ul className="lg:col-span-7 grid gap-3 sm:gap-4 sm:grid-cols-2">
            {PILLARS.map((p, i) => (
              <Reveal
                as="li"
                key={p.title}
                delay={i * 0.05}
                className="bg-ink/70 border border-champagne-500/15 rounded-[2px] p-7"
              >
                <span className="text-champagne-500 v2-display v2-italic text-3xl">
                  0{i + 1}
                </span>
                <h3 className="v2-display text-2xl mt-3 text-ivory-50">{p.title}</h3>
                <p className="mt-3 text-muted leading-relaxed text-sm">{p.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Cultural fluency — ivory light relief */}
      <section className="bg-ivory-50 text-onyx-900 py-24 sm:py-32" aria-labelledby="stats-heading">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <V2SectionHeader
            onLight
            eyebrow="Cultural fluency"
            title={
              <span id="stats-heading">
                The people <em className="text-fuchsia-deep">representing you</em> matter.
              </span>
            }
            intro="Casting, training, and styling decisions that other agencies treat as logistics, we treat as creative. Because they are."
          />
          <ul className="mt-16 grid gap-3 sm:gap-4 sm:grid-cols-3">
            {STATS.map((s, i) => (
              <Reveal
                as="li"
                key={s.k}
                delay={i * 0.05}
                className="bg-ivory-100 border border-onyx-900/10 rounded-[2px] p-7"
              >
                <p className="v2-eyebrow !text-champagne-600">{s.k}</p>
                <p className="v2-display v2-italic text-2xl mt-4 leading-snug text-onyx-900">
                  {s.v}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 text-center">
          <Reveal>
            <h2 className="v2-display text-v2-md">
              Let&apos;s talk about the moment you&apos;re building.
            </h2>
          </Reveal>
          <Reveal as="p" delay={0.1} className="mt-6 text-lg text-muted">
            Reach out — we reply within one business day.
          </Reveal>
          <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-3 justify-center">
            <Link href="/contact" className="btn-cta">
              Start a project
            </Link>
            <a href={SITE.contact.phoneHref} className="btn-outline">
              {SITE.contact.phone}
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
