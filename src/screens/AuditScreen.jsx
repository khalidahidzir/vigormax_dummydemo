import React, { useState } from 'react'
import { Button } from '../components/core/Button.jsx'
import { Select } from '../components/core/Select.jsx'
import { Badge } from '../components/core/Badge.jsx'
import { Input } from '../components/core/Input.jsx'

const TYPE_TONE = {
  'SOP': 'info', 'Checklist': 'cleared', 'Work Instruction': 'progress',
  'Action Item List': 'action', 'Task List': 'todo', 'Workflow': 'overdue',
}
const STATUS_TONE = { Draft: 'todo', Active: 'cleared', Archived: 'progress' }
const LINE_LABEL = { 'SOP': 'step', 'Work Instruction': 'step', 'Workflow': 'stage', 'Checklist': 'task', 'Task List': 'task', 'Action Item List': 'action item' }

export function AuditScreen({ items, onToggleLine }) {
  const [selectedId, setSelectedId] = useState(items[0].id)
  const [type, setType] = useState('All')
  const [status, setStatus] = useState('All')

  const visible = items.filter(i => (type === 'All' || i.type === type) && (status === 'All' || i.status === status))
  const selected = items.find(i => i.id === selectedId)
  const done = selected ? selected.lines.filter(l => l.is_complete).length : 0
  const pct = selected && selected.lines.length ? Math.round((done / selected.lines.length) * 100) : 0

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 'var(--text-20)', fontWeight: 'var(--weight-medium)', margin: '0 0 4px', color: 'var(--text-heading)' }}>Audit log</h2>
          <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 'var(--text-12)', color: 'var(--text-muted)' }}>{items.length} items · {items.filter(i => i.status === 'Active').length} active</p>
        </div>
        <Button>+ New item</Button>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        <Select auto value={type} onChange={e => setType(e.target.value)} style={{ padding: '6px 10px' }}>
          <option value="All">All types</option>
          <optgroup label="Operations">{['SOP', 'Checklist', 'Work Instruction'].map(t => <option key={t}>{t}</option>)}</optgroup>
          <optgroup label="Team / Project">{['Action Item List', 'Task List', 'Workflow'].map(t => <option key={t}>{t}</option>)}</optgroup>
        </Select>
        <Select auto value={status} onChange={e => setStatus(e.target.value)} style={{ padding: '6px 10px' }}>
          <option value="All">All statuses</option>
          {['Draft', 'Active', 'Archived'].map(s => <option key={s}>{s}</option>)}
        </Select>
      </div>

      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {visible.map(i => (
            <div key={i.id} onClick={() => setSelectedId(i.id)} style={{
              background: 'var(--surface-card)', border: 'var(--border-hairline)',
              borderRadius: 'var(--radius-lg)', padding: 16, cursor: 'pointer',
              boxShadow: i.id === selectedId ? '0 0 0 2px var(--accent)' : 'var(--shadow-flat)',
            }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                <Badge label={i.type} tone={TYPE_TONE[i.type]} />
                <Badge label={i.status} tone={STATUS_TONE[i.status]} />
              </div>
              <p style={{ margin: '0 0 6px', fontSize: 'var(--text-15)', fontWeight: 'var(--weight-medium)', color: 'var(--text-primary)' }}>{i.title}</p>
              <p style={{ margin: 0, fontSize: 'var(--text-12)', color: 'var(--text-muted)' }}>
                {i.lines.length} {LINE_LABEL[i.type]}{i.lines.length === 1 ? '' : 's'} · {i.category}
              </p>
            </div>
          ))}
        </div>

        {selected && (
          <div style={{ width: 'var(--detail-panel-width)', flexShrink: 0, background: 'var(--surface-card)', border: 'var(--border-hairline)', borderRadius: 'var(--radius-xl)', padding: 20, boxShadow: 'var(--shadow-card)' }}>
            <p style={{ margin: '0 0 6px', fontSize: 'var(--text-15)', fontWeight: 'var(--weight-semibold)', color: 'var(--text-primary)' }}>{selected.title}</p>
            <p style={{ margin: '0 0 16px', fontSize: 'var(--text-13)', color: 'var(--text-muted)', lineHeight: 'var(--leading-normal)' }}>{selected.description}</p>
            {selected.file_name && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--surface-page)', border: 'var(--border-hairline)', borderRadius: 'var(--radius-md)', padding: '10px 12px', marginBottom: 16 }}>
                <span style={{ fontSize: 'var(--text-12)', color: 'var(--text-primary)' }}>{selected.file_name}</span>
                <Button variant="secondary" size="sm">View</Button>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 'var(--text-12)', fontWeight: 500, color: 'var(--text-muted)' }}>{done} of {selected.lines.length} complete</span>
              <span style={{ fontSize: 'var(--text-12)', fontWeight: 500, color: 'var(--text-muted)' }}>{pct}%</span>
            </div>
            <div style={{ height: 4, background: 'var(--surface-sunken)', borderRadius: 4, overflow: 'hidden', marginBottom: 16 }}>
              <div style={{ height: '100%', width: pct + '%', background: pct === 100 ? 'var(--accent)' : 'var(--status-progress-fg)', transition: 'var(--transition-progress)' }} />
            </div>
            {selected.lines.length === 0 && <p style={{ margin: 0, fontSize: 'var(--text-13)', color: 'var(--text-muted)' }}>No lines yet.</p>}
            {selected.lines.map(l => (
              <div key={l.id} onClick={() => onToggleLine(selected.id, l.id)} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '8px 0', borderBottom: 'var(--border-hairline)', cursor: 'pointer' }}>
                <span style={{
                  width: 14, height: 14, marginTop: 2, borderRadius: 'var(--radius-round)', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: l.is_complete ? 'var(--accent)' : 'transparent',
                  border: l.is_complete ? 'none' : '1px solid var(--vm-hairline)',
                }}>
                  {l.is_complete && <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4.2l2 2L7 2" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                </span>
                <div>
                  <p style={{ margin: 0, fontSize: 'var(--text-13)', color: l.is_complete ? 'var(--text-muted)' : 'var(--text-primary)', textDecoration: l.is_complete ? 'line-through' : 'none' }}>{l.label}</p>
                  <p style={{ margin: 0, fontSize: 'var(--text-11)', color: 'var(--text-muted)' }}>{l.assignee}</p>
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <Input placeholder={'Add a ' + LINE_LABEL[selected.type] + '...'} style={{ flex: 1 }} />
              <Button>Add</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
