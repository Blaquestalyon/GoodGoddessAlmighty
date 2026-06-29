import type { Metadata } from 'next';
import { PreviewBanner } from '@/components/PreviewBanner';

export const metadata: Metadata = {
  title: { default: 'Preview · Good Goddess Almighty', template: '%s · Preview · GGA' },
  description:
    'Preview of proposed site updates for Good Goddess Almighty. Not the live site.',
  robots: { index: false, follow: false },
};

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PreviewBanner />
      {/* Extra top padding so the banner doesn't overlap the fixed header */}
      <div className="pt-8 sm:pt-9">{children}</div>
    </>
  );
}
