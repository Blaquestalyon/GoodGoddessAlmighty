#!/usr/bin/env python3
"""
Rewrite absolute root-relative paths (e.g. /_next/..., /images/...)
to relative paths (e.g. _next/..., ../images/...) in a Next.js static
export so it can be served from a non-root URL prefix.

Run after `next build` (with output: 'export'). Operates on out/.
"""
import os
import re
import sys
from pathlib import Path

OUT_DIR = Path(__file__).resolve().parent.parent / "out"

# Folders at the root of out/ that may be referenced by absolute paths.
# We rewrite /_next/..., /images/..., /icon.png, /apple-icon.png, /og.png,
# and the small set of standalone static assets.
ROOT_ASSETS = ["_next", "images", "icon.png", "apple-icon.png", "og.png", "favicon.ico", "favicon.svg"]
# Site internal links like /about/, /services/, /work/, /contact/, /privacy/, /terms/, /accessibility/
ROUTES = ["about", "services", "work", "contact", "privacy", "terms", "accessibility"]

def prefix_for(file_path: Path) -> str:
    """Number of '../' levels needed to get back to out/ from this file."""
    rel = file_path.relative_to(OUT_DIR)
    depth = len(rel.parts) - 1  # number of dirs above the file
    return "../" * depth if depth else "./"

def rewrite_paths(text: str, prefix: str) -> str:
    # Rewrite asset roots
    for asset in ROOT_ASSETS:
        patterns = [
            (rf'"/{re.escape(asset)}"', f'"{prefix}{asset}"'),
            (rf'"/{re.escape(asset)}/', f'"{prefix}{asset}/'),
            (rf"'/{re.escape(asset)}'", f"'{prefix}{asset}'"),
            (rf"'/{re.escape(asset)}/", f"'{prefix}{asset}/"),
            (rf"url\(/{re.escape(asset)}/", f"url({prefix}{asset}/"),
            (rf"url\(/{re.escape(asset)}\)", f"url({prefix}{asset})"),
            # Escaped JSON forms: \"/asset\" and \"/asset/...\"
            (rf'\\"/{re.escape(asset)}\\"', rf'\\"{prefix}{asset}\\"'),
            (rf'\\"/{re.escape(asset)}/', rf'\\"{prefix}{asset}/'),
        ]
        for pat, repl in patterns:
            text = re.sub(pat, repl, text)
    # Rewrite internal route links (preserve trailing slash on routes).
    # Handles "/route", "/route/", "/route?query", "/route#hash", '/route', and escaped \" variants.
    for route in ROUTES:
        # Standard double-quoted with optional trailing slash, optional ?query or #hash
        text = re.sub(
            rf'"/{route}(/?)((?:\?|#)[^"]*)?"',
            lambda m, r=route, p=prefix: f'"{p}{r}/{m.group(2) or ""}"',
            text,
        )
        # Escaped double-quoted
        text = re.sub(
            rf'\\"/{route}(/?)((?:\?|#)[^\\"]*)?\\"',
            lambda m, r=route, p=prefix: f'\\"{p}{r}/{m.group(2) or ""}\\"',
            text,
        )
        # Single-quoted
        text = re.sub(
            rf"'/{route}(/?)((?:\?|#)[^']*)?'",
            lambda m, r=route, p=prefix: f"'{p}{r}/{m.group(2) or ''}'",
            text,
        )
    # Home link: keep as relative './'
    text = re.sub(r'href="/"', f'href="{prefix}"', text)
    text = re.sub(r"href='/'", f"href='{prefix}'", text)
    return text

def process_file(path: Path):
    prefix = prefix_for(path)
    original = path.read_text(encoding="utf-8")
    rewritten = rewrite_paths(original, prefix)
    if rewritten != original:
        path.write_text(rewritten, encoding="utf-8")
        return True
    return False

def main():
    if not OUT_DIR.exists():
        print(f"ERROR: {OUT_DIR} not found. Run `npm run build` first.", file=sys.stderr)
        sys.exit(1)

    count = 0
    for ext in ("*.html", "*.css", "*.js", "*.txt"):
        for f in OUT_DIR.rglob(ext):
            if process_file(f):
                count += 1
    print(f"Rewrote {count} files for relative paths.")

if __name__ == "__main__":
    main()
