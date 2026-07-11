import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Good Goddess Almighty privacy policy placeholder.',
  alternates: { canonical: '/privacy' },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <section className="pt-32 pb-24 sm:pt-40 sm:pb-32 bg-ivory-50 text-onyx-900">
      <div className="mx-auto max-w-3xl px-5 sm:px-8 prose-content">
        <p className="eyebrow text-champagne-600">Legal</p>
        <h1 className="display-serif text-display-md mt-6">Privacy policy</h1>
        <p className="mt-6 text-onyx-900/55 text-sm">
          TODO — replace with the client&apos;s approved privacy policy. This
          placeholder is shown only because the legacy site referenced a privacy page.
        </p>
        <div className="mt-10 space-y-6 text-onyx-900/85 leading-relaxed">
          <p>
            Good Goddess Almighty respects the privacy of every visitor, client, and
            prospective ambassador. This page will hold the formal policy describing
            what information we collect through the website (contact form submissions,
            standard server logs), how it is used, how long it is retained, and the
            third-party services we work with.
          </p>
          <p>
            For questions in the meantime, contact{' '}
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
