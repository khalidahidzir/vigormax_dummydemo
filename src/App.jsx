import React, { useState } from 'react'
import { Sidebar } from './components/app/Sidebar.jsx'
import { LoginScreen } from './screens/LoginScreen.jsx'
import { DashboardScreen } from './screens/DashboardScreen.jsx'
import { TaskBoardScreen } from './screens/TaskBoardScreen.jsx'
import { EmployeesScreen } from './screens/EmployeesScreen.jsx'
import { OnboardingScreen } from './screens/OnboardingScreen.jsx'
import { DocumentsScreen } from './screens/DocumentsScreen.jsx'
import { AuditScreen } from './screens/AuditScreen.jsx'
import { AssistantScreen } from './screens/AssistantScreen.jsx'
import { NAV, EMPLOYEES, TASKS, ONBOARDING, ONBOARDING_STEPS, DOCS, AUDIT_ITEMS, dayDiff } from './data.js'
import logo from './assets/vigormax-logo-mark.jpeg'

const APPROVER = 'Demo approver'
const today = () => new Date().toISOString().split('T')[0]

export default function App() {
  const [session, setSession] = useState(null)
  const [page, setPage] = useState('dashboard')
  const [tasks, setTasks] = useState(TASKS)
  const [records, setRecords] = useState(ONBOARDING)
  const [audit, setAudit] = useState(AUDIT_ITEMS)

  function move(id, status) {
    setTasks(prev => prev.map(t => t.task_id === id ? { ...t, status } : t))
  }

  function reclear(r, steps) {
    const cleared = ONBOARDING_STEPS.every(([k]) => steps[k].status === 'approved')
    return { ...r, steps, cleared, clearedAt: cleared ? today() : undefined }
  }
  function uploadDoc(recordId, key) {
    setRecords(prev => prev.map(r => {
      if (r.id !== recordId) return r
      const label = ONBOARDING_STEPS.find(([k]) => k === key)[1].replace(/ /g, '_')
      const steps = { ...r.steps, [key]: { status: 'pending', file: label + '_' + r.name.split(' ')[0] + '.pdf', at: today(), uploadedBy: APPROVER } }
      return reclear(r, steps)
    }))
  }
  function approveDoc(recordId, key) {
    setRecords(prev => prev.map(r => r.id !== recordId ? r :
      reclear(r, { ...r.steps, [key]: { ...r.steps[key], status: 'approved', approvedBy: APPROVER, approvedAt: today() } })))
  }
  function rejectDoc(recordId, key) {
    setRecords(prev => prev.map(r => r.id !== recordId ? r :
      reclear(r, { ...r.steps, [key]: { status: 'none' } })))
  }
  function removeDoc(recordId, key) {
    setRecords(prev => prev.map(r => r.id !== recordId ? r :
      reclear(r, { ...r.steps, [key]: { status: 'none' } })))
  }
  function bulkClear(ids) {
    setRecords(prev => prev.map(r => ids.includes(r.id) ? { ...r, cleared: true, clearedAt: today() } : r))
  }
  function toggleLine(itemId, lineId) {
    setAudit(prev => prev.map(i => i.id !== itemId ? i :
      { ...i, lines: i.lines.map(l => l.id === lineId ? { ...l, is_complete: !l.is_complete } : l) }))
  }

  if (!session) return <LoginScreen onSignIn={setSession} />

  const overdue = tasks.filter(t => t.status !== 'DONE' && dayDiff(t.due_date) < 0).length
  const items = NAV.map(n => n.key === 'kanban' ? { ...n, count: overdue } : n)

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'var(--font-sans)', background: 'var(--surface-page)' }}>
      <Sidebar items={items} active={page} onNavigate={setPage} userEmail={session}
        onSignOut={() => { setSession(null); setPage('dashboard') }}
        logoSrc={logo} />
      <main style={{ flex: 1, padding: 'var(--main-padding)', overflowY: 'auto' }}>
        {page === 'dashboard' && <DashboardScreen tasks={tasks} onboarding={records} docs={DOCS} />}
        {page === 'kanban' && <TaskBoardScreen tasks={tasks} onMove={move} />}
        {page === 'employees' && <EmployeesScreen employees={EMPLOYEES} />}
        {page === 'onboarding' && <OnboardingScreen records={records} onUpload={uploadDoc} onRemove={removeDoc} onApprove={approveDoc} onReject={rejectDoc} onBulkApproveClear={bulkClear} />}
        {page === 'documents' && <DocumentsScreen docs={DOCS} />}
        {page === 'audit' && <AuditScreen items={audit} onToggleLine={toggleLine} />}
        {page === 'ai' && <AssistantScreen />}
      </main>
    </div>
  )
}
