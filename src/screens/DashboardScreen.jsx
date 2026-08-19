import React from 'react'
import { Stat } from '../components/app/Stat.jsx'
import { EMPLOYEES, AUDIT_ITEMS, ACTIVITY, dayDiff } from '../data.js'

const CHIP = {
  progress: ['var(--status-progress-bg)', 'var(--status-progress-fg)'],
  pending:  ['var(--status-pending-bg)',  'var(--status-pending-fg)'],
  info:     ['var(--status-info-bg)',     'var(--status-info-fg)'],
  cleared:  ['var(--status-cleared-bg)',  'var(--status-cleared-fg)'],
  neutral:  ['var(--status-todo-bg)',     'var(--status-todo-fg)'],
  overdue:  ['var(--status-overdue-bg)',  'var(--status-overdue-fg)'],
  done:     ['var(--status-done-bg)',     'var(--status-done-fg)'],
}

export function DashboardScreen({ tasks, onboarding, docs }) {
  const open = tasks.filter(t => t.status !== 'DONE').length
  const overdue = tasks.filter(t => t.status !== 'DONE' && dayDiff(t.due_date) < 0).length
  const cleared = onboarding.filter(r => r.cleared).length
  const total = onboarding.length
  const clearPct = total ? Math.round((cleared / total) * 100) : 0
  const activeAudit = AUDIT_ITEMS.filter(i => i.status === 'Active').length

  const approvedCount = r => Object.keys(r.steps).filter(k => r.steps[k].status === 'approved').length
  const clearList = [...onboarding]
    .sort((a, b) => (a.cleared === b.cleared ? approvedCount(a) - approvedCount(b) : a.cleared ? 1 : -1))
    .slice(0, 6)
    .map(r => {
      if (r.cleared) return { name: r.name, text: 'Cleared', color: 'var(--vm-green-700)', dot: 'var(--vm-green-500)' }
      const a = approvedCount(r)
      if (a === 0) return { name: r.name, text: 'No documents', color: 'var(--vm-red-500)', dot: 'var(--vm-red-500)' }
      return { name: r.name, text: a + ' / 3 docs', color: 'var(--vm-amber-500)', dot: 'var(--vm-amber-500)' }
    })

  const panel = { background: 'var(--surface-card)', border: 'var(--border-hairline)', borderRadius: 12, boxShadow: 'var(--shadow-card)' }
  const mono = { fontFamily: 'var(--font-mono)' }

  return (
    <div>
      <div style={{ marginBottom: 22 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em', margin: '0 0 5px', color: 'var(--text-heading)' }}>Dashboard</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: 13.5, margin: 0 }}>Vigormax Security Services — all branches</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 26 }}>
        <Stat label="Total employees" value={EMPLOYEES.length} tone="info" />
        <Stat label="Guards cleared" value={cleared + '/' + total} tone="cleared" />
        <Stat label="Open tasks" value={open} tone="progress" />
        <Stat label="Overdue tasks" value={overdue} tone="overdue" />
        <Stat label="Documents stored" value={docs.length} tone="neutral" />
        <Stat label="Active audit items" value={activeAudit} tone="done" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.55fr 1fr', gap: 14, alignItems: 'start' }}>

        <div style={panel}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 18px 12px', borderBottom: '0.5px solid var(--vm-hairline)' }}>
            <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--text-primary)' }}>Recent activity</p>
            <span style={{ fontSize: 12, color: 'var(--accent-strong)', fontWeight: 500 }}>View audit log →</span>
          </div>
          <div style={{ padding: '4px 18px 10px' }}>
            {ACTIVITY.map((l, i) => {
              const [bg, fg] = CHIP[l.tone] || CHIP.neutral
              return (
                <div key={l.id} style={{
                  display: 'flex', gap: 12, alignItems: 'flex-start',
                  padding: '11px 0 11px 11px', marginLeft: -1,
                  borderLeft: '3px solid ' + fg,
                  borderBottom: i === ACTIVITY.length - 1 ? 'none' : '0.5px solid var(--vm-hairline)',
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.45 }}>{l.action}</p>
                    <p style={{ ...mono, margin: '3px 0 0', fontSize: 11, color: 'var(--text-muted)' }}>{l.user_name} · {l.at}</p>
                  </div>
                  <span style={{ fontSize: 10.5, fontWeight: 600, padding: '2px 8px', borderRadius: 6, whiteSpace: 'nowrap', background: bg, color: fg }}>{l.tag}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div style={{ ...panel, padding: '16px 18px 18px' }}>
          <div style={{ ...mono, fontWeight: 600, fontSize: 34, letterSpacing: '-0.02em', lineHeight: 1, color: 'var(--text-primary)' }}>{clearPct}<span style={{ fontSize: 16, color: 'var(--text-muted)' }}>%</span></div>
          <p style={{ margin: '7px 0 14px', fontSize: 12, color: 'var(--text-muted)' }}>guards fully cleared across all branches</p>
          <div style={{ height: 8, borderRadius: 6, background: 'var(--surface-sunken)', overflow: 'hidden', marginBottom: 16 }}>
            <div style={{ height: '100%', width: clearPct + '%', background: 'var(--accent)', borderRadius: 6 }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {clearList.map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12.5 }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, flexShrink: 0, background: r.dot }} />
                <span style={{ flex: 1, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.name}</span>
                <span style={{ ...mono, fontSize: 11, color: r.color }}>{r.text}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
