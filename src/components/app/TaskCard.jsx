import React from 'react'
import { Avatar } from '../data/Avatar.jsx'

export function TaskCard({ title, assignee, assigneeId = 0, branch, due, overdue, dueSoon, accent = 'var(--status-todo-fg)', dragging, onClick, style }) {
  const dueColor = overdue ? 'var(--status-overdue-fg)' : dueSoon ? 'var(--status-progress-fg)' : 'var(--text-muted)'
  const dueBg = overdue ? 'var(--status-overdue-bg)' : dueSoon ? 'var(--status-progress-bg)' : 'transparent'
  return (
    <div draggable onClick={onClick} style={{
      background: 'var(--surface-card)', borderRadius: 'var(--radius-md)',
      padding: '11px 12px', marginBottom: 8, cursor: 'pointer',
      border: 'var(--border-hairline)',
      borderLeft: '3px solid ' + (overdue ? 'var(--status-overdue-fg)' : accent),
      boxShadow: 'var(--shadow-flat)', opacity: dragging ? 0.45 : 1,
      transition: 'box-shadow .15s', ...style,
    }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-card)' }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = 'var(--shadow-flat)' }}>
      <p style={{ margin: '0 0 9px', fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.4 }}>{title}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
        {assignee && <Avatar name={assignee} id={assigneeId} size={20} />}
        <span style={{ fontSize: 12, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{assignee}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 11, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{branch}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500, color: dueColor, background: dueBg, padding: (overdue || dueSoon) ? '2px 7px' : 0, borderRadius: 6, whiteSpace: 'nowrap', flexShrink: 0 }}>{due}</span>
      </div>
    </div>
  )
}
