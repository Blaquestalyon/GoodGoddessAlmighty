import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SITE } from '@/data/site';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-display',
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
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-screen bg-ivory-50 text-onyx-900 antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:bg-onyx-900 focus:text-ivory-50"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Script
          id="ld-json"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
