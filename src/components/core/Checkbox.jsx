import React from 'react'

export function Checkbox({ checked, indeterminate, onChange, label, style }) {
  const on = checked || indeterminate
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer', ...style }}>
      <span
        role="checkbox"
        aria-checked={indeterminate ? 'mixed' : !!checked}
        onClick={e => { e.preventDefault(); onChange && onChange(!checked) }}
        style={{
          width: 15, height: 15, borderRadius: 'var(--radius-tail)', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: on ? 'var(--accent)' : 'var(--surface-card)',
          border: on ? 'none' : '1px solid var(--vm-hairline)',
          transition: 'background var(--duration-base)',
        }}>
        {indeterminate
          ? <span style={{ width: 7, height: 1.6, background: '#fff', borderRadius: 1 }} />
          : checked && (
            <svg width="9" height="9" viewBox="0 0 8 8" fill="none">
              <path d="M1 4.2l2 2L7 2" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
      </span>
      {label && <span style={{ fontSize: 'var(--text-13)', color: 'var(--text-primary)' }}>{label}</span>}
    </label>
  )
}
