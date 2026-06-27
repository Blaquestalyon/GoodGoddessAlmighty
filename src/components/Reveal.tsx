'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode, HTMLAttributes } from 'react';
import { createElement } from 'react';

type RevealTag = 'div' | 'section' | 'article' | 'span' | 'li' | 'h1' | 'h2' | 'h3' | 'p' | 'ol' | 'ul' | 'dd' | 'dt';

// Narrow set of HTML attributes safe to forward — avoids Framer Motion's
// drag-handler type collision with React's drag-event handlers.
interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: RevealTag;
  y?: number;
  id?: string;
  role?: HTMLAttributes<HTMLElement>['role'];
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-hidden'?: boolean | 'false' | 'true';
  'aria-busy'?: boolean;
  'aria-live'?: 'off' | 'polite' | 'assertive';
}

/**
 * Lightweight scroll-reveal. Respects `prefers-reduced-motion` — when reduced,
 * children render in their final state with no animation.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = 'div',
  y = 24,
  ...rest
}: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return createElement(as, { className, ...rest }, children);
  }

  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
