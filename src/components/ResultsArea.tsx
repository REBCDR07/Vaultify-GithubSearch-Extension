'use client'

import { useEffect, useState } from 'react'
import { SearchState, Repo, LoadingStep } from '@/types'
import RepoCard from './RepoCard'
import SuggestionsRow from './SuggestionsRow'
import RadarIcon from './icons/RadarIcon'

const LOADING_STEPS: LoadingStep[] = [
  { id: 0, label: 'Reformulation de la requête…', state: 'pending' },
  { id: 1, label: 'Recherche sur GitHub…', state: 'pending' },
  { id: 2, label: 'Scoring et classement…', state: 'pending' },
  { id: 3, label: 'Génération des résumés…', state: 'pending' },
]

interface ResultsAreaProps {
  state: SearchState
  repos: Repo[]
  favoritedRepos: Set<number>
  onToggleFav: (id: number) => void
  suggestions: string[]
  onSuggestionSelect: (s: string) => void
  errorMsg?: string
}

export default function ResultsArea({
  state, repos, favoritedRepos, onToggleFav,
  suggestions, onSuggestionSelect, errorMsg,
}: ResultsAreaProps) {
  const [steps, setSteps] = useState<LoadingStep[]>(LOADING_STEPS.map(s => ({ ...s })))

  useEffect(() => {
    if (state !== 'loading') {
      setSteps(LOADING_STEPS.map(s => ({ ...s })))
      return
    }
    let current = 0
    setSteps(prev => prev.map((s, i) => ({ ...s, state: i === 0 ? 'active' : 'pending' })))

    const interval = setInterval(() => {
      current++
      if (current >= LOADING_STEPS.length) {
        clearInterval(interval)
        return
      }
      setSteps(prev => prev.map((s, i) => ({
        ...s,
        state: i < current ? 'done' : i === current ? 'active' : 'pending',
      })))
    }, 1200)

    return () => clearInterval(interval)
  }, [state])

  if (state === 'idle') {
    return (
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        padding: 24,
        textAlign: 'center',
      }}>
        <RadarIcon size={48} />
        <p style={{
          fontFamily: 'var(--font-rajdhani)',
          fontSize: 15,
          fontWeight: 600,
          color: 'var(--muted)',
        }}>
          Cherche des repositories
        </p>
        <p style={{
          fontFamily: 'var(--font-rajdhani)',
          fontSize: 12,
          color: 'var(--subtle)',
          lineHeight: 1.5,
          maxWidth: 220,
        }}>
          Tape une requête ou sélectionne une catégorie pour lancer la recherche IA
        </p>
      </div>
    )
  }

  if (state === 'loading') {
    return (
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        padding: '20px 14px',
      }}>
        {steps.map(step => (
          <div key={step.id} style={{ display: 'flex', alignItems: 'center', gap: 10, opacity: step.state === 'pending' ? 0.3 : 1 }}>
            <span style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              flexShrink: 0,
              background: step.state === 'done' ? 'var(--green)' : step.state === 'active' ? 'var(--blue)' : 'var(--subtle)',
              animation: step.state === 'active' ? 'pulse-dot 1s ease infinite' : 'none',
              boxShadow: step.state === 'active' ? '0 0 6px 2px rgba(88,166,255,0.4)' : 'none',
              display: 'inline-block',
            }} />
            <span style={{
              fontFamily: 'var(--font-oswald)',
              fontSize: 12,
              color: step.state === 'done' ? 'var(--green)' : step.state === 'active' ? 'var(--text)' : 'var(--subtle)',
              letterSpacing: '0.02em',
            }}>
              {step.state === 'done' ? '✓ ' : ''}{step.label}
            </span>
          </div>
        ))}
      </div>
    )
  }

  if (state === 'error') {
    return (
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        padding: 24,
        textAlign: 'center',
      }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <p style={{ fontFamily: 'var(--font-oswald)', fontSize: 14, color: 'var(--red)', letterSpacing: '0.04em' }}>
          ERREUR
        </p>
        <p style={{ fontFamily: 'var(--font-rajdhani)', fontSize: 12, color: 'var(--muted)' }}>
          {errorMsg || 'Une erreur est survenue.'}
        </p>
      </div>
    )
  }

  // Results
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Results header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '6px 12px',
        borderBottom: '1px solid var(--border-subtle)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontFamily: 'var(--font-oswald)', fontSize: 11, color: 'var(--muted)', letterSpacing: '0.03em' }}>
            {repos.length} résultats
          </span>
          <span style={{
            fontFamily: 'var(--font-oswald)',
            fontSize: 9,
            color: 'var(--orange)',
            border: '1px solid rgba(227,179,65,0.35)',
            borderRadius: 10,
            padding: '1px 6px',
            letterSpacing: '0.04em',
          }}>
            CACHE
          </span>
        </div>
        <span style={{ fontFamily: 'var(--font-oswald)', fontSize: 10, color: 'var(--subtle)' }}>
          ~1847 tokens
        </span>
      </div>

      {/* Scrollable card list */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {repos.map((repo, i) => (
          <RepoCard
            key={repo.id}
            repo={repo}
            isFavorited={favoritedRepos.has(repo.id)}
            onToggleFav={onToggleFav}
            index={i}
          />
        ))}
        <SuggestionsRow suggestions={suggestions} onSelect={onSuggestionSelect} />
      </div>
    </div>
  )
}
