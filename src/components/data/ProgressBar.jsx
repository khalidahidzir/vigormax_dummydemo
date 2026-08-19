import React from 'react'

export function ProgressBar({ value, complete, height = 4, style }) {
  return (
    <div style={{
      height,
      background: 'var(--surface-sunken)',
      borderRadius: 'var(--radius-tail)',
      overflow: 'hidden',
      ...style,
    }}>
      <div style={{
        height: '100%',
        width: `${Math.max(0, Math.min(100, value))}%`,
        background: complete ? 'var(--accent)' : 'var(--status-progress-fg)',
        borderRadius: 'var(--radius-tail)',
        transition: 'var(--transition-progress)',
      }} />
    </div>
  )
}
