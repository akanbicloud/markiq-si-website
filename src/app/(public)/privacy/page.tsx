import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy — MarkIQ SI',
  description: 'How MarkIQ SI protects and respects your personal information and privacy.',
};

export default function PrivacyPage() {
  return (
    <div
      style={{
        maxWidth: '920px',
        margin: '0 auto',
        padding: 'clamp(40px, 6vw, 80px) 16px',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '36px' }}>
        <span
          style={{
            fontFamily: 'var(--font-ibm-plex-mono)',
            fontSize: '12px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--blue-soft)',
          }}
        >
          DATA PRIVACY
        </span>
        <h1
          style={{
            margin: 0,
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: 'clamp(32px, 5vw, 48px)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: 'var(--text)',
          }}
        >
          Privacy Policy
        </h1>
        <p style={{ margin: 0, color: 'var(--muted)', fontSize: '15px' }}>
          Effective: October 2026 · MarkIQ SI
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '28px',
          color: 'var(--text)',
          lineHeight: 1.7,
          fontSize: '15px',
        }}
      >
        <section
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-card)',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <h2 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '20px' }}>
            1. Information We Collect
          </h2>
          <p style={{ margin: 0, color: 'var(--muted)' }}>
            We collect only the essential information necessary to deliver educational services, Telegram bot integration, and platform authentication:
          </p>
          <ul style={{ margin: '4px 0 0 20px', color: 'var(--muted)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <li><strong>Account details:</strong> Email address, name or pseudonym, and Telegram username for notification routing.</li>
            <li><strong>Learning metrics:</strong> Course progression, quiz scores, and AI Tutor session context.</li>
            <li><strong>Technical data:</strong> Non-identifying analytics, browser type, and timezone preference for dual WAT &amp; GMT display.</li>
          </ul>
        </section>

        <section
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-card)',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <h2 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '20px' }}>
            2. Strict Non-Custodial &amp; Zero Broker Credential Storage
          </h2>
          <p style={{ margin: 0, color: 'var(--muted)' }}>
            In accordance with Rule 3 of our core security principles, MarkIQ SI <strong>never collects, requests, or stores live trading account master passwords or fund custody keys</strong>. Strategy Lab robots run locally on your device or via investor (read-only) connections.
          </p>
        </section>

        <section
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-card)',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <h2 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '20px' }}>
            3. How We Use &amp; Protect Your Information
          </h2>
          <p style={{ margin: 0, color: 'var(--muted)' }}>
            We do not sell, rent, or trade your personal information to advertisers or external brokerages. Your data is used exclusively to facilitate your learning progress and deliver your requested alert subscriptions.
          </p>
        </section>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px' }}>
          <Link href="/" style={{ color: 'var(--blue-soft)', fontWeight: 600 }}>
            ← Back to Home
          </Link>
          <Link href="/disclaimer" style={{ color: 'var(--muted)', fontSize: '14px' }}>
            View Risk Disclaimer →
          </Link>
        </div>
      </div>
    </div>
  );
}
