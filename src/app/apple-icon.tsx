import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 110,
          background: '#0B0A0A',
          color: '#C8A96A',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'serif',
          fontStyle: 'italic',
          fontWeight: 600,
          letterSpacing: '-0.04em',
          borderRadius: 36,
        }}
      >
        G
      </div>
    ),
    { ...size },
  );
}
