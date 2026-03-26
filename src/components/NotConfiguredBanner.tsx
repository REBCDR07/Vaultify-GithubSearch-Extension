'use client'

import { AlertTriangle, X } from 'lucide-react'

export default function NotConfiguredBanner({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '7px 12px',
      background: 'rgba(227, 179, 65, 0.08)',
      borderBottom: '1px solid rgba(227, 179, 65, 0.25)',
      cursor: 'pointer',
    }} onClick={onDismiss}>
      <AlertTriangle size={14} color="var(--orange)" strokeWidth={2} />
      <span style={{
        fontFamily: 'var(--font-oswald)',
        fontSize: 11,
        color: 'var(--orange)',
        flex: 1,
        letterSpacing: '0.02em',
      }}>
        Clé Groq non configurée — cliquez pour configurer
      </span>
      <X size={14} color="var(--orange)" strokeWidth={2} style={{ opacity: 0.6 }} />
    </div>
  )
}
