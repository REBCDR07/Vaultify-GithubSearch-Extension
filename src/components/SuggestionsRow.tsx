'use client'

interface SuggestionsRowProps {
  suggestions: string[]
  onSelect: (s: string) => void
}

export default function SuggestionsRow({ suggestions, onSelect }: SuggestionsRowProps) {
  if (!suggestions.length) return null

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 5,
      padding: '8px 12px',
      borderTop: '1px solid var(--border-subtle)',
    }}>
      <span style={{
        fontFamily: 'var(--font-oswald)',
        fontSize: 10,
        color: 'var(--subtle)',
        letterSpacing: '0.04em',
        alignSelf: 'center',
        flexShrink: 0,
      }}>
        VOIR AUSSI
      </span>
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
            fontFamily: 'var(--font-oswald)',
            fontSize: 10,
            padding: '2px 9px',
            letterSpacing: '0.03em',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(88, 166, 255, 0.12)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(88, 166, 255, 0.06)'}
        >
          {s}
        </button>
      ))}
    </div>
  )
}
