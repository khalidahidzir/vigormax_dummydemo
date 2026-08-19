import React from 'react'

export function Select({ auto, style, children, ...rest }) {
  return (
    <select
      style={{
        width: auto ? 'auto' : '100%',
        padding: 'var(--pad-input)',
        borderRadius: 'var(--radius-md)',
        border: 'var(--border-hairline)',
        fontSize: 'var(--text-13)',
        color: 'var(--text-primary)',
        background: 'var(--surface-card)',
        boxSizing: 'border-box',
        outline: 'none',
        fontFamily: 'inherit',
        ...style,
      }}
      {...rest}
    >
      {children}
    </select>
  )
}
