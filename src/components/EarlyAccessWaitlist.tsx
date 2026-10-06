'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PaperPlaneTilt, CheckCircle, WarningCircle } from '@phosphor-icons/react';

export default function EarlyAccessWaitlist() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus('error');
        setErrorMessage(data.error || 'Unable to join waitlist. Please try again.');
        return;
      }
      setStatus('success');
      setSuccessMessage(data.message || "You're on the priority waitlist!");
    } catch {
      setStatus('error');
      setErrorMessage('Network connection error. Please try again.');
    }
  };

  return (
    <section id="access" style={{ width: '100%', maxWidth: '1240px', margin: '0 auto', padding: ' clamp(48px, 8vw, 96px) 16px' }}>
      <div
        style={{
          background: 'linear-gradient(135deg, #0D2350 0%, #081735 100%)',
          border: '1px solid var(--line-strong)',
          borderRadius: '24px',
          padding: 'clamp(28px, 5vw, 54px)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '36px',
          alignItems: 'center',
          boxShadow: '0 24px 64px rgba(2, 8, 24, 0.7)',
        }}
      >
        <div style={{ flex: '1 1 400px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div
            style={{
              fontFamily: 'var(--font-ibm-plex-mono)',
              fontSize: '12px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--blue-soft)',
            }}
          >
            BE FIRST IN
          </div>
          <h2
            style={{
              margin: 0,
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: 'clamp(28px, 4.5vw, 42px)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: 'var(--text)',
            }}
          >
            Get early access to MarkIQ SI.
          </h2>
          <p
            style={{
              margin: 0,
              color: 'var(--muted)',
              fontSize: 'clamp(15px, 2vw, 17px)',
              lineHeight: 1.6,
              maxWidth: '520px',
            }}
          >
            Join the waitlist for the Academy, AI Tutor, Strategy Lab and Chart Lab. We&apos;ll notify you once your access is ready.
          </p>
        </div>

        <div style={{ flex: '1 1 360px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {status === 'success' ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                padding: '20px',
                borderRadius: 'var(--radius-card)',
                background: 'rgba(61, 220, 151, 0.1)',
                border: '1px solid var(--up)',
                color: 'var(--text)',
              }}
            >
              <CheckCircle size={28} weight="light" style={{ color: 'var(--up)', flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: '16px', color: 'var(--up)' }}>
                  {successMessage || "You're on the priority waitlist!"}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '4px' }}>
                  Confirmation email has been sent. Check your inbox for updates.
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label
                htmlFor="waitlist-email-input"
                style={{
                  fontSize: '13px',
                  fontFamily: 'var(--font-ibm-plex-mono)',
                  color: 'var(--muted)',
                }}
              >
                EMAIL ADDRESS
              </label>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '10px',
                }}
              >
                <input
                  id="waitlist-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder="trader@domain.com"
                  required
                  style={{
                    flex: '1 1 200px',
                    minWidth: 0,
                    minHeight: '52px',
                    padding: '0 18px',
                    borderRadius: 'var(--radius-btn)',
                    border: status === 'error' ? '1px solid var(--down)' : '1px solid var(--line-strong)',
                    background: 'var(--bg)',
                    color: 'var(--text)',
                    fontSize: '15px',
                    fontFamily: 'var(--font-ibm-plex-sans)',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="mq-btn"
                  style={{
                    minHeight: '52px',
                    padding: '0 24px',
                    borderRadius: 'var(--radius-btn)',
                    border: 'none',
                    background: 'var(--amber)',
                    color: '#1A1203',
                    fontSize: '15px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  <PaperPlaneTilt size={18} weight="bold" />
                  {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
                </button>
              </div>

              {status === 'error' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--down)', fontSize: '13px' }}>
                  <WarningCircle size={16} weight="light" />
                  {errorMessage || 'Please enter a valid email address.'}
                </div>
              )}
            </form>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
            <span style={{ fontSize: '14px', color: 'var(--dim)' }}>Looking for live bot alerts?</span>
            <Link
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--blue-soft)',
                fontSize: '14px',
                fontWeight: 600,
                textDecoration: 'underline',
              }}
            >
              Join the Telegram Channel →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
