import React, { useState } from 'react'
import { Button } from '../components/core/Button.jsx'
import { Input } from '../components/core/Input.jsx'
import { Select } from '../components/core/Select.jsx'
import { DataTable } from '../components/data/DataTable.jsx'
import { RowMenu } from '../components/data/RowMenu.jsx'
import { BRANCHES, branchName } from '../data.js'

export function EmployeesScreen({ employees }) {
  const [search, setSearch] = useState('')
  const [branch, setBranch] = useState('All')
  const [confirm, setConfirm] = useState(null)

  const rows = employees.filter(e =>
    (branch === 'All' || String(e.branch_id) === branch) &&
    ((e.first_name + ' ' + e.last_name).toLowerCase().includes(search.toLowerCase()) ||
      e.position.toLowerCase().includes(search.toLowerCase())))

  function cell(e, col) {
    if (col === 'ID') return <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-12)' }}>{e.id}</span>
    if (col === 'Name') return <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{e.first_name} {e.last_name}</span>
    if (col === 'Position') return e.position
    if (col === 'Branch') return branchName(e.branch_id)
    if (col === 'Phone') return <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-12)' }}>{e.phone}</span>
    return confirm === e.id ? (
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <span style={{ fontSize: 'var(--text-12)', color: 'var(--status-overdue-fg)' }}>Delete?</span>
        <Button size="sm" variant="danger" onClick={() => setConfirm(null)}>Yes</Button>
        <Button size="sm" variant="secondary" onClick={() => setConfirm(null)}>No</Button>
      </div>
    ) : (
      <RowMenu items={[
        { label: 'Edit employee' },
        { label: 'Delete', danger: true, onClick: () => setConfirm(e.id) },
      ]} />
    )
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 'var(--text-20)', fontWeight: 'var(--weight-medium)', margin: '0 0 4px', color: 'var(--text-heading)' }}>Employee directory</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-14)', margin: 0 }}>{employees.length} staff across all branches</p>
        </div>
        <Button>+ Add employee</Button>
      </div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <Input placeholder="Search name or position..." value={search} onChange={e => setSearch(e.target.value)} style={{ flex: 1 }} />
        <Select auto value={branch} onChange={e => setBranch(e.target.value)}>
          <option value="All">All branches</option>
          {BRANCHES.map(b => <option key={b.id} value={String(b.id)}>{b.name}</option>)}
        </Select>
      </div>
      <DataTable columns={['ID', 'Name', 'Position', 'Branch', 'Phone', '']} rows={rows} renderCell={cell} />
    </div>
  )
}
