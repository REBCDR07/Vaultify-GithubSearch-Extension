'use client'

interface SuggestionsRowProps {
  suggestions: string[]
  onSelect: (s: string) => void
}

export default function SuggestionsRow({ suggestions, onSelect }: SuggestionsRowProps) {
  if (!suggestions.length) return null

  return (
    <div style={{
      padding: '8px 12px 10px',
      borderTop: '1px solid var(--border-subtle)',
    }}>
      <p style={{
        fontFamily: 'var(--font-oswald), Oswald, sans-serif',
        fontSize: 10,
        color: 'var(--subtle)',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        marginBottom: 6,
      }}>
        Recherches connexes
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
        {suggestions.map(s => (
          <button
            key={s}
            onClick={() => onSelect(s)}
            style={{
              background: 'rgba(88, 166, 255, 0.06)',
              border: '1px solid rgba(88, 166, 255, 0.18)',
              borderRadius: 20,
              color: 'var(--blue)',
              cursor: 'pointer',
              fontFamily: 'var(--font-oswald), Oswald, sans-serif',
              fontSize: 10,
              padding: '2px 9px',
              letterSpacing: '0.03em',
              transition: 'background 150ms ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(88, 166, 255, 0.13)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(88, 166, 255, 0.06)')}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}
