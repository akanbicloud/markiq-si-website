import React from 'react';
import Link from 'next/link';
import Logo from './Logo';

export default function PublicFooter() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--line)',
        backgroundColor: 'var(--bg-sidebar)',
        padding: 'clamp(40px, 6vw, 60px) 16px 40px',
        marginTop: 'auto',
        width: '100%',
        maxWidth: '100vw',
        boxSizing: 'border-box',
        overflowX: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '28px',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '20px',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '6px',
            }}
          >
            <Logo href="/" size="sm" />
            <span
              style={{
                fontSize: '13px',
                color: 'var(--dim)',
                lineHeight: 1.4,
              }}
            >
              Market Intelligence · Super Intelligence
            </span>
          </div>

          <nav
            aria-label="Footer"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px 20px',
              fontSize: '14px',
              alignItems: 'center',
            }}
          >
            <Link href="/pricing" style={{ color: 'var(--muted)' }}>
              Pricing
            </Link>
            <Link href="/academy" style={{ color: 'var(--muted)' }}>
              Academy
            </Link>
            <Link href="/strategy-lab" style={{ color: 'var(--muted)' }}>
              Strategy Lab
            </Link>
            <Link href="/chart-lab" style={{ color: 'var(--muted)' }}>
              Chart Lab
            </Link>
            <Link href="/disclaimer" style={{ color: 'var(--muted)' }}>
              Risk Disclaimer
            </Link>
            <Link href="/terms" style={{ color: 'var(--muted)' }}>
              Terms
            </Link>
            <Link href="/privacy" style={{ color: 'var(--muted)' }}>
              Privacy
            </Link>
          </nav>
        </div>

        <div
          style={{
            borderTop: '1px solid var(--line)',
            paddingTop: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: '12px',
              color: 'var(--dim)',
              lineHeight: 1.6,
              maxWidth: '920px',
              wordBreak: 'break-word',
            }}
          >
            Risk warning: trading currencies, commodities, indices, stocks and crypto, especially with leverage, carries a high risk of loss and may not be suitable for everyone. MarkIQ SI provides market information and education, not investment advice. Past and backtested performance does not guarantee future results.
          </p>

          <p
            style={{
              margin: 0,
              fontSize: '12px',
              color: 'var(--dim)',
              fontFamily: 'var(--font-ibm-plex-mono)',
            }}
          >
            © 2026 MarkIQ SI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
