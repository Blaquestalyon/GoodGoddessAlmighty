'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

/**
 * RouteChrome — renders its children (the live-site Header/Footer) everywhere
 * EXCEPT under the /v2 preview, which ships its own chrome. Children are
 * passed through as-is, so live routes are untouched. Delete this wrapper
 * together with the /v2 route group when the redesign is promoted.
 */
export function RouteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname === '/v2' || pathname.startsWith('/v2/')) return null;
  return <>{children}</>;
}
