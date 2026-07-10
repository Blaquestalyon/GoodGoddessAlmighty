# Good Goddess Almighty — Website

A boutique experiential marketing & brand ambassador firm. Modern editorial site built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion. Deployed on Railway.

> Tagline preserved from the legacy brand: **Fearless creativity for forward-thinking brands. Stand out with us.**

---

## Tech stack

- **[Next.js 14](https://nextjs.org/)** — App Router, Server Components, Image optimisation
- **TypeScript** (strict)
- **Tailwind CSS 3** — design tokens defined in `tailwind.config.ts`
- **Framer Motion** — scroll reveals, lightbox, marquee (respects `prefers-reduced-motion`)
- **React Hook Form** — accessible contact form
- **next/og** — auto-generated favicon, Apple touch icon, and OG image
- Production-ready: structured data, sitemap, robots, semantic landmarks, skip-link, focus rings, WCAG 2.2 AA targets, 95+ Lighthouse target across all four scores

---

## Local development

```bash
# Node 18.18+ recommended
npm install
cp .env.example .env.local   # optional — only needed if wiring the contact form
npm run dev                  # → http://localhost:3000
```

### Scripts

| Command         | Purpose                                            |
| --------------- | -------------------------------------------------- |
| `npm run dev`   | Start the Next.js dev server on port 3000          |
| `npm run build` | Production build                                   |
| `npm run start` | Start the production server on `$PORT` (or 3000)   |
| `npm run lint`  | Run `next lint` (ESLint with `next/core-web-vitals`) |

---

## Adding gallery images

New images for the Work gallery are added through the `watch/` folder, with no manual code edits.

1. Drop an image into the folder for its category: `watch/influencer/`, `watch/onsite/`, `watch/events/`, `watch/fashion/`, or `watch/photography/`.
2. From the repo root, run the ingest script:

   ```bash
   python scripts/ingest-watch.py
   ```

The script optimizes the image, writes the `.jpg` / `.webp` / `.avif` versions into `public/images/<category>/`, names it in sequence, tags it with its category, and adds the entry to `src/data/portfolio.ts`. When it finishes it prints the exact `git add` / `commit` / `push` commands. Push, and Railway rebuilds with the image live.

Accepted inputs: `.jpg`, `.jpeg`, `.png`, `.webp`, `.tif`, `.tiff`, `.bmp` (export iPhone `.heic` to JPEG first). Full details in [`watch/README.md`](./watch/README.md) and [`project-context/2026-07-10-watch-folder-workflow.md`](./project-context/2026-07-10-watch-folder-workflow.md).

---

## Deploying to Railway

1. **Push this repo to GitHub.** Railway connects via the GitHub integration.
2. From the [Railway dashboard](https://railway.app/dashboard) → **New Project → Deploy from GitHub repo** → select this repo.
3. Railway auto-detects Node + Next.js via Nixpacks. Build and start commands are already set in [`railway.json`](./railway.json) (`npm ci && npm run build` / `npm run start`).
4. Add environment variables (Railway dashboard → **Variables**):

   | Variable                | Required? | Notes                                          |
   | ----------------------- | --------- | ---------------------------------------------- |
   | `NEXT_PUBLIC_SITE_URL`  | Yes       | e.g. `https://www.goodgoddessalmighty.com`     |
   | `RESEND_API_KEY`        | Optional  | Enables real email delivery for contact form   |
   | `CONTACT_FROM_EMAIL`    | Optional  | Verified sender if using Resend                |
   | `CONTACT_TO_EMAIL`      | Optional  | Where inquiries are forwarded                  |
   | `PORT`                  | Auto      | Railway injects this — do not override         |

5. Railway will build, then expose a public URL. Add your custom domain under **Settings → Domains** and point DNS as instructed.

---

## Wiring the contact form for production

The contact form already validates inputs, blocks honeypot bots, and POSTs to `/api/contact`. Until an email provider is configured, the endpoint logs submissions to the server (visible in Railway logs).

### Option A — [Resend](https://resend.com) (recommended, simplest)

```bash
npm install resend
```

Then in `src/app/api/contact/route.ts`, replace the `// TODO email delivery` block with:

```ts
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);
await resend.emails.send({
  from: process.env.CONTACT_FROM_EMAIL!,
  to: process.env.CONTACT_TO_EMAIL!,
  reply_to: payload.email!,
  subject: `New inquiry from ${payload.name}`,
  text: JSON.stringify(payload, null, 2),
});
```

Set `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL` in `.env.local` (dev) and Railway (prod).

### Option B — SMTP via `nodemailer`

```bash
npm install nodemailer
```

Set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD` and replace the same block with a `nodemailer.createTransport(...)` call.

---

## Project structure

```
good-goddess-almighty/
├── public/
│   └── images/              # Optimised legacy brand photography
│       ├── influencer/      # 7 frames
│       ├── onsite/          # 18 frames
│       ├── events/          # 26 frames
│       ├── fashion/         # 14 frames
│       ├── photography/     # 41 frames
│       └── brand/           # Legacy logo (reference only)
├── scripts/
│   ├── download-assets.sh   # Re-pulls legacy assets from Wix CDN
│   └── optimize-images.py   # Resizes & re-encodes (90% size reduction)
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout, metadata, structured data, fonts
│   │   ├── page.tsx         # Home
│   │   ├── about/page.tsx
│   │   ├── services/page.tsx
│   │   ├── work/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── privacy/, terms/, accessibility/  # Placeholder legal pages
│   │   ├── api/contact/route.ts
│   │   ├── icon.tsx, apple-icon.tsx, opengraph-image.tsx
│   │   ├── sitemap.ts, robots.ts, not-found.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── Header.tsx, Footer.tsx, Logo.tsx
│   │   ├── Reveal.tsx       # Scroll reveal (reduced-motion aware)
│   │   ├── SectionHeader.tsx
│   │   ├── ContactForm.tsx
│   │   └── PortfolioGallery.tsx
│   └── data/
│       ├── portfolio.ts     # 106-image manifest (generated)
│       └── site.ts          # Services, contact, navigation, pillars
├── next.config.mjs
├── tailwind.config.ts
├── railway.json
└── tsconfig.json
```

---

## Design system

- **Palette:** onyx `#0B0A0A`, ivory `#F5EFE6`, champagne `#C8A96A`, soft blush `#E8C5BD`, muted plum `#3E2433`.
- **Type:** Cormorant Garamond (display, italic) + Inter (body), both via `next/font/google` (zero-CLS).
- **Motion:** scroll reveal, marquee, lightbox transitions — all gated by `useReducedMotion()`.
- **Layout:** mobile-first, max width `7xl`, generous whitespace, editorial asymmetric grids.

---

## Client handoff — content TODOs

Items that must be reviewed or supplied by the client before launch:

- [ ] **Social media URLs.** The legacy site shipped with placeholder links (all pointed back to the site itself). Set `SITE.social.{instagram,facebook,linkedin,tiktok}` in `src/data/site.ts` to enable footer links.
- [ ] **Contact details.** Verify `admin@goodgoddessalmighty.com`, `706-627-7504`, and the Austin, TX address in `src/data/site.ts` are current.
- [ ] **Email provider.** Choose Resend / SMTP / SES and connect (see above).
- [ ] **Privacy + Terms.** Placeholder pages are in `src/app/{privacy,terms}/`. Replace with attorney-approved copy.
- [ ] **Hero / featured imagery.** The site uses real legacy photography. Some frames carry photographer or third-party brand visibility — confirm rights and replace any frames the client cannot use commercially. Curated frame IDs are configured at the top of `src/app/page.tsx` and `src/app/about/page.tsx`.
- [ ] **Testimonials.** None were present on the legacy site, so none are fabricated. When the client provides quotes, add a testimonials section to the homepage between **Why GGA** and **Featured Work**.
- [ ] **Client / partnership logos.** Same — not fabricated. Add a logo strip near the hero if a list is approved.
- [ ] **Photographer credits.** Some legacy images (notably in `/photography`) carry visible photographer watermarks (e.g. "Tina Dwyer Photography"). Confirm credit lines are acceptable as displayed or substitute.

---

## Refreshing or replacing brand assets

Every image in `public/images/` ships in three formats:

- `.avif` — modern, ~22% the size of the original (served first to ~95% of visitors)
- `.webp` — solid fallback for Safari ≤15 and older browsers
- `.jpg` — universal fallback

Total payload across all 106 images is ~5 MB of AVIF (vs. 23 MB of unoptimised JPEG). The `SmartImage` component in `src/components/SmartImage.tsx` emits a `<picture>` element so the browser picks the best supported format automatically.

To refresh assets after the client adds new media:

```bash
bash scripts/download-assets.sh         # pulls full-resolution originals from the legacy CDN
pip install pillow-avif-plugin           # one-time, for AVIF encoding
python3 scripts/optimize-images.py       # resizes + writes .jpg / .webp / .avif companions
```

Quality knobs live at the top of `scripts/optimize-images.py`:

- `MAX_EDGE = 1600` — longest dimension after downscale
- `JPEG_QUALITY = 78` — fallback JPEG quality
- `WEBP_QUALITY = 72` — WebP quality
- `AVIF_QUALITY = 35` — AVIF quality (the scale is non-linear; 35 is visually excellent)

To regenerate the portfolio manifest after replacing files in `public/images/`, edit `src/data/portfolio.ts` directly, or write a small build step using the same pattern as `scripts/optimize-images.py`.

---

## Quality checks

```bash
npm run lint     # ESLint via next/core-web-vitals
npm run build    # Type-check + production build
```

After deploy, run a Lighthouse audit (Chrome DevTools → Lighthouse → Mobile) — the project targets 95+ across Performance, Accessibility, Best Practices, and SEO.

---

## License

This codebase is delivered to the client (Good Goddess Almighty). All rights reserved by the client unless a different license is added. See `LICENSE`.
