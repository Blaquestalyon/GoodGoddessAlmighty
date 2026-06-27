#!/usr/bin/env bash
# Downloads existing brand assets from the legacy Wix site for use in the new build.
# Resolves Wix CDN URLs (which return AVIF inside .jpg containers) and saves locally.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PUB="$ROOT/public/images"
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15"

# Use the original/full-resolution Wix URL pattern (no fit transformation) — we re-optimize via next/image.
base="https://static.wixstatic.com/media/e231fa_"

dl() {
  local id="$1" ext="$2" dest="$3"
  # Bare URL returns full-resolution original. We re-optimize with next/image at build/runtime.
  curl -sSL -A "$UA" -o "$dest" "${base}${id}~mv2.${ext}"
}

# Brand: logo
mkdir -p "$PUB/brand"
curl -sSL -A "$UA" -o "$PUB/brand/legacy-logo.png" \
  "https://static.wixstatic.com/media/e231fa_82923f4f11284c0b830aa9ed8b007e3d~mv2.png/v1/fill/w_900,h_928,al_c,q_90,enc_auto/GGA_Logo2.png" || true

# Influencer Work (7)
INFLUENCER=(
  ed7192ae33444e75b0b5af0354ebef7b
  4178c77365b3445e83d36b95a0df6173
  433af2edde344144bdede7d10d73c905
  8fe646c62c7348818238b7e548babbc9
  1cb8e6f1e5fa43beb25a93ebd05e6b24
  152d5a96e7cc4070b6a6c3331bc3b7c3
  0e7fd5adde4646d5b4377d174131cc72
)
i=1; for id in "${INFLUENCER[@]}"; do dl "$id" jpg "$PUB/influencer/influencer-$(printf %02d $i).jpg"; i=$((i+1)); done

# On Site (18)
ONSITE=(
  e67eb47ceb554a4f9bff138066bae6db
  1d15d80e00664347933e60d716d0eae6
  2a8fb3150fed4788a1b10d4c954c158f
  336cb1ff0e2540b18570a979be062bbf
  39913f4d9b184e35a096b6115e4ed831
  4cfba72508c043fd8b1ea4daf8a81881
  5a6758fdec0c4d9480d86416036f24a8
  61bcfc51a77f41ae9360033aa7362593
  6327bed2a71348c29287a45976e59add
  76e9434d51054f73a9e04fa7f815fc30
  7b7844779ac4484c8005fbe745953370
  a332cca1dc7948ae91a7346ebc2ab99e
  be2acb4a39c143b09744f5b58bb53b89
  cdfa0451761e4b058be942a09ab5053d
  d4acab59559c4bf6ac8422373be0335f
  dbb2f338c349497db1508b701830b0a7
  f8e68c8798ed452a941d2f7577ab41c4
  fd8fa180f5254643a707b09b536e293c
)
i=1; for id in "${ONSITE[@]}"; do dl "$id" jpg "$PUB/onsite/onsite-$(printf %02d $i).jpg"; i=$((i+1)); done

# Events (26) — mostly jpg; two pngs (item 16 + 26 in audit)
EVENTS_JPG=(
  e70f6bdb366b49408e4528fd7f2d3e2f
  0418942e0ef4460db063075193a4b1ac
  0ec58446d4344460a3d0d123fb5d877c
  11784e34fb374824a416110f734d6f6e
  1835f53db5954409922c8d1a75a5a74e
  19afba7219c9458ea8bc87e24baddf72
  2122ecb4bfd2400490f9f8f898493c05
  2129495d84804292bc2141ce928aedbd
  2eb0aa45216c4989b9f907c85a47b85f
  4136957a199a42a4a662d5f1e01ff9c2
  47778c462f0e4e25bc1a2c64c8f6f80f
  511b5b2b2beb46b39edf2c4eee17d54e
  6111f17b9af543c5ada4007aa1f7d428
  6463bd2934bf4ba2ade5147bb777c413
  720b4248f13147d9b421605cfe0a6ca8
  8870aecbc5784f1ebaaec2205d9baa83
  88e8519ebaf74a99a42d08703c116e66
  9188a8af39984f449b2d691702ffc394
  bc2c28400d0b498c881b7237847e7ffe
  dd933a5e81284decab00c51cb7d849f1
  df11c44a501b4a2f909b922b000ea8e5
  e802fd5abf0b4840b3bf9e8913e5aec0
  ee989dd805bf46f780e919ddbab61f73
  f6526266b9444d369b0bf896daf883d8
)
i=1; for id in "${EVENTS_JPG[@]}"; do dl "$id" jpg "$PUB/events/events-$(printf %02d $i).jpg"; i=$((i+1)); done
dl 8407b18de164484aa50fae421336fb5a png "$PUB/events/events-25.png"
dl f7d94026cd8849798d80271200f147ea png "$PUB/events/events-26.png"

# Fashion Showcase (14)
FASHION=(
  39b36103a7614db3b226aab7a4507fa6
  0ad7d7228b814cb2b3e47a8ffb36c5f4
  28077e41043e4ffcb4e2c1a08e190257
  595c2fdfce2b4d6e9a053df53f5e755e
  60f28b70ac4a42bc887855342297bf50
  66895685efd84a4599c9116e34d885a8
  7417af3c81cb4451b7c8aac34fed8f6e
  95732f5a5b074ebab7a8b902bcd7061e
  9bdcf3a07928435c915e842509a5a442
  a02a27b198a34dae820a9a46d37a3e49
  bb77a0775078420e9e4827668e93971c
  c25b143a885446e48390b4f446c4ae65
  d904b066bda34e60a8599a9c34cb31b0
  da10d0d649684939806f1cea8b0b4647
)
i=1; for id in "${FASHION[@]}"; do dl "$id" jpg "$PUB/fashion/fashion-$(printf %02d $i).jpg"; i=$((i+1)); done

# Photography / Golden Glamour (41) — bd0a44 and e04d98 are pngs
PHOTO_JPG=(
  e98b77e3da91468498f2bad18c5bcf2a
  04ba09b6b02440be9341f9a0bdf559bc
  08e47db522cf4e5bad241a96f27a034f
  128b985518c741e39225a2094b638610
  20f91ee64e334cc29038af8f80db2e05
  225b8b7b562a445fbb552817a54308d0
  3a3b151c44174c8bbe36e0be97092368
  3b31eb23ec3c4182a97d34bde8a3d6df
  4465f837713c4d83b7c958bd5fd79178
  453aec92ee944053a62b697905cb14fd
  4590490bd16448489aa815aa6f963875
  592599c05b0e4d80907cdcec292745dc
  59efd7b683e54244a90af72f306ea1d9
  65afa4d2227d4f7ab9e1064033b8c8a7
  7630cb5116694b2388826ac4e170c8f8
  8044f8a201ec4f5fa9235802aba7c6a4
  853169d019dc42539d77dc9f380d0892
  8b7a7e2a412c4dc99b91de2d2943e21f
  91affcfcb58748d3864cd1812d677667
  93e0b4583a964954ab1be0cc7ebaded1
  958cb91c3f56492288b21f95a3626f2f
  9a3f642cd8d94782bd58bc96549e1de5
  9df472b39bfb42af8c78382c62ba4857
  9eeb5c68d7fb4c40bf36f05333eca515
  a1fc2c51235e47f5b4e06d07192eb805
  a3097d4ef03244049dc21b2fb0d8f9ba
  a45cb2957bc448afb879e276915c92dd
  a5b98b9e1c054072b1602ec818dc075f
  acdd37545ead454b998ceb0019f89a3f
  b1069dd1489447e5a8a74dba1b282c6a
  b980acf30b914fa18d39902d471b2279
  bee8b586ded24a74b1279f452264a565
  c4e98eba2b8047f1be93f485e698f439
  d923b8dc14d34649819e3c8e2b9186f2
  da22e23683114da9926cb7759c4208da
  e182abc2756942848331c950247c59db
  eb9d45e6bde64782961a12d7a2a82122
  f39a223fc390430fac1c93f34104466b
  fb5758492c454764b9d0ef025112e8b4
)
i=1; for id in "${PHOTO_JPG[@]}"; do dl "$id" jpg "$PUB/photography/photo-$(printf %02d $i).jpg"; i=$((i+1)); done
dl bd0a44b7b54a44ef86dc2ffaa39fa5a4 png "$PUB/photography/photo-40.png"
dl e04d98d42810402d98ebb3429aabf253 png "$PUB/photography/photo-41.png"

echo "Done. Counts:"
for d in influencer onsite events fashion photography brand; do
  echo "  $d: $(ls "$PUB/$d" 2>/dev/null | wc -l)"
done
