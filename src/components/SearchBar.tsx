'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SearchIcon from './icons/SearchIcon'
import { FilterState } from '@/types'

interface SearchBarProps {
  query: string
  onQueryChange: (val: string) => void
  onSearch: (val: string) => void
  showFilters: boolean
  onToggleFilters: () => void
  filterState: FilterState
  onFilterChange: (key: keyof FilterState, val: string) => void
}

const selectStyle: React.CSSProperties = {
  background: 'var(--bg)',
  border: '1px solid var(--border)',
  borderRadius: 5,
  color: 'var(--text)',
  fontFamily: 'var(--font-oswald), Oswald, sans-serif',
  fontSize: 13,
  padding: '6px 9px',
  outline: 'none',
  cursor: 'pointer',
  width: '100%',
}

export default function SearchBar({
  query, onQueryChange, onSearch,
  showFilters, onToggleFilters,
  filterState, onFilterChange,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [focused, setFocused] = useState(false)

  const activeFilterCount = Object.values(filterState).filter(Boolean).length

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') onSearch(query)
  }

  function handleReset() {
    onFilterChange('language', '')
    onFilterChange('starsMin', '')
    onFilterChange('pushedWithin', '')
    onFilterChange('license', '')
  }

  return (
    <div style={{
      padding: '10px 14px 0',
      background: 'var(--surface)',
      flexShrink: 0,
      borderBottom: '1px solid var(--border-subtle)',
    }}>
      {/* Input row */}
      <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
        {/* Search input */}
        <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
          <span style={{
            position: 'absolute',
            left: 10,
            color: 'var(--muted)',
            display: 'flex',
            alignItems: 'center',
            pointerEvents: 'none',
            zIndex: 1,
          }}>
            <SearchIcon size={15} />
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={e => onQueryChange(e.target.value)}
            onKeyDown={handleKey}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Rechercher des repos GitHub…"
            autoComplete="off"
            spellCheck={false}
            style={{
              width: '100%',
              background: 'var(--bg)',
              border: `1px solid ${focused ? 'var(--blue)' : 'var(--border)'}`,
              borderRadius: 6,
              color: 'var(--text)',
              fontFamily: 'var(--font-rajdhani), Rajdhani, sans-serif',
              fontSize: 15,
              fontWeight: 500,
              padding: '8px 32px 8px 32px',
              outline: 'none',
              transition: 'border-color 150ms ease',
            }}
          />
          {query && (
            <button
              onClick={() => { onQueryChange(''); inputRef.current?.focus() }}
              style={{
                position: 'absolute',
                right: 9,
                background: 'none',
                border: 'none',
                color: 'var(--muted)',
                cursor: 'pointer',
                fontSize: 17,
                lineHeight: 1,
                padding: 0,
                display: 'flex',
              }}
            >×</button>
          )}
        </div>

        {/* Filter toggle */}
        <button
          onClick={onToggleFilters}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            padding: '7px 11px',
            background: showFilters ? 'rgba(88, 166, 255, 0.08)' : 'var(--bg)',
            border: `1px solid ${showFilters ? 'var(--blue)' : 'var(--border)'}`,
            borderRadius: 6,
            color: showFilters ? 'var(--blue)' : 'var(--muted)',
            cursor: 'pointer',
            flexShrink: 0,
            fontFamily: 'var(--font-oswald), Oswald, sans-serif',
            fontSize: 12,
            letterSpacing: '0.04em',
            transition: 'all 150ms ease',
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="6" x2="20" y2="6"/>
            <line x1="8" y1="12" x2="16" y2="12"/>
            <line x1="10" y1="18" x2="14" y2="18"/>
          </svg>
          FILTRES
          {activeFilterCount > 0 && (
            <span style={{
              background: 'var(--blue)',
              color: '#0d1117',
              borderRadius: 10,
              padding: '0 6px',
              fontSize: 11,
              fontWeight: 700,
              lineHeight: '16px',
            }}>
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Filter panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              marginTop: 9,
              padding: '11px',
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 7,
            }}>
              <select style={selectStyle} value={filterState.language} onChange={e => onFilterChange('language', e.target.value)}>
                <option value="">Langage</option>
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
                <option value="rust">Rust</option>
                <option value="go">Go</option>
                <option value="css">CSS</option>
              </select>
              <select style={selectStyle} value={filterState.starsMin} onChange={e => onFilterChange('starsMin', e.target.value)}>
                <option value="">Stars min</option>
                <option value="100">100+</option>
                <option value="1000">1k+</option>
                <option value="5000">5k+</option>
                <option value="10000">10k+</option>
                <option value="50000">50k+</option>
              </select>
              <select style={selectStyle} value={filterState.pushedWithin} onChange={e => onFilterChange('pushedWithin', e.target.value)}>
                <option value="">Mise à jour</option>
                <option value="1month">Ce mois</option>
                <option value="6months">6 mois</option>
                <option value="1year">Cette année</option>
              </select>
              <select style={selectStyle} value={filterState.license} onChange={e => onFilterChange('license', e.target.value)}>
                <option value="">Licence</option>
                <option value="mit">MIT</option>
                <option value="apache-2.0">Apache 2.0</option>
                <option value="gpl-3.0">GPL 3.0</option>
              </select>
              <button
                onClick={handleReset}
                style={{
                  gridColumn: 'span 2',
                  background: 'none',
                  border: '1px solid var(--border)',
                  borderRadius: 5,
                  color: 'var(--muted)',
                  fontFamily: 'var(--font-oswald), Oswald, sans-serif',
                  fontSize: 12,
                  padding: '6px',
                  cursor: 'pointer',
                  letterSpacing: '0.04em',
                  transition: 'all 150ms ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--red)'
                  e.currentTarget.style.color = 'var(--red)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.color = 'var(--muted)'
                }}
              >
                ↺ RÉINITIALISER
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ height: 9 }} />
    </div>
  )
}
