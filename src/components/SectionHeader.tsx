import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

interface Props {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: 'left' | 'center';
  light?: boolean;
}

export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = 'left',
  light = false,
}: Props) {
  return (
    <div
      className={
        align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'
      }
    >
      {eyebrow && (
        <Reveal as="p" className={`eyebrow ${light ? 'text-champagne-500' : 'text-champagne-600'}`}>
          {eyebrow}
        </Reveal>
      )}
      <Reveal
        as="h2"
        delay={0.05}
        className={`display-serif text-display-md mt-4 ${
          light ? 'text-ivory-50' : 'text-onyx-900'
        }`}
      >
        {title}
      </Reveal>
      {intro && (
        <Reveal
          as="p"
          delay={0.1}
          className={`mt-6 text-lg leading-relaxed ${
            light ? 'text-ivory-50/75' : 'text-onyx-900/75'
          }`}
        >
          {intro}
        </Reveal>
      )}
    </div>
  );
}
