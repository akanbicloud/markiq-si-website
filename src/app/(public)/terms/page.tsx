import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service — MarkIQ SI',
  description: 'Terms and conditions governing the use of MarkIQ SI website, services, and intelligence platform.',
};

export default function TermsPage() {
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
          LEGAL AGREEMENT
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
          Terms of Service
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
            1. Acceptance of Terms
          </h2>
          <p style={{ margin: 0, color: 'var(--muted)' }}>
            By accessing or using the MarkIQ SI website, Telegram intelligence channels, Academy courses, AI Tutor, or Strategy Lab software tools, you agree to be bound by these Terms of Service. If you do not agree to these terms, do not access or use the platform.
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
            2. Educational &amp; Intelligence Services
          </h2>
          <p style={{ margin: 0, color: 'var(--muted)' }}>
            MarkIQ SI is an educational and market data analytics platform. We do not provide personalized financial, investment, or trading advice. You acknowledge that all investment and trading decisions are made solely at your discretion and risk.
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
            3. User Accounts &amp; Conduct
          </h2>
          <p style={{ margin: 0, color: 'var(--muted)' }}>
            You are responsible for maintaining the confidentiality of your account credentials. You agree not to:
          </p>
          <ul style={{ margin: '4px 0 0 20px', color: 'var(--muted)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <li>Scrape, redistribute, or reverse-engineer data, courses, or generated code without prior written consent.</li>
            <li>Use the Community or platform to solicit investments, advertise paid signal services, or spam members.</li>
            <li>Deploy automated robots generated in Strategy Lab without prior demo-testing and validation.</li>
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
            4. Limitation of Liability
          </h2>
          <p style={{ margin: 0, color: 'var(--muted)' }}>
            Under no circumstances shall MarkIQ SI or its founder be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of capital, profits, or data, arising from your use of the service.
          </p>
        </section>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px' }}>
          <Link href="/" style={{ color: 'var(--blue-soft)', fontWeight: 600 }}>
            ← Back to Home
          </Link>
          <Link href="/privacy" style={{ color: 'var(--muted)', fontSize: '14px' }}>
            View Privacy Policy →
          </Link>
        </div>
      </div>
    </div>
  );
}
