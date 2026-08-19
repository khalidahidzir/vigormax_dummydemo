import React, { useState } from 'react'
import { Button } from '../components/core/Button.jsx'
import { FilterChip } from '../components/app/FilterChip.jsx'
import { DocumentRow } from '../components/app/DocumentRow.jsx'
import { RowMenu } from '../components/data/RowMenu.jsx'
import { branchName } from '../data.js'

export function DocumentsScreen({ docs }) {
  const [cat, setCat] = useState('All')
  const filtered = docs.filter(d => cat === 'All' || d.category === cat)

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
        <h2 style={{ fontSize: 'var(--text-20)', fontWeight: 'var(--weight-medium)', margin: 0, color: 'var(--text-heading)' }}>Document repository</h2>
        <Button>+ Upload document</Button>
      </div>
      <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-14)', margin: '4px 0 20px' }}>{docs.length} documents stored across all branches</p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {['All', 'Compliance', 'Operations', 'HR', 'Finance'].map(c => (
          <FilterChip key={c} label={c} active={cat === c} onClick={() => setCat(c)} />
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.length === 0 && <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-13)' }}>No documents found.</p>}
        {filtered.map(d => (
          <DocumentRow key={d.id} title={d.title} category={d.category}
            meta={branchName(d.branch_id) + ' · ' + d.date}
            actions={<RowMenu items={[
              { label: 'View document' },
              { label: 'Edit details' },
              { label: 'Delete', danger: true },
            ]} />} />
        ))}
      </div>
    </div>
  )
}
