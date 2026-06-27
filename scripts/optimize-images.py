#!/usr/bin/env python3
"""
Aggressive image optimization v2.

For every image in /public/images:
  1. Cap max edge at 1600px (downscale if larger)
  2. Re-encode source JPEG at quality 78 progressive, strip metadata
  3. Convert standalone PNGs of photographs to JPEG
  4. Generate AVIF (q=55) and WebP (q=78) companions alongside the JPEG

The Next.js next/image pipeline (when running on Railway/SSR) will pick the
best format automatically. For the static export, you can switch <Image> to
<picture> with the .avif/.webp/.jpg fallback to take advantage of these.
"""
import sys
from pathlib import Path

from PIL import Image, ImageOps
import pillow_avif  # registers AVIF support  # noqa: F401

ROOT = Path(__file__).resolve().parent.parent / "public" / "images"
MAX_EDGE = 1600
JPEG_QUALITY = 78
WEBP_QUALITY = 72
AVIF_QUALITY = 35  # AVIF is highly efficient at lower q; 35 is visually excellent on web.

SKIP_DIRS = {"brand"}  # leave the legacy-logo alone


def resize(im: Image.Image) -> Image.Image:
    im = ImageOps.exif_transpose(im)
    if max(im.size) > MAX_EDGE:
        im.thumbnail((MAX_EDGE, MAX_EDGE), Image.LANCZOS)
    if im.mode in ("RGBA", "LA", "P"):
        im = im.convert("RGB")
    return im


def process(path: Path) -> tuple[int, int, int]:
    """Returns (jpeg_bytes, webp_bytes, avif_bytes)."""
    with Image.open(path) as im:
        im = resize(im)

        jpeg_path = path.with_suffix(".jpg")
        webp_path = path.with_suffix(".webp")
        avif_path = path.with_suffix(".avif")

        # Write JPEG (overwrites original; if original was PNG, remove it after)
        im.save(jpeg_path, "JPEG", quality=JPEG_QUALITY, progressive=True, optimize=True)
        if path.suffix.lower() == ".png" and path != jpeg_path:
            path.unlink(missing_ok=True)

        # WebP
        im.save(webp_path, "WEBP", quality=WEBP_QUALITY, method=6)

        # AVIF
        im.save(avif_path, "AVIF", quality=AVIF_QUALITY)

        return (
            jpeg_path.stat().st_size,
            webp_path.stat().st_size,
            avif_path.stat().st_size,
        )


def main() -> int:
    files = []
    for f in ROOT.rglob("*"):
        if f.suffix.lower() not in (".jpg", ".jpeg", ".png"):
            continue
        if any(p in SKIP_DIRS for p in f.relative_to(ROOT).parts):
            continue
        files.append(f)

    total_orig = sum(f.stat().st_size for f in files)
    total_jpeg = total_webp = total_avif = 0

    for i, f in enumerate(sorted(files), 1):
        try:
            j, w, a = process(f)
            total_jpeg += j
            total_webp += w
            total_avif += a
            if i % 20 == 0:
                print(f"  ...processed {i}/{len(files)}")
        except Exception as e:  # noqa: BLE001
            print(f"  FAIL  {f}: {e}", file=sys.stderr)

    def mb(n: int) -> str:
        return f"{n/1024/1024:.1f} MB"

    print()
    print(f"Original total:       {mb(total_orig)}")
    print(f"JPEG (re-encoded):    {mb(total_jpeg)}  ({100*total_jpeg/total_orig:.0f}%)")
    print(f"WebP companions:      {mb(total_webp)}  ({100*total_webp/total_orig:.0f}%)")
    print(f"AVIF companions:      {mb(total_avif)}  ({100*total_avif/total_orig:.0f}%)")
    print(f"AVIF + WebP + JPEG:   {mb(total_jpeg + total_webp + total_avif)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
