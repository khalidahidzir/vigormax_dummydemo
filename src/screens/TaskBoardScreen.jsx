import React, { useState } from 'react'
import { Button } from '../components/core/Button.jsx'
import { Select } from '../components/core/Select.jsx'
import { Badge } from '../components/core/Badge.jsx'
import { TaskCard } from '../components/app/TaskCard.jsx'
import { Modal } from '../components/app/Modal.jsx'
import { EMPLOYEES, BRANCHES, dayDiff, formatDue, branchName, empName } from '../data.js'

const COLS = [
  { key: 'TO_DO', label: 'To do', bg: 'var(--status-todo-bg)', accent: 'var(--status-todo-fg)' },
  { key: 'IN_PROGRESS', label: 'In progress', bg: 'var(--status-progress-bg)', accent: 'var(--status-progress-fg)' },
  { key: 'DONE', label: 'Done', bg: 'var(--status-done-bg)', accent: 'var(--status-done-fg)' },
]

export function TaskBoardScreen({ tasks, onMove }) {
  const [dragging, setDragging] = useState(null)
  const [over, setOver] = useState(null)
  const [viewing, setViewing] = useState(null)
  const [assignee, setAssignee] = useState('')
  const [branch, setBranch] = useState('')

  const overdueCount = tasks.filter(t => t.status !== 'DONE' && dayDiff(t.due_date) < 0).length
  const visible = tasks.filter(t =>
    (!assignee || String(t.assigned_to) === assignee) && (!branch || String(t.branch_id) === branch))

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
        <h2 style={{ fontSize: 'var(--text-20)', fontWeight: 'var(--weight-medium)', margin: 0, color: 'var(--text-heading)' }}>Task board</h2>
        <Button>+ Add task</Button>
      </div>
      <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-14)', margin: '0 0 16px' }}>
        Drag cards between columns to update status
        {overdueCount > 0 && <span style={{ marginLeft: 8 }}><Badge label={overdueCount + ' overdue'} tone="overdue" /></span>}
      </p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <Select auto value={assignee} onChange={e => setAssignee(e.target.value)} style={{ minWidth: 160 }}>
          <option value="">All assignees</option>
          {EMPLOYEES.map(e => <option key={e.id} value={e.id}>{e.first_name} {e.last_name}</option>)}
        </Select>
        <Select auto value={branch} onChange={e => setBranch(e.target.value)} style={{ minWidth: 140 }}>
          <option value="">All branches</option>
          {BRANCHES.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
        </Select>
        {(assignee || branch) && (
          <Button variant="secondary" style={{ fontSize: 'var(--text-12)' }} onClick={() => { setAssignee(''); setBranch('') }}>Clear filters</Button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
        {COLS.map(col => {
          const colTasks = visible.filter(t => t.status === col.key)
          return (
            <div key={col.key}
              onDragOver={e => { e.preventDefault(); setOver(col.key) }}
              onDragLeave={() => setOver(null)}
              onDrop={e => { e.preventDefault(); if (dragging) { onMove(dragging, col.key) }; setDragging(null); setOver(null) }}
              style={{
                background: 'var(--surface-card)', borderRadius: 'var(--radius-lg)', padding: 12, minHeight: 320,
                border: 'var(--border-hairline)', borderTop: '3px solid ' + col.accent,
                boxShadow: over === col.key ? '0 0 0 2px ' + col.accent : 'var(--shadow-card)',
                transition: 'box-shadow var(--duration-base)',
              }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, padding: '2px 2px 10px', borderBottom: '0.5px solid var(--vm-hairline)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: col.accent, flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-13)', fontWeight: 'var(--weight-semibold)', letterSpacing: '-0.01em', color: 'var(--text-primary)' }}>{col.label}</span>
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-11)', background: col.bg, borderRadius: 'var(--radius-pill)', padding: '2px 8px', color: col.accent, fontWeight: 600 }}>{colTasks.length}</span>
              </div>
              {colTasks.length === 0 && (
                <div style={{ border: '1.5px dashed ' + col.accent, borderRadius: 'var(--radius-md)', padding: '24px 12px', textAlign: 'center', opacity: 'var(--opacity-empty-state)' }}>
                  <p style={{ margin: 0, fontSize: 'var(--text-12)', color: col.accent }}>No tasks</p>
                </div>
              )}
              {colTasks.map(t => {
                const d = dayDiff(t.due_date)
                const overdue = t.status !== 'DONE' && d < 0
                return (
                  <div key={t.task_id} onDragStart={() => setDragging(t.task_id)} onDragEnd={() => setDragging(null)} draggable>
                    <TaskCard
                      title={t.title}
                      assignee={empName(t.assigned_to)}
                      assigneeId={t.assigned_to}
                      branch={branchName(t.branch_id)}
                      due={formatDue(t.due_date)}
                      overdue={overdue}
                      dueSoon={!overdue && d <= 3}
                      accent={col.accent}
                      dragging={dragging === t.task_id}
                      onClick={() => setViewing(t)}
                    />
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>

      {viewing && (() => {
        const d = dayDiff(viewing.due_date)
        const overdue = viewing.status !== 'DONE' && d < 0
        const col = COLS.find(c => c.key === viewing.status)
        return (
          <Modal onClose={() => setViewing(null)}
            header={<>
              <Badge label={col.label} bg={col.bg} color={col.accent} />
              {overdue && <Badge label="Overdue" tone="overdue" />}
            </>}
            footer={<>
              <Button style={{ flex: 1 }}>Edit task</Button>
              <Button variant="dangerGhost">Delete</Button>
            </>}>
            <h3 style={{ margin: '0 0 22px', fontSize: 'var(--text-17)', fontWeight: 'var(--weight-semibold)', color: 'var(--text-primary)', lineHeight: 'var(--leading-tight)' }}>{viewing.title}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
              <div>
                <p style={{ margin: '0 0 5px', fontSize: 'var(--text-12)', fontWeight: 500, color: 'var(--text-muted)' }}>Assigned to</p>
                <p style={{ margin: 0, fontSize: 'var(--text-13)', color: 'var(--text-primary)', fontWeight: 500 }}>{empName(viewing.assigned_to)}</p>
              </div>
              <div>
                <p style={{ margin: '0 0 5px', fontSize: 'var(--text-12)', fontWeight: 500, color: 'var(--text-muted)' }}>Branch</p>
                <p style={{ margin: 0, fontSize: 'var(--text-13)', color: 'var(--text-primary)' }}>{branchName(viewing.branch_id)}</p>
              </div>
              <div>
                <p style={{ margin: '0 0 5px', fontSize: 'var(--text-12)', fontWeight: 500, color: 'var(--text-muted)' }}>Due date</p>
                <p style={{ margin: 0, fontSize: 'var(--text-13)', fontWeight: 500, color: overdue ? 'var(--status-overdue-fg)' : d <= 3 ? 'var(--status-progress-fg)' : 'var(--text-primary)' }}>
                  {formatDue(viewing.due_date)}
                  <span style={{ display: 'block', fontSize: 'var(--text-11)', fontWeight: 400, color: 'var(--text-muted)', marginTop: 2 }}>
                    {new Date(viewing.due_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </p>
              </div>
            </div>
          </Modal>
        )
      })()}
    </div>
  )
}
