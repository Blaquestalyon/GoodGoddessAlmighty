import type { Metadata } from 'next';
import Link from 'next/link';
import { V2Gallery } from '@/components/v2/V2Gallery';
import { Reveal } from '@/components/Reveal';
import { PORTFOLIO } from '@/data/portfolio';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Selected work from Good Goddess Almighty — brand ambassadors, influencer campaigns, on-site activations, events, fashion showcases, and editorial photography.',
};

export default function V2WorkPage() {
  return (
    <>
      <section className="pt-36 pb-12 sm:pt-44 sm:pb-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal as="p" className="v2-eyebrow">
            Work · {PORTFOLIO.length} pieces
          </Reveal>
          <Reveal as="h1">
            <span className="v2-display text-v2-lg mt-6 block leading-[0.98] max-w-4xl">
              Brand moments, <em className="text-fuchsia">captured</em>.
            </span>
          </Reveal>
          <Reveal as="p" delay={0.1} className="mt-8 max-w-2xl text-lg text-muted">
            A selection of recent activations, fashion showcases, influencer campaigns,
            and editorial work. Filter by discipline below.
          </Reveal>
        </div>
      </section>

      <section className="pb-24 sm:pb-32" aria-label="Portfolio gallery">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <V2Gallery />
        </div>
      </section>

      <section className="bg-obsidian border-t border-champagne-500/15 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 text-center">
          <Reveal as="p" className="v2-eyebrow">
            See similar work for your brand
          </Reveal>
          <Reveal>
            <h2 className="v2-display text-v2-md mt-4">
              Send us a brief and we&apos;ll come back with concepts.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <Link href="/v2/contact" className="btn-cta">
              Inquire about a project
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
