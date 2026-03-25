export default function RadarIcon({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <circle cx="10" cy="10" r="8.5" stroke="#58a6ff" strokeWidth="1.5" />
      <line x1="10" y1="5" x2="10" y2="15" stroke="#3fb950" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="5" y1="10" x2="15" y2="10" stroke="#3fb950" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}
