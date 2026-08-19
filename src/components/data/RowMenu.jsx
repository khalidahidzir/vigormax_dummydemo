import React from 'react'

/** Overflow menu for a table row. Three dots, click to reveal actions. */
export function RowMenu({ items = [], align = 'right', style }) {
  const [open, setOpen] = React.useState(false)
  const [up, setUp] = React.useState(false)
  const ref = React.useRef(null)

  React.useEffect(() => {
    if (!open) return
    function away(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', away)
    return () => document.removeEventListener('mousedown', away)
  }, [open])

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block', ...style }}>
      <button
        aria-label="Row actions"
        onClick={() => {
          if (!open && ref.current) {
            const r = ref.current.getBoundingClientRect()
            setUp(window.innerHeight - r.bottom < 120)
          }
          setOpen(o => !o)
        }}
        style={{
          width: 26, height: 26, borderRadius: 'var(--radius-sm)',
          background: open ? 'var(--surface-sunken)' : 'transparent',
          border: 'none', cursor: 'pointer', color: 'var(--text-muted)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background var(--duration-base)',
        }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="3" r="1.3" fill="currentColor" />
          <circle cx="7" cy="7" r="1.3" fill="currentColor" />
          <circle cx="7" cy="11" r="1.3" fill="currentColor" />
        </svg>
      </button>
      {open && (
        <div style={{
          position: 'absolute', [up ? 'bottom' : 'top']: 30, [align]: 0, zIndex: 20, minWidth: 132,
          background: 'var(--surface-card)', border: 'var(--border-hairline)',
          borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-float)',
          padding: 'var(--space-1)', display: 'flex', flexDirection: 'column',
        }}>
          {items.map((it, i) => (
            <button key={i}
              onClick={() => { setOpen(false); it.onClick && it.onClick() }}
              style={{
                textAlign: 'left', padding: '7px 10px', borderRadius: 'var(--radius-sm)',
                background: 'transparent', border: 'none', cursor: 'pointer',
                fontFamily: 'var(--font-sans)', fontSize: 'var(--text-13)',
                color: it.danger ? 'var(--status-overdue-fg)' : 'var(--text-primary)',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = it.danger ? 'var(--status-overdue-bg)' : 'var(--surface-page)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
            >{it.label}</button>
          ))}
        </div>
      )}
    </div>
  )
}
