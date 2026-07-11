import Link from 'next/link';

export const metadata = {
  title: 'Page not found',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="min-h-[70vh] grid place-items-center bg-ivory-50 text-onyx-900 pt-32 pb-24">
      <div className="text-center px-5">
        <p className="eyebrow text-champagne-600">Error · 404</p>
        <h1 className="display-serif text-display-lg mt-6">
          This page <em className="text-plum-700">is somewhere else</em>.
        </h1>
        <p className="mt-6 text-onyx-900/75 max-w-md mx-auto">
          The link you followed may be broken, or the page may have been moved.
        </p>
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <Link href="/" className="btn-primary">
            Home
          </Link>
          <Link href="/work" className="btn-ghost">
            View our work
          </Link>
        </div>
      </div>
    </section>
  );
}
