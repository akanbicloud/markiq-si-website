'use client';

import React, { useState } from 'react';
import { HourglassHigh, Info, Warning } from '@phosphor-icons/react';

interface ScenarioData {
  title: string;
  sample: string;
  count: number;
  rosePct: number;
  roseText: string;
  avgMove: string;
  typicalRange: string;
  dots: boolean[]; // true = positive move, false = negative move
  isSmall: boolean;
}

const MATRIX_DATA: Record<string, { hotter: ScenarioData; cooler: ScenarioData; simply: string }> = {
  'US CPI_EURUSD_15 min': {
    hotter: {
      title: 'Hotter than expected',
      sample: '14 releases · 2024–2026',
      count: 14,
      rosePct: 21,
      roseText: 'rose in EURUSD (fell 79%)',
      avgMove: '-32 pips',
      typicalRange: '-18 to -46 pips',
      dots: [false, false, false, true, false, false, false, true, false, false, false, false, true, false],
      isSmall: false,
    },
    cooler: {
      title: 'Cooler than expected',
      sample: '9 releases · 2024–2026',
      count: 9,
      rosePct: 78,
      roseText: 'rose in EURUSD',
      avgMove: '+28 pips',
      typicalRange: '+14 to +38 pips',
      dots: [true, true, true, false, true, true, true, false, true],
      isSmall: true,
    },
    simply:
      'Hotter CPI releases almost always strengthened the dollar in the first 15 minutes, pushing EURUSD down. Cooler prints produced the opposite reaction with slightly less average velocity.',
  },
  'US CPI_XAUUSD_15 min': {
    hotter: {
      title: 'Hotter than expected',
      sample: '14 releases · 2024–2026',
      count: 14,
      rosePct: 14,
      roseText: 'rose in Gold (fell 86%)',
      avgMove: '-$18.50',
      typicalRange: '-$10 to -$26',
      dots: [false, false, false, false, false, true, false, false, false, true, false, false, false, false],
      isSmall: false,
    },
    cooler: {
      title: 'Cooler than expected',
      sample: '9 releases · 2024–2026',
      count: 9,
      rosePct: 89,
      roseText: 'rose in Gold',
      avgMove: '+$21.00',
      typicalRange: '+$12 to +$32',
      dots: [true, true, true, true, false, true, true, true, true],
      isSmall: true,
    },
    simply:
      'Gold is intensely sensitive to US inflation surprises. Hot prints spark immediate spikes in real yields, pressuring bullion lower; cooler prints deliver strong impulsive upside.',
  },
};

const DEFAULT_SCENARIO = MATRIX_DATA['US CPI_EURUSD_15 min'];

export default function ReactionExplorerPage() {
  const [selectedEvent, setSelectedEvent] = useState('US CPI');
  const [selectedAsset, setSelectedAsset] = useState('EURUSD');
  const [selectedHorizon, setSelectedHorizon] = useState('15 min');

  const events = ['US CPI', 'US jobs report', 'Fed decision', 'ECB decision', 'BoE decision'];
  const assets = ['EURUSD', 'USDJPY', 'GBPUSD', 'XAUUSD', 'US500'];
  const horizons = ['15 min', '60 min'];

  const key = `${selectedEvent}_${selectedAsset}_${selectedHorizon}`;
  const scenario = MATRIX_DATA[key] || DEFAULT_SCENARIO;

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
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '14px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxWidth: '720px' }}>
          <span
            className="mq-rise"
            style={{
              fontFamily: 'var(--font-ibm-plex-mono)',
              fontSize: '12px',
              letterSpacing: '0.12em',
              color: 'var(--blue-soft)',
              textTransform: 'uppercase',
            }}
          >
            REACTION EXPLORER
          </span>
          <h1
            className="mq-rise mq-d1"
            style={{
              margin: 0,
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: 'clamp(28px, 3.6vw, 40px)',
              letterSpacing: '-0.02em',
              color: 'var(--text)',
            }}
          >
            What usually happens after the news?
          </h1>
          <p style={{ margin: 0, color: 'var(--muted)', fontSize: '15px' }}>
            Filter by macroeconomic release and asset class to examine historical distribution, split cleanly by hotter and cooler outcomes.
          </p>
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
          Historical database · 2024–2026
        </span>
      </div>

      {/* Control Selector Filters */}
      <section
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--line)',
          borderRadius: 'var(--radius-card)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
        }}
      >
        {/* Events Selector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '13px', color: 'var(--muted)', fontFamily: 'var(--font-ibm-plex-mono)' }}>
            1. CHOOSE ECONOMIC RELEASE
          </span>
          <div role="group" aria-label="Event" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {events.map((ev) => {
              const isActive = selectedEvent === ev;
              return (
                <button
                  key={ev}
                  type="button"
                  onClick={() => setSelectedEvent(ev)}
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
                    transition: 'all 0.2s ease',
                  }}
                >
                  {ev}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
          {/* Market Selector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '13px', color: 'var(--muted)', fontFamily: 'var(--font-ibm-plex-mono)' }}>
              2. SELECT MARKET
            </span>
            <div role="group" aria-label="Market" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {assets.map((asset) => {
                const isActive = selectedAsset === asset;
                return (
                  <button
                    key={asset}
                    type="button"
                    onClick={() => setSelectedAsset(asset)}
                    style={{
                      minHeight: '38px',
                      padding: '0 14px',
                      borderRadius: 'var(--radius-chip)',
                      fontFamily: 'var(--font-ibm-plex-mono)',
                      fontSize: '13px',
                      border: isActive ? '1px solid var(--blue)' : '1px solid var(--line-strong)',
                      backgroundColor: isActive ? 'var(--button)' : 'transparent',
                      color: isActive ? '#FFFFFF' : 'var(--text)',
                      fontWeight: isActive ? 600 : 400,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {asset}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Horizon Selector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '13px', color: 'var(--muted)', fontFamily: 'var(--font-ibm-plex-mono)' }}>
              3. TIME HORIZON
            </span>
            <div role="group" aria-label="Time after release" style={{ display: 'flex', gap: '8px' }}>
              {horizons.map((hz) => {
                const isActive = selectedHorizon === hz;
                return (
                  <button
                    key={hz}
                    type="button"
                    onClick={() => setSelectedHorizon(hz)}
                    style={{
                      minHeight: '38px',
                      padding: '0 14px',
                      borderRadius: 'var(--radius-chip)',
                      fontFamily: 'var(--font-ibm-plex-mono)',
                      fontSize: '13px',
                      border: isActive ? '1px solid var(--amber)' : '1px solid var(--line-strong)',
                      backgroundColor: isActive ? 'var(--amber)' : 'transparent',
                      color: isActive ? '#1A1203' : 'var(--text)',
                      fontWeight: isActive ? 600 : 400,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {hz}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Grid: Hotter vs Cooler Outcomes */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Scenario 1: Hotter */}
        <section
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-card)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.4)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '22px', color: 'var(--text)' }}>
              {scenario.hotter.title}
            </h2>
            <span style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '12px', color: 'var(--muted)' }}>
              {scenario.hotter.sample}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
            <span style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '36px', fontWeight: 700, color: scenario.hotter.rosePct > 50 ? 'var(--up)' : 'var(--down)' }}>
              {scenario.hotter.rosePct}%
            </span>
            <span style={{ color: 'var(--muted)', fontSize: '15px' }}>{scenario.hotter.roseText}</span>
          </div>

          {/* Progress bar */}
          <div style={{ height: '8px', background: 'var(--surface-2)', borderRadius: '4px', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${scenario.hotter.rosePct}%`,
                backgroundColor: scenario.hotter.rosePct > 50 ? 'var(--up)' : 'var(--down)',
                borderRadius: '4px',
              }}
            />
          </div>

          {/* Dot distribution */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }} role="img" aria-label="Event outcome dots">
            {scenario.hotter.dots.map((isGreen, idx) => (
              <span
                key={idx}
                className="mq-pop"
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: isGreen ? 'var(--up)' : 'var(--down)',
                  display: 'inline-block',
                }}
              />
            ))}
          </div>

          {/* Metrics grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            <div style={{ background: 'var(--surface-2)', borderRadius: '10px', padding: '12px' }}>
              <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Average move</div>
              <div style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '18px', fontWeight: 600, color: 'var(--text)' }}>
                {scenario.hotter.avgMove}
              </div>
            </div>

            <div style={{ background: 'var(--surface-2)', borderRadius: '10px', padding: '12px' }}>
              <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Typical range</div>
              <div style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '18px', fontWeight: 600, color: 'var(--text)' }}>
                {scenario.hotter.typicalRange}
              </div>
            </div>
          </div>

          {scenario.hotter.isSmall && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--amber)' }}>
              <Warning size={16} weight="light" />
              Small sample: fewer than 10 recorded releases. Use with caution.
            </div>
          )}
        </section>

        {/* Scenario 2: Cooler */}
        <section
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-card)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.4)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '22px', color: 'var(--text)' }}>
              {scenario.cooler.title}
            </h2>
            <span style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '12px', color: 'var(--muted)' }}>
              {scenario.cooler.sample}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
            <span style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '36px', fontWeight: 700, color: scenario.cooler.rosePct > 50 ? 'var(--up)' : 'var(--down)' }}>
              {scenario.cooler.rosePct}%
            </span>
            <span style={{ color: 'var(--muted)', fontSize: '15px' }}>{scenario.cooler.roseText}</span>
          </div>

          {/* Progress bar */}
          <div style={{ height: '8px', background: 'var(--surface-2)', borderRadius: '4px', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${scenario.cooler.rosePct}%`,
                backgroundColor: scenario.cooler.rosePct > 50 ? 'var(--up)' : 'var(--down)',
                borderRadius: '4px',
              }}
            />
          </div>

          {/* Dot distribution */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }} role="img" aria-label="Event outcome dots">
            {scenario.cooler.dots.map((isGreen, idx) => (
              <span
                key={idx}
                className="mq-pop"
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: isGreen ? 'var(--up)' : 'var(--down)',
                  display: 'inline-block',
                }}
              />
            ))}
          </div>

          {/* Metrics grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            <div style={{ background: 'var(--surface-2)', borderRadius: '10px', padding: '12px' }}>
              <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Average move</div>
              <div style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '18px', fontWeight: 600, color: 'var(--text)' }}>
                {scenario.cooler.avgMove}
              </div>
            </div>

            <div style={{ background: 'var(--surface-2)', borderRadius: '10px', padding: '12px' }}>
              <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Typical range</div>
              <div style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '18px', fontWeight: 600, color: 'var(--text)' }}>
                {scenario.cooler.typicalRange}
              </div>
            </div>
          </div>

          {scenario.cooler.isSmall && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--amber)' }}>
              <Warning size={16} weight="light" />
              Small sample: fewer than 10 recorded releases. Use with caution.
            </div>
          )}
        </section>
      </div>

      {/* Simply Section */}
      <section
        style={{
          background: 'var(--surface-2)',
          borderRadius: '16px',
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          border: '1px solid var(--line-strong)',
        }}
      >
        <span style={{ color: 'var(--blue-soft)', fontWeight: 600, fontSize: '14px' }}>Simply:</span>
        <span style={{ fontSize: '16px', color: 'var(--text)', lineHeight: 1.5 }}>
          {scenario.simply}
        </span>
        <span style={{ fontSize: '12px', color: 'var(--dim)', marginTop: '4px' }}>
          History describes what happened before. It does not predict the next release, and it is not a trade signal.
        </span>
      </section>
    </div>
  );
}
