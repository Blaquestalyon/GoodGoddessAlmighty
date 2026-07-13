# Watch-Folder Ingest — Workflow
Date: 2026-07-10

Add a new image to the Work gallery by dropping it in a folder and running one
command. No hand-editing of `portfolio.ts`, no manual resizing, no forgetting
to generate the WebP/AVIF versions.

## The folders

```
watch/
  influencer/     -> Influencer Work
  onsite/         -> On-Site Activations
  events/         -> Events
  fashion/        -> Fashion Showcase
  photography/    -> Photography
  _processed/     -> your originals land here after ingest (git-ignored)
```

## Day-to-day use

1. Copy an image into the folder for its category, e.g. drop a photo into
   `watch/onsite/`. Name it anything — the script renames it in sequence.
2. From the repo root in gitbash, run:

   ```
   python scripts/ingest-watch.py
   ```

3. The script prints exactly which files it created and a ready-to-paste
   `git add` / `commit` / `push` block. Paste that block to ship it.
4. Railway rebuilds and the image appears in the gallery.

You can drop several images at once, across one or many categories. One run
handles them all.

## What the script does to each image

1. Optimizes it: caps the long edge at 1600px, re-encodes JPEG at quality 78
   progressive, strips camera metadata — the same settings the rest of the site
   already uses, so new images match.
2. Writes the trio into `public/images/<category>/`: `.jpg`, `.webp`, `.avif`.
3. Names it in sequence for that category (`onsite-27`, `events-31`; photography
   keeps `photo-NN`). The prefix is detected from the images already on disk.
4. Reads the final pixel width and height.
5. Adds an entry to `src/data/portfolio.ts`, tagged with the category folder it
   came from, inserted with the rest of that category's images. The script
   writes a temporary placeholder alt (`<Category label> — frame <N>`) that
   Claude replaces with a real caption before anything is committed (see
   "Captions are written automatically" below).
6. Moves your original into `watch/_processed/`.

## Behavior and safety

- Safe to re-run. It only processes files sitting in the category folders; it
  never re-touches images that are already live, and it never rewrites the
  hand-written alt text on existing entries.
- Accepted inputs: `.jpg`, `.jpeg`, `.png`, `.webp`, `.tif`, `.tiff`, `.bmp`.
  iPhone `.heic` is not supported — export as JPEG first.
- Only the optimized output in `public/images/` and the updated `portfolio.ts`
  get committed. The dropped originals and `watch/_processed/` are git-ignored.

## Captions are written automatically (standard step since 2026-07-13)

Every gallery photo carries a descriptive caption. It lives in the entry's
`alt` in `src/data/portfolio.ts`; the gallery shows the text after the em dash
on tile hover and in the lightbox. The full gallery (123 images) was captioned
on 2026-07-13, and captioning is now a standing part of ingest:

1. The script writes its `frame <N>` placeholder as usual.
2. Claude views each newly ingested photo and replaces the placeholder with a
   descriptive caption in the established style — 8 to 20 words covering who,
   what, the setting, and notable products or signage.
3. Brand rule: a brand, product, or venue is named only when its text is
   clearly legible in the photo. Brands are never guessed or invented.
4. The captions arrive in the same `portfolio.ts` diff you review before
   pushing, so nothing goes live unseen.

The script never rewrites a caption on later runs. To override one, just edit
that entry's `alt` in `portfolio.ts` — it will be preserved.

## Requirements

Python 3 with Pillow. AVIF support is built into Pillow 11.3+. On older Pillow:

```
pip install pillow-avif-plugin
```

## Adding a new category later

Add it to `CATEGORIES` (and the `PortfolioCategory` type) in
`src/data/portfolio.ts`, create `watch/<new-category>/`, and the script picks it
up automatically. The filename prefix defaults to the category id until the
first image is added.
