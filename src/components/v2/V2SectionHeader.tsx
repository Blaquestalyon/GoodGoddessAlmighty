import type { ReactNode } from 'react';
import { Reveal } from '@/components/Reveal';

interface Props {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: 'left' | 'center';
  /** Set true on ivory light-relief sections. */
  onLight?: boolean;
}

/**
 * SPOTLIGHT section header — gold eyebrow, Fraunces headline, muted intro.
 */
export function V2SectionHeader({
  eyebrow,
  title,
  intro,
  align = 'left',
  onLight = false,
}: Props) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {eyebrow && (
        <Reveal as="p" className={`v2-eyebrow ${onLight ? '!text-champagne-600' : ''}`}>
          {eyebrow}
        </Reveal>
      )}
      <Reveal
        as="h2"
        delay={0.05}
        className={`v2-display text-v2-md mt-4 ${onLight ? 'text-onyx-900' : 'text-ivory-50'}`}
      >
        {title}
      </Reveal>
      {intro && (
        <Reveal
          as="p"
          delay={0.1}
          className={`mt-6 text-lg leading-relaxed ${
            onLight ? 'text-onyx-900/75' : 'text-muted'
          }`}
        >
          {intro}
        </Reveal>
      )}
    </div>
  );
}
