import React, { useState } from 'react'
import { Button } from '../components/core/Button.jsx'
import { Input } from '../components/core/Input.jsx'
import { ChatBubble } from '../components/app/ChatBubble.jsx'
import { FilterChip } from '../components/app/FilterChip.jsx'

const CANNED = {
  default: "I can only answer from the data in this demo, but in the live system I read the Employees, kanbanBoard and OnboardingRecord tables directly.",
  overdue: "Three tasks are overdue:\n\n• Renew KDN License — 4 days overdue, Amirah Zulkifli (Alor Setar)\n• Reconcile February guard timesheets — 1 day overdue, Benjamin Zeager (Alor Setar)\n\nThe KDN License renewal is a compliance risk. I'd escalate that one today.",
  cleared: "2 of 4 guards are fully cleared.\n\nPending:\n• Rajan Kumar — Training outstanding\n• Siti Noraini — Certification and Training outstanding",
  report: "MOHA COMPLIANCE SUMMARY — all branches\n\n1. Licensing: KDN licence renewal task is 4 days overdue.\n2. Guard clearance: 2 of 4 onboarding records fully cleared.\n3. Documentation: 5 documents on file, 2 under Compliance.\n\nRecommended action: close the licence renewal task before the quarterly return is filed.",
}

function reply(text) {
  const t = text.toLowerCase()
  if (t.includes('overdue')) return CANNED.overdue
  if (t.includes('cleared') || t.includes('guard')) return CANNED.cleared
  if (t.includes('report') || t.includes('compliance')) return CANNED.report
  return CANNED.default
}

export function AssistantScreen() {
  const [messages, setMessages] = useState([{ role: 'assistant', content: "Hello! I'm your Vigormax AI assistant. I have access to live data from your database. You can ask me things like:\n\n• How many guards are fully cleared?\n• Which tasks are overdue?\n• Draft a compliance report\n• Who should I assign the KDN License renewal to?" }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  function send(text) {
    const msg = (text || input).trim()
    if (!msg || loading) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: msg }])
    setLoading(true)
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: reply(msg) }])
      setLoading(false)
    }, 700)
  }

  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-product)', fontSize: 34, lineHeight: 1.15, fontWeight: 'var(--weight-semibold)', letterSpacing: '-0.02em', margin: '0 0 6px', color: 'var(--text-heading)' }}>VigorAI</h2>
      <p style={{ color: 'var(--text-muted)', fontSize: 14, margin: '0 0 20px' }}>Powered by Claude — reads your live database to answer questions and draft reports</p>
      <div style={{ background: 'var(--surface-card)', border: 'var(--border-hairline)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <div style={{ height: 'var(--chat-height)', overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {messages.map((m, i) => <ChatBubble key={i} role={m.role}>{m.content}</ChatBubble>)}
          {loading && <ChatBubble><span style={{ color: 'var(--text-muted)' }}>Thinking...</span></ChatBubble>}
        </div>
        <div style={{ padding: '0 12px 12px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['Which tasks are overdue?', 'Draft a MOHA compliance report', 'How many guards are cleared?'].map(s => (
            <FilterChip key={s} label={s} onClick={() => send(s)} />
          ))}
        </div>
        <div style={{ borderTop: 'var(--border-hairline)', padding: 12, display: 'flex', gap: 8 }}>
          <Input value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Ask about your data or request a compliance report..."
            style={{ flex: 1, background: 'var(--surface-page)', padding: '9px 12px' }} />
          <Button size="lg" onClick={() => send()} disabled={!input.trim()}>Send</Button>
        </div>
      </div>
    </div>
  )
}
