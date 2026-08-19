import React from 'react'

// Deterministic tint rotation, copied from the product's AVATAR_COLORS.
const palette = [
  ['var(--status-info-bg)', 'var(--status-info-fg)'],
  ['var(--status-cleared-bg)', 'var(--status-cleared-fg)'],
  ['var(--status-progress-bg)', 'var(--status-progress-fg)'],
  ['var(--status-done-bg)', 'var(--status-done-fg)'],
  ['var(--status-todo-bg)', 'var(--status-todo-fg)'],
]

export function Avatar({ name = '', id = 0, size = 26, style }) {
  const letters = name.split(' ').map(w => w[0] || '').join('').slice(0, 2).toUpperCase()
  const [bg, color] = palette[id % palette.length]
  return (
    <div style={{
      width: size, height: size, borderRadius: 'var(--radius-round)',
      background: bg, color,
      fontSize: size * 0.38, fontWeight: 'var(--weight-semibold)', flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      ...style,
    }}>{letters}</div>
  )
}
