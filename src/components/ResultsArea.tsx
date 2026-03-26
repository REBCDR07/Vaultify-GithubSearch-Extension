'use client'

import { useEffect, useState } from 'react'
import { SearchState, LoadingStep } from '@/types'
import { MOCK_REPOS, MOCK_SUGGESTIONS } from '@/data/mockRepos'
import RepoCard from './RepoCard'
import SuggestionsRow from './SuggestionsRow'
import RadarIcon from './icons/RadarIcon'

const INITIAL_STEPS: LoadingStep[] = [
  { id: 0, label: 'Reformulation de la requête…', state: 'pending' },
  { id: 1, label: 'Recherche sur GitHub…', state: 'pending' },
  { id: 2, label: 'Scoring et classement…', state: 'pending' },
  { id: 3, label: 'Génération des résumés…', state: 'pending' },
]

interface ResultsAreaProps {
  state: SearchState
  favoritedRepos: Set<number>
  onToggleFav: (id: number) => void
  onSuggestionSelect: (s: string) => void
  errorMsg?: string
}

export default function ResultsArea({
  state, favoritedRepos, onToggleFav, onSuggestionSelect, errorMsg,
}: ResultsAreaProps) {
  const [steps, setSteps] = useState<LoadingStep[]>(INITIAL_STEPS.map(s => ({ ...s })))

  useEffect(() => {
    if (state !== 'loading') {
      setSteps(INITIAL_STEPS.map(s => ({ ...s })))
      return
    }
    setSteps(INITIAL_STEPS.map((s, i) => ({ ...s, state: i === 0 ? 'active' : 'pending' })))
    let current = 0
    const interval = setInterval(() => {
      current++
      if (current >= INITIAL_STEPS.length) { clearInterval(interval); return }
      setSteps(prev => prev.map((s, i) => ({
        ...s,
        state: i < current ? 'done' : i === current ? 'active' : 'pending',
      })))
    }, 1200)
    return () => clearInterval(interval)
  }, [state])

  // ── IDLE ────────────────────────────────────────────────────
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
          fontFamily: 'var(--font-rajdhani), Rajdhani, sans-serif',
          fontSize: 15,
          fontWeight: 600,
          color: 'var(--muted)',
        }}>
          Cherche des repositories
        </p>
        <p style={{
          fontFamily: 'var(--font-rajdhani), Rajdhani, sans-serif',
          fontSize: 12,
          color: 'var(--subtle)',
          lineHeight: 1.5,
          maxWidth: 220,
        }}>
          Tape une requête et appuie sur Entrée, ou sélectionne une catégorie
        </p>
      </div>
    )
  }

  // ── LOADING ──────────────────────────────────────────────────
  if (state === 'loading') {
    return (
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        padding: '22px 16px',
      }}>
        {steps.map(step => (
          <div key={step.id} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            opacity: step.state === 'pending' ? 0.3 : 1,
            transition: 'opacity 300ms ease',
          }}>
            <span style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              flexShrink: 0,
              display: 'inline-block',
              background: step.state === 'done' ? '#3fb950' : step.state === 'active' ? '#58a6ff' : '#484f58',
              animation: step.state === 'active' ? 'pulse-dot 1s ease infinite' : 'none',
              boxShadow: step.state === 'active' ? '0 0 0 3px rgba(88,166,255,0.2)' : 'none',
              transition: 'background 300ms ease',
            }} />
            <span style={{
              fontFamily: 'var(--font-oswald), Oswald, sans-serif',
              fontSize: 12,
              letterSpacing: '0.02em',
              color: step.state === 'done' ? '#3fb950' : step.state === 'active' ? '#e6edf3' : '#484f58',
              transition: 'color 300ms ease',
            }}>
              {step.state === 'done' ? '✓ ' : ''}{step.label}
            </span>
          </div>
        ))}
      </div>
    )
  }

  // ── ERROR ─────────────────────────────────────────────────────
  if (state === 'error') {
    return (
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 10, padding: 24, textAlign: 'center',
      }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#f78166" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <p style={{ fontFamily: 'var(--font-oswald), Oswald, sans-serif', fontSize: 13, color: '#f78166', letterSpacing: '0.04em' }}>ERREUR</p>
        <p style={{ fontFamily: 'var(--font-rajdhani), Rajdhani, sans-serif', fontSize: 12, color: '#8b949e' }}>
          {errorMsg || 'Une erreur est survenue.'}
        </p>
      </div>
    )
  }

  // ── RESULTS — MOCK_REPOS hardcoded here ──────────────────────
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0 }}>

      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '5px 12px',
        borderBottom: '1px solid #21262d',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{
            fontFamily: 'var(--font-oswald), Oswald, sans-serif',
            fontSize: 11, color: '#8b949e', letterSpacing: '0.02em',
          }}>
            {MOCK_REPOS.length} résultats
          </span>
          <span style={{
            fontFamily: 'var(--font-oswald), Oswald, sans-serif',
            fontSize: 9, color: '#e3b341',
            border: '1px solid rgba(227,179,65,0.35)',
            borderRadius: 10, padding: '1px 6px',
            letterSpacing: '0.05em', textTransform: 'uppercase',
          }}>
            cache
          </span>
        </div>
        <span style={{
          fontFamily: 'var(--font-oswald), Oswald, sans-serif',
          fontSize: 10, color: '#484f58', letterSpacing: '0.02em',
        }}>
          ~1847 tokens
        </span>
      </div>

      {/* Scrollable card list — grows to fill remaining popup height */}
      <div className="results-scroll" style={{ overflowY: 'auto', flex: 1, minHeight: 0, padding: '6px 10px 0' }}>
        {MOCK_REPOS.map((repo, i) => (
          <RepoCard
            key={repo.id}
            repo={repo}
            isFavorited={favoritedRepos.has(repo.id)}
            onToggleFav={onToggleFav}
            index={i}
          />
        ))}
        <SuggestionsRow suggestions={MOCK_SUGGESTIONS} onSelect={onSuggestionSelect} />
      </div>
    </div>
  )
}
