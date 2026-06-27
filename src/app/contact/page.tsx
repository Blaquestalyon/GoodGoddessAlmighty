import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Reveal } from '@/components/Reveal';
import { ContactForm } from '@/components/ContactForm';
import { SITE } from '@/data/site';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Tell us about the moment you are building. Good Goddess Almighty replies to brand briefs within one business day.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <section className="pt-32 pb-12 sm:pt-40 sm:pb-16 bg-ivory-50">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal as="p" className="eyebrow text-champagne-600">
            Contact
          </Reveal>
          <Reveal as="h1">
            <span className="display-serif text-display-lg mt-6 block leading-[0.98] max-w-4xl">
              Send a brief.{' '}
              <em className="text-plum-700">Get a same-week reply.</em>
            </span>
          </Reveal>
          <Reveal as="p" delay={0.1} className="mt-8 max-w-2xl text-lg text-onyx-900/75">
            For brand teams, event producers, agencies, and founders. A few sentences is
            plenty — we&apos;ll come back with questions, ideas, and a recommended team.
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory-50 pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Suspense fallback={<div className="h-96" aria-busy="true" />}>
              <ContactForm />
            </Suspense>
          </div>

          <aside className="lg:col-span-5">
            <div className="bg-onyx-900 text-ivory-50 p-8 sm:p-10">
              <p className="eyebrow text-champagne-500">Or reach us directly</p>
              <dl className="mt-6 space-y-6">
                <div>
                  <dt className="eyebrow text-ivory-50/50">Email</dt>
                  <dd className="mt-2">
                    <a
                      href={`mailto:${SITE.contact.email}`}
                      className="display-serif italic text-2xl hover:text-champagne-500 transition-colors break-all"
                    >
                      {SITE.contact.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-ivory-50/50">Phone</dt>
                  <dd className="mt-2">
                    <a
                      href={SITE.contact.phoneHref}
                      className="display-serif italic text-2xl hover:text-champagne-500 transition-colors"
                    >
                      {SITE.contact.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-ivory-50/50">Based in</dt>
                  <dd className="mt-2 display-serif italic text-2xl">
                    {SITE.contact.address.city}, {SITE.contact.address.region}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-ivory-50/50">Hours</dt>
                  <dd className="mt-2 text-ivory-50/80 leading-relaxed">
                    Mon–Fri · 9am–6pm CT
                    <br />
                    Activations: anytime by arrangement
                  </dd>
                </div>
              </dl>
            </div>

            <div className="border border-onyx-900/15 p-8 sm:p-10 mt-4">
              <p className="eyebrow text-champagne-600">What to include</p>
              <ul className="mt-6 space-y-3 text-onyx-900/80 text-sm leading-relaxed">
                <li>The brand, product, or event you&apos;re building around.</li>
                <li>Approximate date or window.</li>
                <li>City or markets.</li>
                <li>Team size, if you already have a sense of it.</li>
                <li>Anything off the table — venues, talent types, content.</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
