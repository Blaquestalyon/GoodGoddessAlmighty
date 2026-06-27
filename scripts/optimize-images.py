#!/usr/bin/env python3
"""Resize and re-encode brand images for web delivery.

Targets: max edge 1600px, JPEG quality 82, progressive. PNGs converted to optimized JPGs
unless they have transparency. We keep the originals replaced (no _orig backups) since
next/image will handle the final responsive output.
"""
from pathlib import Path
from PIL import Image, ImageOps
import sys

ROOT = Path(__file__).resolve().parent.parent / "public" / "images"
MAX_EDGE = 1600
JPEG_QUALITY = 82

dirs = ["influencer", "onsite", "events", "fashion", "photography"]

total_before = 0
total_after = 0
count = 0

for d in dirs:
    folder = ROOT / d
    for p in sorted(folder.iterdir()):
        if p.suffix.lower() not in {".jpg", ".jpeg", ".png"}:
            continue
        size_before = p.stat().st_size
        total_before += size_before

        try:
            with Image.open(p) as im:
                im = ImageOps.exif_transpose(im)
                # Decide if we can safely flatten to JPEG
                has_alpha = im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info)

                w, h = im.size
                scale = min(1.0, MAX_EDGE / max(w, h))
                if scale < 1.0:
                    new_size = (int(w * scale), int(h * scale))
                    im = im.resize(new_size, Image.LANCZOS)

                if has_alpha and p.suffix.lower() == ".png":
                    # Keep PNG with optimization
                    if im.mode != "RGBA":
                        im = im.convert("RGBA")
                    im.save(p, "PNG", optimize=True)
                else:
                    # Convert/save as JPEG
                    if im.mode != "RGB":
                        im = im.convert("RGB")
                    out_path = p.with_suffix(".jpg")
                    im.save(out_path, "JPEG", quality=JPEG_QUALITY, optimize=True, progressive=True)
                    if out_path != p:
                        p.unlink()
        except Exception as e:
            print(f"FAIL {p}: {e}", file=sys.stderr)
            continue

        new_path = p.with_suffix(".jpg") if p.suffix.lower() == ".png" and not has_alpha else p
        if not new_path.exists():
            new_path = p
        size_after = new_path.stat().st_size
        total_after += size_after
        count += 1

print(f"Processed {count} images.")
print(f"Before: {total_before/1024/1024:.1f} MB  After: {total_after/1024/1024:.1f} MB")
print(f"Saved {(1 - total_after/total_before)*100:.1f}%")
