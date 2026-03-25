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
      gap: 5,
      padding: '7px 12px 8px',
      overflowX: 'auto',
      scrollbarWidth: 'none',
      flexShrink: 0,
      borderBottom: '1px solid var(--border-subtle)',
    }}>
      {CATEGORIES.map(cat => {
        const isActive = activeCategory === cat.label
        return (
          <button
            key={cat.label}
            onClick={() => onSelect(cat.query, cat.label)}
            style={{
              fontFamily: 'var(--font-oswald)',
              fontSize: 10,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              padding: '3px 9px',
              borderRadius: 20,
              border: `1px solid ${isActive ? 'var(--blue)' : 'var(--border-subtle)'}`,
              background: isActive ? 'rgba(88, 166, 255, 0.08)' : 'var(--surface-2)',
              color: isActive ? 'var(--blue)' : 'var(--muted)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
            onMouseEnter={e => {
              if (!isActive) {
                e.currentTarget.style.borderColor = 'var(--blue)'
                e.currentTarget.style.color = 'var(--blue)'
                e.currentTarget.style.background = 'rgba(88, 166, 255, 0.08)'
              }
            }}
            onMouseLeave={e => {
              if (!isActive) {
                e.currentTarget.style.borderColor = 'var(--border-subtle)'
                e.currentTarget.style.color = 'var(--muted)'
                e.currentTarget.style.background = 'var(--surface-2)'
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
