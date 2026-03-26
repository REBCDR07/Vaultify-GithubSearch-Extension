'use client'

import { useState, useCallback } from 'react'
import { SearchState, FilterState } from '@/types'
import Header from './Header'
import NotConfiguredBanner from './NotConfiguredBanner'
import SearchBar from './SearchBar'
import CategoryPills from './CategoryPills'
import ResultsArea from './ResultsArea'

const INITIAL_FILTER: FilterState = {
  language: '',
  starsMin: '',
  pushedWithin: '',
  license: '',
}

export default function PopupShell() {
  const [searchState, setSearchState] = useState<SearchState>('results')
  const [searchQuery, setSearchQuery] = useState('state management react')
  const [favoritedRepos, setFavoritedRepos] = useState<Set<number>>(new Set())
  const [showBanner, setShowBanner] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [activeCategory, setActiveCategory] = useState('')
  const [filterState, setFilterState] = useState<FilterState>(INITIAL_FILTER)

  const handleSearch = useCallback((query: string) => {
    if (!query.trim() || query.trim().length < 3) return
    setSearchState('loading')
    setTimeout(() => setSearchState('results'), 5200)
  }, [])

  // Only update query on change — no auto-search on keystroke
  const handleQueryChange = useCallback((val: string) => {
    setSearchQuery(val)
    if (val.length === 0) {
      setSearchState('idle')
      setActiveCategory('')
    }
  }, [])

  const handleCategorySelect = useCallback((query: string, label: string) => {
    setActiveCategory(prev => prev === label ? '' : label)
    setSearchQuery(query)
    handleSearch(query)
  }, [handleSearch])

  const handleFilterChange = useCallback((key: keyof FilterState, val: string) => {
    setFilterState(prev => ({ ...prev, [key]: val }))
  }, [])

  const handleToggleFav = useCallback((id: number) => {
    setFavoritedRepos(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const handleSuggestionSelect = useCallback((s: string) => {
    setSearchQuery(s)
    setActiveCategory('')
    handleSearch(s)
  }, [handleSearch])

  return (
    <div style={{
      width: '100%',
      minHeight: 600,
      overflow: 'hidden',
      background: 'var(--bg)',
      color: 'var(--text)',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'var(--font-rajdhani), Rajdhani, sans-serif',
      position: 'relative',
    }}>
      <Header
        onToggleBanner={() => setShowBanner(v => !v)}
        onFavoritesClick={() => console.log('Favoris')}
      />

      {showBanner && (
        <NotConfiguredBanner onDismiss={() => setShowBanner(false)} />
      )}

      <SearchBar
        query={searchQuery}
        onQueryChange={handleQueryChange}
        onSearch={handleSearch}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(v => !v)}
        filterState={filterState}
        onFilterChange={handleFilterChange}
      />

      <CategoryPills
        activeCategory={activeCategory}
        onSelect={handleCategorySelect}
      />

      <ResultsArea
        state={searchState}
        favoritedRepos={favoritedRepos}
        onToggleFav={handleToggleFav}
        onSuggestionSelect={handleSuggestionSelect}
      />
    </div>
  )
}
