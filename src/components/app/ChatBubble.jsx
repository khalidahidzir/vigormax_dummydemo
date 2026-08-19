import React from 'react'

export function ChatBubble({ role = 'assistant', children, style }) {
  const user = role === 'user'
  return (
    <div style={{ display: 'flex', justifyContent: user ? 'flex-end' : 'flex-start', gap: 8, alignItems: 'flex-end' }}>
      {!user && <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--accent-soft)', color: 'var(--accent-strong)', fontFamily: 'var(--font-mono)', fontSize: 9.5, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, letterSpacing: '0.02em' }}>AI</span>}
      <div style={{
        maxWidth: '74%', padding: '10px 14px', borderRadius: 'var(--radius-xl)',
        background: user ? 'var(--chat-user-bg)' : 'var(--surface-card)',
        color: user ? 'var(--chat-user-fg)' : 'var(--chat-ai-fg)',
        border: user ? 'none' : 'var(--border-hairline)',
        boxShadow: user ? 'none' : 'var(--shadow-flat)',
        fontSize: 'var(--text-13)', lineHeight: 'var(--leading-relaxed)', whiteSpace: 'pre-wrap',
        borderBottomRightRadius: user ? 'var(--radius-tail)' : 'var(--radius-xl)',
        borderBottomLeftRadius: user ? 'var(--radius-xl)' : '6px',
        ...style,
      }}>{children}</div>
    </div>
  )
}
