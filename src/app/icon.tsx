import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 36,
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
          borderRadius: 12,
        }}
      >
        G
      </div>
    ),
    { ...size },
  );
}
