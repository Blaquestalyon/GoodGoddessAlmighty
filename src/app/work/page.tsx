import type { Metadata } from 'next';
import Link from 'next/link';
import { PortfolioGallery } from '@/components/PortfolioGallery';
import { Reveal } from '@/components/Reveal';
import { PORTFOLIO } from '@/data/portfolio';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Selected work from Good Goddess Almighty — brand ambassadors, influencer campaigns, on-site activations, events, fashion showcases, and editorial photography.',
  alternates: { canonical: '/work' },
};

export default function WorkPage() {
  return (
    <>
      <section className="pt-32 pb-12 sm:pt-40 sm:pb-16 bg-ivory-50">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal as="p" className="eyebrow text-champagne-600">
            Work · {PORTFOLIO.length} pieces
          </Reveal>
          <Reveal as="h1">
            <span className="display-serif text-display-lg mt-6 block leading-[0.98] max-w-4xl">
              Brand moments,{' '}
              <em className="text-plum-700">captured</em>.
            </span>
          </Reveal>
          <Reveal as="p" delay={0.1} className="mt-8 max-w-2xl text-lg text-onyx-900/75">
            A selection of recent activations, fashion showcases, influencer campaigns,
            and editorial work. Filter by discipline below.
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory-50 pb-24 sm:pb-32" aria-label="Portfolio gallery">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <PortfolioGallery />
        </div>
      </section>

      <section className="bg-onyx-900 text-ivory-50 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 text-center">
          <Reveal as="p" className="eyebrow text-champagne-500">
            See similar work for your brand
          </Reveal>
          <Reveal>
            <h2 className="display-serif text-display-md mt-4">
              Send us a brief and we&apos;ll come back with concepts.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <Link href="/contact" className="btn-ghost-light">
              Inquire about a project
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
