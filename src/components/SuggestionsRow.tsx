'use client'

interface SuggestionsRowProps {
  suggestions: string[]
  onSelect: (s: string) => void
}

export default function SuggestionsRow({ suggestions, onSelect }: SuggestionsRowProps) {
  if (!suggestions.length) return null

  return (
    <div style={{
      padding: '10px 0 14px',
      borderTop: '1px solid #21262d',
      marginTop: 4,
    }}>
      <p style={{
        fontFamily: 'var(--font-oswald), Oswald, sans-serif',
        fontSize: 12,
        color: '#484f58',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        marginBottom: 8,
      }}>
        Recherches connexes
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {suggestions.map(s => (
          <button
            key={s}
            onClick={() => onSelect(s)}
            style={{
              background: 'rgba(88,166,255,0.06)',
              border: '1px solid rgba(88,166,255,0.18)',
              borderRadius: 20,
              color: '#58a6ff',
              cursor: 'pointer',
              fontFamily: 'var(--font-oswald), Oswald, sans-serif',
              fontSize: 12,
              padding: '3px 11px',
              letterSpacing: '0.03em',
              transition: 'background 150ms ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(88,166,255,0.13)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(88,166,255,0.06)')}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}
