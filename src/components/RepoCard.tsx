'use client'

import { motion } from 'framer-motion'
import { Repo } from '@/types'
import HeartIcon from './icons/HeartIcon'
import ExternalIcon from './icons/ExternalIcon'

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

export default function RepoCard({ repo, isFavorited, onToggleFav, index }: RepoCardProps) {
  const langColor = LANG_COLORS[repo.language] || 'var(--muted)'

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.18 }}
      style={{
        padding: '11px 12px',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      {/* Top row: name + stars + lang */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 5 }}>
        <a
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: 'var(--font-oswald)',
            fontSize: 13,
            fontWeight: 500,
            color: 'var(--blue)',
            textDecoration: 'none',
            flex: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
          onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
        >
          {repo.fullName}
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexShrink: 0 }}>
          <span style={{
            fontFamily: 'var(--font-oswald)',
            fontSize: 11,
            color: 'var(--orange)',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}>
            ★ {repo.starsFormatted}
          </span>
          <span style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            fontFamily: 'var(--font-oswald)',
            fontSize: 10,
            color: 'var(--muted)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 10,
            padding: '1px 7px',
          }}>
            <span style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: langColor,
              flexShrink: 0,
              display: 'inline-block',
            }} />
            {repo.language}
          </span>
        </div>
      </div>

      {/* Description */}
      <p style={{
        fontFamily: 'var(--font-rajdhani)',
        fontSize: 12,
        color: 'var(--muted)',
        lineHeight: 1.5,
        marginBottom: 7,
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>
        {repo.description}
      </p>

      {/* AI summary box */}
      <div style={{
        background: 'rgba(88, 166, 255, 0.05)',
        border: '1px solid rgba(88, 166, 255, 0.12)',
        borderRadius: 5,
        padding: '7px 9px',
        marginBottom: 7,
      }}>
        <div style={{
          fontFamily: 'var(--font-rajdhani)',
          fontSize: 12,
          color: 'var(--text)',
          marginBottom: 5,
          display: 'flex',
          gap: 5,
        }}>
          <span style={{ color: 'var(--blue)', flexShrink: 0 }}>✦</span>
          <span>{repo.summary.what}</span>
        </div>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {repo.summary.stack && (
            <span style={{
              background: 'rgba(63, 185, 80, 0.08)',
              border: '1px solid rgba(63, 185, 80, 0.2)',
              color: 'var(--green)',
              borderRadius: 10,
              padding: '1px 7px',
              fontFamily: 'var(--font-oswald)',
              fontSize: 10,
            }}>
              {repo.summary.stack}
            </span>
          )}
          {repo.summary.strengths && (
            <span style={{
              background: 'rgba(63, 185, 80, 0.08)',
              border: '1px solid rgba(63, 185, 80, 0.2)',
              color: 'var(--green)',
              borderRadius: 10,
              padding: '1px 7px',
              fontFamily: 'var(--font-oswald)',
              fontSize: 10,
            }}>
              {repo.summary.strengths}
            </span>
          )}
        </div>
      </div>

      {/* Topics */}
      {repo.topics.length > 0 && (
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 7 }}>
          {repo.topics.map(t => (
            <span key={t} style={{
              background: 'var(--surface-2)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--subtle)',
              borderRadius: 10,
              padding: '1px 7px',
              fontFamily: 'var(--font-oswald)',
              fontSize: 10,
            }}>
              {t}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{
          fontFamily: 'var(--font-oswald)',
          fontSize: 10,
          color: 'var(--subtle)',
        }}>
          {repo.pushedAgo}
        </span>
        <div style={{ display: 'flex', gap: 5 }}>
          <button
            onClick={() => onToggleFav(repo.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              background: isFavorited ? 'rgba(247, 129, 102, 0.08)' : 'var(--surface-2)',
              border: `1px solid ${isFavorited ? 'rgba(247,129,102,0.4)' : 'var(--border)'}`,
              borderRadius: 5,
              color: isFavorited ? 'var(--red)' : 'var(--muted)',
              cursor: 'pointer',
              fontFamily: 'var(--font-oswald)',
              fontSize: 10,
              padding: '3px 8px',
              letterSpacing: '0.03em',
            }}
          >
            <HeartIcon size={11} filled={isFavorited} />
            {isFavorited ? 'Sauvé' : 'Favori'}
          </button>
          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              borderRadius: 5,
              color: 'var(--muted)',
              fontFamily: 'var(--font-oswald)',
              fontSize: 10,
              padding: '3px 8px',
              textDecoration: 'none',
              letterSpacing: '0.03em',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'var(--text)'
              e.currentTarget.style.borderColor = 'var(--muted)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'var(--muted)'
              e.currentTarget.style.borderColor = 'var(--border)'
            }}
          >
            <ExternalIcon size={10} />
            Ouvrir
          </a>
        </div>
      </div>
    </motion.div>
  )
}
