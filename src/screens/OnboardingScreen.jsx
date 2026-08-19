import React, { useState } from 'react'
import { Button } from '../components/core/Button.jsx'
import { Input } from '../components/core/Input.jsx'
import { Select } from '../components/core/Select.jsx'
import { Badge } from '../components/core/Badge.jsx'
import { Checkbox } from '../components/core/Checkbox.jsx'
import { FilterChip } from '../components/app/FilterChip.jsx'
import { ProgressBar } from '../components/data/ProgressBar.jsx'
import { Modal } from '../components/app/Modal.jsx'
import { RowMenu } from '../components/data/RowMenu.jsx'
import { BRANCHES, ONBOARDING_STEPS, branchName } from '../data.js'

const HAIRLINE = '0.5px solid rgba(0,0,0,0.1)'

function stepList(r) { return ONBOARDING_STEPS.map(([key]) => r.steps[key]) }
function approvedCount(r) { return stepList(r).filter(s => s.status === 'approved').length }
function pendingCount(r) { return stepList(r).filter(s => s.status === 'pending').length }

function statusBadge(r) {
  if (r.cleared) return <Badge label="Fully cleared" tone="cleared" />
  const pending = pendingCount(r)
  if (pending > 0) return <Badge label={pending + ' awaiting approval'} tone="progress" />
  const approved = approvedCount(r)
  return <Badge label={approved === 0 ? 'Not started' : approved + ' of 3 approved'} tone="pending" />
}

const STEP_STATE = {
  approved: ['Approved', 'var(--accent-strong)'],
  pending: ['Awaiting approval', 'var(--status-progress-fg)'],
  none: ['Not uploaded', 'var(--status-pending-fg)'],
}

function StepDot({ status }) {
  return (
    <span style={{
      width: 14, height: 14, marginTop: 2, borderRadius: '50%', flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: status === 'approved' ? 'var(--accent)' : status === 'pending' ? 'var(--status-progress-bg)' : 'transparent',
      border: status === 'approved' ? 'none' : status === 'pending' ? '1px solid var(--status-progress-fg)' : '1px solid rgba(0,0,0,0.1)',
    }}>
      {status === 'approved' && <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4.2l2 2L7 2" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>}
      {status === 'pending' && <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--status-progress-fg)' }} />}
    </span>
  )
}

function StatusCell({ record, onOpenDocs }) {
  const [hover, setHover] = useState(false)
  const approved = approvedCount(record)
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'default' }}>{statusBadge(record)}</span>
      {hover && (
        <div style={{
          position: 'absolute', top: 26, right: 0, zIndex: 30, width: 300, textAlign: 'left',
          background: 'var(--surface-card)', border: HAIRLINE, borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-float)', padding: 14,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 'var(--text-12)', fontWeight: 500, color: 'var(--text-muted)' }}>Approved documents</span>
            <span style={{ fontSize: 'var(--text-12)', fontWeight: 500, color: 'var(--text-muted)' }}>{approved} of 3</span>
          </div>
          <div style={{ marginBottom: 12 }}><ProgressBar value={(approved / 3) * 100} complete={record.cleared} /></div>
          {ONBOARDING_STEPS.map(([key, label]) => {
            const s = record.steps[key]
            const [stateLabel, stateColor] = STEP_STATE[s.status]
            return (
              <div key={key} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '6px 0', borderBottom: HAIRLINE }}>
                <StepDot status={s.status} />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                    <p style={{ margin: 0, fontSize: 'var(--text-13)', color: 'var(--text-primary)' }}>{label}</p>
                    <p style={{ margin: 0, fontSize: 'var(--text-11)', fontWeight: 500, color: stateColor, whiteSpace: 'nowrap' }}>{stateLabel}</p>
                  </div>
                  <p style={{ margin: 0, fontSize: 'var(--text-11)', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 240 }}>
                    {s.file || 'No document on file'}
                  </p>
                </div>
              </div>
            )
          })}
          <Button variant="secondary" block style={{ marginTop: 12 }} onClick={() => onOpenDocs(record)}>
            View / update documents
          </Button>
        </div>
      )}
    </div>
  )
}

function DocumentsModal({ record, onClose, onUpload, onRemove, onApprove, onReject }) {
  const approved = approvedCount(record)
  return (
    <Modal width="500px" onClose={onClose}
      header={statusBadge(record)}
      footer={<><Button block onClick={onClose}>Done</Button></>}>
      <p style={{ margin: '0 0 2px', fontSize: 'var(--text-17)', fontWeight: 600, color: 'var(--text-primary)' }}>{record.name}</p>
      <p style={{ margin: '0 0 20px', fontSize: 'var(--text-13)', color: 'var(--text-muted)' }}>
        {branchName(record.branch_id)} · Employee ID {record.employee_id} · {approved} of 3 approved
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
        {ONBOARDING_STEPS.map(([key, label, hint]) => {
          const s = record.steps[key]
          const [stateLabel, stateColor] = STEP_STATE[s.status]
          return (
            <div key={key} style={{
              border: s.status === 'pending' ? '0.5px solid var(--status-progress-fg)' : HAIRLINE,
              borderRadius: 'var(--radius-lg)', padding: 12,
              background: s.status === 'approved' ? 'var(--accent-soft)' : s.status === 'pending' ? 'var(--status-progress-bg)' : 'var(--surface-page)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <p style={{ margin: 0, fontSize: 'var(--text-13)', fontWeight: 500, color: 'var(--text-primary)' }}>{label}</p>
                    <span style={{ fontSize: 'var(--text-11)', fontWeight: 500, color: stateColor }}>{stateLabel}</span>
                  </div>
                  <p style={{ margin: '2px 0 0', fontSize: 'var(--text-11)', color: 'var(--text-muted)' }}>
                    {s.status === 'none'
                      ? hint + ' required'
                      : s.file + ' · uploaded ' + s.at + ' by ' + s.uploadedBy}
                  </p>
                  {s.status === 'approved' && (
                    <p style={{ margin: '2px 0 0', fontSize: 'var(--text-11)', color: 'var(--text-muted)' }}>
                      Signed off by {s.approvedBy} on {s.approvedAt}
                    </p>
                  )}
                </div>
                <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                  {s.status === 'none' && <Button size="sm" onClick={() => onUpload(record.id, key)}>Upload</Button>}
                  {s.status === 'pending' && <>
                    <Button variant="secondary" size="sm">View</Button>
                    <Button size="sm" onClick={() => onApprove(record.id, key)}>Approve</Button>
                    <Button size="sm" onClick={() => onReject(record.id, key)}
                      style={{ background: 'var(--status-overdue-bg)', color: 'var(--status-overdue-fg)', border: 'none' }}>Reject</Button>
                  </>}
                  {s.status === 'approved' && <>
                    <Button variant="secondary" size="sm">View</Button>
                    <Button size="sm" onClick={() => onRemove(record.id, key)}
                      style={{ background: 'var(--status-overdue-bg)', color: 'var(--status-overdue-fg)', border: 'none' }}>Withdraw</Button>
                  </>}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <p style={{ margin: 0, fontSize: 'var(--text-12)', color: 'var(--text-muted)', lineHeight: '150%' }}>
        Uploading a document does not complete a step — an approver must sign it off. Clearance is granted once all three documents are approved; withdrawing an approval withdraws clearance.
      </p>
    </Modal>
  )
}

export function OnboardingScreen({ records, onUpload, onRemove, onApprove, onReject, onBulkApproveClear }) {
  const [search, setSearch] = useState('')
  const [branch, setBranch] = useState('All')
  const [status, setStatus] = useState('All')
  const [selected, setSelected] = useState([])
  const [docsFor, setDocsFor] = useState(null)

  const rows = records.filter(r => {
    const matchStatus = status === 'All'
      || (status === 'Fully cleared' && r.cleared)
      || (status === 'Awaiting approval' && pendingCount(r) > 0)
      || (status === 'Missing documents' && !r.cleared && pendingCount(r) === 0)
    return matchStatus &&
      (branch === 'All' || String(r.branch_id) === branch) &&
      r.name.toLowerCase().includes(search.toLowerCase())
  })

  const clearedTotal = records.filter(r => r.cleared).length
  const awaitingTotal = records.filter(r => pendingCount(r) > 0).length
  const eligible = rows.filter(r => !r.cleared && approvedCount(r) === 3).map(r => r.id)
  const allSelected = selected.length > 0 && selected.length === rows.length
  const openRecord = docsFor ? records.find(r => r.id === docsFor) : null
  const selectedEligible = selected.filter(id => eligible.includes(id))

  function toggle(id) { setSelected(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]) }
  function toggleAll() { setSelected(allSelected ? [] : rows.map(r => r.id)) }

  const th = { padding: 'var(--pad-cell)', textAlign: 'left', fontWeight: 500, color: 'var(--text-muted)', borderBottom: HAIRLINE, fontSize: 'var(--text-12)', background: 'var(--surface-page)' }
  const td = { padding: 'var(--pad-cell)', color: 'var(--text-muted)' }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 'var(--text-20)', fontWeight: 'var(--weight-medium)', margin: '0 0 4px', color: 'var(--text-heading)' }}>Onboarding tracker</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-14)', margin: 0 }}>
            {records.length} guards · {clearedTotal} fully cleared · {awaitingTotal} awaiting your approval
          </p>
        </div>
        <Button>+ Add guard</Button>
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'center' }}>
        <Input placeholder="Search guard name..." value={search} onChange={e => setSearch(e.target.value)} style={{ flex: 1 }} />
        <Select auto value={branch} onChange={e => setBranch(e.target.value)}>
          <option value="All">All branches</option>
          {BRANCHES.map(b => <option key={b.id} value={String(b.id)}>{b.name}</option>)}
        </Select>
        <div style={{ display: 'flex', gap: 8 }}>
          {['All', 'Awaiting approval', 'Missing documents', 'Fully cleared'].map(s => (
            <FilterChip key={s} label={s} active={status === s} onClick={() => setStatus(s)} />
          ))}
        </div>
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12,
        background: selected.length ? 'var(--accent-soft)' : 'transparent',
        border: selected.length ? '0.5px solid var(--accent)' : '0.5px solid transparent',
        borderRadius: 'var(--radius-md)', padding: '8px 12px',
        visibility: selected.length ? 'visible' : 'hidden',
      }}>
        <span style={{ fontSize: 'var(--text-13)', fontWeight: 500, color: 'var(--accent-strong)', flex: 1 }}>
          {selected.length} selected
          {selectedEligible.length !== selected.length &&
            <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}> · only guards with all three documents approved can be cleared</span>}
        </span>
        <Button size="sm" onClick={() => { onBulkApproveClear(selectedEligible); setSelected([]) }}
          disabled={selectedEligible.length === 0}>
          Grant clearance
        </Button>
        <Button size="sm" variant="secondary">Request missing documents</Button>
        <Button size="sm" variant="secondary" onClick={() => setSelected([])}>Clear</Button>
      </div>

      <div style={{ background: 'var(--surface-card)', border: HAIRLINE, borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)' }}>
        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, fontSize: 'var(--text-13)' }}>
          <thead>
            <tr>
              <th style={{ ...th, width: 40, borderTopLeftRadius: 'var(--radius-lg)' }}>
                <Checkbox checked={allSelected} indeterminate={selected.length > 0 && !allSelected} onChange={toggleAll} />
              </th>
              <th style={th}>Guard</th>
              <th style={th}>Branch</th>
              <th style={th}>Employee ID</th>
              <th style={{ ...th, textAlign: 'right' }}>Status</th>
              <th style={{ ...th, width: 44, borderTopRightRadius: 'var(--radius-lg)' }}></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => {
              const zebra = i % 2 === 0 ? 'var(--surface-card)' : 'var(--surface-page)'
              const isLast = i === rows.length - 1
              return (
                <tr key={r.id}>
                  <td style={{ ...td, background: zebra, borderBottomLeftRadius: isLast ? 'var(--radius-lg)' : undefined }}>
                    <Checkbox checked={selected.includes(r.id)} onChange={() => toggle(r.id)} />
                  </td>
                  <td style={{ ...td, background: zebra, fontWeight: 500, color: 'var(--text-primary)' }}>{r.name}</td>
                  <td style={{ ...td, background: zebra }}>{branchName(r.branch_id)}</td>
                  <td style={{ ...td, background: zebra, fontFamily: 'var(--font-mono)' }}>{r.employee_id}</td>
                  <td style={{ ...td, background: zebra, textAlign: 'right' }}>
                    <StatusCell record={r} onOpenDocs={rec => setDocsFor(rec.id)} />
                  </td>
                  <td style={{ ...td, background: zebra, textAlign: 'right', borderBottomRightRadius: isLast ? 'var(--radius-lg)' : undefined }}>
                    <RowMenu items={[
                      { label: 'View / update documents', onClick: () => setDocsFor(r.id) },
                      { label: 'Request missing documents' },
                      { label: 'Withdraw clearance', danger: true },
                    ]} />
                  </td>
                </tr>
              )
            })}
            {rows.length === 0 && (
              <tr><td colSpan={6} style={{ ...td, padding: 24, textAlign: 'center' }}>No guards match these filters.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {openRecord && (
        <DocumentsModal record={openRecord} onClose={() => setDocsFor(null)}
          onUpload={onUpload} onRemove={onRemove} onApprove={onApprove} onReject={onReject} />
      )}
    </div>
  )
}
