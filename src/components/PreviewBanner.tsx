import Link from 'next/link';

/**
 * Thin banner shown on every /preview/* page so reviewers know they're
 * looking at a proposal, not the live site. Removed when the preview
 * is promoted to the real routes.
 */
export function PreviewBanner() {
  return (
    <div className="fixed top-0 inset-x-0 z-[60] bg-plum-700 text-ivory-50 text-xs sm:text-sm tracking-wide">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-2 flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
        <p>
          <span className="uppercase tracking-widest font-medium text-champagne-500">Preview</span>{' '}
          <span className="text-ivory-50/80">
            — proposed site updates. Not yet live.
          </span>
        </p>
        <Link
          href="/"
          className="underline decoration-champagne-500/60 underline-offset-4 hover:text-champagne-500 transition-colors"
        >
          Back to live site →
        </Link>
      </div>
    </div>
  );
}
