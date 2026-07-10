#!/usr/bin/env python3
"""
Watch-folder ingest for the Good Goddess Almighty portfolio gallery.

WHAT IT DOES
------------
Drop image files into  watch/<category>/  and run:

    python scripts/ingest-watch.py

For every image you dropped, this script will:
  1. Optimize it   -> cap the long edge at 1600px, re-encode JPEG q78
                      progressive, strip camera metadata.
  2. Generate the trio -> writes .jpg, .webp, and .avif into
                      public/images/<category>/ (same settings the site
                      already uses, so new images match the existing ones).
  3. Name it in sequence -> onsite-27, events-31, photo-42, etc.
  4. Measure it    -> reads the final pixel width/height.
  5. Tag it        -> adds an entry to src/data/portfolio.ts, tagged with
                      the category folder it came from.
  6. Archive the original -> moves your dropped file into watch/_processed/
                      so the watch folder stays clean and you keep a copy.

It is SAFE to re-run. Only files sitting in watch/<category>/ are processed;
already-ingested images and your hand-written alt text are never touched.

CATEGORIES come from src/data/portfolio.ts (currently: influencer, onsite,
events, fashion, photography). The filename prefix for each category is
detected from the images already on disk, so photography keeps using
"photo-NN" while the rest use their own name.

REQUIREMENTS
------------
  pip install Pillow
  # AVIF: Pillow >= 11.3 has it built in. On older Pillow, also:
  pip install pillow-avif-plugin
"""
from __future__ import annotations

import json
import re
import shutil
import sys
from pathlib import Path

from PIL import Image, ImageOps
from PIL import features as pil_features

# Pillow 11.3+ ships AVIF natively. Older Pillow needs the plugin.
if not pil_features.check("avif"):
    try:
        import pillow_avif  # noqa: F401  (registers the AVIF codec)
    except ImportError:
        sys.exit(
            "AVIF support is missing. Install a recent Pillow (>=11.3) or run:\n"
            "  pip install pillow-avif-plugin"
        )

# ---------------------------------------------------------------------------
# Paths + encoding settings (match scripts/optimize-images.py)
# ---------------------------------------------------------------------------
ROOT = Path(__file__).resolve().parent.parent
WATCH = ROOT / "watch"
IMAGES = ROOT / "public" / "images"
PORTFOLIO_TS = ROOT / "src" / "data" / "portfolio.ts"
PROCESSED = WATCH / "_processed"

MAX_EDGE = 1600
JPEG_QUALITY = 78
WEBP_QUALITY = 72
AVIF_QUALITY = 35

# Input types we know how to open. Output is always jpg + webp + avif.
INPUT_EXTS = {".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff", ".bmp"}


# ---------------------------------------------------------------------------
# Read the current portfolio.ts so we stay in sync with it
# ---------------------------------------------------------------------------
def read_portfolio() -> tuple[str, list[dict]]:
    """Return (full_text, entries). Each entry: {raw, src, category}."""
    text = PORTFOLIO_TS.read_text(encoding="utf-8")
    entries = []
    for m in re.finditer(r'\{\s*src:\s*"([^"]+)".*?category:\s*"([^"]+)".*?\},', text):
        entries.append({"raw": m.group(0), "src": m.group(1), "category": m.group(2)})
    return text, entries


def parse_categories(text: str) -> list[tuple[str, str]]:
    """Return [(id, label), ...] in declared order from the CATEGORIES block."""
    block = re.search(r"CATEGORIES[^=]*=\s*\[(.*?)\];", text, re.S)
    if not block:
        sys.exit("Could not find the CATEGORIES array in portfolio.ts.")
    pairs = re.findall(r'id:\s*"([^"]+)",\s*label:\s*"([^"]+)"', block.group(1))
    if not pairs:
        sys.exit("Could not parse any categories from portfolio.ts.")
    return pairs


def prefix_for(category: str, entries: list[dict]) -> str:
    """Filename prefix for a category, detected from images already on disk.

    e.g. photography -> 'photo', onsite -> 'onsite'. Falls back to the
    category id when the category has no images yet.
    """
    for e in entries:
        if e["category"] == category:
            name = Path(e["src"]).stem            # e.g. 'photo-41'
            return re.sub(r"-\d+$", "", name)     # -> 'photo'
    return category


def next_index(folder: Path, prefix: str) -> int:
    """Next sequence number for <prefix>-NN.* in a category folder."""
    highest = 0
    if folder.exists():
        for f in folder.iterdir():
            m = re.match(rf"^{re.escape(prefix)}-(\d+)\.", f.name)
            if m:
                highest = max(highest, int(m.group(1)))
    return highest + 1


# ---------------------------------------------------------------------------
# Image processing
# ---------------------------------------------------------------------------
def optimize(src_file: Path, out_base: Path) -> tuple[int, int]:
    """Write out_base.jpg/.webp/.avif from src_file. Return (width, height)."""
    with Image.open(src_file) as im:
        im = ImageOps.exif_transpose(im)          # honor camera rotation
        if max(im.size) > MAX_EDGE:
            im.thumbnail((MAX_EDGE, MAX_EDGE), Image.LANCZOS)
        if im.mode in ("RGBA", "LA", "P"):
            im = im.convert("RGB")

        w, h = im.size
        im.save(out_base.with_suffix(".jpg"), "JPEG",
                quality=JPEG_QUALITY, progressive=True, optimize=True)
        im.save(out_base.with_suffix(".webp"), "WEBP",
                quality=WEBP_QUALITY, method=6)
        im.save(out_base.with_suffix(".avif"), "AVIF", quality=AVIF_QUALITY)
        return w, h


# ---------------------------------------------------------------------------
# portfolio.ts entry building + insertion
# ---------------------------------------------------------------------------
def js(s: str) -> str:
    """Safely quote a string for a TS double-quoted literal."""
    return json.dumps(s, ensure_ascii=False)


def build_entry(src: str, w: int, h: int, category: str, alt: str) -> str:
    return (
        f'  {{ src: "{src}", w: {w}, h: {h}, '
        f'category: "{category}", alt: {js(alt)} }},'
    )


def insert_entries(text: str, new_lines: list[tuple[str, str]]) -> str:
    """Insert new entry lines, grouped after the last entry of their category.

    new_lines: list of (category, entry_line).
    """
    start = text.index("export const PORTFOLIO")
    open_br = text.index("[", start)
    close_br = text.index("];", open_br)

    head = text[: open_br + 1]                     # up to and including '['
    body = text[open_br + 1 : close_br]            # the entries
    tail = text[close_br:]                         # '];' onward

    lines = [ln for ln in body.split("\n") if ln.strip()]

    def line_category(ln: str) -> str | None:
        m = re.search(r'category:\s*"([^"]+)"', ln)
        return m.group(1) if m else None

    for category, entry in new_lines:
        # find index of the last existing line for this category
        last = -1
        for i, ln in enumerate(lines):
            if line_category(ln) == category:
                last = i
        if last == -1:
            lines.append(entry)                    # new category -> end
        else:
            lines.insert(last + 1, entry)

    return head + "\n" + "\n".join(lines) + "\n" + tail


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
def main() -> int:
    if not WATCH.exists():
        sys.exit(f"No watch folder found at {WATCH}. Create it first.")

    text, entries = read_portfolio()
    categories = parse_categories(text)          # [(id, label), ...]
    labels = dict(categories)
    valid_ids = [cid for cid, _ in categories]

    new_lines: list[tuple[str, str]] = []        # (category, entry_line)
    added: list[str] = []                        # public paths added, for git
    processed_any = False

    for cid in valid_ids:
        src_folder = WATCH / cid
        if not src_folder.exists():
            continue

        drops = sorted(
            f for f in src_folder.iterdir()
            if f.is_file() and f.suffix.lower() in INPUT_EXTS
        )
        if not drops:
            continue

        out_folder = IMAGES / cid
        out_folder.mkdir(parents=True, exist_ok=True)
        prefix = prefix_for(cid, entries)
        seq = next_index(out_folder, prefix)

        for drop in drops:
            name = f"{prefix}-{seq:02d}"
            out_base = out_folder / name
            try:
                w, h = optimize(drop, out_base)
            except Exception as exc:  # noqa: BLE001
                print(f"  SKIP  {drop.name}: {exc}", file=sys.stderr)
                continue

            src = f"/images/{cid}/{name}.jpg"
            alt = f"{labels[cid]} — frame {seq}"   # em dash, matches site
            new_lines.append((cid, build_entry(src, w, h, cid, alt)))

            for ext in (".jpg", ".webp", ".avif"):
                added.append(f"public/images/{cid}/{name}{ext}")

            PROCESSED.mkdir(parents=True, exist_ok=True)
            shutil.move(str(drop), str(PROCESSED / drop.name))

            print(f"  + {cid}/{name}  ({w}x{h})  <- {drop.name}")
            processed_any = True
            seq += 1

    if not processed_any:
        print("Nothing to ingest. Drop images into watch/<category>/ first.")
        print("Categories:", ", ".join(valid_ids))
        return 0

    # Write the updated manifest
    new_text = insert_entries(text, new_lines)
    PORTFOLIO_TS.write_text(new_text, encoding="utf-8")

    # Ready-to-paste git block
    print("\nUpdated src/data/portfolio.ts")
    print("\n" + "=" * 60)
    print("Stage and push (paste into gitbash):")
    print("=" * 60)
    for p in added:
        print(f'git add "{p}"')
    print('git add "src/data/portfolio.ts"')
    msg = f"feat(portfolio): add {len(new_lines)} image(s) via watch ingest"
    print(f'git commit -m "{msg}"')
    print("git push")
    return 0


if __name__ == "__main__":
    sys.exit(main())
