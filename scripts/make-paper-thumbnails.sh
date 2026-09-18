#!/usr/bin/env bash
# Render page 1 of every PDF in public/files/ to public/images/papers/<name>.png
# for the "Selected papers" carousel (src/components/Site/PaperCarousel.js).
#
#   npm run thumbnails            # only PDFs newer than their PNG
#   npm run thumbnails -- --force # re-render everything
#
# Requires poppler (brew install poppler). PNGs are committed; CI never runs this.
set -euo pipefail

# Page to render. Page 1 is usually the title page; add a case here when it is
# not (e.g. a publisher's citation cover sheet). Re-run with --force after editing.
page_for() {
  case "$1" in
    Mercier-2025b) echo 2 ;;   # page 1 is the APA citation cover sheet
    *) echo 1 ;;
  esac
}

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="$ROOT/public/files"
OUT="$ROOT/public/images/papers"
WIDTH="${THUMB_WIDTH:-1080}"  # 3x CARD_WIDTH in PaperCarousel.js (crisp on Retina + browser zoom)
FORCE="${1:-}"

if ! command -v pdftoppm >/dev/null 2>&1; then
  echo "pdftoppm not found. Install poppler: brew install poppler" >&2
  exit 1
fi

mkdir -p "$OUT"
for pdf in "$SRC"/*.pdf; do
  name="$(basename "$pdf" .pdf)"
  png="$OUT/$name.png"
  if [[ "$FORCE" != "--force" && -f "$png" && "$png" -nt "$pdf" ]]; then
    echo "up to date  $name.png"
    continue
  fi
  page="$(page_for "$name")"
  pdftoppm -png -f "$page" -l "$page" -singlefile -scale-to-x "$WIDTH" -scale-to-y -1 \
    -cropbox -hide-annotations "$pdf" "$OUT/$name"
  echo "rendered    $name.png (page $page, $(du -h "$png" | cut -f1))"
done
