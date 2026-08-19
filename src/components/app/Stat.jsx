import React from 'react'

const SPINE = {
  info: 'var(--vm-blue-500)', done: 'var(--vm-olive-600)', progress: 'var(--vm-amber-500)',
  overdue: 'var(--vm-red-500)', neutral: 'var(--vm-stone-600)', cleared: 'var(--vm-green-500)',
  pending: 'var(--vm-amber-500)',
}

export function Stat({ label, value, tone = 'neutral', style }) {
  const spine = SPINE[tone] || SPINE.neutral
  return (
    <div style={{ position: 'relative', overflow: 'hidden', background: 'var(--surface-card)', border: 'var(--border-hairline)', borderRadius: 12, padding: '16px 18px 15px', boxShadow: 'var(--shadow-card)', ...style }}>
      <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: spine }} />
      <p style={{ margin: '0 0 12px', fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>{label}</p>
      <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 30, lineHeight: 1, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>{value}</p>
    </div>
  )
}
