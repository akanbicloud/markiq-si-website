import React from 'react';
import Link from 'next/link';
import { Warning, ShieldCheck, Info } from '@phosphor-icons/react/dist/ssr';

export const metadata = {
  title: 'Risk Disclaimer — MarkIQ SI',
  description:
    'Risk disclaimer and important regulatory disclosures for MarkIQ SI market intelligence and educational tools.',
};

export default function RiskDisclaimerPage() {
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
      {/* Page Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-ibm-plex-mono)',
            fontSize: '12px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--down)',
          }}
        >
          <Warning size={18} weight="fill" />
          <span>LEGAL &amp; REGULATORY NOTICE</span>
        </div>

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
          Risk Disclaimer &amp; Notice
        </h1>
        <p style={{ margin: 0, color: 'var(--muted)', fontSize: '16px' }}>
          Last updated: October 2026 · MarkIQ SI
        </p>
      </div>

      {/* Main Callout Box */}
      <div
        style={{
          background: 'rgba(255, 138, 91, 0.08)',
          border: '1px solid var(--down)',
          borderRadius: 'var(--radius-card)',
          padding: '24px',
          marginBottom: '36px',
          display: 'flex',
          gap: '16px',
        }}
      >
        <Warning size={28} weight="light" style={{ color: 'var(--down)', flexShrink: 0 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '15px', lineHeight: 1.6 }}>
          <strong style={{ color: 'var(--text)', fontSize: '16px' }}>
            High-Risk Investment Warning
          </strong>
          <span style={{ color: 'var(--muted)' }}>
            Trading foreign exchange (FX), contracts for difference (CFDs), commodities, precious metals, equities, indices, and cryptocurrencies carries an extremely high level of risk and may not be suitable for all investors. The high degree of leverage that is often obtainable in these markets can work against you as well as for you. Before deciding to trade, you should carefully consider your investment objectives, level of experience, and risk appetite.
          </span>
        </div>
      </div>

      {/* Structured Sections */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
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
          <h2 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '22px', color: 'var(--text)' }}>
            1. Information &amp; Educational Purpose Only
          </h2>
          <p style={{ margin: 0, color: 'var(--muted)' }}>
            MarkIQ SI provides market data synthesis, real-time economic card summaries, educational courses, and analytical backtesting software. All content presented on this website, in the Telegram intelligence feed, or via the AI Tutor is published strictly for informational and educational purposes.
          </p>
          <p style={{ margin: 0, color: 'var(--muted)' }}>
            Nothing provided by MarkIQ SI constitutes investment, financial, trading, tax, or legal advice, nor an endorsement, solicitation, or recommendation to buy or sell any asset, security, currency, derivative, or financial product.
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
          <h2 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '22px', color: 'var(--text)' }}>
            2. Past Performance and Historical Reactions
          </h2>
          <p style={{ margin: 0, color: 'var(--muted)' }}>
            Any historical reaction statistics, economic surprise metrics, or backtested models shown by MarkIQ SI reflect historical market behavior under specific past market conditions. <strong>Past and simulated performance is no guarantee of future results.</strong>
          </p>
          <p style={{ margin: 0, color: 'var(--muted)' }}>
            Market dynamics are subject to change without notice due to unexpected macroeconomic shocks, geopolitical events, sudden liquidity crises, and changes in central bank policy regimes.
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
          <h2 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '22px', color: 'var(--text)' }}>
            3. Automated Strategy &amp; Robot Rules (Demo First)
          </h2>
          <p style={{ margin: 0, color: 'var(--muted)' }}>
            Users who utilize the Strategy Lab to generate algorithmic code (such as MQL5 Expert Advisors or Pine Script) do so entirely at their own risk. MarkIQ SI enforces a strict demo-first philosophy:
          </p>
          <ul style={{ margin: '4px 0 0 20px', color: 'var(--muted)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>Automated algorithms must always be rigorously validated on demo accounts prior to live capital deployment.</li>
            <li>Algo Trading should remain disabled by default until comprehensive risk limits have been verified.</li>
            <li>Never share private trading account passwords or allow third parties custody of your funds. MarkIQ SI never stores trading passwords.</li>
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
          <h2 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '22px', color: 'var(--text)' }}>
            4. Data Integrity &amp; Provenance
          </h2>
          <p style={{ margin: 0, color: 'var(--muted)' }}>
            Economic indicators and macroeconomic data are retrieved from official institutions (such as the US Bureau of Labor Statistics, Bureau of Economic Analysis, Federal Reserve, European Central Bank, and Bank of England). While MarkIQ SI exercises rigorous quality control, latency, official revisions, technical outages, and third-party feed discrepancies may occur.
          </p>
          <p style={{ margin: 0, color: 'var(--muted)' }}>
            MarkIQ SI shall not be held liable for any financial losses or damages resulting from data delays, execution errors, or reliance on information presented across its platforms.
          </p>
        </section>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px' }}>
          <Link href="/" style={{ color: 'var(--blue-soft)', fontWeight: 600 }}>
            ← Back to Home
          </Link>
          <Link href="/terms" style={{ color: 'var(--muted)', fontSize: '14px' }}>
            View Terms of Service →
          </Link>
        </div>
      </div>
    </div>
  );
}
