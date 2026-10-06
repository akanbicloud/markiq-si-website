'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  CaretLeft,
  CaretRight,
  Plus,
  Trash,
  ChartBar,
  CalendarCheck,
  TrendUp,
  TrendDown,
} from '@phosphor-icons/react';

interface Trade {
  iso: string;
  pair: string;
  dir: 'Buy' | 'Sell';
  setup: string;
  mistake: string;
  pips: number;
}

const DEFAULT_TRADES: Trade[] = [
  { iso: '2026-09-14', pair: 'EURUSD', dir: 'Buy', setup: 'Pullback', mistake: 'None', pips: 18 },
  { iso: '2026-09-16', pair: 'USDJPY', dir: 'Sell', setup: 'Breakout', mistake: 'Entered too early', pips: -10 },
  { iso: '2026-09-17', pair: 'GBPUSD', dir: 'Buy', setup: 'Range', mistake: 'None', pips: 9 },
  { iso: '2026-09-22', pair: 'EURUSD', dir: 'Buy', setup: 'Pullback', mistake: 'None', pips: 32 },
  { iso: '2026-09-23', pair: 'XAUUSD', dir: 'Sell', setup: 'Breakout', mistake: 'Entered too early', pips: -18 },
  { iso: '2026-09-23', pair: 'GBPUSD', dir: 'Buy', setup: 'Pullback', mistake: 'None', pips: 21 },
  { iso: '2026-09-24', pair: 'USDJPY', dir: 'Buy', setup: 'News', mistake: 'Traded the news spike', pips: -27 },
  { iso: '2026-09-25', pair: 'EURUSD', dir: 'Sell', setup: 'Range', mistake: 'None', pips: 14 },
  { iso: '2026-09-29', pair: 'XAUUSD', dir: 'Buy', setup: 'Pullback', mistake: 'None', pips: 40 },
  { iso: '2026-09-30', pair: 'GBPUSD', dir: 'Sell', setup: 'News', mistake: 'Traded the news spike', pips: -22 },
  { iso: '2026-10-01', pair: 'EURUSD', dir: 'Buy', setup: 'Breakout', mistake: 'Moved my stop', pips: -15 },
];

export default function JournalPage() {
  const [trades, setTrades] = useState<Trade[]>(DEFAULT_TRADES);
  const [showingExamples, setShowingExamples] = useState<boolean>(true);
  const [calDate, setCalDate] = useState<{ y: number; m: number }>({ y: 2026, m: 8 }); // September 2026 (0-indexed 8)

  // Form state
  const [pair, setPair] = useState('EURUSD');
  const [dir, setDir] = useState<'Buy' | 'Sell'>('Buy');
  const [setup, setSetup] = useState('Pullback');
  const [mistake, setMistake] = useState('None');
  const [pipsInput, setPipsInput] = useState('');
  const [formError, setFormError] = useState(false);

  // Statistics calculation
  const stats = useMemo(() => {
    const n = trades.length;
    const wins = trades.filter((t) => t.pips > 0);
    const losses = trades.filter((t) => t.pips <= 0);
    const totalPips = trades.reduce((sum, t) => sum + t.pips, 0);
    const winRate = n ? Math.round((wins.length / n) * 100) : 0;
    const avgWin = wins.length ? wins.reduce((s, t) => s + t.pips, 0) / wins.length : 0;
    const avgLoss = losses.length ? Math.abs(losses.reduce((s, t) => s + t.pips, 0) / losses.length) : 0;
    const profitFactor = avgLoss > 0 ? (avgWin * wins.length) / (avgLoss * losses.length) : wins.length ? 99 : 0;

    return {
      n,
      winRate,
      avgWin: avgWin.toFixed(1),
      avgLoss: avgLoss.toFixed(1),
      totalPips: (totalPips > 0 ? '+' : '') + totalPips.toFixed(1),
      isProfitable: totalPips >= 0,
      profitFactor: profitFactor.toFixed(2),
    };
  }, [trades]);

  // Handle Trade Addition
  const handleAddTrade = (e: React.FormEvent) => {
    e.preventDefault();
    const pipsNum = parseFloat(pipsInput);
    if (isNaN(pipsNum)) {
      setFormError(true);
      return;
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const newTrade: Trade = {
      iso: todayStr,
      pair,
      dir,
      setup,
      mistake,
      pips: pipsNum,
    };

    setTrades([newTrade, ...trades]);
    setPipsInput('');
    setFormError(false);
  };

  const handleClearExamples = () => {
    setTrades([]);
    setShowingExamples(false);
  };

  // Calendar calculations
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentMonthLabel = `${monthNames[calDate.m]} ${calDate.y}`;

  const prevMonth = () => {
    setCalDate((prev) => {
      if (prev.m === 0) return { y: prev.y - 1, m: 11 };
      return { y: prev.y, m: prev.m - 1 };
    });
  };

  const nextMonth = () => {
    setCalDate((prev) => {
      if (prev.m === 11) return { y: prev.y + 1, m: 0 };
      return { y: prev.y, m: prev.m + 1 };
    });
  };

  // Build Calendar Matrix for calDate (Mon-Sun + Weekly total)
  const firstDay = new Date(calDate.y, calDate.m, 1);
  const daysInMonth = new Date(calDate.y, calDate.m + 1, 0).getDate();
  const startingDayOfWeek = (firstDay.getDay() + 6) % 7; // Monday = 0

  // Filter trades for this month
  const monthTrades = trades.filter((t) => {
    const d = new Date(t.iso);
    return d.getFullYear() === calDate.y && d.getMonth() === calDate.m;
  });

  const greenDaysCount = useMemo(() => {
    const dailyTotals: Record<number, number> = {};
    monthTrades.forEach((t) => {
      const day = new Date(t.iso).getDate();
      dailyTotals[day] = (dailyTotals[day] || 0) + t.pips;
    });
    return Object.values(dailyTotals).filter((p) => p > 0).length;
  }, [monthTrades]);

  const redDaysCount = useMemo(() => {
    const dailyTotals: Record<number, number> = {};
    monthTrades.forEach((t) => {
      const day = new Date(t.iso).getDate();
      dailyTotals[day] = (dailyTotals[day] || 0) + t.pips;
    });
    return Object.values(dailyTotals).filter((p) => p < 0).length;
  }, [monthTrades]);

  const monthNetPips = monthTrades.reduce((sum, t) => sum + t.pips, 0);

  // Auto Review Insights
  const insights = useMemo(() => {
    const list: string[] = [];
    if (!trades.length) return ['Log trades to unlock your personalized automatic journal insights.'];

    // Group by setup
    const setupTotals: Record<string, number> = {};
    trades.forEach((t) => {
      setupTotals[t.setup] = (setupTotals[t.setup] || 0) + t.pips;
    });
    const bestSetup = Object.keys(setupTotals).sort((a, b) => setupTotals[b] - setupTotals[a])[0];
    if (bestSetup && setupTotals[bestSetup] > 0) {
      list.push(`Your highest-performing setup is ${bestSetup} (+${setupTotals[bestSetup]} pips).`);
    }

    // Mistake impact
    const mistakeTrades = trades.filter((t) => t.mistake !== 'None');
    if (mistakeTrades.length > 0) {
      const mistakeLost = Math.abs(mistakeTrades.filter((t) => t.pips < 0).reduce((s, t) => s + t.pips, 0));
      list.push(`Disciplined rule adherence: eliminating execution mistakes would have saved ${mistakeLost} pips.`);
    }

    list.push('Weekend pause rule: keeping trading paused outside Sydney/London/NY liquid windows preserves edge.');
    return list;
  }, [trades]);

  return (
    <div
      style={{
        maxWidth: '1240px',
        margin: '0 auto',
        padding: 'clamp(40px, 6vw, 80px) 16px',
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
      }}
    >
      {/* Page Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div
            className="mq-rise"
            style={{
              fontFamily: 'var(--font-ibm-plex-mono)',
              fontSize: '12px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--blue-soft)',
            }}
          >
            TRADING JOURNAL
          </div>
          <h1
            className="mq-rise mq-d1"
            style={{
              margin: 0,
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: 'clamp(30px, 4vw, 44px)',
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
              color: 'var(--text)',
            }}
          >
            Every trade, honestly recorded.
          </h1>
          <p style={{ margin: 0, color: 'var(--muted)', fontSize: 'clamp(15px, 2vw, 17px)', maxWidth: '640px' }}>
            Log your trades, tag your setups and execution mistakes, and let your own numbers show you what works.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
          {showingExamples && (
            <>
              <span
                style={{
                  fontSize: '12px',
                  color: '#1A1203',
                  background: 'var(--amber)',
                  padding: '4px 12px',
                  borderRadius: '999px',
                  fontWeight: 600,
                }}
              >
                Showing example trades
              </span>
              <button
                type="button"
                onClick={handleClearExamples}
                style={{
                  minHeight: '40px',
                  padding: '0 16px',
                  borderRadius: '10px',
                  border: '1px solid var(--line-strong)',
                  background: 'transparent',
                  color: 'var(--text)',
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                Clear examples
              </button>
            </>
          )}
          <span
            style={{
              fontSize: '13px',
              color: 'var(--dim)',
              border: '1px solid var(--line-strong)',
              borderRadius: '10px',
              padding: '8px 14px',
            }}
          >
            MT5 Auto-sync · coming soon
          </span>
        </div>
      </div>

      {/* Statistics Row */}
      <section
        aria-label="Your statistics"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '14px',
        }}
      >
        <div
          className="mq-lift"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: '14px',
            padding: '18px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          <span style={{ fontSize: '13px', color: 'var(--muted)' }}>Trades logged</span>
          <span style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '26px', fontWeight: 600, color: 'var(--text)' }}>
            {stats.n}
          </span>
        </div>

        <div
          className="mq-lift"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: '14px',
            padding: '18px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          <span style={{ fontSize: '13px', color: 'var(--muted)' }}>Win rate</span>
          <span style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '26px', fontWeight: 600, color: 'var(--text)' }}>
            {stats.winRate}%
          </span>
        </div>

        <div
          className="mq-lift"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: '14px',
            padding: '18px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          <span style={{ fontSize: '13px', color: 'var(--muted)' }}>Average win</span>
          <span style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '26px', fontWeight: 600, color: 'var(--up)' }}>
            +{stats.avgWin} pips
          </span>
        </div>

        <div
          className="mq-lift"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: '14px',
            padding: '18px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          <span style={{ fontSize: '13px', color: 'var(--muted)' }}>Average loss</span>
          <span style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '26px', fontWeight: 600, color: 'var(--down)' }}>
            -{stats.avgLoss} pips
          </span>
        </div>

        <div
          className="mq-lift"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: '14px',
            padding: '18px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          <span style={{ fontSize: '13px', color: 'var(--muted)' }}>Net pips</span>
          <span
            style={{
              fontFamily: 'var(--font-ibm-plex-mono)',
              fontSize: '26px',
              fontWeight: 600,
              color: stats.isProfitable ? 'var(--up)' : 'var(--down)',
            }}
          >
            {stats.totalPips}
          </span>
        </div>
      </section>

      {/* Main Grid: Calendar & Trade Chart + Trade Logger Side */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'flex-start' }}>
        {/* Left Column: Calendar & Trade Chart & Log */}
        <div style={{ flex: '999 1 640px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* P&L Calendar */}
          <section
            aria-label="P&L calendar"
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  type="button"
                  onClick={prevMonth}
                  aria-label="Previous month"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '8px',
                    border: '1px solid var(--line-strong)',
                    background: 'transparent',
                    color: 'var(--text)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <CaretLeft size={16} />
                </button>
                <h2 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '19px', minWidth: '160px', textAlign: 'center' }}>
                  {currentMonthLabel}
                </h2>
                <button
                  type="button"
                  onClick={nextMonth}
                  aria-label="Next month"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '8px',
                    border: '1px solid var(--line-strong)',
                    background: 'transparent',
                    color: 'var(--text)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <CaretRight size={16} />
                </button>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 18px', fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '13px' }}>
                <span style={{ color: 'var(--muted)' }}>
                  Month Net:{' '}
                  <span style={{ color: monthNetPips >= 0 ? 'var(--up)' : 'var(--down)', fontWeight: 600 }}>
                    {monthNetPips >= 0 ? '+' : ''}{monthNetPips} pips
                  </span>
                </span>
                <span>
                  <strong style={{ color: 'var(--up)' }}>{greenDaysCount}</strong> green days
                </span>
                <span>
                  <strong style={{ color: 'var(--down)' }}>{redDaysCount}</strong> red days
                </span>
              </div>
            </div>

            {/* Calendar Days Matrix */}
            <div style={{ overflowX: 'auto', width: '100%' }}>
              <div style={{ minWidth: '600px', display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '6px' }}>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Week Net'].map((w) => (
                  <div key={w} style={{ fontSize: '12px', color: 'var(--dim)', textAlign: 'center', paddingBottom: '4px' }}>
                    {w}
                  </div>
                ))}

                {/* Blank days before start of month */}
                {Array.from({ length: startingDayOfWeek }).map((_, i) => (
                  <div key={`empty-${i}`} style={{ height: '70px', borderRadius: '8px', opacity: 0.2 }} />
                ))}

                {/* Actual Month Days */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const dayNum = i + 1;
                  const dateStr = `${calDate.y}-${String(calDate.m + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
                  const dayTrades = trades.filter((t) => t.iso === dateStr);
                  const pnl = dayTrades.reduce((s, t) => s + t.pips, 0);
                  const hasTrades = dayTrades.length > 0;

                  let cellBg = 'var(--surface-2)';
                  let border = '1px solid var(--line)';
                  if (hasTrades) {
                    if (pnl > 0) {
                      cellBg = 'rgba(61, 220, 151, 0.15)';
                      border = '1px solid var(--up)';
                    } else {
                      cellBg = 'rgba(255, 138, 91, 0.15)';
                      border = '1px solid var(--down)';
                    }
                  }

                  return (
                    <div
                      key={`day-${dayNum}`}
                      style={{
                        height: '70px',
                        background: cellBg,
                        border,
                        borderRadius: '8px',
                        padding: '6px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span style={{ fontSize: '11px', color: 'var(--dim)', fontFamily: 'var(--font-ibm-plex-mono)' }}>
                        {dayNum}
                      </span>
                      {hasTrades ? (
                        <>
                          <span
                            style={{
                              fontFamily: 'var(--font-ibm-plex-mono)',
                              fontSize: '12px',
                              fontWeight: 600,
                              color: pnl > 0 ? 'var(--up)' : 'var(--down)',
                            }}
                          >
                            {pnl > 0 ? '+' : ''}{pnl}
                          </span>
                          <span style={{ fontSize: '10px', color: 'var(--muted)' }}>
                            {dayTrades.length} {dayTrades.length === 1 ? 'trade' : 'trades'}
                          </span>
                        </>
                      ) : (
                        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.1)' }}>—</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Trade by Trade Chart */}
          <section
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius-card)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '20px', color: 'var(--text)' }}>
                Trade by trade distribution
              </h2>
              <span style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '13px', color: 'var(--muted)' }}>
                Running total: {stats.totalPips} pips
              </span>
            </div>

            <div
              style={{
                position: 'relative',
                height: '160px',
                display: 'flex',
                alignItems: 'stretch',
                gap: '8px',
                borderTop: '1px solid var(--line)',
                borderBottom: '1px solid var(--line)',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: '80px',
                  height: '1px',
                  backgroundColor: 'var(--line-strong)',
                }}
              />

              {trades.map((t, idx) => {
                const isWin = t.pips > 0;
                const h = Math.min(70, Math.max(10, Math.abs(t.pips) * 1.6));
                return (
                  <div key={idx} style={{ flex: 1, position: 'relative' }}>
                    <div
                      style={{
                        position: 'absolute',
                        left: '10%',
                        right: '10%',
                        bottom: isWin ? '80px' : undefined,
                        top: isWin ? undefined : '80px',
                        height: `${h}px`,
                        backgroundColor: isWin ? 'var(--up)' : 'var(--down)',
                        borderRadius: isWin ? '3px 3px 0 0' : '0 0 3px 3px',
                      }}
                      title={`${t.pair} (${t.dir}): ${t.pips > 0 ? '+' : ''}${t.pips} pips`}
                    />
                  </div>
                );
              })}
            </div>
          </section>

          {/* Trades Table */}
          <section
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius-card)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            <h2 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '20px', color: 'var(--text)' }}>
              Trade history
            </h2>

            <div style={{ overflowX: 'auto', width: '100%' }}>
              <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
                  <tr style={{ textAlign: 'left', color: 'var(--muted)' }}>
                    <th style={{ padding: '10px 8px', fontWeight: 500, borderBottom: '1px solid var(--line)' }}>Date</th>
                    <th style={{ padding: '10px 8px', fontWeight: 500, borderBottom: '1px solid var(--line)' }}>Market</th>
                    <th style={{ padding: '10px 8px', fontWeight: 500, borderBottom: '1px solid var(--line)' }}>Side</th>
                    <th style={{ padding: '10px 8px', fontWeight: 500, borderBottom: '1px solid var(--line)' }}>Setup</th>
                    <th style={{ padding: '10px 8px', fontWeight: 500, borderBottom: '1px solid var(--line)' }}>Mistake</th>
                    <th style={{ padding: '10px 8px', fontWeight: 500, borderBottom: '1px solid var(--line)', textAlign: 'right' }}>Result (pips)</th>
                  </tr>
                </thead>
                <tbody>
                  {trades.map((t, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid rgba(18, 38, 74, 0.6)' }}>
                      <td style={{ padding: '10px 8px', fontFamily: 'var(--font-ibm-plex-mono)', color: 'var(--muted)' }}>{t.iso}</td>
                      <td style={{ padding: '10px 8px', fontFamily: 'var(--font-ibm-plex-mono)', fontWeight: 600 }}>{t.pair}</td>
                      <td style={{ padding: '10px 8px', color: t.dir === 'Buy' ? 'var(--up)' : 'var(--down)' }}>{t.dir}</td>
                      <td style={{ padding: '10px 8px', color: 'var(--text)' }}>{t.setup}</td>
                      <td style={{ padding: '10px 8px', color: t.mistake !== 'None' ? 'var(--amber)' : 'var(--dim)' }}>{t.mistake}</td>
                      <td
                        style={{
                          padding: '10px 8px',
                          textAlign: 'right',
                          fontFamily: 'var(--font-ibm-plex-mono)',
                          fontWeight: 600,
                          color: t.pips >= 0 ? 'var(--up)' : 'var(--down)',
                        }}
                      >
                        {t.pips >= 0 ? '+' : ''}{t.pips}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Right Column: Log a Trade Form & Auto Review */}
        <aside style={{ flex: '1 1 340px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Log Trade Form Card */}
          <section
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--line-strong)',
              borderRadius: 'var(--radius-card)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            <h2 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '20px', color: 'var(--text)' }}>
              Log a trade
            </h2>

            <form onSubmit={handleAddTrade} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label htmlFor="j-pair" style={{ fontSize: '13px', color: 'var(--muted)' }}>Market</label>
                  <select
                    id="j-pair"
                    value={pair}
                    onChange={(e) => setPair(e.target.value)}
                    style={{
                      minHeight: '44px',
                      padding: '0 10px',
                      borderRadius: '10px',
                      border: '1px solid var(--line-strong)',
                      backgroundColor: 'var(--bg)',
                      color: 'var(--text)',
                      fontFamily: 'inherit',
                      fontSize: '14px',
                    }}
                  >
                    <option>EURUSD</option>
                    <option>GBPUSD</option>
                    <option>USDJPY</option>
                    <option>USDZAR</option>
                    <option>XAUUSD</option>
                    <option>USOIL</option>
                    <option>US500</option>
                    <option>BTCUSD</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label htmlFor="j-dir" style={{ fontSize: '13px', color: 'var(--muted)' }}>Side</label>
                  <select
                    id="j-dir"
                    value={dir}
                    onChange={(e) => setDir(e.target.value as 'Buy' | 'Sell')}
                    style={{
                      minHeight: '44px',
                      padding: '0 10px',
                      borderRadius: '10px',
                      border: '1px solid var(--line-strong)',
                      backgroundColor: 'var(--bg)',
                      color: 'var(--text)',
                      fontFamily: 'inherit',
                      fontSize: '14px',
                    }}
                  >
                    <option>Buy</option>
                    <option>Sell</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label htmlFor="j-setup" style={{ fontSize: '13px', color: 'var(--muted)' }}>Setup</label>
                  <select
                    id="j-setup"
                    value={setup}
                    onChange={(e) => setSetup(e.target.value)}
                    style={{
                      minHeight: '44px',
                      padding: '0 10px',
                      borderRadius: '10px',
                      border: '1px solid var(--line-strong)',
                      backgroundColor: 'var(--bg)',
                      color: 'var(--text)',
                      fontFamily: 'inherit',
                      fontSize: '14px',
                    }}
                  >
                    <option>Breakout</option>
                    <option>Pullback</option>
                    <option>Range</option>
                    <option>News</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label htmlFor="j-pips" style={{ fontSize: '13px', color: 'var(--muted)' }}>Result (pips)</label>
                  <input
                    id="j-pips"
                    type="number"
                    step="0.1"
                    required
                    value={pipsInput}
                    onChange={(e) => {
                      setPipsInput(e.target.value);
                      setFormError(false);
                    }}
                    placeholder="+25 or -12"
                    style={{
                      minHeight: '44px',
                      padding: '0 10px',
                      borderRadius: '10px',
                      border: formError ? '1px solid var(--down)' : '1px solid var(--line-strong)',
                      backgroundColor: 'var(--bg)',
                      color: 'var(--text)',
                      fontFamily: 'inherit',
                      fontSize: '14px',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label htmlFor="j-mistake" style={{ fontSize: '13px', color: 'var(--muted)' }}>Mistake tag</label>
                <select
                  id="j-mistake"
                  value={mistake}
                  onChange={(e) => setMistake(e.target.value)}
                  style={{
                    minHeight: '44px',
                    padding: '0 10px',
                    borderRadius: '10px',
                    border: '1px solid var(--line-strong)',
                    backgroundColor: 'var(--bg)',
                    color: 'var(--text)',
                    fontFamily: 'inherit',
                    fontSize: '14px',
                  }}
                >
                  <option>None</option>
                  <option>Entered too early</option>
                  <option>Moved my stop</option>
                  <option>Traded the news spike</option>
                  <option>Too large a position</option>
                  <option>Revenge trade</option>
                </select>
              </div>

              <button
                type="submit"
                className="mq-btn"
                style={{
                  minHeight: '48px',
                  borderRadius: '12px',
                  border: 'none',
                  backgroundColor: 'var(--amber)',
                  color: '#1A1203',
                  fontWeight: 600,
                  fontSize: '15px',
                  cursor: 'pointer',
                  marginTop: '6px',
                }}
              >
                Add trade to journal
              </button>
            </form>
          </section>

          {/* Auto Review Insights */}
          <section
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius-card)',
              padding: '22px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '18px', color: 'var(--text)' }}>
                What your journal says
              </h2>
              <span style={{ fontSize: '11px', color: 'var(--blue-soft)', border: '1px solid var(--line-strong)', padding: '2px 8px', borderRadius: '999px' }}>
                Auto review
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {insights.map((insight, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '8px', fontSize: '14px', color: 'var(--text)', lineHeight: 1.5 }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--amber)', marginTop: '8px', flexShrink: 0 }} />
                  <span>{insight}</span>
                </div>
              ))}
            </div>

            <p style={{ margin: '6px 0 0', fontSize: '12px', color: 'var(--dim)', lineHeight: 1.4 }}>
              Calculated dynamically from your recorded trades. Real statistics replace emotional speculation.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
