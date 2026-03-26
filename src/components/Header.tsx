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
  color: '#8b949e',
  flexShrink: 0,
  transition: 'all 150ms ease',
}

export default function Header({ onToggleBanner, onFavoritesClick }: HeaderProps) {
  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px 12px',
      borderBottom: '1px solid #21262d',
      background: '#161b22',
      flexShrink: 0,
    }}>
      {/* Left: logo + brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <RadarIcon size={20} />
        <span style={{
          fontFamily: 'var(--font-unbounded), Unbounded, cursive',
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: '0.08em',
        }}>
          <span style={{ color: '#e6edf3' }}>REPO</span>
          <span style={{ color: '#58a6ff' }}>RADAR</span>
        </span>
      </div>

      {/* Right: action buttons */}
      <div style={{ display: 'flex', gap: 4 }}>
        <button
          style={iconBtnStyle}
          onClick={onFavoritesClick}
          title="Favoris"
          onMouseEnter={e => {
            e.currentTarget.style.background = '#1c2128'
            e.currentTarget.style.borderColor = '#30363d'
            e.currentTarget.style.color = '#f78166'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.borderColor = 'transparent'
            e.currentTarget.style.color = '#8b949e'
          }}
        >
          <HeartIcon size={15} />
        </button>
        <button
          style={iconBtnStyle}
          onClick={onToggleBanner}
          title="Paramètres Groq"
          onMouseEnter={e => {
            e.currentTarget.style.background = '#1c2128'
            e.currentTarget.style.borderColor = '#30363d'
            e.currentTarget.style.color = '#e6edf3'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.borderColor = 'transparent'
            e.currentTarget.style.color = '#8b949e'
          }}
        >
          <GearIcon size={15} />
        </button>
      </div>
    </header>
  )
}
