import type { Metadata } from 'next';
import { Fraunces } from 'next/font/google';
import './v2.css';
import { V2Header } from '@/components/v2/V2Header';
import { V2Footer } from '@/components/v2/V2Footer';
import { StickyCta } from '@/components/v2/StickyCta';

/**
 * SPOTLIGHT preview layout. Everything here is scoped to /v2:
 * the Fraunces variable, the .v2 class (all v2.css rules), and the
 * preview chrome. The live-site Header/Footer hide themselves under
 * /v2 via <RouteChrome> in the root layout.
 */
const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-fraunces',
  axes: ['opsz'],
});

export const metadata: Metadata = {
  title: {
    default: 'Preview (v2)',
    template: '%s · Preview (v2) · Good Goddess Almighty',
  },
  // Live preview only — never index.
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`v2 ${fraunces.variable} min-h-screen bg-ink text-ivory-50`}>
      <V2Header />
      {children}
      <V2Footer />
      <StickyCta />
    </div>
  );
}
