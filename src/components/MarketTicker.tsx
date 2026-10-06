'use client';

import React from 'react';

/** Static example data — labelled so users know it is illustrative */
const TICKER_ITEMS = [
  { sym: 'EURUSD', price: '1.0832', chg: '+0.0012', up: true },
  { sym: 'GBPUSD', price: '1.2641', chg: '-0.0008', up: false },
  { sym: 'USDJPY', price: '148.92', chg: '+0.34', up: true },
  { sym: 'XAUUSD', price: '2 391.4', chg: '+8.2', up: true },
  { sym: 'USOIL', price: '77.14', chg: '-0.43', up: false },
  { sym: 'US500', price: '5 614', chg: '+18', up: true },
  { sym: 'BTCUSD', price: '64 820', chg: '-310', up: false },
  { sym: 'AUDUSD', price: '0.6518', chg: '+0.0021', up: true },
  { sym: 'USDCAD', price: '1.3642', chg: '-0.0014', up: false },
  { sym: 'NZDUSD', price: '0.5974', chg: '+0.0009', up: true },
];

export default function MarketTicker() {
  // Duplicate 3× so the seamless loop works for any viewport
  const repeated = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div
      aria-hidden="true"
      title="Illustrative example prices — not live data"
      style={{
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
        overflow: 'hidden',
        padding: '14px 0',
        backgroundColor: 'rgba(5, 12, 28, 0.75)',
        backdropFilter: 'blur(8px)',
        width: '100%',
        maxWidth: '100vw',
        boxSizing: 'border-box',
        position: 'relative',
      }}
    >
      {/* Fade edges */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '60px',
          background: 'linear-gradient(90deg, rgba(5,12,28,0.9) 0%, transparent 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '60px',
          background: 'linear-gradient(270deg, rgba(5,12,28,0.9) 0%, transparent 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      <div
        className="mq-marquee"
        style={{
          display: 'flex',
          alignItems: 'center',
          width: 'max-content',
          gap: 0,
        }}
      >
        {repeated.map((item, idx) => (
          <span
            key={idx}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0 20px',
              borderRight: '1px solid var(--line)',
              fontFamily: 'var(--font-ibm-plex-mono)',
              fontSize: '13px',
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{ color: 'var(--muted)', fontWeight: 500 }}>{item.sym}</span>
            <span style={{ color: 'var(--text)', fontWeight: 600 }}>{item.price}</span>
            <span
              style={{
                color: item.up ? 'var(--up)' : 'var(--down)',
                fontSize: '12px',
              }}
            >
              {item.chg}
            </span>
          </span>
        ))}
      </div>

      {/* Example data label — required by rule 1 */}
      <span
        style={{
          position: 'absolute',
          right: '70px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2,
          fontSize: '10px',
          fontFamily: 'var(--font-ibm-plex-mono)',
          color: 'var(--dim)',
          background: 'rgba(5,12,28,0.85)',
          padding: '2px 6px',
          borderRadius: '4px',
          border: '1px solid var(--line)',
          pointerEvents: 'none',
        }}
      >
        Example data
      </span>
    </div>
  );
}
