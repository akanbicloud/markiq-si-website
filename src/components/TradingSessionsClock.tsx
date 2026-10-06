'use client';

import React, { useState, useEffect } from 'react';

interface SessionDef {
  city: string;
  tz: string;
  open: number;
  close: number;
}

const SESSIONS_DEF: SessionDef[] = [
  { city: 'Sydney', tz: 'Australia/Sydney', open: 7, close: 16 },
  { city: 'Tokyo', tz: 'Asia/Tokyo', open: 9, close: 18 },
  { city: 'London', tz: 'Europe/London', open: 8, close: 17 },
  { city: 'New York', tz: 'America/New_York', open: 8, close: 17 },
];

function getTzOffsetHours(tz: string, now: number): number {
  try {
    const parts: Record<string, string> = {};
    new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      hourCycle: 'h23',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
      .formatToParts(new Date(now))
      .forEach((p) => {
        parts[p.type] = p.value;
      });
    const asUtc = Date.UTC(
      +parts.year,
      +parts.month - 1,
      +parts.day,
      +parts.hour % 24,
      +parts.minute
    );
    return Math.round((asUtc - now) / 900000) / 4;
  } catch {
    return 0;
  }
}

export default function TradingSessionsClock() {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState<number>(Date.now());

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setNow(Date.now()), 15000);
    return () => clearInterval(timer);
  }, []);

  const d = new Date(now);
  const gmtH = d.getUTCHours() + d.getUTCMinutes() / 60;
  const watH = (gmtH + 1) % 24;

  const pad = (n: number) => String(n).padStart(2, '0');
  const hm = (h: number) => {
    const x = ((h % 24) + 24) % 24;
    return `${pad(Math.floor(x))}:${pad(Math.round((x % 1) * 60) % 60)}`;
  };

  const spans: Record<string, [number, number]> = {};
  const rows = SESSIONS_DEF.map((s) => {
    const off = mounted ? getTzOffsetHours(s.tz, now) : (s.city === 'Sydney' ? 11 : s.city === 'Tokyo' ? 9 : s.city === 'London' ? 1 : -4);
    const start = (((s.open - off + 1) % 24) + 24) % 24;
    const end = start + (s.close - s.open);
    spans[s.city] = [start, end];

    const isOpen = (watH >= start && watH < end) || (end > 24 && watH < end - 24);
    const isMajor = s.city === 'London' || s.city === 'New York';
    const bgGradient = isMajor
      ? 'linear-gradient(90deg, #1F6FE5, #4A9DFF)'
      : 'linear-gradient(90deg, #173C78, #2B5FAE)';

    const segments: Array<{ left: number; width: number; bg: string }> = [];
    if (end <= 24) {
      segments.push({ left: (start / 24) * 100, width: ((end - start) / 24) * 100, bg: bgGradient });
    } else {
      segments.push({ left: (start / 24) * 100, width: ((24 - start) / 24) * 100, bg: bgGradient });
      segments.push({ left: 0, width: ((end - 24) / 24) * 100, bg: bgGradient });
    }

    return {
      city: s.city,
      hours: `${hm(start)}–${hm(end)} WAT`,
      segments,
      isOpen,
      start,
      end,
    };
  });

  const watDay = new Date(now + 3600000).getUTCDay();
  const syd = spans['Sydney'] ? spans['Sydney'][0] : 22;
  const nyEnd = spans['New York'] ? spans['New York'][1] : 22;
  const isWeekend = watDay === 6 || (watDay === 0 && watH < syd) || (watDay === 5 && watH >= nyEnd);

  // Overlap calculation
  const L = spans['London'] || [8, 17];
  const N = spans['New York'] || [13, 22];
  const oa = Math.max(L[0], N[0]);
  const ob = Math.min(L[1], N[1]);
  const hasOverlap = ob > oa;

  const overlapMessage = isWeekend
    ? `Weekend: markets are closed. They reopen Sunday at ${hm(syd)} WAT with Sydney.`
    : hasOverlap
    ? `Busiest window: London and New York overlap, ${hm(oa)}–${hm(ob)} WAT (${hm(oa - 1)}–${hm(ob - 1)} GMT)`
    : 'London and New York do not overlap today';

  const ticks = [0, 6, 12, 18, 24].map((h) => ({
    label: `${pad(h === 24 ? 24 : h)}:00`,
    pct: (h / 24) * 100,
  }));

  return (
    <div
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--line)',
        borderRadius: 'var(--radius-card)',
        padding: 'clamp(18px, 3vw, 28px)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Top Header info */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: isWeekend ? 'var(--dim)' : 'var(--up)',
              display: 'inline-block',
            }}
            className={isWeekend ? '' : 'mq-pulse'}
          />
          <span
            style={{
              fontFamily: 'var(--font-ibm-plex-mono)',
              fontSize: '12px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--blue-soft)',
            }}
          >
            {isWeekend ? 'MARKETS WEEKEND PAUSE' : 'LIVE MARKET HOURS'}
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '12px',
            fontFamily: 'var(--font-ibm-plex-mono)',
          }}
        >
          <div style={{ fontSize: 'clamp(18px, 3vw, 22px)', fontWeight: 600, color: 'var(--text)' }}>
            {mounted ? hm(watH) : '--:--'} <span style={{ fontSize: '13px', color: 'var(--blue-soft)', fontWeight: 500 }}>WAT</span>
          </div>
          <div style={{ fontSize: '13px', color: 'var(--dim)' }}>
            {mounted ? hm(gmtH) : '--:--'} GMT
          </div>
        </div>
      </div>

      {/* Timeline scale header */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          paddingRight: '72px',
        }}
        className="clock-row-scale"
      >
        <div style={{ width: '110px', flexShrink: 0 }} />
        <div style={{ flex: 1, position: 'relative', height: '18px' }}>
          {ticks.map((t, idx) => (
            <span
              key={idx}
              style={{
                position: 'absolute',
                top: 0,
                left: `${t.pct}%`,
                transform: idx === 0 ? 'none' : idx === 4 ? 'translateX(-100%)' : 'translateX(-50%)',
                fontFamily: 'var(--font-ibm-plex-mono)',
                fontSize: '11px',
                color: 'var(--dim)',
              }}
            >
              {t.label}
            </span>
          ))}
        </div>
      </div>

      {/* Sessions Bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {rows.map((row) => {
          const effectiveOpen = !isWeekend && row.isOpen;
          return (
            <div
              key={row.city}
              style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
              }}
              className="clock-session-item"
            >
              {/* City + hours */}
              <div
                style={{
                  width: '110px',
                  flexShrink: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  lineHeight: 1.25,
                }}
              >
                <span style={{ fontWeight: 600, fontSize: '15px', color: 'var(--text)' }}>
                  {row.city}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-ibm-plex-mono)',
                    fontSize: '11px',
                    color: 'var(--dim)',
                  }}
                >
                  {row.hours}
                </span>
              </div>

              {/* Progress bar container */}
              <div
                style={{
                  flex: 1,
                  position: 'relative',
                  height: '28px',
                  backgroundColor: 'var(--surface-2)',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  border: '1px solid rgba(28, 53, 99, 0.4)',
                }}
              >
                {/* Session span bars */}
                {row.segments.map((seg, idx) => (
                  <span
                    key={idx}
                    style={{
                      position: 'absolute',
                      top: '4px',
                      bottom: '4px',
                      borderRadius: '4px',
                      left: `${seg.left}%`,
                      width: `${seg.width}%`,
                      background: seg.bg,
                    }}
                  />
                ))}

                {/* Overlap golden tint on London / NY */}
                {(row.city === 'London' || row.city === 'New York') && hasOverlap && !isWeekend && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '4px',
                      bottom: '4px',
                      borderRadius: '4px',
                      left: `${(oa / 24) * 100}%`,
                      width: `${((ob - oa) / 24) * 100}%`,
                      backgroundColor: 'var(--amber)',
                      opacity: 0.9,
                    }}
                    title="London & New York Overlap"
                  />
                )}

                {/* White line indicator for 'Now' */}
                {mounted && (
                  <span
                    style={{
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      width: '2px',
                      backgroundColor: 'var(--text)',
                      boxShadow: '0 0 8px rgba(234, 241, 255, 0.9)',
                      left: `calc(${(watH / 24) * 100}% - 1px)`,
                      zIndex: 3,
                    }}
                  />
                )}
              </div>

              {/* Status Badge */}
              <div style={{ width: '64px', flexShrink: 0, textAlign: 'center' }}>
                <span
                  style={{
                    display: 'inline-block',
                    width: '100%',
                    padding: '3px 0',
                    borderRadius: 'var(--radius-chip)',
                    fontSize: '11px',
                    fontWeight: 600,
                    backgroundColor: effectiveOpen ? 'var(--up)' : 'transparent',
                    color: effectiveOpen ? '#04130C' : 'var(--dim)',
                    border: effectiveOpen ? 'none' : '1px solid var(--line-strong)',
                  }}
                >
                  {effectiveOpen ? 'Open' : 'Closed'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend & Overlap note */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px 24px',
          paddingTop: '12px',
          borderTop: '1px solid var(--line)',
          fontSize: '13px',
          color: 'var(--muted)',
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <span
            aria-hidden="true"
            style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'var(--amber)' }}
          />
          {overlapMessage}
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <span
            aria-hidden="true"
            style={{ width: '2px', height: '14px', background: 'var(--text)' }}
          />
          The white line is current time (WAT)
        </span>
      </div>
    </div>
  );
}
