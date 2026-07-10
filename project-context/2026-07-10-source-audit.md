# Source Audit — Good Goddess Almighty
Date: 2026-07-10

A quick map of how the site is built, so anyone picking it up later knows where
things live. Focus is on the Work gallery, since that is what the new
watch-folder tooling plugs into.

## Stack

- Next.js 14 (App Router), React 18, TypeScript.
- Tailwind CSS for styling; Framer Motion for scroll reveals and the lightbox.
- Fonts loaded with `next/font/google` (Cormorant Garamond for display, Inter
  for body) directly in `src/app/layout.tsx`.
- Deployed on Railway, which auto-builds from the `main` branch on GitHub.
- Node >= 18.18.

## Layout

- `src/app/` — one folder/file per route: home (`page.tsx`), `about`,
  `services`, `work`, `contact`, plus legal pages (`privacy`, `terms`,
  `accessibility`) and metadata routes (sitemap, robots, icons, OG image).
- `src/components/` — shared UI: `Header`, `Footer`, `PortfolioGallery`,
  `SmartImage`, `Reveal`, `SectionHeader`, `Logo`, `ContactForm`.
- `src/data/site.ts` — site-wide copy, nav, contact details.
- `src/data/portfolio.ts` — the gallery manifest (see below).
- `public/images/` — all imagery, one subfolder per gallery category, plus a
  `brand/` folder for logos.
- `scripts/` — image tooling (`optimize-images.py`, `ingest-watch.py`, and
  helpers).

## How the Work gallery works

The gallery is entirely data-driven from `src/data/portfolio.ts`:

- `PortfolioCategory` — the five category ids: `influencer`, `onsite`,
  `events`, `fashion`, `photography`.
- `CATEGORIES` — id, human label, and short description for each. The labels
  ("On-Site Activations", "Fashion Showcase", etc.) are what show on the site.
- `PORTFOLIO` — one entry per image: `{ src, w, h, category, alt }`. As of this
  audit there are 122 entries.

`PortfolioGallery.tsx` renders `PORTFOLIO` as a masonry (CSS columns) grid with
category filter chips, a count per category, and a keyboard-navigable lightbox.
The visible tag on each image (on hover and in the lightbox) is its category
label. The `alt` text is what search engines and screen readers read.

`w` and `h` are the image's real pixel dimensions. The gallery uses them to
reserve the right aspect ratio for each tile before the image loads, which
prevents layout shift. They must be accurate.

## Image pipeline

Every gallery image exists in three formats side by side in
`public/images/<category>/`: `.jpg`, `.webp`, and `.avif`. `SmartImage.tsx`
emits a `<picture>` element so each browser downloads the smallest format it
supports, falling back to the JPEG.

`scripts/optimize-images.py` is the original bulk optimizer: it caps the long
edge at 1600px, re-encodes the JPEG, and generates the WebP and AVIF companions
for everything in `public/images`.

Filenames follow `<prefix>-NN` per category. Four categories use their own name
as the prefix (`onsite-27`, `events-31`, ...). Photography is the exception: it
uses `photo-NN`.

## What changed on 2026-07-10

Added a watch-folder ingest system so new gallery images can be added by
dropping a file and running one command, instead of editing `portfolio.ts` by
hand. See `2026-07-10-watch-folder-workflow.md` for how it works.
