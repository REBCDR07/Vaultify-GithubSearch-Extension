'use client'

const CATEGORIES = [
  { label: 'UI Libs',   query: 'composants UI React modernes' },
  { label: 'Icons',     query: 'icônes SVG légères open source' },
  { label: 'CLI Tools', query: 'outils CLI développeur productivité' },
  { label: 'CSS',       query: 'frameworks CSS modernes' },
  { label: 'State',     query: 'state management léger javascript' },
  { label: 'Anim',      query: 'animation javascript bibliothèque' },
]

interface CategoryPillsProps {
  activeCategory: string
  onSelect: (query: string, label: string) => void
}

export default function CategoryPills({ activeCategory, onSelect }: CategoryPillsProps) {
  return (
    <div style={{
      display: 'flex',
      gap: 7,
      padding: '8px 16px 9px',
      overflowX: 'auto',
      scrollbarWidth: 'none',
      flexShrink: 0,
      borderBottom: '1px solid #21262d',
    }}>
      {CATEGORIES.map(cat => {
        const isActive = activeCategory === cat.label
        return (
          <button
            key={cat.label}
            onClick={() => onSelect(cat.query, cat.label)}
            style={{
              fontFamily: 'var(--font-oswald), Oswald, sans-serif',
              fontSize: 14,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              padding: '5px 14px',
              borderRadius: 20,
              border: `1px solid ${isActive ? '#58a6ff' : '#21262d'}`,
              background: isActive ? 'rgba(88,166,255,0.08)' : '#1c2128',
              color: isActive ? '#58a6ff' : '#8b949e',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              transition: 'all 150ms ease',
            }}
            onMouseEnter={e => {
              if (!isActive) {
                e.currentTarget.style.borderColor = '#58a6ff'
                e.currentTarget.style.color = '#58a6ff'
                e.currentTarget.style.background = 'rgba(88,166,255,0.06)'
              }
            }}
            onMouseLeave={e => {
              if (!isActive) {
                e.currentTarget.style.borderColor = '#21262d'
                e.currentTarget.style.color = '#8b949e'
                e.currentTarget.style.background = '#1c2128'
              }
            }}
          >
            {cat.label}
          </button>
        )
      })}
    </div>
  )
}
