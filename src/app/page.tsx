import Link from 'next/link';
import { PORTFOLIO, CATEGORIES } from '@/data/portfolio';
import { SERVICES, PROOF, PROCESS, PILLARS } from '@/data/site';
import { Reveal } from '@/components/Reveal';
import { V2SectionHeader } from '@/components/v2/V2SectionHeader';
import { SpotlightTile } from '@/components/v2/SpotlightTile';
import { FeaturedStrip } from '@/components/v2/FeaturedStrip';

/* Hero frames — items with verbatim brand context lead the page. */
const HERO_MAIN = PORTFOLIO.find((p) => p.src.endsWith('onsite-18.jpg'))!; // Houston Astros × LoDo
const HERO_SIDE = [
  PORTFOLIO.find((p) => p.src.endsWith('events-29.jpg'))!, // Jameson Matchday
  PORTFOLIO.find((p) => p.src.endsWith('influencer-10.jpg'))!,
];

const ANCHORS = [
  { href: '#work', label: 'Work' },
  { href: '#services', label: 'Services' },
  { href: '#why', label: 'Why GGA' },
  { href: '#process', label: 'Process' },
  { href: '/contact', label: 'Contact' },
];

const MARQUEE = [
  'Experiential Marketing',
  'Brand Ambassadors',
  'On-Site Activations',
  'Event Staffing',
  'Sampling & Demos',
  'Mobile Tours',
  'Trade Show Activation',
  'Influencer Campaigns',
  'Fashion Showcases',
  'Photography & Content',
  'Branded Merch',
  'Product Launches',
];

export default function HomePage() {
  const lcpAvif = HERO_MAIN.src.replace(/\.jpe?g$/i, '.avif');
  const lcpWebp = HERO_MAIN.src.replace(/\.jpe?g$/i, '.webp');
  return (
    <>
      {/* LCP preload for the hero image */}
      <link rel="preload" as="image" href={lcpAvif} type="image/avif" />
      <link rel="preload" as="image" href={lcpWebp} type="image/webp" />

      {/* ----------------------- HERO ----------------------- */}
      <section
        aria-labelledby="hero-heading"
        className="relative pt-36 pb-16 sm:pt-44 sm:pb-20 overflow-hidden"
      >
        {/* Soft champagne glow behind the composition */}
        <div
          aria-hidden="true"
          className="absolute -top-40 right-[-10%] h-[36rem] w-[36rem] rounded-full bg-champagne-500/[0.07] blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal as="p" className="v2-eyebrow">
            Boutique experiential marketing · Brand ambassadors · Nationwide
          </Reveal>
          <Reveal as="h1" delay={0.1}>
            <span id="hero-heading" className="v2-display text-v2-xl block mt-6">
              Fearless creativity{' '}
              <em className="text-fuchsia">for forward-thinking</em> brands.
            </span>
          </Reveal>
        </div>

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 mt-12 sm:mt-16 grid gap-14 lg:grid-cols-12 lg:gap-10 lg:items-center">
          <div className="lg:col-span-7">
            <Reveal
              as="p"
              delay={0.2}
              className="max-w-xl text-lg text-muted leading-relaxed"
            >
              Good Goddess Almighty contracts, trains, and provides polished, highly
              capable ambassadors who help brands create memorable in-person and digital
              experiences — at activations, launches, retail moments, trade shows, and
              mobile tours. Stand out with us.
            </Reveal>
            <Reveal delay={0.3} className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-cta">
                Book brand ambassadors
              </Link>
              <Link href="/services" className="btn-outline">
                Explore services
              </Link>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <div className="grid grid-cols-12 gap-3 sm:gap-4">
              <Reveal className="col-span-7 row-span-2" delay={0.15}>
                <div className="group v2-spot-frame">
                  <SpotlightTile
                    item={HERO_MAIN}
                    sizes="(min-width: 1024px) 320px, 58vw"
                    aspect="aspect-[3/4]"
                    loading="eager"
                    fetchPriority="high"
                    captionAlways
                  />
                </div>
              </Reveal>
              <Reveal className="col-span-5" delay={0.3}>
                <div className="group v2-spot-frame">
                  <SpotlightTile
                    item={HERO_SIDE[0]}
                    sizes="(min-width: 1024px) 220px, 40vw"
                    aspect="aspect-square"
                    loading="eager"
                  />
                </div>
              </Reveal>
              <Reveal className="col-span-5" delay={0.45}>
                <div className="group v2-spot-frame">
                  <SpotlightTile
                    item={HERO_SIDE[1]}
                    sizes="(min-width: 1024px) 220px, 40vw"
                    aspect="aspect-[4/5]"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div
          className="mt-16 sm:mt-24 border-y border-champagne-500/20 py-5 overflow-hidden marquee-mask"
          aria-hidden="true"
        >
          <div className="flex gap-12 animate-marquee whitespace-nowrap will-change-transform motion-reduce:animate-none">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-12 shrink-0 items-center">
                {MARQUEE.map((w) => (
                  <span
                    key={w}
                    className="v2-display v2-italic text-2xl sm:text-3xl text-ivory-50/85"
                  >
                    {w}
                    <span className="text-champagne-500 ml-12">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------- ANCHOR NAV ----------------------- */}
      <nav
        aria-label="Page sections"
        className="sticky top-[72px] z-30 bg-ink/90 backdrop-blur border-b border-champagne-500/20"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 overflow-x-auto">
          <ul className="flex gap-7 sm:gap-10 text-xs sm:text-sm tracking-widest uppercase whitespace-nowrap">
            {ANCHORS.map((a) => (
              <li key={a.href}>
                <a
                  href={a.href}
                  className="inline-block py-4 text-muted hover:text-champagne-500 transition-colors"
                >
                  {a.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ----------------------- FEATURED WORK (the proof engine, high on the page) ----------------------- */}
      <section
        id="work"
        className="py-24 sm:py-32 scroll-mt-28"
        aria-labelledby="work-heading"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <V2SectionHeader
                eyebrow="Featured work"
                title={
                  <span id="work-heading">
                    Recent <em className="text-gold-hi">activations</em>.
                  </span>
                }
                intro={
                  <>
                    A selection of recent activations across {CATEGORIES.length} disciplines.
                    Filter the full portfolio to see every category.
                  </>
                }
              />
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <Reveal>
                <Link href="/work" className="btn-outline">
                  See the full portfolio
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
        <div className="mt-14">
          <FeaturedStrip />
        </div>
      </section>

      {/* ----------------------- PROOF ----------------------- */}
      <section
        className="py-20 sm:py-24 border-y border-champagne-500/15"
        aria-labelledby="proof-heading"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal as="p" className="v2-eyebrow text-center">
            How we work
          </Reveal>
          <h2 id="proof-heading" className="sr-only">
            How we work
          </h2>
          <ul className="mt-10 grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROOF.map((p, i) => (
              <Reveal
                as="li"
                key={p.label}
                delay={i * 0.05}
                className="bg-elevated border border-champagne-500/15 rounded-[2px] p-7"
              >
                <p className="v2-eyebrow !text-[0.65rem]">{p.label}</p>
                <p className="mt-3 v2-display v2-italic text-xl leading-snug text-ivory-50">
                  {p.body}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ----------------------- BRAND PROMISE (ivory light relief) ----------------------- */}
      <section
        className="bg-ivory-50 text-onyx-900 py-24 sm:py-32"
        aria-labelledby="promise-heading"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal as="p" className="v2-eyebrow !text-champagne-600">
              The promise
            </Reveal>
            <Reveal as="h2" delay={0.05}>
              <span
                id="promise-heading"
                className="v2-display text-v2-md mt-4 block text-onyx-900"
              >
                Brand moments people <em className="text-fuchsia-deep">choose</em> to
                remember.
              </span>
            </Reveal>
          </div>
          <div className="lg:col-span-7 space-y-6 text-lg leading-relaxed text-onyx-900/80">
            <Reveal as="p" delay={0.05}>
              We are a boutique experiential marketing and brand ambassador firm. We help
              brands show up in culture with intention — at launches, activations, retail
              moments, showcases, trade floors, and the press-worthy events in between.
            </Reveal>
            <Reveal as="p" delay={0.15}>
              Our ambassadors aren&apos;t booked from a database. They&apos;re cast,
              trained, and prepared for your brand specifically — so the people
              representing you in public match the standard you set in private.
            </Reveal>
          </div>
        </div>
      </section>

      {/* ----------------------- SERVICES (bento) ----------------------- */}
      <section id="services" className="py-24 sm:py-32 scroll-mt-28" aria-labelledby="services-heading">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <V2SectionHeader
                eyebrow="Services"
                title={
                  <span id="services-heading">
                    What we <em className="text-gold-hi">produce</em>.
                  </span>
                }
              />
            </div>
            <div className="lg:col-span-5 lg:text-right">
              <Reveal>
                <Link href="/services" className="btn-outline">
                  All services
                </Link>
              </Reveal>
            </div>
          </div>

          {/* Bento: the two lead disciplines run wide, the rest tile in */}
          <ul className="mt-16 grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {SERVICES.map((s, i) => {
              const wide = i < 2;
              return (
                <Reveal
                  as="li"
                  key={s.slug}
                  delay={(i % 3) * 0.05}
                  className={wide ? 'lg:col-span-3' : 'lg:col-span-2'}
                >
                  <Link
                    href={`/services#${s.slug}`}
                    className="group block h-full bg-elevated border border-champagne-500/15 rounded-[2px] p-7 transition-colors hover:border-champagne-500/50"
                  >
                    <span className="v2-eyebrow !text-[0.65rem]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3
                      className={`v2-display mt-4 text-ivory-50 ${
                        wide ? 'text-3xl sm:text-4xl' : 'text-2xl'
                      }`}
                    >
                      {s.title}
                    </h3>
                    <p className="mt-3 text-muted text-sm leading-relaxed">{s.short}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-xs tracking-widest uppercase text-champagne-500 group-hover:gap-3 group-hover:text-gold-hi transition-all">
                      Learn more <span aria-hidden="true">→</span>
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ----------------------- WHY GGA (plum relief bento) ----------------------- */}
      <section
        id="why"
        className="bg-plum-700/40 border-y border-champagne-500/15 py-24 sm:py-32 scroll-mt-28"
        aria-labelledby="why-heading"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal as="p" className="v2-eyebrow">
              Why GGA
            </Reveal>
            <Reveal as="h2" delay={0.05}>
              <span id="why-heading" className="v2-display text-v2-md mt-4 block">
                Boutique attention. <em className="text-fuchsia">Brand-safe</em> polish.
              </span>
            </Reveal>
            <Reveal as="p" delay={0.15} className="mt-6 text-muted text-lg leading-relaxed">
              We work with a small number of brands at a time, on purpose. That&apos;s how
              we keep our standards — and yours — non-negotiable.
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

      {/* ----------------------- PROCESS ----------------------- */}
      <section id="process" className="py-24 sm:py-32 scroll-mt-28" aria-labelledby="process-heading">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <V2SectionHeader
            eyebrow="Process"
            title={
              <span id="process-heading">
                Four steps from <em className="text-gold-hi">brief</em> to brand moment.
              </span>
            }
            intro="Designed to be calm, organized, and respectful of your timeline — even when production is anything but."
          />
          <ol className="mt-16 grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <Reveal
                as="li"
                key={p.n}
                delay={i * 0.05}
                className="bg-elevated border border-champagne-500/15 rounded-[2px] p-7"
              >
                <span className="v2-display v2-italic text-5xl text-champagne-500">
                  {p.n}
                </span>
                <h3 className="v2-display text-2xl mt-4 text-ivory-50">{p.title}</h3>
                <p className="mt-3 text-muted leading-relaxed text-sm">{p.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
