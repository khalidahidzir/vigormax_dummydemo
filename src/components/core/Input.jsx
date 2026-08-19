import React from 'react'

export function Input({ style, ...rest }) {
  return (
    <input
      style={{
        width: '100%',
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
    />
  )
}
