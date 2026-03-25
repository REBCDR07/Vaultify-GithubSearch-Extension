'use client'

import RadarIcon from './icons/RadarIcon'
import HeartIcon from './icons/HeartIcon'
import GearIcon from './icons/GearIcon'

interface HeaderProps {
  onToggleBanner: () => void
  onFavoritesClick: () => void
}

const iconBtnStyle: React.CSSProperties = {
  width: 28,
  height: 28,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'transparent',
  border: '1px solid transparent',
  borderRadius: 6,
  cursor: 'pointer',
  color: 'var(--muted)',
  flexShrink: 0,
}

export default function Header({ onToggleBanner, onFavoritesClick }: HeaderProps) {
  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px 12px',
      borderBottom: '1px solid var(--border)',
      background: 'var(--surface)',
      flexShrink: 0,
    }}>
      {/* Left: logo + brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <RadarIcon size={20} />
        <span style={{
          fontFamily: 'var(--font-unbounded)',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.08em',
        }}>
          <span style={{ color: 'var(--text)' }}>REPO</span>
          <span style={{ color: 'var(--blue)' }}>RADAR</span>
        </span>
      </div>

      {/* Right: action buttons */}
      <div style={{ display: 'flex', gap: 4 }}>
        <button
          style={iconBtnStyle}
          onClick={onFavoritesClick}
          title="Favoris"
          onMouseEnter={e => {
            const el = e.currentTarget
            el.style.background = 'var(--surface-2)'
            el.style.borderColor = 'var(--border)'
            el.style.color = 'var(--red)'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget
            el.style.background = 'transparent'
            el.style.borderColor = 'transparent'
            el.style.color = 'var(--muted)'
          }}
        >
          <HeartIcon size={15} />
        </button>
        <button
          style={iconBtnStyle}
          onClick={onToggleBanner}
          title="Paramètres"
          onMouseEnter={e => {
            const el = e.currentTarget
            el.style.background = 'var(--surface-2)'
            el.style.borderColor = 'var(--border)'
            el.style.color = 'var(--text)'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget
            el.style.background = 'transparent'
            el.style.borderColor = 'transparent'
            el.style.color = 'var(--muted)'
          }}
        >
          <GearIcon size={15} />
        </button>
      </div>
    </header>
  )
}
