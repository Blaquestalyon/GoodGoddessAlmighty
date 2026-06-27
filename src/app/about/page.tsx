import type { Metadata } from 'next';
import { SmartImage } from '@/components/SmartImage';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { SectionHeader } from '@/components/SectionHeader';
import { PORTFOLIO } from '@/data/portfolio';
import { PILLARS, SITE } from '@/data/site';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Good Goddess Almighty is a boutique brand ambassador and experiential marketing firm — built on training, presentation, and brand-safe representation.',
  alternates: { canonical: '/about' },
};

const ABOUT_FRAMES = [
  PORTFOLIO.find((p) => p.src.endsWith('events-03.jpg'))!,
  PORTFOLIO.find((p) => p.src.endsWith('fashion-02.jpg'))!,
  PORTFOLIO.find((p) => p.src.endsWith('onsite-07.jpg'))!,
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-24 bg-ivory-50">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal as="p" className="eyebrow text-champagne-600">
              About
            </Reveal>
            <Reveal as="h1">
              <span className="display-serif text-display-lg mt-6 block leading-[0.98]">
                A boutique firm built on{' '}
                <em className="text-plum-700">training, taste,</em> and trust.
              </span>
            </Reveal>
            <Reveal as="p" delay={0.1} className="mt-8 max-w-2xl text-lg text-onyx-900/75 leading-relaxed">
              Good Goddess Almighty is a brand ambassador and experiential marketing firm.
              We work with brands that want their in-person presence to be as considered as
              their visual identity — and we hire, train, and prepare the people who deliver it.
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-ivory-50 pb-24" aria-labelledby="mission-heading">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid gap-12 lg:grid-cols-12 items-start">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Mission"
              title={
                <span id="mission-heading">
                  Bold, memorable, <em className="text-plum-700">brand-safe</em>{' '}
                  representation.
                </span>
              }
            />
          </div>
          <div className="lg:col-span-7 space-y-6 text-lg leading-relaxed text-onyx-900/80">
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

      {/* Image triptych */}
      <section className="bg-ivory-50 pb-24" aria-hidden="true">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid grid-cols-12 gap-3 sm:gap-4">
          <Reveal className="col-span-12 sm:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden bg-onyx-800">
              <SmartImage
                src={ABOUT_FRAMES[0].src}
                alt={ABOUT_FRAMES[0].alt}
                fill
                sizes="(min-width: 1024px) 30vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal className="col-span-6 sm:col-span-4" delay={0.1}>
            <div className="relative aspect-square overflow-hidden bg-onyx-800">
              <SmartImage
                src={ABOUT_FRAMES[1].src}
                alt={ABOUT_FRAMES[1].alt}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal className="col-span-6 sm:col-span-3" delay={0.2}>
            <div className="relative aspect-[3/4] overflow-hidden bg-onyx-800">
              <SmartImage
                src={ABOUT_FRAMES[2].src}
                alt={ABOUT_FRAMES[2].alt}
                fill
                sizes="(min-width: 1024px) 20vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why boutique */}
      <section className="bg-onyx-900 text-ivory-50 py-24 sm:py-32" aria-labelledby="boutique-heading">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal as="p" className="eyebrow text-champagne-500">
              Why boutique
            </Reveal>
            <Reveal>
              <h2
                id="boutique-heading"
                className="display-serif text-display-md mt-4 block"
              >
                The boutique <em className="text-blush-300">advantage</em>.
              </h2>
            </Reveal>
            <Reveal as="p" delay={0.1} className="mt-6 text-ivory-50/75 text-lg leading-relaxed">
              Large staffing agencies operate at scale. Premium brands need something
              different.
            </Reveal>
          </div>
          <ul className="lg:col-span-7 grid gap-px bg-ivory-50/10 sm:grid-cols-2 overflow-hidden">
            {PILLARS.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.05} className="bg-onyx-900 p-7">
                <span className="text-champagne-500 display-serif text-3xl italic">0{i + 1}</span>
                <h3 className="display-serif text-2xl mt-3">{p.title}</h3>
                <p className="mt-3 text-ivory-50/70 leading-relaxed text-sm">{p.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Stat block */}
      <section className="bg-ivory-100 py-24 sm:py-32" aria-labelledby="stats-heading">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeader
            eyebrow="Cultural fluency"
            title={
              <span id="stats-heading">
                The people <em className="text-plum-700">representing you</em> matter.
              </span>
            }
            intro="Casting, training, and styling decisions that other agencies treat as logistics, we treat as creative. Because they are."
          />
          <ul className="mt-16 grid gap-px bg-onyx-900/10 sm:grid-cols-3 overflow-hidden border border-onyx-900/10">
            {[
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
            ].map((s, i) => (
              <Reveal as="li" key={s.k} delay={i * 0.05} className="bg-ivory-100 p-7">
                <p className="eyebrow text-champagne-600">{s.k}</p>
                <p className="display-serif italic text-2xl mt-4 leading-snug">{s.v}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ivory-50 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 text-center">
          <Reveal>
            <h2 className="display-serif text-display-md">
              Let&apos;s talk about the moment you&apos;re building.
            </h2>
          </Reveal>
          <Reveal as="p" delay={0.1} className="mt-6 text-lg text-onyx-900/75">
            Reach out — we reply within one business day.
          </Reveal>
          <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-3 justify-center">
            <Link href="/contact" className="btn-primary">
              Start a project
            </Link>
            <a href={SITE.contact.phoneHref} className="btn-ghost">
              {SITE.contact.phone}
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
