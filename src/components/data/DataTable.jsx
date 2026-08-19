import React from 'react'

const R = 'var(--radius-lg)'

export function DataTable({ columns = [], rows = [], renderCell, style }) {
  const last = columns.length - 1
  const lastRow = rows.length - 1
  return (
    <div style={{
      background: 'var(--surface-card)',
      border: 'var(--border-hairline)',
      borderRadius: R,
      boxShadow: 'var(--shadow-card)',
      ...style,
    }}>
      <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, fontSize: 'var(--text-13)' }}>
        <thead>
          <tr>
            {columns.map((c, ci) => (
              <th key={ci} style={{
                padding: 'var(--pad-cell)', textAlign: c === '' ? 'right' : 'left',
                fontWeight: 'var(--weight-medium)', color: 'var(--text-muted)',
                background: 'var(--surface-page)',
                borderBottom: 'var(--border-hairline)', fontSize: 'var(--text-12)',
                width: c === '' ? 44 : undefined,
                borderTopLeftRadius: ci === 0 ? R : undefined,
                borderTopRightRadius: ci === last ? R : undefined,
              }}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.id ?? i}>
              {columns.map((c, ci) => (
                <td key={ci} style={{
                  padding: 'var(--pad-cell)', color: 'var(--text-muted)',
                  textAlign: c === '' ? 'right' : 'left',
                  background: i % 2 === 0 ? 'var(--surface-card)' : 'var(--surface-page)',
                  borderBottomLeftRadius: i === lastRow && ci === 0 ? R : undefined,
                  borderBottomRightRadius: i === lastRow && ci === last ? R : undefined,
                }}>
                  {renderCell ? renderCell(row, c) : row[c]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
