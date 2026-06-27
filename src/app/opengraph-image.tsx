import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Good Goddess Almighty — fearless creativity for forward-thinking brands.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#0B0A0A',
          color: '#F5EFE6',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          fontFamily: 'serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, color: '#C8A96A' }}>
          <div
            style={{
              fontSize: 18,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              fontFamily: 'sans-serif',
            }}
          >
            Good Goddess Almighty
          </div>
        </div>

        <div
          style={{
            fontSize: 96,
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span>Fearless creativity</span>
          <span style={{ fontStyle: 'italic', color: '#E8C5BD' }}>for forward-thinking</span>
          <span>brands.</span>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            color: '#F5EFE6',
            opacity: 0.7,
            fontFamily: 'sans-serif',
            fontSize: 20,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          <div>Boutique experiential marketing</div>
          <div>Brand ambassadors · Austin, TX</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
