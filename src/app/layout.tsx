import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import './spotlight.css';
import { V2Header } from '@/components/v2/V2Header';
import { V2Footer } from '@/components/v2/V2Footer';
import { StickyCta } from '@/components/v2/StickyCta';
import { SITE } from '@/data/site';

const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-fraunces',
  axes: ['opsz'],
});

const sans = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-sans',
});

export const viewport: Viewport = {
  themeColor: '#0B0A0A',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Boutique Brand Ambassadors & Experiential Marketing`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    'brand ambassadors',
    'experiential marketing',
    'event staffing',
    'on-site activations',
    'influencer campaigns',
    'fashion showcase',
    'product launch',
    'Austin Texas',
  ],
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE.url,
    title: `${SITE.name} — Boutique Brand Ambassadors & Experiential Marketing`,
    description: SITE.description,
    siteName: SITE.name,
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: `${SITE.name} — fearless creativity for forward-thinking brands.`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} — Boutique Brand Ambassadors & Experiential Marketing`,
    description: SITE.description,
    images: ['/og.png'],
  },
  icons: {
    icon: [{ url: '/icon.png', type: 'image/png' }],
    apple: '/apple-icon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'Marketing',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: SITE.name,
  alternateName: 'GGA',
  url: SITE.url,
  email: `mailto:${SITE.contact.email}`,
  telephone: SITE.contact.phone,
  description: SITE.description,
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.contact.address.street,
    addressLocality: SITE.contact.address.city,
    addressRegion: SITE.contact.address.region,
    postalCode: SITE.contact.address.postal,
    addressCountry: SITE.contact.address.country,
  },
  areaServed: { '@type': 'Country', name: 'United States' },
  knowsAbout: [
    'Brand ambassadors',
    'Experiential marketing',
    'On-site activations',
    'Event staffing',
    'Influencer campaigns',
    'Fashion showcases',
    'Photography and content capture',
    'Product launch support',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${sans.variable}`}>
      <body className="v2 min-h-screen bg-ink text-ivory-50 antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:bg-champagne-500 focus:text-onyx-900"
        >
          Skip to main content
        </a>
        <V2Header />
        <main id="main">{children}</main>
        <V2Footer />
        <StickyCta />
        <Script
          id="ld-json"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
