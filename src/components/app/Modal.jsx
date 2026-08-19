import React from 'react'

export function Modal({ open = true, onClose, header, children, footer, width = 'var(--modal-width)' }) {
  if (!open) return null
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'var(--surface-scrim)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'var(--surface-card)', borderRadius: 'var(--radius-2xl)',
        padding: 'var(--space-7)', width, maxWidth: '90vw',
        boxShadow: 'var(--shadow-modal)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
          <div style={{ display: 'flex', gap: 'var(--space-1-5)' }}>{header}</div>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', color: 'var(--text-muted)',
            cursor: 'pointer', fontSize: 20, lineHeight: 1, padding: '0 2px',
          }}>×</button>
        </div>
        {children}
        {footer && (
          <div style={{ display: 'flex', gap: 'var(--space-2)', paddingTop: 'var(--space-4)', borderTop: 'var(--border-hairline)' }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
