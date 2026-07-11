import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Good Goddess Almighty terms and conditions placeholder.',
  alternates: { canonical: '/terms' },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <section className="pt-32 pb-24 sm:pt-40 sm:pb-32 bg-ivory-50 text-onyx-900">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <p className="eyebrow text-champagne-600">Legal</p>
        <h1 className="display-serif text-display-md mt-6">Terms &amp; conditions</h1>
        <p className="mt-6 text-onyx-900/55 text-sm">
          TODO — replace with the client&apos;s approved terms of service.
        </p>
        <div className="mt-10 space-y-6 text-onyx-900/85 leading-relaxed">
          <p>
            These terms will govern use of this website and any engagement with Good
            Goddess Almighty. Topics expected to be covered include acceptable use,
            intellectual property in our portfolio, scope of services, payment terms
            for retained engagements, and limitation of liability.
          </p>
          <p>
            For contractual questions, contact{' '}
            <a className="underline" href="mailto:admin@goodgoddessalmighty.com">
              admin@goodgoddessalmighty.com
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
