import { ImageResponse } from 'next/og';

// This is the one file (besides app/radar-tokens.css) where raw hex values
// are allowed: next/og's ImageResponse (Satori) cannot read CSS custom
// properties, so token values are hard-coded here to match radar-tokens.css.

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const NAVY_900 = '#0b2340';
const SIGNAL_ORANGE = '#d95b2a';
const WHITE = '#ffffff';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: NAVY_900,
          color: WHITE,
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <svg width="56" height="56" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="13" stroke={WHITE} strokeWidth="1.5" opacity={0.35} />
            <circle cx="16" cy="16" r="7.5" stroke={WHITE} strokeWidth="2.5" opacity={0.7} />
            <circle cx="24.5" cy="9.5" r="2.75" fill={SIGNAL_ORANGE} />
          </svg>
          <span style={{ fontSize: 36, fontWeight: 700 }}>Radar</span>
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 48,
            fontSize: 60,
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: 980,
          }}
        >
          Find the opportunities worth your time.
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 36,
            fontSize: 24,
            opacity: 0.78,
            maxWidth: 920,
          }}
        >
          Student-built for NUS students — not an official NUS service.
        </div>
      </div>
    ),
    { ...size }
  );
}
