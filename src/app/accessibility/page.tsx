import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accessibility Statement',
  description:
    'Good Goddess Almighty accessibility statement. Targeting WCAG 2.2 AA across the website.',
  alternates: { canonical: '/accessibility' },
};

export default function AccessibilityPage() {
  return (
    <section className="pt-32 pb-24 sm:pt-40 sm:pb-32 bg-ivory-50 text-onyx-900">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <p className="eyebrow text-champagne-600">Accessibility</p>
        <h1 className="display-serif text-display-md mt-6">Accessibility statement</h1>
        <div className="mt-10 space-y-6 text-onyx-900/85 leading-relaxed">
          <p>
            Good Goddess Almighty is committed to making this website usable for as
            many people as possible. We design and develop with the Web Content
            Accessibility Guidelines (WCAG) 2.2 Level AA as our target standard.
          </p>
          <p>
            Steps taken include semantic HTML landmarks, keyboard-only navigation,
            visible focus states, high-contrast color choices, alternative text for
            meaningful imagery, accessible form labels and error messaging, and
            respect for users&apos; reduced-motion preferences.
          </p>
          <p>
            If you encounter a barrier to access, please contact{' '}
            <a className="underline" href="mailto:admin@goodgoddessalmighty.com">
              admin@goodgoddessalmighty.com
            </a>{' '}
            so we can address it.
          </p>
        </div>
      </div>
    </section>
  );
}
