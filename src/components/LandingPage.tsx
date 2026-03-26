'use client'

import PopupShell from './PopupShell'

const FEATURES = [
  {
    icon: '🔍',
    text: 'Recherche en langage naturel via Groq AI',
  },
  {
    icon: '⚡',
    text: 'Zéro backend — tout reste dans ton navigateur',
  },
  {
    icon: '⭐',
    text: 'Repositories triés par pertinence, pas juste par stars',
  },
]

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* ── STICKY HEADER ─────────────────────────────────────────── */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        width: '100%',
        background: 'rgba(13,17,23,0.85)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(48,54,61,0.6)',
      }}>
        <div style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '0 24px',
          height: 52,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Left: logo + name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="#58a6ff" strokeWidth="1.5"/>
              <circle cx="12" cy="12" r="5" stroke="#58a6ff" strokeWidth="1.5" strokeDasharray="2 2"/>
              <circle cx="12" cy="12" r="2" fill="#58a6ff"/>
              <line x1="12" y1="3" x2="12" y2="1" stroke="#58a6ff" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span style={{
              fontFamily: 'var(--font-unbounded), Unbounded, cursive',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.08em',
            }}>
              <span style={{ color: '#e6edf3' }}>REPO</span>
              <span style={{ color: '#58a6ff' }}>RADAR</span>
            </span>
          </div>

          {/* Right: version + GitHub */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{
              fontFamily: 'var(--font-oswald), Oswald, sans-serif',
              fontSize: 11,
              color: '#484f58',
              background: '#161b22',
              border: '1px solid #21262d',
              borderRadius: 20,
              padding: '2px 9px',
              letterSpacing: '0.04em',
            }}>
              v1.0.0
            </span>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                fontFamily: 'var(--font-oswald), Oswald, sans-serif',
                fontSize: 11,
                color: '#8b949e',
                textDecoration: 'none',
                letterSpacing: '0.04em',
                transition: 'color 150ms ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#e6edf3')}
              onMouseLeave={e => (e.currentTarget.style.color = '#8b949e')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              GITHUB
            </a>
          </div>
        </div>
      </header>

      {/* ── HERO SECTION ──────────────────────────────────────────── */}
      <main style={{
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background gradient */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #0d1117 100%)',
          zIndex: 0,
        }} />
        {/* Grid overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(48,54,61,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(48,54,61,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
          zIndex: 1,
        }} />
        {/* Blue glow behind popup */}
        <div style={{
          position: 'absolute',
          right: '15%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(88,166,255,0.05) 0%, transparent 70%)',
          zIndex: 1,
          pointerEvents: 'none',
        }} />

        {/* Two-column content */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 1100,
          margin: '0 auto',
          padding: '72px 24px 80px',
          display: 'flex',
          alignItems: 'center',
          gap: 64,
        }}
          className="hero-layout"
        >
          {/* ── LEFT COLUMN ─────────────────────────────────────── */}
          <div style={{ flex: 1, maxWidth: 480 }}>

            {/* Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: 'rgba(88,166,255,0.06)',
              border: '1px solid rgba(88,166,255,0.2)',
              borderRadius: 20,
              padding: '4px 12px',
              marginBottom: 24,
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: '#3fb950',
                display: 'inline-block',
                boxShadow: '0 0 6px #3fb950',
              }} />
              <span style={{
                fontFamily: 'var(--font-oswald), Oswald, sans-serif',
                fontSize: 11,
                color: '#58a6ff',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}>
                Chrome Extension MV3 · Open Source
              </span>
            </div>

            {/* Main heading */}
            <h1 style={{
              fontFamily: 'var(--font-unbounded), Unbounded, cursive',
              fontSize: 32,
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
              marginBottom: 16,
            }}>
              <span style={{ color: '#e6edf3' }}>REPO</span>
              <span style={{ color: '#58a6ff' }}>RADAR</span>
            </h1>

            {/* Tagline */}
            <p style={{
              fontFamily: 'var(--font-rajdhani), Rajdhani, sans-serif',
              fontSize: 18,
              fontWeight: 500,
              color: '#8b949e',
              lineHeight: 1.55,
              marginBottom: 36,
            }}>
              Découvrez des repositories GitHub méconnus grâce à la recherche en langage naturel, propulsée par Groq AI.
            </p>

            {/* Feature bullets */}
            <ul style={{
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              marginBottom: 40,
            }}>
              {FEATURES.map(f => (
                <li key={f.text} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                }}>
                  <span style={{
                    fontSize: 18,
                    lineHeight: 1.3,
                    flexShrink: 0,
                  }}>
                    {f.icon}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-rajdhani), Rajdhani, sans-serif',
                    fontSize: 15,
                    fontWeight: 500,
                    color: '#c9d1d9',
                    lineHeight: 1.45,
                  }}>
                    {f.text}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA buttons */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a
                href="#"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'rgba(88,166,255,0.1)',
                  border: '1px solid #58a6ff',
                  borderRadius: 6,
                  color: '#58a6ff',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-oswald), Oswald, sans-serif',
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '10px 20px',
                  transition: 'all 200ms ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(88,166,255,0.18)'
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(88,166,255,0.15)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(88,166,255,0.1)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Installer l&apos;extension
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'transparent',
                  border: '1px solid #30363d',
                  borderRadius: 6,
                  color: '#8b949e',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-oswald), Oswald, sans-serif',
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '10px 20px',
                  transition: 'all 200ms ease',
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
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
                Voir le code
              </a>
            </div>

            {/* Tech stack */}
            <div style={{ marginTop: 40, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <span style={{
                fontFamily: 'var(--font-oswald), Oswald, sans-serif',
                fontSize: 10,
                color: '#484f58',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}>
                Propulsé par
              </span>
              {['Groq', 'GitHub API', 'Chrome MV3', 'Next.js'].map(tech => (
                <span key={tech} style={{
                  fontFamily: 'var(--font-oswald), Oswald, sans-serif',
                  fontSize: 10,
                  color: '#8b949e',
                  background: '#161b22',
                  border: '1px solid #21262d',
                  borderRadius: 3,
                  padding: '2px 7px',
                  letterSpacing: '0.03em',
                }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN — popup ──────────────────────────── */}
          <div style={{
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
          }}
            className="popup-col"
          >
            {/* Browser chrome mockup bar */}
            <div style={{
              width: 420,
              background: '#161b22',
              border: '1px solid #21262d',
              borderBottom: 'none',
              borderRadius: '8px 8px 0 0',
              padding: '8px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <div style={{ display: 'flex', gap: 5 }}>
                {['#f78166', '#e3b341', '#3fb950'].map(c => (
                  <span key={c} style={{
                    width: 9, height: 9, borderRadius: '50%',
                    background: c, display: 'inline-block', opacity: 0.7,
                  }} />
                ))}
              </div>
              <div style={{
                flex: 1,
                background: '#0d1117',
                border: '1px solid #21262d',
                borderRadius: 4,
                padding: '3px 10px',
                fontFamily: 'var(--font-oswald), Oswald, sans-serif',
                fontSize: 10,
                color: '#484f58',
                letterSpacing: '0.03em',
              }}>
                chrome-extension://reporadar/popup.html
              </div>
            </div>

            {/* The actual popup */}
            <div style={{
              boxShadow: '0 0 60px rgba(88,166,255,0.08), 0 20px 60px rgba(0,0,0,0.5)',
              borderRadius: '0 0 8px 8px',
              overflow: 'hidden',
              border: '1px solid #21262d',
              borderTop: 'none',
            }}>
              <PopupShell />
            </div>

            {/* Caption */}
            <p style={{
              fontFamily: 'var(--font-oswald), Oswald, sans-serif',
              fontSize: 10,
              color: '#484f58',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              textAlign: 'center',
            }}>
              Aperçu interactif — 100% fonctionnel
            </p>
          </div>
        </div>
      </main>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer style={{
        position: 'relative',
        zIndex: 2,
        borderTop: '1px solid #21262d',
        padding: '16px 24px',
        textAlign: 'center',
      }}>
        <span style={{
          fontFamily: 'var(--font-oswald), Oswald, sans-serif',
          fontSize: 10,
          color: '#484f58',
          letterSpacing: '0.05em',
        }}>
          REPORADAR © 2025 · Chrome Extension · MIT License
        </span>
      </footer>

      {/* ── RESPONSIVE CSS ─────────────────────────────────────── */}
      <style>{`
        .hero-layout {
          flex-direction: row;
        }
        @media (max-width: 900px) {
          .hero-layout {
            flex-direction: column !important;
            align-items: center !important;
            gap: 48px !important;
            padding-top: 48px !important;
            padding-bottom: 48px !important;
          }
          .hero-layout > div:first-child {
            max-width: 100% !important;
            text-align: center;
          }
          .hero-layout > div:first-child ul {
            align-items: flex-start;
          }
          .popup-col {
            width: 100%;
            align-items: center;
          }
        }
        @media (max-width: 480px) {
          .popup-col > div {
            width: 100% !important;
            max-width: 420px;
          }
        }
      `}</style>
    </div>
  )
}
