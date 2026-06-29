import { SmartImage } from '@/components/SmartImage';
import Link from 'next/link';
import { PORTFOLIO, CATEGORIES } from '@/data/portfolio';
import { SERVICES, PROCESS, PILLARS, SITE } from '@/data/site';
import { Reveal } from '@/components/Reveal';
import { SectionHeader } from '@/components/SectionHeader';

// Hero composition: three high-quality verticals from different categories
// — handpicked to communicate range without claiming any single client.
const HERO_FRAMES = [
  PORTFOLIO.find((p) => p.src.endsWith('influencer-05.jpg'))!,
  PORTFOLIO.find((p) => p.src.endsWith('events-07.jpg'))!,
  PORTFOLIO.find((p) => p.src.endsWith('fashion-04.jpg'))!,
];

// Featured grid (mixed categories) — small curated set on the homepage,
// users click through to /work for the full portfolio.
const FEATURED = [
  PORTFOLIO.find((p) => p.src.endsWith('events-12.jpg'))!,
  PORTFOLIO.find((p) => p.src.endsWith('photo-15.jpg'))!,
  PORTFOLIO.find((p) => p.src.endsWith('onsite-04.jpg'))!,
  PORTFOLIO.find((p) => p.src.endsWith('fashion-08.jpg'))!,
  PORTFOLIO.find((p) => p.src.endsWith('influencer-02.jpg'))!,
  PORTFOLIO.find((p) => p.src.endsWith('events-19.jpg'))!,
];

export default function HomePage() {
  const lcpAvif = HERO_FRAMES[0].src.replace(/\.jpe?g$/i, '.avif');
  const lcpWebp = HERO_FRAMES[0].src.replace(/\.jpe?g$/i, '.webp');
  return (
    <>
      {/* Preload the LCP hero in modern formats for a measurable boost. */}
      <link
        rel="preload"
        as="image"
        href={lcpAvif}
        type="image/avif"
        // @ts-expect-error fetchpriority not yet in DOM lib types in some setups
        fetchpriority="high"
      />
      <link rel="preload" as="image" href={lcpWebp} type="image/webp" />
      {/* ----------------------- HERO ----------------------- */}
      <section
        aria-labelledby="hero-heading"
        className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 bg-ivory-50 overflow-hidden"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid gap-14 lg:grid-cols-12 lg:gap-10 lg:items-start">
          <div className="lg:col-span-7 relative z-10">
            <Reveal as="p" className="eyebrow text-champagne-600">
              Boutique experiential marketing · Brand ambassadors
            </Reveal>
            <Reveal as="h1" delay={0.1}>
              <span
                id="hero-heading"
                className="display-serif text-display-xl block mt-6 leading-[0.95]"
              >
                Fearless creativity{' '}
                <span className="italic text-plum-700">for forward-thinking</span> brands.
              </span>
            </Reveal>
            <Reveal as="p" delay={0.2} className="mt-8 max-w-xl text-lg text-onyx-900/75 leading-relaxed">
              Good Goddess Almighty contracts, trains, and provides polished, highly
              capable ambassadors who help brands create memorable in-person and digital
              experiences. Stand out with us.
            </Reveal>
            <Reveal delay={0.3} className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">
                Book brand ambassadors
              </Link>
              <Link href="/work" className="btn-ghost">
                View our work
              </Link>
            </Reveal>
          </div>

          {/* Hero composition */}
          <div className="lg:col-span-5 relative">
            {/* Brand mark above the photo collage */}
            <Reveal className="mb-5 sm:mb-6" delay={0.05}>
              <div className="relative mx-auto lg:mx-0 w-40 sm:w-48 lg:w-56 aspect-square">
                <SmartImage
                  src="/images/brand/gga-logo.jpg"
                  alt="Good Goddess Almighty logo"
                  fill
                  sizes="(min-width: 1024px) 14rem, (min-width: 640px) 12rem, 10rem"
                  className="object-contain"
                  loading="eager"
                />
              </div>
            </Reveal>
            <div className="grid grid-cols-12 gap-3 sm:gap-4">
              <Reveal className="col-span-7 row-span-2" delay={0.15}>
                <div className="relative aspect-[3/4] overflow-hidden bg-onyx-800">
                  <SmartImage
                    src={HERO_FRAMES[0].src}
                    alt={HERO_FRAMES[0].alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, 60vw"
                    className="object-cover"
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
              </Reveal>
              <Reveal className="col-span-5" delay={0.3}>
                <div className="relative aspect-square overflow-hidden bg-onyx-800">
                  <SmartImage
                    src={HERO_FRAMES[1].src}
                    alt={HERO_FRAMES[1].alt}
                    fill
                    sizes="(min-width: 1024px) 20vw, 40vw"
                    className="object-cover"
                    loading="eager"
                  />
                </div>
              </Reveal>
              <Reveal className="col-span-5" delay={0.45}>
                <div className="relative aspect-[4/5] overflow-hidden bg-onyx-800">
                  <SmartImage
                    src={HERO_FRAMES[2].src}
                    alt={HERO_FRAMES[2].alt}
                    fill
                    sizes="(min-width: 1024px) 20vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            </div>
            <div
              aria-hidden="true"
              className="absolute -z-10 -top-10 -right-10 h-72 w-72 rounded-full bg-blush-200/60 blur-3xl"
            />
          </div>
        </div>

        {/* Marquee */}
        <div
          className="mt-20 sm:mt-28 border-y border-onyx-900/10 py-5 overflow-hidden marquee-mask"
          aria-hidden="true"
        >
          <div className="flex gap-12 animate-marquee whitespace-nowrap will-change-transform">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-12 shrink-0 items-center">
                {[
                  'Experiential Marketing',
                  'Brand Ambassadors',
                  'On-Site Activations',
                  'Event Staffing',
                  'Influencer Campaigns',
                  'Fashion Showcases',
                  'Photography & Content',
                  'Product Launches',
                ].map((w) => (
                  <span
                    key={w}
                    className="display-serif italic text-2xl sm:text-3xl text-onyx-900/80"
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

      {/* ----------------------- BRAND PROMISE ----------------------- */}
      <section className="bg-ivory-100 py-24 sm:py-32" aria-labelledby="promise-heading">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal as="p" className="eyebrow text-champagne-600">
              The promise
            </Reveal>
            <Reveal as="h2" delay={0.05}>
              <span id="promise-heading" className="display-serif text-display-md mt-4 block">
                Brand moments people <em className="text-plum-700">choose</em> to remember.
              </span>
            </Reveal>
          </div>
          <div className="lg:col-span-7 space-y-6 text-lg leading-relaxed text-onyx-900/80">
            <Reveal as="p" delay={0.05}>
              We are a boutique experiential marketing and brand ambassador firm. We help
              brands show up in culture with intention — at launches, activations, retail
              moments, showcases, and the press-worthy events in between.
            </Reveal>
            <Reveal as="p" delay={0.15}>
              Our ambassadors aren&apos;t booked from a database. They&apos;re cast,
              trained, and prepared for your brand specifically — so the people
              representing you in public match the standard you set in private.
            </Reveal>
            <Reveal delay={0.25} className="pt-4 flex flex-wrap gap-x-10 gap-y-3 text-sm uppercase tracking-widest text-onyx-900/60">
              <span>Brands</span>
              <span>·</span>
              <span>Launches</span>
              <span>·</span>
              <span>Activations</span>
              <span>·</span>
              <span>Showcases</span>
              <span>·</span>
              <span>Experiences</span>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ----------------------- SERVICES ----------------------- */}
      <section className="bg-ivory-50 py-24 sm:py-32" aria-labelledby="services-heading">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SectionHeader
                eyebrow="Services"
                title={
                  <span id="services-heading">
                    What we <em className="text-plum-700">produce</em>.
                  </span>
                }
              />
            </div>
            <div className="lg:col-span-5 lg:text-right">
              <Reveal>
                <Link href="/services" className="btn-ghost">
                  All services
                </Link>
              </Reveal>
            </div>
          </div>

          <ul className="mt-16 grid gap-px bg-onyx-900/10 sm:grid-cols-2 lg:grid-cols-4 overflow-hidden">
            {SERVICES.map((s, i) => (
              <Reveal as="li" key={s.slug} delay={(i % 4) * 0.05}>
                <Link
                  href={`/services#${s.slug}`}
                  className="group block h-full bg-ivory-50 p-7 hover:bg-ivory-100 transition-colors"
                >
                  <span className="eyebrow text-champagne-600">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="display-serif text-2xl mt-4">{s.title}</h3>
                  <p className="mt-3 text-onyx-900/70 text-sm leading-relaxed">{s.short}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-xs tracking-widest uppercase text-onyx-900 group-hover:gap-3 transition-all">
                    Learn more <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ----------------------- WHY GGA ----------------------- */}
      <section className="bg-onyx-900 text-ivory-50 py-24 sm:py-32" aria-labelledby="why-heading">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal as="p" className="eyebrow text-champagne-500">
              Why GGA
            </Reveal>
            <Reveal as="h2" delay={0.05}>
              <span id="why-heading" className="display-serif text-display-md mt-4 block">
                Boutique attention. <em className="text-blush-300">Brand-safe</em> polish.
              </span>
            </Reveal>
            <Reveal as="p" delay={0.15} className="mt-6 text-ivory-50/75 text-lg leading-relaxed">
              We work with a small number of brands at a time, on purpose. That&apos;s how
              we keep our standards — and yours — non-negotiable.
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

      {/* ----------------------- FEATURED WORK ----------------------- */}
      <section className="bg-ivory-50 py-24 sm:py-32" aria-labelledby="work-heading">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <SectionHeader
                eyebrow="Featured work"
                title={
                  <span id="work-heading">
                    Recent <em className="text-plum-700">activations</em>.
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
                <Link href="/work" className="btn-ghost">
                  See the full portfolio
                </Link>
              </Reveal>
            </div>
          </div>

          <ul className="mt-16 grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-6 lg:grid-rows-2">
            {FEATURED.map((item, i) => {
              // Editorial asymmetric layout on large screens
              const span = [
                'lg:col-span-2 lg:row-span-2',
                'lg:col-span-2',
                'lg:col-span-2',
                'lg:col-span-2',
                'lg:col-span-2',
                'lg:col-span-2',
              ][i];
              return (
                <Reveal as="li" key={item.src} delay={i * 0.05} className={span}>
                  <div className="relative h-full overflow-hidden bg-onyx-800 aspect-[4/5]">
                    <SmartImage
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, 50vw"
                      className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                    />
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ----------------------- PROCESS ----------------------- */}
      <section className="bg-ivory-100 py-24 sm:py-32" aria-labelledby="process-heading">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeader
            eyebrow="Process"
            title={
              <span id="process-heading">
                Four steps from <em className="text-plum-700">brief</em> to brand moment.
              </span>
            }
            intro="Designed to be calm, organized, and respectful of your timeline — even when production is anything but."
          />
          <ol className="mt-16 grid gap-px bg-onyx-900/10 sm:grid-cols-2 lg:grid-cols-4 overflow-hidden">
            {PROCESS.map((p, i) => (
              <Reveal as="li" key={p.n} delay={i * 0.05} className="bg-ivory-100 p-7">
                <span className="display-serif italic text-5xl text-champagne-600">{p.n}</span>
                <h3 className="display-serif text-2xl mt-4">{p.title}</h3>
                <p className="mt-3 text-onyx-900/70 leading-relaxed text-sm">{p.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ----------------------- CTA ----------------------- */}
      <section
        className="bg-plum-700 text-ivory-50 py-28 sm:py-36 relative overflow-hidden"
        aria-labelledby="cta-heading"
      >
        <div
          aria-hidden="true"
          className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-champagne-500/30 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-blush-300/20 blur-3xl"
        />
        <div className="relative mx-auto max-w-4xl px-5 sm:px-8 text-center">
          <Reveal as="p" className="eyebrow text-champagne-500">
            Let&apos;s build something
          </Reveal>
          <Reveal>
            <h2
              id="cta-heading"
              className="display-serif text-display-lg mt-6 leading-[1.0]"
            >
              Ready to make your brand{' '}
              <em className="text-champagne-500">unforgettable</em>?
            </h2>
          </Reveal>
          <Reveal as="p" delay={0.1} className="mt-6 text-lg text-ivory-50/80 max-w-2xl mx-auto">
            Tell us about the moment you&apos;re building. We&apos;ll put together a
            tailored team and a same-week proposal.
          </Reveal>
          <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-3 justify-center">
            <Link href="/contact" className="btn-ghost-light">
              Start a project
            </Link>
            <a href={SITE.contact.phoneHref} className="btn-ghost-light">
              Call {SITE.contact.phone}
            </a>
          </Reveal>
        </div>
      </section>

      {/* ----------------------- CONTACT PREVIEW ----------------------- */}
      <section className="bg-ivory-50 py-24 sm:py-32" aria-labelledby="contact-preview-heading">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <Reveal as="p" className="eyebrow text-champagne-600">
              Contact
            </Reveal>
            <Reveal>
              <h2
                id="contact-preview-heading"
                className="display-serif text-display-md mt-4"
              >
                A quick conversation goes a long way.
              </h2>
            </Reveal>
            <Reveal as="p" delay={0.1} className="mt-6 text-lg text-onyx-900/75 leading-relaxed max-w-lg">
              For brand teams, event producers, agency partners, and founders — we&apos;ll
              reply within one business day.
            </Reveal>
          </div>
          <dl className="lg:col-span-6 grid gap-px bg-onyx-900/10 sm:grid-cols-2 overflow-hidden border border-onyx-900/10">
            <Reveal as="div" className="bg-ivory-50 p-7">
              <dt className="eyebrow text-onyx-900/50">Email</dt>
              <dd className="mt-3">
                <a
                  href={`mailto:${SITE.contact.email}`}
                  className="display-serif italic text-xl hover:text-plum-700 transition-colors"
                >
                  {SITE.contact.email}
                </a>
              </dd>
            </Reveal>
            <Reveal as="div" delay={0.05} className="bg-ivory-50 p-7">
              <dt className="eyebrow text-onyx-900/50">Phone</dt>
              <dd className="mt-3">
                <a
                  href={SITE.contact.phoneHref}
                  className="display-serif italic text-xl hover:text-plum-700 transition-colors"
                >
                  {SITE.contact.phone}
                </a>
              </dd>
            </Reveal>
            <Reveal as="div" delay={0.1} className="bg-ivory-50 p-7">
              <dt className="eyebrow text-onyx-900/50">Based in</dt>
              <dd className="mt-3 display-serif italic text-xl">
                {SITE.contact.address.city}, {SITE.contact.address.region}
              </dd>
            </Reveal>
            <Reveal as="div" delay={0.15} className="bg-ivory-50 p-7">
              <dt className="eyebrow text-onyx-900/50">Available</dt>
              <dd className="mt-3 display-serif italic text-xl">Nationwide</dd>
            </Reveal>
          </dl>
        </div>
      </section>
    </>
  );
}
