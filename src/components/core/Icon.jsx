import React from 'react'

// Icon geometry copied verbatim from the product's NAV_ICONS set (src/App.jsx).
const paths = {
  dashboard: (
    <>
      <rect x="1" y="1" width="5" height="5" rx="1.5" fill="currentColor" />
      <rect x="8" y="1" width="5" height="5" rx="1.5" fill="currentColor" />
      <rect x="1" y="8" width="5" height="5" rx="1.5" fill="currentColor" />
      <rect x="8" y="8" width="5" height="5" rx="1.5" fill="currentColor" />
    </>
  ),
  kanban: (
    <>
      <rect x="1" y="1" width="3.5" height="12" rx="1" fill="currentColor" />
      <rect x="5.25" y="1" width="3.5" height="8" rx="1" fill="currentColor" />
      <rect x="9.5" y="1" width="3.5" height="10" rx="1" fill="currentColor" />
    </>
  ),
  employees: (
    <>
      <circle cx="5.5" cy="4" r="2.5" fill="currentColor" />
      <path d="M1 12c0-2.485 2.015-4.5 4.5-4.5S10 9.515 10 12" fill="currentColor" />
      <circle cx="10.5" cy="4.5" r="1.8" fill="currentColor" opacity="0.5" />
      <path d="M10 8c1.657 0 3 1.343 3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
    </>
  ),
  onboarding: (
    <>
      <rect x="2" y="1" width="10" height="12" rx="2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5 5.5l1.5 1.5 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="5" y1="9.5" x2="9" y2="9.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </>
  ),
  documents: (
    <>
      <path d="M3 1h5.5L11 3.5V13H3V1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M8.5 1v3H11" stroke="currentColor" strokeWidth="1.2" />
      <line x1="5" y1="7" x2="9" y2="7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <line x1="5" y1="9.5" x2="9" y2="9.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </>
  ),
  ai: (
    <>
      <circle cx="7" cy="7" r="2" fill="currentColor" />
      <path d="M7 1v2M7 11v2M1 7h2M11 7h2M3.05 3.05l1.42 1.42M9.53 9.53l1.42 1.42M3.05 10.95l1.42-1.42M9.53 4.47l1.42-1.42" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </>
  ),
  audit: (
    <>
      <rect x="2" y="1" width="10" height="12" rx="2" stroke="currentColor" strokeWidth="1.2" />
      <line x1="5" y1="4.5" x2="9" y2="4.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <line x1="5" y1="7" x2="9" y2="7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M4.5 9.5l1 1 2-2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
}

export function Icon({ name, size = 14, style }) {
  const body = paths[name]
  if (!body) return null
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" style={{ display: 'block', flexShrink: 0, ...style }}>
      {body}
    </svg>
  )
}
