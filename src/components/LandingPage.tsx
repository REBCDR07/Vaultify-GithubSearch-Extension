'use client'

import PopupShell from './PopupShell'

const FEATURES = [
  { icon: '🔍', text: 'Recherche en langage naturel via Groq AI' },
  { icon: '⚡', text: 'Zéro backend — tout reste dans ton navigateur' },
  { icon: '⭐', text: 'Repositories triés par pertinence, pas juste par stars' },
]

const GH_SVG = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
)

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>

      {/* ── PAGE BACKGROUND ─────────────────────────────────────────── */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        background: 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #0d1117 100%)',
      }} />
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        backgroundImage: `
          linear-gradient(rgba(48,54,61,0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(48,54,61,0.3) 1px, transparent 1px)
        `,
        backgroundSize: '32px 32px',
        pointerEvents: 'none',
      }} />

      {/* ── STICKY HEADER ───────────────────────────────────────────── */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(13,17,23,0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(48,54,61,0.5)',
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 32px',
          height: 54,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="3" stroke="#58a6ff" strokeWidth="1.5"/>
              <path d="M8 12l2.5 2.5L16 9" stroke="#3fb950" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{
              fontFamily: 'var(--font-unbounded), Unbounded, cursive',
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '0.06em',
              color: '#e6edf3',
            }}>
              VAULT<span style={{ color: '#58a6ff' }}>IFY</span>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{
              fontFamily: 'var(--font-oswald), Oswald, sans-serif',
              fontSize: 10,
              color: '#484f58',
              background: '#161b22',
              border: '1px solid #21262d',
              borderRadius: 20,
              padding: '2px 9px',
              letterSpacing: '0.04em',
            }}>v1.0.0</span>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                fontFamily: 'var(--font-oswald), Oswald, sans-serif',
                fontSize: 11, color: '#8b949e', textDecoration: 'none',
                letterSpacing: '0.04em', transition: 'color 150ms ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#e6edf3')}
              onMouseLeave={e => (e.currentTarget.style.color = '#8b949e')}
            >
              {GH_SVG} GITHUB
            </a>
          </div>
        </div>
      </header>

      {/* ── MAIN ────────────────────────────────────────────────────── */}
      <main style={{ position: 'relative', zIndex: 1, flex: 1 }}>

        {/* ── HERO (centered, full-width) ──────────────────────────── */}
        <section style={{
          textAlign: 'center',
          padding: '80px 24px 64px',
          maxWidth: 760,
          margin: '0 auto',
        }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            background: 'rgba(88,166,255,0.06)',
            border: '1px solid rgba(88,166,255,0.2)',
            borderRadius: 20, padding: '4px 14px', marginBottom: 28,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#3fb950', display: 'inline-block',
              boxShadow: '0 0 6px #3fb950',
            }} />
            <span style={{
              fontFamily: 'var(--font-oswald), Oswald, sans-serif',
              fontSize: 11, color: '#58a6ff',
              letterSpacing: '0.07em', textTransform: 'uppercase',
            }}>
              Chrome Extension MV3 · Open Source
            </span>
          </div>

          {/* H1 */}
          <h1 style={{
            fontFamily: 'var(--font-unbounded), Unbounded, cursive',
            fontSize: 'clamp(36px, 6vw, 64px)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: 20,
          }}>
            <span style={{ color: '#e6edf3' }}>VAULT</span>
            <span style={{ color: '#58a6ff' }}>IFY</span>
          </h1>

          {/* Tagline */}
          <p style={{
            fontFamily: 'var(--font-rajdhani), Rajdhani, sans-serif',
            fontSize: 'clamp(16px, 2.5vw, 20px)',
            fontWeight: 500,
            color: '#8b949e',
            lineHeight: 1.6,
            marginBottom: 40,
            maxWidth: 560,
            margin: '0 auto 40px',
          }}>
            Découvrez des repositories GitHub méconnus grâce à la recherche en langage naturel, propulsée par Groq AI.
          </p>

          {/* Feature pills row */}
          <div style={{
            display: 'flex', flexWrap: 'wrap',
            justifyContent: 'center', gap: 10, marginBottom: 44,
          }}>
            {FEATURES.map(f => (
              <div key={f.text} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#161b22',
                border: '1px solid #21262d',
                borderRadius: 6, padding: '8px 14px',
              }}>
                <span style={{ fontSize: 15, lineHeight: 1 }}>{f.icon}</span>
                <span style={{
                  fontFamily: 'var(--font-rajdhani), Rajdhani, sans-serif',
                  fontSize: 13, fontWeight: 500, color: '#c9d1d9',
                }}>
                  {f.text}
                </span>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 44 }}>
            <a href="#apercu" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#58a6ff', border: '1px solid #58a6ff',
              borderRadius: 6, color: '#0d1117',
              textDecoration: 'none',
              fontFamily: 'var(--font-oswald), Oswald, sans-serif',
              fontSize: 13, fontWeight: 600,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              padding: '11px 24px', transition: 'all 200ms ease',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#79bbff'
                e.currentTarget.style.borderColor = '#79bbff'
                e.currentTarget.style.boxShadow = '0 0 24px rgba(88,166,255,0.3)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#58a6ff'
                e.currentTarget.style.borderColor = '#58a6ff'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Installer l&apos;extension
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'transparent', border: '1px solid #30363d',
              borderRadius: 6, color: '#8b949e', textDecoration: 'none',
              fontFamily: 'var(--font-oswald), Oswald, sans-serif',
              fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase',
              padding: '11px 24px', transition: 'all 200ms ease',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#8b949e'
                e.currentTarget.style.color = '#e6edf3'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#30363d'
                e.currentTarget.style.color = '#8b949e'
              }}
            >
              {GH_SVG} Voir le code
            </a>
          </div>

          {/* Tech stack */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            justifyContent: 'center', flexWrap: 'wrap',
          }}>
            <span style={{
              fontFamily: 'var(--font-oswald), Oswald, sans-serif',
              fontSize: 10, color: '#484f58',
              letterSpacing: '0.06em', textTransform: 'uppercase',
            }}>Propulsé par</span>
            {['Groq', 'GitHub API', 'Chrome MV3', 'Next.js'].map(t => (
              <span key={t} style={{
                fontFamily: 'var(--font-oswald), Oswald, sans-serif',
                fontSize: 10, color: '#8b949e',
                background: '#161b22', border: '1px solid #21262d',
                borderRadius: 3, padding: '2px 7px', letterSpacing: '0.03em',
              }}>{t}</span>
            ))}
          </div>
        </section>

        {/* ── POPUP PREVIEW (full-width, centered, large) ─────────── */}
        <section id="apercu" style={{
          padding: '0 24px 80px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0,
        }}>
          {/* Section label */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32,
          }}>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, transparent, #21262d)' }} />
            <span style={{
              fontFamily: 'var(--font-oswald), Oswald, sans-serif',
              fontSize: 11, color: '#484f58',
              letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>Aperçu interactif</span>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(to left, transparent, #21262d)' }} />
          </div>

          {/* Glow effect */}
          <div style={{
            position: 'relative',
            display: 'inline-block',
          }}>
            <div style={{
              position: 'absolute',
              inset: -60,
              background: 'radial-gradient(ellipse at center, rgba(88,166,255,0.07) 0%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 0,
            }} />

            {/* Browser chrome */}
            <div style={{
              position: 'relative',
              zIndex: 1,
              width: 420,
              maxWidth: '100%',
            }}
              className="popup-wrapper"
            >
              <div style={{
                background: '#161b22',
                border: '1px solid #21262d',
                borderBottom: 'none',
                borderRadius: '10px 10px 0 0',
                padding: '9px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                <div style={{ display: 'flex', gap: 5 }}>
                  {['#f78166', '#e3b341', '#3fb950'].map(c => (
                    <span key={c} style={{
                      width: 10, height: 10, borderRadius: '50%',
                      background: c, display: 'inline-block', opacity: 0.75,
                    }} />
                  ))}
                </div>
                <div style={{
                  flex: 1, background: '#0d1117',
                  border: '1px solid #21262d', borderRadius: 4,
                  padding: '3px 10px',
                  fontFamily: 'var(--font-oswald), Oswald, sans-serif',
                  fontSize: 10, color: '#484f58', letterSpacing: '0.03em',
                }}>
                  chrome-extension://vaultify/popup.html
                </div>
              </div>

              {/* Popup */}
              <div style={{
                boxShadow: '0 0 80px rgba(88,166,255,0.09), 0 24px 80px rgba(0,0,0,0.6)',
                borderRadius: '0 0 10px 10px',
                overflow: 'hidden',
                border: '1px solid #21262d',
                borderTop: 'none',
              }}>
                <PopupShell />
              </div>
            </div>
          </div>

          <p style={{
            fontFamily: 'var(--font-oswald), Oswald, sans-serif',
            fontSize: 10, color: '#30363d',
            letterSpacing: '0.07em', textTransform: 'uppercase',
            marginTop: 16,
          }}>
            100% fonctionnel · cliquez, recherchez, ajoutez aux favoris
          </p>
        </section>
      </main>

      {/* ── FOOTER ──────────────────────────────────────────────────── */}
      <footer style={{
        position: 'relative', zIndex: 1,
        borderTop: '1px solid #21262d',
        padding: '18px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 8,
      }}>
        <span style={{
          fontFamily: 'var(--font-unbounded), Unbounded, cursive',
          fontSize: 10, color: '#30363d', letterSpacing: '0.06em',
        }}>
          VAULT<span style={{ color: '#21262d' }}>IFY</span>
        </span>
        <span style={{
          fontFamily: 'var(--font-oswald), Oswald, sans-serif',
          fontSize: 10, color: '#484f58', letterSpacing: '0.05em',
        }}>
          © 2025 · Chrome Extension · MIT License
        </span>
      </footer>

      {/* ── RESPONSIVE ──────────────────────────────────────────────── */}
      <style>{`
        @media (max-width: 500px) {
          .popup-wrapper {
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  )
}
