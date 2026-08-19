import React from 'react'
import { NavItem } from './NavItem.jsx'

export function Sidebar({ items = [], active, onNavigate, userEmail, onSignOut, logoSrc, style }) {
  return (
    <aside style={{ width: 'var(--sidebar-width)', background: 'var(--surface-rail)', display: 'flex', flexDirection: 'column', flexShrink: 0, height: '100vh', position: 'sticky', top: 0, ...style }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '20px 18px 17px', borderBottom: '1px solid var(--rail-border)' }}>
        {logoSrc
          ? <img src={logoSrc} alt="Vigormax" style={{ width: 38, height: 38, borderRadius: 9, objectFit: 'cover', display: 'block', boxShadow: 'inset 0 0 0 1px var(--rail-border)' }} />
          : <div style={{ width: 38, height: 38, borderRadius: 9, background: 'var(--surface-rail-mark)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15 }}>VM</div>}
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.01em' }}>Vigormax</div>
          <div style={{ fontSize: 11, color: 'var(--text-on-rail-dim)', marginTop: 2 }}>Digital Oversight System</div>
        </div>
      </div>

      <div style={{ margin: '14px 18px 2px', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-on-rail-dim)' }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 0 3px rgba(29,158,117,.18)', flexShrink: 0 }} />
        all branches · synced
      </div>

      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', color: 'var(--text-on-rail-dim)', padding: '14px 20px 6px' }}>modules</div>
      <nav style={{ flex: 1, padding: '0 12px', display: 'flex', flexDirection: 'column', gap: 1 }}>
        {items.map(n => (
          <NavItem key={n.key} icon={n.key} label={n.label} count={n.count}
            active={active === n.key} onClick={() => onNavigate && onNavigate(n.key)} />
        ))}
      </nav>

      {userEmail && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '13px 16px', borderTop: '1px solid var(--rail-border)' }}>
          <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--accent-strong)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, flexShrink: 0 }}>
            {userEmail.slice(0, 2).toUpperCase()}
          </div>
          <p style={{ margin: 0, fontSize: 12, color: '#c4c8d0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, minWidth: 0 }}>{userEmail}</p>
          <button onClick={onSignOut} style={{ background: 'none', border: 'none', color: 'var(--text-on-rail-dim)', fontSize: 11, cursor: 'pointer', fontFamily: 'var(--font-sans)', padding: 0 }}>Sign out</button>
        </div>
      )}
    </aside>
  )
}
