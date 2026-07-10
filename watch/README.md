# watch/ — drop images here to add them to the gallery

This is the inbox for the Work gallery. Drop an image into the subfolder for
its category, run one command, and it gets optimized, tagged, and wired into
the site so it shows up on your next push.

## The five categories

| Folder                | Shows on the site as   |
| --------------------- | ---------------------- |
| `watch/influencer/`   | Influencer Work        |
| `watch/onsite/`       | On-Site Activations    |
| `watch/events/`       | Events                 |
| `watch/fashion/`      | Fashion Showcase       |
| `watch/photography/`  | Photography            |

## How to use it

1. Copy your photo into the right category folder, e.g. drop
   `total-wine-tasting.jpg` into `watch/onsite/`. Name it whatever you want —
   the script renames it in sequence.
2. In gitbash, from the repo root, run:

   ```
   python scripts/ingest-watch.py
   ```

3. The script prints exactly which files it created and a ready-to-paste
   `git add` / `commit` / `push` block. Paste that into gitbash to ship it.
4. Railway rebuilds and the new image appears in the gallery.

## What the script does to each image

- Caps the long edge at 1600px and re-encodes it (same quality settings the
  rest of the site already uses).
- Writes three formats into `public/images/<category>/`: `.jpg`, `.webp`,
  `.avif`. The site auto-serves the smallest one each browser supports.
- Names it in sequence for that category (`onsite-27`, `events-31`, and so on;
  photography keeps its `photo-NN` naming).
- Adds an entry to `src/data/portfolio.ts`, tagged with the category folder it
  came from.
- Moves your original into `watch/_processed/` so this folder stays clean and
  you keep a copy.

## Good to know

- Accepted inputs: `.jpg`, `.jpeg`, `.png`, `.webp`, `.tif`, `.tiff`, `.bmp`.
  (iPhone `.heic` files are not supported — export as JPEG first.)
- Safe to re-run. It only touches files sitting in the category folders; it
  never re-processes images that are already live or rewrites your captions.
- Drop several images at once, in one or many categories. It handles them all
  in a single run.
- The dropped images and `watch/_processed/` are git-ignored on purpose. Only
  the optimized files in `public/images/` and the updated `portfolio.ts` get
  committed.
