import React from 'react'

const base = {
  padding: 'var(--pad-control)',
  borderRadius: 'var(--radius-md)',
  fontSize: 'var(--text-13)',
  fontFamily: 'var(--font-sans)',
  cursor: 'pointer',
  transition: 'var(--transition-control)',
  lineHeight: 1.2,
  whiteSpace: 'nowrap',
  flexShrink: 0,
}

const variants = {
  primary: {
    background: 'var(--accent)',
    color: 'var(--text-on-accent)',
    border: 'none',
    fontWeight: 'var(--weight-medium)',
  },
  secondary: {
    background: 'var(--surface-card)',
    color: 'var(--text-muted)',
    border: 'var(--border-hairline)',
  },
  danger: {
    background: 'var(--status-overdue-fg)',
    color: 'var(--text-on-accent)',
    border: 'none',
    fontWeight: 'var(--weight-medium)',
  },
  dangerGhost: {
    background: 'var(--surface-card)',
    color: 'var(--status-overdue-fg)',
    border: '0.5px solid var(--status-overdue-bg)',
  },
  link: {
    background: 'none',
    border: 'none',
    color: 'var(--accent)',
    fontWeight: 'var(--weight-medium)',
    padding: 0,
  },
}

const sizes = {
  sm: { padding: '4px 10px', fontSize: 'var(--text-12)', borderRadius: 'var(--radius-sm)', fontWeight: 'var(--weight-medium)' },
  md: {},
  lg: { padding: '9px 18px' },
}

export function Button({ variant = 'primary', size = 'md', block, disabled, style, children, ...rest }) {
  return (
    <button
      disabled={disabled}
      style={{
        ...base,
        ...variants[variant],
        ...sizes[size],
        ...(block ? { width: '100%' } : null),
        ...(disabled ? { opacity: 'var(--opacity-disabled)', cursor: 'not-allowed' } : null),
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  )
}
