import React from 'react'
import { Badge } from '../core/Badge.jsx'

const cats = {
  Compliance: ['var(--cat-compliance-bg)', 'var(--cat-compliance-fg)'],
  Operations: ['var(--cat-operations-bg)', 'var(--cat-operations-fg)'],
  HR: ['var(--cat-hr-bg)', 'var(--cat-hr-fg)'],
  Finance: ['var(--cat-finance-bg)', 'var(--cat-finance-fg)'],
}

export function DocumentRow({ title, category = 'Compliance', meta, actions, style }) {
  const [bg, color] = cats[category] || cats.Finance
  return (
    <div style={{
      background: 'var(--surface-card)', border: 'var(--border-hairline)',
      borderRadius: 'var(--radius-lg)', padding: '12px 16px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      boxShadow: 'var(--shadow-flat)', ...style,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        <div style={{
          width: 36, height: 36, borderRadius: 'var(--radius-md)', background: bg,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="1" width="10" height="13" rx="2" stroke={color} strokeWidth="1.2" />
            <line x1="5" y1="5" x2="9" y2="5" stroke={color} strokeWidth="1" />
            <line x1="5" y1="8" x2="9" y2="8" stroke={color} strokeWidth="1" />
          </svg>
        </div>
        <div>
          <p style={{ margin: 0, fontWeight: 'var(--weight-medium)', fontSize: 'var(--text-13)', color: 'var(--text-primary)' }}>{title}</p>
          <p style={{ margin: 0, fontSize: 'var(--text-12)', color: 'var(--text-muted)' }}>{meta}</p>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2-5)', flexShrink: 0 }}>
        <Badge label={category} bg={bg} color={color} />
        {actions}
      </div>
    </div>
  )
}
