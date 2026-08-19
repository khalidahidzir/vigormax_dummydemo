import React from 'react'

export function Field({ label, span, children }) {
  return (
    <div style={span ? { gridColumn: '1 / -1' } : undefined}>
      <label style={{
        margin: '0 0 5px',
        fontSize: 'var(--text-12)',
        fontWeight: 'var(--weight-medium)',
        color: 'var(--text-muted)',
        display: 'block',
      }}>{label}</label>
      {children}
    </div>
  )
}
