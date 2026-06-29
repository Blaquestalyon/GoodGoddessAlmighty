import type { SVGProps } from 'react';

/**
 * GGA monogram — interlocking G's set inside a soft rounded square.
 * Drawn in `currentColor` so it inherits ink/ivory from context.
 */
export function LogoMark({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      role="img"
      aria-label="Good Goddess Almighty monogram"
      className={className}
      {...props}
    >
      <rect x="2" y="2" width="60" height="60" rx="14" stroke="currentColor" strokeWidth="1.5" />
      {/* Left G */}
      <path
        d="M28 22a8 8 0 1 0 0 14h4v-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right G mirrored */}
      <path
        d="M40 28v-2a8 8 0 1 0 0 12h-4v-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Center divider dot */}
      <circle cx="34" cy="32" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function Logo({
  className = '',
  variant = 'horizontal',
}: {
  className?: string;
  variant?: 'horizontal' | 'stacked';
}) {
  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center gap-2 ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/brand/gga-logo.jpg"
          alt=""
          aria-hidden="true"
          className="h-12 w-12 object-contain"
        />
        <span className="display-serif text-xl leading-none tracking-tight">
          Good Goddess Almighty
        </span>
      </div>
    );
  }
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/brand/gga-logo.jpg"
        alt=""
        aria-hidden="true"
        className="h-10 w-10 sm:h-11 sm:w-11 object-contain shrink-0"
      />
      <span className="display-serif text-lg sm:text-xl leading-none tracking-tight whitespace-nowrap">
        Good Goddess Almighty
      </span>
    </div>
  );
}
