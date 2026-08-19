import React from 'react'
import { Icon } from '../core/Icon.jsx'

export function NavItem({ icon, label, active, count, onClick }) {
  const base = {
    width: '100%', textAlign: 'left', position: 'relative',
    display: 'flex', alignItems: 'center', gap: 11,
    padding: '9px 12px', borderRadius: 8, marginBottom: 1,
    background: active ? 'var(--surface-rail-hover)' : 'transparent',
    color: active ? 'var(--text-on-rail-active)' : 'var(--text-on-rail)',
    border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)',
    fontSize: 13.5, fontWeight: active ? 600 : 500,
    transition: 'background .12s, color .12s',
  }
  return (
    <button onClick={onClick} style={base}
      onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'var(--surface-rail-hover)'; e.currentTarget.style.color = '#d6d9e0' } }}
      onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-on-rail)' } }}>
      {active && <span style={{ position: 'absolute', left: -12, top: 8, bottom: 8, width: 3, borderRadius: '0 3px 3px 0', background: 'var(--accent)' }} />}
      <span style={{ flexShrink: 0, opacity: active ? 1 : 0.72, display: 'flex' }}><Icon name={icon} /></span>
      <span style={{ flex: 1 }}>{label}</span>
      {count > 0 && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, background: 'rgba(163,45,45,.24)', color: '#f0a5a5', padding: '1px 7px', borderRadius: 20 }}>{count}</span>}
    </button>
  )
}
