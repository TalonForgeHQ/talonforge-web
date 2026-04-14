import { ImageResponse } from 'next/og';

export const runtime = 'edge';

const KINDS = {
  home: { eyebrow: 'ZERO-HUMAN COMPANY', accent: 'A public counter.' },
  kit: { eyebrow: 'THE FLAGSHIP — $97', accent: 'Come back to a running company.' },
  dashboard: { eyebrow: 'LIVE · PUBLIC', accent: 'No AI company shows.' },
  about: { eyebrow: 'THE BUILDERS', accent: 'Two of them are AI.' },
  store: { eyebrow: 'THE CATALOG', accent: 'Crypto only. No KYC.' },
} as const;

type Kind = keyof typeof KINDS;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const kindParam = (searchParams.get('kind') || 'home').toLowerCase() as Kind;
    const k = KINDS[kindParam] ?? KINDS.home;
    const title = searchParams.get('title') || 'TalonForge';
    const big = searchParams.get('big'); // optional huge serif number under the title

    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: '#0a0a0a',
            position: 'relative',
            padding: '80px',
            color: 'white',
            fontFamily: 'serif',
          }}
        >
          {/* radial gold glow */}
          <div
            style={{
              position: 'absolute',
              top: '-200px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '900px',
              height: '700px',
              background:
                'radial-gradient(ellipse at center, rgba(196, 163, 90, 0.18), transparent 70%)',
            }}
          />

          {/* top: brand */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '32px',
              fontWeight: 600,
              letterSpacing: '-0.02em',
            }}
          >
            <span style={{ color: 'white' }}>Talon</span>
            <span style={{ color: '#c4a35a', fontStyle: 'italic' }}>Forge</span>
          </div>

          {/* middle: eyebrow + title + accent */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
              maxWidth: '950px',
              position: 'relative',
              zIndex: 10,
            }}
          >
            <div
              style={{
                fontSize: '18px',
                color: '#c4a35a',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                fontFamily: 'monospace',
              }}
            >
              {k.eyebrow}
            </div>
            <div
              style={{
                fontSize: big ? '54px' : '78px',
                lineHeight: 1.05,
                color: 'white',
                fontWeight: 600,
                letterSpacing: '-0.025em',
              }}
            >
              {title}
            </div>
            {big ? (
              <div
                style={{
                  fontSize: '180px',
                  lineHeight: 1,
                  color: '#c4a35a',
                  fontWeight: 600,
                  letterSpacing: '-0.04em',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {big}
              </div>
            ) : (
              <div
                style={{
                  fontSize: '52px',
                  lineHeight: 1.1,
                  color: '#c4a35a',
                  fontStyle: 'italic',
                  fontWeight: 400,
                }}
              >
                {k.accent}
              </div>
            )}
          </div>

          {/* bottom: trust strip */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '20px',
              color: '#737373',
              fontFamily: 'monospace',
              letterSpacing: '0.15em',
            }}
          >
            <span>TALONFORGE.XYZ</span>
            <span style={{ color: '#525252' }}>·</span>
            <span>BUILT BY AI · CRYPTO ONLY · EN + AR</span>
          </div>
        </div>
      ),
      { width: 1200, height: 630 },
    );
  } catch (e) {
    return new Response(`OG error: ${String(e)}`, { status: 500 });
  }
}
