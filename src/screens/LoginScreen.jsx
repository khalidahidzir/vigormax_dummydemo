import React, { useState } from 'react'
import { Button } from '../components/core/Button.jsx'
import { Input } from '../components/core/Input.jsx'
import { Field } from '../components/core/Field.jsx'
import logo from '../assets/vigormax-logo-mark.jpeg'

export function LoginScreen({ onSignIn }) {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('demo@vigormax.com.my')
  const [password, setPassword] = useState('demo1234')

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface-page)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 20px', fontFamily: 'var(--font-sans)' }}>
      <div style={{ width: 'var(--auth-card-width)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Demo notice — disclaims the data at a glance, so the footnote below is free to explain the work. */}
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 14,
          background: 'var(--status-pending-bg)', color: 'var(--status-pending-fg)',
          font: 'var(--type-meta)', fontWeight: 'var(--weight-medium)',
          letterSpacing: '0.08em', textTransform: 'uppercase',
          padding: '4px 12px', borderRadius: 'var(--radius-pill)', whiteSpace: 'nowrap',
        }}>
          <span aria-hidden="true" style={{ width: 5, height: 5, borderRadius: 'var(--radius-round)', background: 'currentColor', display: 'block' }} />
          Demo — fictional data
        </span>

        <div style={{ width: '100%', background: 'var(--surface-card)', borderRadius: 'var(--radius-3xl)', padding: '32px 28px', boxShadow: 'var(--shadow-float)', border: 'var(--border-hairline)' }}>
          <img src={logo} alt="Vigormax" style={{ width: '100%', height: 240, borderRadius: 10, objectFit: 'contain', display: 'block', marginBottom: 28 }} />
          <form onSubmit={e => { e.preventDefault(); onSignIn(email) }}>
            <p style={{ fontWeight: 'var(--weight-semibold)', fontSize: 'var(--text-17)', color: 'var(--text-primary)', margin: '0 0 4px' }}>
              {mode === 'login' ? 'Sign in' : 'Create account'}
            </p>
            <p style={{ fontSize: 'var(--text-13)', color: 'var(--text-muted)', margin: '0 0 20px' }}>
              {mode === 'login' ? 'Please enter your credentials to continue.' : 'Set up your access credentials.'}
            </p>
            <div style={{ marginBottom: 14 }}>
              <Field label="Email"><Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" /></Field>
            </div>
            <div style={{ marginBottom: 20 }}>
              <Field label="Password"><Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" /></Field>
            </div>
            <Button type="submit" block style={{ marginBottom: 16 }}>{mode === 'login' ? 'Sign in' : 'Create account'}</Button>
            <p style={{ margin: 0, fontSize: 'var(--text-13)', color: 'var(--text-muted)', textAlign: 'center' }}>
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <Button variant="link" type="button" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </Button>
            </p>
          </form>
        </div>

        <p style={{ margin: '18px 2px 0', fontSize: 'var(--text-11)', lineHeight: 'var(--leading-relaxed)', color: 'var(--text-muted)', textAlign: 'center' }}>
          A capstone prototype of the Vigormax Digital Oversight System. Every person, document
          and record shown here is invented for demonstration. The production system runs on
          Supabase (PostgreSQL&nbsp;+&nbsp;Auth) with an Anthropic Claude assistant; this build
          recreates the front end to demonstrate system design and interface architecture.
          Sign in with the pre-filled credentials to explore all seven modules.
        </p>
      </div>
    </div>
  )
}
