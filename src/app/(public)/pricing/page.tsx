import React from 'react';
import Link from 'next/link';
import { Check, Sparkle, WarningCircle } from '@phosphor-icons/react/dist/ssr';

export const metadata = {
  title: 'Pricing — MarkIQ SI',
  description: 'Transparent, honest plans for market intelligence, Academy education, and trading automation.',
};

export default function PricingPage() {
  return (
    <div
      style={{
        maxWidth: '1240px',
        margin: '0 auto',
        padding: 'clamp(48px, 7vw, 96px) 16px',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '16px',
          maxWidth: '720px',
          margin: '0 auto 56px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-ibm-plex-mono)',
            fontSize: '12px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--blue-soft)',
          }}
        >
          TRANSPARENT PLANS
        </span>
        <h1
          style={{
            margin: 0,
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: 'clamp(32px, 5vw, 54px)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: 'var(--text)',
          }}
        >
          Learn the market. Trade with real intelligence.
        </h1>
        <p style={{ margin: 0, color: 'var(--muted)', fontSize: 'clamp(16px, 2vw, 18px)', lineHeight: 1.6 }}>
          No hidden upsells, no fake discounts, no paid trading calls. Start with our free Telegram beta, or unlock the full Academy and Strategy Lab.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          alignItems: 'stretch',
        }}
      >
        {/* Tier 1: Community Beta */}
        <div
          className="mq-lift"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-card)',
            padding: '32px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          <div>
            <div style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '13px', color: 'var(--blue-soft)' }}>
              EARLY ACCESS
            </div>
            <h2 style={{ margin: '8px 0 4px', fontFamily: 'var(--font-space-grotesk)', fontSize: '26px' }}>
              Community
            </h2>
            <p style={{ margin: 0, color: 'var(--muted)', fontSize: '14px', minHeight: '42px' }}>
              Essential market alerts and introductory academy fundamentals.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: '36px', fontWeight: 700, color: 'var(--amber)' }}>
              Free during launch
            </span>
          </div>

          <Link
            href="/#access"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '48px',
              padding: '0 20px',
              borderRadius: 'var(--radius-btn)',
              border: '1px solid var(--line-strong)',
              backgroundColor: 'var(--surface-2)',
              color: 'var(--text)',
              fontWeight: 600,
              fontSize: '15px',
            }}
          >
            Join Early Access
          </Link>

          <div style={{ borderTop: '1px solid var(--line)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>Included:</div>
            {[
              'Telegram channel event release alerts',
              'Dual WAT & GMT trading session clocks',
              'Introductory Fundamentals lessons (Track 1)',
              'Currency strength summary snapshot',
              'Community discussion access',
            ].map((feature) => (
              <div key={feature} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: 'var(--muted)' }}>
                <Check size={18} weight="bold" style={{ color: 'var(--up)', flexShrink: 0, marginTop: '2px' }} />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tier 2: Pro Intelligence (Featured) */}
        <div
          className="mq-lift"
          style={{
            background: 'linear-gradient(180deg, #102449 0%, #0B1A36 100%)',
            border: '2px solid var(--blue)',
            borderRadius: 'var(--radius-card)',
            padding: '32px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            position: 'relative',
            boxShadow: '0 20px 60px rgba(74, 157, 255, 0.15)',
          }}
        >
          {/* Top highlight badge */}
          <div
            style={{
              position: 'absolute',
              top: '-14px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'var(--blue)',
              color: '#04101F',
              fontFamily: 'var(--font-ibm-plex-mono)',
              fontSize: '11px',
              fontWeight: 700,
              padding: '4px 14px',
              borderRadius: '999px',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            All Courses Included
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '13px', color: 'var(--blue-soft)' }}>
              FULL CURRICULUM
            </div>
            <h2 style={{ margin: '8px 0 4px', fontFamily: 'var(--font-space-grotesk)', fontSize: '26px' }}>
              Academy &amp; Intelligence Pro
            </h2>
            <p style={{ margin: 0, color: 'var(--muted)', fontSize: '14px', minHeight: '42px' }}>
              Complete curriculum, AI Tutor support, and live desk broadcast sync.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: '36px', fontWeight: 700, color: 'var(--amber)' }}>
              Free during launch
            </span>
          </div>

          <Link
            href="/#access"
            className="mq-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '48px',
              padding: '0 20px',
              borderRadius: 'var(--radius-btn)',
              backgroundColor: 'var(--amber)',
              color: '#1A1203',
              fontWeight: 600,
              fontSize: '15px',
            }}
          >
            Get Early Access
          </Link>

          <div style={{ borderTop: '1px solid var(--line)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>Everything in Community, plus:</div>
            {[
              'All 21 Academy courses across all 3 tracks',
              'AI Tutor on every lesson page with context',
              'Historical Reaction Explorer (15m & 60m reactions)',
              'Live Desk YouTube sync with real-time card updates',
              'Trading Journal with P&L calendar & analytics',
              'Risk & Prop firm daily loss/drawdown tools',
            ].map((feature) => (
              <div key={feature} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: 'var(--muted)' }}>
                <Check size={18} weight="bold" style={{ color: 'var(--up)', flexShrink: 0, marginTop: '2px' }} />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tier 3: Strategy Lab & Automation */}
        <div
          className="mq-lift"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-card)',
            padding: '32px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          <div>
            <div style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '13px', color: 'var(--blue-soft)' }}>
              ALGORITHMIC LAB
            </div>
            <h2 style={{ margin: '8px 0 4px', fontFamily: 'var(--font-space-grotesk)', fontSize: '26px' }}>
              Strategy Lab Suite
            </h2>
            <p style={{ margin: 0, color: 'var(--muted)', fontSize: '14px', minHeight: '42px' }}>
              Plain-English trading rules to MQL5 EA code generation &amp; demo sandbox.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: '36px', fontWeight: 700, color: 'var(--amber)' }}>
              Free during launch
            </span>
          </div>

          <Link
            href="/#access"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '48px',
              padding: '0 20px',
              borderRadius: 'var(--radius-btn)',
              border: '1px solid var(--line-strong)',
              backgroundColor: 'var(--surface-2)',
              color: 'var(--text)',
              fontWeight: 600,
              fontSize: '15px',
            }}
          >
            Join Strategy Lab Waitlist
          </Link>

          <div style={{ borderTop: '1px solid var(--line)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>Everything in Pro, plus:</div>
            {[
              'English to MQL5 EA compiler & generator',
              'TradingView Pine Script and Python exports',
              'Multi-year historical backtesting sandbox',
              'Rule 3 demo-first verification safeguard',
              'Direct mentor code reviews & troubleshooting',
            ].map((feature) => (
              <div key={feature} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: 'var(--muted)' }}>
                <Check size={18} weight="bold" style={{ color: 'var(--up)', flexShrink: 0, marginTop: '2px' }} />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Honest Guarantee Notice */}
      <div
        style={{
          marginTop: '60px',
          background: 'var(--surface)',
          border: '1px solid var(--line)',
          borderRadius: 'var(--radius-card)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          fontSize: '14px',
          color: 'var(--dim)',
          lineHeight: 1.6,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text)', fontWeight: 600 }}>
          <WarningCircle size={20} weight="light" style={{ color: 'var(--amber)' }} />
          Our Honesty Commitment
        </div>
        <p style={{ margin: 0 }}>
          We never charge for trading signals, private call groups, or get-rich promises. Every subscription funds official API data licensing, computational infrastructure, and rigorous course development. All plans include full access to demo-testing features before you connect to any live trading account.
        </p>
      </div>
    </div>
  );
}
