export const SITE = {
  name: 'Good Goddess Almighty',
  shortName: 'GGA',
  tagline: 'Fearless creativity for forward-thinking brands. Stand out with us.',
  description:
    'Good Goddess Almighty is a boutique experiential marketing and brand ambassador firm. We contract, train, and provide polished, highly capable ambassadors who help companies create memorable in-person and digital brand experiences.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.goodgoddessalmighty.com',
  // Contact details pulled from the legacy site — confirm with client before launch.
  contact: {
    email: 'admin@goodgoddessalmighty.com',
    phone: '706-627-7504',
    phoneHref: 'tel:+17066277504',
    address: {
      street: '4319 Rum Runner Rd',
      city: 'Austin',
      region: 'TX',
      postal: '78734',
      country: 'US',
    },
  },
  // TODO: legacy site had unconfigured social placeholders — replace with the client's
  // actual handles before launch. Set to null to hide a row in the footer.
  social: {
    instagram: null as string | null,
    facebook: null as string | null,
    linkedin: null as string | null,
    tiktok: null as string | null,
  },
} as const;

export const NAV = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/contact', label: 'Contact' },
] as const;

export interface Service {
  slug: string;
  title: string;
  short: string;
  who: string;
  what: string;
  why: string;
  cta: string;
}

export const SERVICES: Service[] = [
  {
    slug: 'brand-ambassadors',
    title: 'Brand Ambassadors',
    short: 'Polished, professional faces of your brand — booked by the hour, the day, or the season.',
    who: 'For brands that need consistent, on-message representation at retail, events, and pop-ups.',
    what:
      'Pre-vetted ambassadors, brand-specific training, wardrobe direction, day-of management, and reporting after every shift.',
    why:
      'Generic staffing agencies treat people like inventory. We treat your ambassadors like an extension of your marketing team — because they are.',
    cta: 'Book ambassadors',
  },
  {
    slug: 'experiential-marketing',
    title: 'Experiential Marketing',
    short: 'Brand moments people choose to talk about, post about, and remember.',
    who: 'For brand teams launching products, expanding to new markets, or refreshing how they show up in culture.',
    what:
      'Concepting, location scouting, ambassador staffing, on-site choreography, content capture, and post-event recap.',
    why:
      'A great activation earns paid media without paying for it. We design experiences guests want to share before they leave.',
    cta: 'Plan an activation',
  },
  {
    slug: 'on-site-activations',
    title: 'On-Site Activations',
    short: 'Retail, pop-up, festival, and trade-floor execution that converts foot traffic into fans.',
    who: 'For category managers, field marketing leads, and agency producers running multi-market programs.',
    what:
      'Turn-key teams, equipment coordination, sampling and demo flows, lead capture, and end-of-day reporting.',
    why:
      'On-site is where strategy becomes reality. We sweat the choreography so the activation feels effortless.',
    cta: 'Staff an activation',
  },
  {
    slug: 'event-staffing',
    title: 'Event Staffing',
    short: 'Hosts, greeters, registration leads, and brand reps who set the tone the moment a guest arrives.',
    who: 'For corporate event planners, gala producers, conferences, and private dinners.',
    what:
      'Curated rosters, dress-code direction, briefing decks, on-site lead, and same-night recap.',
    why:
      'The first thirty seconds of an event shape the next four hours. We staff for that opening impression.',
    cta: 'Staff your event',
  },
  {
    slug: 'influencer-campaigns',
    title: 'Influencer Campaigns',
    short: 'Creator partnerships that feel earned, not transactional.',
    who: 'For DTC and lifestyle brands building social proof in beauty, fashion, hospitality, and wellness.',
    what:
      'Talent sourcing, contract negotiation, content briefs, shoot coordination, and post-campaign reporting.',
    why:
      'The right creator at the right moment outperforms a much larger paid spend. We match brand to voice with care.',
    cta: 'Build a creator program',
  },
  {
    slug: 'fashion-showcases',
    title: 'Fashion Showcases',
    short: 'Runway moments, lookbook shoots, and trunk shows produced with editorial taste.',
    who: 'For emerging designers, boutique retailers, and brand partners staging seasonal stories.',
    what:
      'Model and ambassador casting, run-of-show direction, dresser coordination, and BTS content.',
    why:
      'Fashion is in our DNA. We bring runway polish to brand activations and brand polish to fashion stages.',
    cta: 'Produce a showcase',
  },
  {
    slug: 'photography-content',
    title: 'Photography & Content',
    short: 'Editorial-grade stills and short-form video captured the day your activation happens.',
    who: 'For social, PR, and brand teams who need same-week assets — not raw files weeks later.',
    what:
      'Lifestyle, portrait, and event coverage; selects within 48 hours; full delivery within a week.',
    why:
      'A great activation deserves great content. Otherwise it lives once and disappears.',
    cta: 'Book content capture',
  },
  {
    slug: 'product-launch-support',
    title: 'Product Launch Support',
    short: 'End-to-end teams for launches that need to feel like a moment, not a memo.',
    who: 'For founders, marketing leads, and PR partners running launches, drops, and openings.',
    what:
      'Strategy, talent, on-site team, content capture, day-of run sheet, and post-launch reporting.',
    why:
      'You launch once. The team you choose decides whether it lands or gets lost in the feed.',
    cta: 'Plan your launch',
  },
];

export const PROCESS = [
  {
    n: '01',
    title: 'Discover the brand',
    body: 'A short, focused intake where we learn the voice, the audience, the goals, and the non-negotiables.',
  },
  {
    n: '02',
    title: 'Match the team',
    body: 'We cast and contract ambassadors who fit the room — by style, by skill, by temperament.',
  },
  {
    n: '03',
    title: 'Train & prepare',
    body: 'Brand-specific briefings, wardrobe direction, mock runs. Nothing is left to improvisation.',
  },
  {
    n: '04',
    title: 'Execute & capture',
    body: 'On-site leadership, real-time problem solving, editorial content delivered the same week.',
  },
];

export const PILLARS = [
  {
    title: 'Boutique by design',
    body:
      'You work directly with the team running your activation. Not an inbox. Not a tier-three coordinator.',
  },
  {
    title: 'Trained, not just booked',
    body:
      'Every ambassador receives brand-specific training before they ever face a guest. Polish is a process.',
  },
  {
    title: 'Brand-safe representation',
    body:
      'Professional presentation, cultural fluency, and a representation standard that protects your brand.',
  },
  {
    title: 'Memorable guest engagement',
    body:
      'We staff for conversation, not just coverage. Your guests remember the people, and the people remember your brand.',
  },
];
