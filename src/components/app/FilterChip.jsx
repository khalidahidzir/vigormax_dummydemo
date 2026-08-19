import React from 'react'

export function FilterChip({ label, active, onClick, style, children }) {
  return (
    <button onClick={onClick} style={{
      padding: '6px 14px', borderRadius: 'var(--radius-pill)',
      fontSize: 'var(--text-12)', fontWeight: 'var(--weight-medium)', cursor: 'pointer',
      fontFamily: 'var(--font-sans)',
      border: `0.5px solid ${active ? 'var(--accent)' : 'var(--vm-hairline)'}`,
      background: active ? 'var(--accent-soft)' : 'var(--surface-card)',
      color: active ? 'var(--accent-strong)' : 'var(--text-muted)',
      ...style,
    }}>{label ?? children}</button>
  )
}
