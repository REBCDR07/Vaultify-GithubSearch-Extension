'use client'

import { Repo } from '@/types'

interface RepoCardProps {
  repo: Repo
  isFavorited: boolean
  onToggleFav: (id: number) => void
  index: number
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Rust: '#dea584',
  Go: '#00ADD8',
  CSS: '#563d7c',
}

export default function RepoCard({ repo, isFavorited, onToggleFav }: RepoCardProps) {
  const langColor = LANG_COLORS[repo.language] || '#8b949e'

  return (
    <div style={{
      background: '#161b22',
      border: '1px solid #21262d',
      borderRadius: 6,
      padding: '12px 14px',
      marginBottom: 8,
    }}>

      {/* Row 1: name + stars + lang */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7, alignItems: 'center', gap: 8 }}>
        <a
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#58a6ff',
            fontWeight: 700,
            fontSize: 16,
            textDecoration: 'none',
            fontFamily: 'var(--font-rajdhani), Rajdhani, sans-serif',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            flex: 1,
          }}
          onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
          onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
        >
          {repo.owner}/<strong>{repo.name}</strong>
        </a>
        <div style={{ display: 'flex', gap: 7, alignItems: 'center', flexShrink: 0 }}>
          <span style={{ color: '#e3b341', fontSize: 13, fontFamily: 'var(--font-oswald), Oswald, sans-serif' }}>
            ⭐ {repo.starsFormatted}
          </span>
          <span style={{
            background: '#1c2128',
            border: '1px solid #21262d',
            borderRadius: 3,
            padding: '2px 7px',
            fontSize: 12,
            color: '#8b949e',
            fontFamily: 'var(--font-oswald), Oswald, sans-serif',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: '50%',
              background: langColor, display: 'inline-block', flexShrink: 0,
            }} />
            {repo.language}
          </span>
        </div>
      </div>

      {/* Description */}
      <p style={{
        fontSize: 14,
        color: '#8b949e',
        marginBottom: 8,
        lineHeight: 1.5,
        fontFamily: 'var(--font-rajdhani), Rajdhani, sans-serif',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>
        {repo.description}
      </p>

      {/* AI Summary box */}
      <div style={{
        background: 'rgba(88,166,255,0.05)',
        border: '1px solid rgba(88,166,255,0.12)',
        borderRadius: 4,
        padding: '8px 11px',
        marginBottom: 8,
      }}>
        <p style={{
          fontSize: 13,
          color: '#8b949e',
          marginBottom: 5,
          lineHeight: 1.4,
          fontFamily: 'var(--font-rajdhani), Rajdhani, sans-serif',
        }}>
          <span style={{ color: '#58a6ff' }}>✦ </span>
          {repo.summary.what}
        </p>
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
          {repo.summary.stack && (
            <span style={{
              fontSize: 11, color: '#3fb950',
              border: '1px solid rgba(63,185,80,0.25)',
              borderRadius: 3, padding: '2px 7px',
              fontFamily: 'var(--font-oswald), Oswald, sans-serif',
            }}>
              {repo.summary.stack}
            </span>
          )}
          {repo.summary.strengths && (
            <span style={{
              fontSize: 11, color: '#3fb950',
              border: '1px solid rgba(63,185,80,0.25)',
              borderRadius: 3, padding: '2px 7px',
              fontFamily: 'var(--font-oswald), Oswald, sans-serif',
            }}>
              {repo.summary.strengths}
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{
          fontSize: 12, color: '#484f58',
          fontFamily: 'var(--font-oswald), Oswald, sans-serif',
        }}>
          {repo.pushedAgo}
        </span>
        <div style={{ display: 'flex', gap: 5 }}>
          <button
            onClick={() => onToggleFav(repo.id)}
            style={{
              background: isFavorited ? 'rgba(247,129,102,0.1)' : '#1c2128',
              border: isFavorited ? '1px solid rgba(247,129,102,0.35)' : '1px solid #21262d',
              color: isFavorited ? '#f78166' : '#8b949e',
              borderRadius: 4, padding: '4px 11px',
              fontSize: 12, cursor: 'pointer',
              fontFamily: 'var(--font-oswald), Oswald, sans-serif',
              letterSpacing: '0.03em',
              transition: 'all 150ms ease',
            }}
          >
            {isFavorited ? '♥' : '♡'} {isFavorited ? 'Sauvé' : 'Favori'}
          </button>
          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#1c2128', border: '1px solid #21262d',
              color: '#8b949e', borderRadius: 4, padding: '4px 11px',
              fontSize: 12, cursor: 'pointer',
              fontFamily: 'var(--font-oswald), Oswald, sans-serif',
              letterSpacing: '0.03em', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 4,
              transition: 'all 150ms ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#e6edf3'; e.currentTarget.style.borderColor = '#484f58' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#8b949e'; e.currentTarget.style.borderColor = '#21262d' }}
          >
            ↗ Ouvrir
          </a>
        </div>
      </div>

      {/* Topics */}
      {repo.topics.length > 0 && (
        <div style={{ display: 'flex', gap: 4, marginTop: 8, flexWrap: 'wrap' }}>
          {repo.topics.slice(0, 4).map(t => (
            <span key={t} style={{
              fontSize: 11, color: '#484f58',
              border: '1px solid #21262d', borderRadius: 10,
              padding: '2px 8px',
              fontFamily: 'var(--font-oswald), Oswald, sans-serif',
            }}>
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
