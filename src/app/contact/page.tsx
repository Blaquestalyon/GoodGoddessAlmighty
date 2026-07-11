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

/**
 * The form itself reuses the live <ContactForm /> (same /api/contact wiring,
 * same validation) inside an ivory light-relief panel — the SPOTLIGHT dark
 * canvas frames it, the proven form logic stays untouched.
 */
export default function ContactPage() {
  return (
    <>
      <section className="pt-36 pb-12 sm:pt-44 sm:pb-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal as="p" className="v2-eyebrow">
            Contact
          </Reveal>
          <Reveal as="h1">
            <span className="v2-display text-v2-lg mt-6 block leading-[0.98] max-w-4xl">
              Send a brief. <em className="text-fuchsia">Get a same-week reply.</em>
            </span>
          </Reveal>
          <Reveal as="p" delay={0.1} className="mt-8 max-w-2xl text-lg text-muted">
            For brand teams, event producers, agencies, and founders. A few sentences is
            plenty — we&apos;ll come back with questions, ideas, and a recommended team.
          </Reveal>
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid gap-8 lg:gap-14 lg:grid-cols-12">
          {/* Ivory light-relief panel hosts the live form untouched */}
          <div className="lg:col-span-7">
            <div className="bg-ivory-50 text-onyx-900 rounded-[2px] border border-champagne-500/25 p-7 sm:p-10">
              <Suspense fallback={<div className="h-96" aria-busy="true" />}>
                <ContactForm />
              </Suspense>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="bg-elevated border border-champagne-500/15 rounded-[2px] p-8 sm:p-10">
              <p className="v2-eyebrow">Or reach us directly</p>
              <dl className="mt-6 space-y-6">
                <div>
                  <dt className="v2-eyebrow !text-[0.65rem] !text-muted">Email</dt>
                  <dd className="mt-2">
                    <a
                      href={`mailto:${SITE.contact.email}`}
                      className="v2-display v2-italic text-2xl text-ivory-50 hover:text-champagne-500 transition-colors break-all"
                    >
                      {SITE.contact.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="v2-eyebrow !text-[0.65rem] !text-muted">Phone</dt>
                  <dd className="mt-2">
                    <a
                      href={SITE.contact.phoneHref}
                      className="v2-display v2-italic text-2xl text-ivory-50 hover:text-champagne-500 transition-colors"
                    >
                      {SITE.contact.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="v2-eyebrow !text-[0.65rem] !text-muted">Based in</dt>
                  <dd className="mt-2 v2-display v2-italic text-2xl text-ivory-50">
                    {SITE.contact.address.city}, {SITE.contact.address.region}
                  </dd>
                </div>
                <div>
                  <dt className="v2-eyebrow !text-[0.65rem] !text-muted">Hours</dt>
                  <dd className="mt-2 text-muted leading-relaxed">
                    Mon–Fri · 9am–6pm CT
                    <br />
                    Activations: anytime by arrangement
                  </dd>
                </div>
              </dl>
            </div>

            <div className="border border-champagne-500/25 rounded-[2px] p-8 sm:p-10 mt-4">
              <p className="v2-eyebrow">What to include</p>
              <ul className="mt-6 space-y-3 text-ivory-50/85 text-sm leading-relaxed">
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
