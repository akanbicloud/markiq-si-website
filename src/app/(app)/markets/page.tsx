'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChartLineUp, ArrowUpRight, CalendarBlank } from '@phosphor-icons/react';

interface CalendarEvent {
  time: string;
  ccy: string;
  name: string;
  impact: 'High' | 'Medium';
  f: string;
  p: string;
}

const STRENGTH_DATA: Record<string, Record<string, number>> = {
  '1H': { USD: 0.06, EUR: -0.03, GBP: 0.02, JPY: -0.05, CHF: 0.01, AUD: -0.02, CAD: 0.03, NZD: -0.04 },
  '4H': { USD: 0.18, EUR: -0.07, GBP: 0.05, JPY: -0.16, CHF: 0.04, AUD: -0.09, CAD: 0.08, NZD: -0.11 },
  '24H': { USD: 0.41, EUR: -0.12, GBP: 0.17, JPY: -0.38, CHF: 0.09, AUD: -0.21, CAD: 0.13, NZD: -0.27 },
};

const CALENDAR_DATA: Record<string, CalendarEvent[]> = {
  Thursday: [
    { time: '09:00 · 08:00', ccy: 'EUR', name: 'Services PMI (final)', impact: 'Medium', f: '51.2', p: '51.0' },
    { time: '13:30 · 12:30', ccy: 'USD', name: 'Weekly jobless claims', impact: 'Medium', f: '225K', p: '221K' },
  ],
  Friday: [
    { time: '13:30 · 12:30', ccy: 'USD', name: 'Non-farm payrolls', impact: 'High', f: '150K', p: '162K' },
    { time: '13:30 · 12:30', ccy: 'USD', name: 'Unemployment rate', impact: 'High', f: '4.1%', p: '4.1%' },
    { time: '13:30 · 12:30', ccy: 'CAD', name: 'Employment change', impact: 'High', f: '20K', p: '22K' },
  ],
  'Next Monday': [
    { time: '01:30 · 00:30', ccy: 'AUD', name: 'Retail sales m/m', impact: 'Medium', f: '0.3%', p: '0.5%' },
    { time: '15:00 · 14:00', ccy: 'USD', name: 'ISM services PMI', impact: 'High', f: '52.4', p: '52.0' },
  ],
};

export default function MarketsPage() {
  const [win, setWin] = useState<'1H' | '4H' | '24H'>('24H');
  const [day, setDay] = useState<string>('Thursday');
  const [impactFilter, setImpactFilter] = useState<'All' | 'High'>('All');

  // Compute strength ranking
  const row = STRENGTH_DATA[win];
  const sortedCurrencies = Object.keys(row).sort((a, b) => row[b] - row[a]);
  const maxVal = Math.max(...sortedCurrencies.map((c) => Math.abs(row[c])));

  const events = (CALENDAR_DATA[day] || []).filter(
    (e) => impactFilter === 'All' || e.impact === 'High'
  );

  return (
    <div
      style={{
        padding: 'clamp(20px, 3vw, 40px)',
        width: '100%',
        maxWidth: '1240px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: '14px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span
            style={{
              fontFamily: 'var(--font-ibm-plex-mono)',
              fontSize: '12px',
              letterSpacing: '0.12em',
              color: 'var(--blue-soft)',
              textTransform: 'uppercase',
            }}
          >
            MARKET DASHBOARD
          </span>
          <h1
            style={{
              margin: 0,
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: 'clamp(28px, 3.6vw, 40px)',
              letterSpacing: '-0.02em',
              color: 'var(--text)',
            }}
          >
            What&apos;s moving, and what&apos;s next.
          </h1>
        </div>

        <span
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: '#1A1203',
            background: 'var(--amber)',
            padding: '4px 12px',
            borderRadius: '999px',
          }}
        >
          Example data · live prices with MT5 feed
        </span>
      </div>

      {/* Top 2 Columns: Currency Strength & Latest Event Cards */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'flex-start' }}>
        {/* Currency Strength Section */}
        <section
          aria-label="Currency strength"
          style={{
            flex: '1 1 440px',
            minWidth: 0,
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-card)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '20px', color: 'var(--text)' }}>
              Currency strength
            </h2>

            {/* Time Window Buttons */}
            <div
              role="group"
              aria-label="Time window"
              style={{
                display: 'flex',
                gap: '4px',
                background: 'var(--bg)',
                borderRadius: '10px',
                padding: '4px',
              }}
            >
              {(['1H', '4H', '24H'] as const).map((w) => {
                const isActive = win === w;
                return (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setWin(w)}
                    style={{
                      minHeight: '34px',
                      padding: '0 12px',
                      borderRadius: '8px',
                      border: 'none',
                      fontFamily: 'var(--font-ibm-plex-mono)',
                      fontSize: '13px',
                      cursor: 'pointer',
                      background: isActive ? 'var(--button)' : 'transparent',
                      color: isActive ? '#FFFFFF' : 'var(--muted)',
                      fontWeight: isActive ? 600 : 400,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {w}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Strength Bars List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {sortedCurrencies.map((c, i) => {
              const v = row[c];
              const w = (Math.abs(v) / maxVal) * 48;
              const isPositive = v >= 0;
              const color = isPositive ? 'var(--up)' : 'var(--down)';

              return (
                <div
                  key={c}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontFamily: 'var(--font-ibm-plex-mono)',
                    fontSize: '14px',
                  }}
                >
                  <span style={{ width: '18px', color: 'var(--dim)', fontSize: '12px' }}>{i + 1}</span>
                  <span style={{ width: '40px', fontWeight: 600, color: 'var(--text)' }}>{c}</span>

                  <div
                    style={{
                      flex: 1,
                      position: 'relative',
                      height: '10px',
                      background: 'var(--surface-2)',
                      borderRadius: '5px',
                    }}
                  >
                    {/* Centered Neutral Axis */}
                    <div
                      style={{
                        position: 'absolute',
                        left: '50%',
                        top: '-3px',
                        bottom: '-3px',
                        width: '1px',
                        backgroundColor: 'var(--line-strong)',
                      }}
                    />

                    {/* Relative Bar */}
                    <div
                      className="mq-bar"
                      style={{
                        position: 'absolute',
                        top: 0,
                        height: '10px',
                        borderRadius: '5px',
                        backgroundColor: color,
                        width: `${w}%`,
                        left: `${isPositive ? 50 : 50 - w}%`,
                      }}
                    />
                  </div>

                  <span style={{ width: '64px', textAlign: 'right', color, fontWeight: 500 }}>
                    {isPositive ? '+' : ''}
                    {v.toFixed(2)}%
                  </span>
                </div>
              );
            })}
          </div>

          <p style={{ margin: 0, fontSize: '12px', color: 'var(--dim)', lineHeight: 1.5 }}>
            Each currency&apos;s average move against the other seven over the chosen window.
          </p>
        </section>

        {/* Latest Event Cards Column */}
        <section
          aria-label="Latest event cards"
          style={{
            flex: '1 1 340px',
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div
            className="mq-lift"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius-card)',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 600, fontSize: '15px', color: 'var(--text)' }}>Fed rate decision</span>
              <span style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '12px', color: 'var(--blue-soft)' }}>
                Today 19:00 WAT
              </span>
            </div>
            <span style={{ fontSize: '14px', color: 'var(--text)' }}>Held, in line with expectations</span>
            <span style={{ fontSize: '13px', color: 'var(--muted)' }}>In line · USD little changed</span>
          </div>

          <div
            className="mq-lift"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius-card)',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              borderLeft: '3px solid var(--down)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 600, fontSize: '15px', color: 'var(--text)' }}>US CPI (y/y)</span>
              <span style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '12px', color: 'var(--blue-soft)' }}>
                Tue 13:30 WAT
              </span>
            </div>
            <span style={{ fontSize: '14px', color: 'var(--text)' }}>Hotter than expected</span>
            <span style={{ fontSize: '13px', color: 'var(--down)', fontWeight: 500 }}>
              Large surprise · USD strengthened
            </span>
          </div>

          <Link
            href="/live-desk"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '48px',
              borderRadius: 'var(--radius-btn)',
              border: '1px solid var(--line-strong)',
              backgroundColor: 'var(--surface)',
              color: 'var(--text)',
              fontWeight: 600,
              fontSize: '15px',
              gap: '8px',
            }}
          >
            <span>Open Live Desk</span>
            <ArrowUpRight size={16} weight="bold" />
          </Link>
        </section>
      </div>

      {/* Economic Calendar Section */}
      <section
        aria-label="Economic calendar"
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--line)',
          borderRadius: 'var(--radius-card)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '14px' }}>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '20px', color: 'var(--text)' }}>
            Economic calendar
          </h2>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {/* Day selector tabs */}
            <div role="group" aria-label="Day" style={{ display: 'flex', gap: '6px' }}>
              {Object.keys(CALENDAR_DATA).map((d) => {
                const isActive = day === d;
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDay(d)}
                    style={{
                      minHeight: '38px',
                      padding: '0 14px',
                      borderRadius: 'var(--radius-chip)',
                      border: isActive ? '1px solid var(--text)' : '1px solid var(--line-strong)',
                      backgroundColor: isActive ? 'var(--text)' : 'transparent',
                      color: isActive ? 'var(--bg)' : 'var(--text)',
                      fontFamily: 'inherit',
                      fontSize: '13px',
                      fontWeight: isActive ? 600 : 400,
                      cursor: 'pointer',
                    }}
                  >
                    {d}
                  </button>
                );
              })}
            </div>

            {/* Impact filter tabs */}
            <div role="group" aria-label="Impact" style={{ display: 'flex', gap: '6px' }}>
              {(['All', 'High'] as const).map((imp) => {
                const isActive = impactFilter === imp;
                return (
                  <button
                    key={imp}
                    type="button"
                    onClick={() => setImpactFilter(imp)}
                    style={{
                      minHeight: '38px',
                      padding: '0 14px',
                      borderRadius: 'var(--radius-chip)',
                      border: isActive ? '1px solid var(--amber)' : '1px solid var(--line-strong)',
                      backgroundColor: isActive ? 'var(--amber)' : 'transparent',
                      color: isActive ? '#1A1203' : 'var(--text)',
                      fontFamily: 'inherit',
                      fontSize: '13px',
                      fontWeight: isActive ? 600 : 400,
                      cursor: 'pointer',
                    }}
                  >
                    {imp === 'High' ? 'High only' : 'All impacts'}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Calendar Table */}
        <div style={{ overflowX: 'auto', width: '100%' }}>
          <table style={{ width: '100%', minWidth: '680px', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ textAlign: 'left', color: 'var(--muted)' }}>
                <th style={{ padding: '10px 8px', fontWeight: 500, borderBottom: '1px solid var(--line)' }}>Time (WAT · GMT)</th>
                <th style={{ padding: '10px 8px', fontWeight: 500, borderBottom: '1px solid var(--line)' }}>Currency</th>
                <th style={{ padding: '10px 8px', fontWeight: 500, borderBottom: '1px solid var(--line)' }}>Event</th>
                <th style={{ padding: '10px 8px', fontWeight: 500, borderBottom: '1px solid var(--line)' }}>Impact</th>
                <th style={{ padding: '10px 8px', fontWeight: 500, borderBottom: '1px solid var(--line)' }}>Forecast</th>
                <th style={{ padding: '10px 8px', fontWeight: 500, borderBottom: '1px solid var(--line)' }}>Previous</th>
              </tr>
            </thead>
            <tbody>
              {events.map((e, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(18, 38, 74, 0.6)' }}>
                  <td style={{ padding: '12px 8px', fontFamily: 'var(--font-ibm-plex-mono)', color: 'var(--blue-soft)' }}>
                    {e.time}
                  </td>
                  <td style={{ padding: '12px 8px', fontFamily: 'var(--font-ibm-plex-mono)', fontWeight: 600 }}>
                    {e.ccy}
                  </td>
                  <td style={{ padding: '12px 8px', color: 'var(--text)' }}>
                    {e.name}
                  </td>
                  <td style={{ padding: '12px 8px' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        padding: '2px 8px',
                        borderRadius: '999px',
                        backgroundColor: e.impact === 'High' ? 'var(--down)' : 'var(--amber)',
                        color: e.impact === 'High' ? '#1A0D06' : '#1A1203',
                      }}
                    >
                      {e.impact}
                    </span>
                  </td>
                  <td style={{ padding: '12px 8px', fontFamily: 'var(--font-ibm-plex-mono)', color: 'var(--text)' }}>
                    {e.f}
                  </td>
                  <td style={{ padding: '12px 8px', fontFamily: 'var(--font-ibm-plex-mono)', color: 'var(--dim)' }}>
                    {e.p}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {events.length === 0 && (
          <p style={{ margin: '12px 0 0', color: 'var(--dim)', fontSize: '14px' }}>
            No releases match this filter combination.
          </p>
        )}
      </section>
    </div>
  );
}
