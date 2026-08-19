import React from 'react'

const tones = {
  todo: ['var(--status-todo-bg)', 'var(--status-todo-fg)'],
  progress: ['var(--status-progress-bg)', 'var(--status-progress-fg)'],
  done: ['var(--status-done-bg)', 'var(--status-done-fg)'],
  cleared: ['var(--status-cleared-bg)', 'var(--status-cleared-fg)'],
  pending: ['var(--status-pending-bg)', 'var(--status-pending-fg)'],
  overdue: ['var(--status-overdue-bg)', 'var(--status-overdue-fg)'],
  info: ['var(--status-info-bg)', 'var(--status-info-fg)'],
  action: ['var(--cat-action-bg)', 'var(--cat-action-fg)'],
}

export function Badge({ label, tone = 'todo', bg, color, style, children }) {
  const [tBg, tFg] = tones[tone] || tones.todo
  return (
    <span style={{
      background: bg || tBg,
      color: color || tFg,
      fontSize: 'var(--text-11)',
      fontWeight: 'var(--weight-medium)',
      padding: '2px 8px',
      borderRadius: 'var(--radius-pill)',
      display: 'inline-block',
      whiteSpace: 'nowrap',
      ...style,
    }}>{label ?? children}</span>
  )
}
