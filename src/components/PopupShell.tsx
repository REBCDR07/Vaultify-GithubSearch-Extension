'use client'

import { useState, useCallback } from 'react'
import { SearchState, FilterState } from '@/types'
import { MOCK_REPOS, MOCK_SUGGESTIONS } from '@/data/mockRepos'
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
  const [searchState, setSearchState] = useState<SearchState>('idle')
  const [searchQuery, setSearchQuery] = useState('')
  const [favoritedRepos, setFavoritedRepos] = useState<Set<number>>(new Set())
  const [showBanner, setShowBanner] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [activeCategory, setActiveCategory] = useState('')
  const [filterState, setFilterState] = useState<FilterState>(INITIAL_FILTER)

  const handleSearch = useCallback((query: string) => {
    if (!query.trim() || query.trim().length < 3) return
    setSearchState('loading')
    setTimeout(() => {
      setSearchState('results')
    }, 5200)
  }, [])

  const handleQueryChange = useCallback((val: string) => {
    setSearchQuery(val)
    if (val.length === 0) {
      setSearchState('idle')
      setActiveCategory('')
    }
    if (val.length >= 3) {
      handleSearch(val)
    }
  }, [handleSearch])

  const handleCategorySelect = useCallback((query: string, label: string) => {
    setActiveCategory(label)
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
      width: 420,
      height: 600,
      overflow: 'hidden',
      background: 'var(--bg)',
      color: 'var(--text)',
      border: '1px solid var(--border)',
      borderRadius: 8,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'var(--font-rajdhani)',
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
        repos={MOCK_REPOS}
        favoritedRepos={favoritedRepos}
        onToggleFav={handleToggleFav}
        suggestions={MOCK_SUGGESTIONS}
        onSuggestionSelect={handleSuggestionSelect}
      />
    </div>
  )
}
