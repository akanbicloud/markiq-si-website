'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Crosshair,
  TrendUp,
  ArrowsHorizontal,
  Square,
  TextT,
  Ruler,
  Play,
  Pause,
  ArrowCounterClockwise,
  CaretLeft,
  CaretRight,
  Info,
  Scales,
  ChartLineUp,
  CheckCircle,
  PencilSimple,
} from '@phosphor-icons/react';

interface AssetDef {
  id: string;
  name: string;
  base: number;
  vol: number;
  dp: number;
}

const ASSET_DEFS: AssetDef[] = [
  { id: 'EURUSD', name: 'Euro / US Dollar', base: 1.085, vol: 0.0011, dp: 5 },
  { id: 'GBPUSD', name: 'British Pound / US Dollar', base: 1.27, vol: 0.0014, dp: 5 },
  { id: 'USDJPY', name: 'US Dollar / Japanese Yen', base: 149.5, vol: 0.17, dp: 3 },
  { id: 'USDZAR', name: 'US Dollar / South African Rand', base: 18.2, vol: 0.05, dp: 4 },
  { id: 'XAUUSD', name: 'Spot Gold / US Dollar', base: 2650.0, vol: 6.5, dp: 2 },
  { id: 'USOIL', name: 'WTI Crude Oil', base: 74.2, vol: 0.4, dp: 2 },
  { id: 'US500', name: 'S&P 500 Index', base: 5740.0, vol: 8.5, dp: 1 },
  { id: 'BTCUSD', name: 'Bitcoin / US Dollar', base: 63500.0, vol: 520, dp: 0 },
];

interface Candle {
  open: number;
  high: number;
  low: number;
  close: number;
}

function generateCandles(def: AssetDef, tf: string): Candle[] {
  const N = 80;
  let seed = 0;
  const key = def.id + tf;
  for (let i = 0; i < key.length; i++) {
    seed = (seed * 31 + key.charCodeAt(i)) % 233280;
  }
  const rnd = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  const out: Candle[] = [];
  let close = def.base;

  for (let i = 0; i < N; i++) {
    const open = close;
    const drift = Math.sin(i / 9) * def.vol * 0.4;
    close = open + (rnd() - 0.49) * def.vol * 2.2 + drift;
    const high = Math.max(open, close) + rnd() * def.vol * 0.8;
    const low = Math.min(open, close) - rnd() * def.vol * 0.8;
    out.push({ open, high, low, close });
  }
  return out;
}

interface Note {
  id: string;
  where: string;
  text: string;
  time: string;
}

type ToolType = 'Crosshair' | 'Trend line' | 'Horizontal line' | 'Rectangle' | 'Text note' | 'Measure';

export default function ChartLabPage() {
  const [selectedAsset, setSelectedAsset] = useState<string>('EURUSD');
  const [selectedTf, setSelectedTf] = useState<string>('H1');
  const [visibleCount, setVisibleCount] = useState<number>(55);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(350);
  const [activeTool, setActiveTool] = useState<ToolType>('Crosshair');
  const [noteDraft, setNoteDraft] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);
  const [backtestRan, setBacktestRan] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState('EMA crossover (from Strategy Lab)');
  const [hoverCoord, setHoverCoord] = useState<{ x: number; y: number } | null>(null);
  const [drawnLines, setDrawnLines] = useState<number[]>([]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const def = ASSET_DEFS.find((d) => d.id === selectedAsset) || ASSET_DEFS[0];
  const allCandles = React.useMemo(() => generateCandles(def, selectedTf), [def, selectedTf]);
  const N = allCandles.length;
  const currentVisible = Math.min(visibleCount, N);

  // Playback loop
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setVisibleCount((prev) => {
          if (prev >= N) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, playbackSpeed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed, N]);

  const handleAssetChange = (assetId: string) => {
    setIsPlaying(false);
    setSelectedAsset(assetId);
    setVisibleCount(55);
    setDrawnLines([]);
  };

  const handleTfChange = (tf: string) => {
    setIsPlaying(false);
    setSelectedTf(tf);
    setVisibleCount(55);
    setDrawnLines([]);
  };

  const handleResetReplay = () => {
    setIsPlaying(false);
    setVisibleCount(20);
  };

  const handleStepBack = () => {
    setIsPlaying(false);
    setVisibleCount((prev) => Math.max(10, prev - 1));
  };

  const handleStepForward = () => {
    setVisibleCount((prev) => Math.min(N, prev + 1));
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteDraft.trim()) return;

    const newNote: Note = {
      id: 'note_' + Date.now(),
      where: `${def.id} (${selectedTf}) · bar ${currentVisible}`,
      text: noteDraft.trim(),
      time: 'Just now',
    };

    setNotes([newNote, ...notes]);
    setNoteDraft('');
  };

  // Dimensions & scale math
  const H = 440;
  const pad = 24;
  let maxPrice = -Infinity;
  let minPrice = Infinity;

  const visibleSlice = allCandles.slice(0, currentVisible);
  allCandles.forEach((c) => {
    if (c.high > maxPrice) maxPrice = c.high;
    if (c.low < minPrice) minPrice = c.low;
  });

  const priceRange = Math.max(0.00001, maxPrice - minPrice);
  const getY = (p: number) => pad + ((maxPrice - p) / priceRange) * (H - pad * 2);
  const fmt = (p: number) => p.toFixed(def.dp);

  const lastCandle = visibleSlice[visibleSlice.length - 1] || allCandles[0];
  const isLastUp = lastCandle.close >= lastCandle.open;
  const lastColor = isLastUp ? 'var(--up)' : 'var(--down)';

  const gridLevels = [0, 1, 2, 3, 4].map((k) => maxPrice - (priceRange * k) / 4);

  const candleWidthPct = 100 / N;

  const handleChartClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relativeY = e.clientY - rect.top;
    if (activeTool === 'Horizontal line') {
      setDrawnLines((prev) => [...prev, relativeY]);
    }
  };

  const toolsList: { id: ToolType; label: string; icon: React.ReactNode }[] = [
    { id: 'Crosshair', label: 'Crosshair', icon: <Crosshair size={20} weight="light" /> },
    { id: 'Trend line', label: 'Trend line', icon: <TrendUp size={20} weight="light" /> },
    { id: 'Horizontal line', label: 'Horizontal line', icon: <ArrowsHorizontal size={20} weight="light" /> },
    { id: 'Rectangle', label: 'Rectangle', icon: <Square size={20} weight="light" /> },
    { id: 'Text note', label: 'Text note', icon: <TextT size={20} weight="light" /> },
    { id: 'Measure', label: 'Measure range', icon: <Ruler size={20} weight="light" /> },
  ];

  return (
    <div
      style={{
        padding: '24px clamp(16px, 3vw, 40px) 80px',
        maxWidth: '1440px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      {/* Top Banner / Breadcrumb */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-ibm-plex-mono)',
              fontSize: '12px',
              letterSpacing: '0.12em',
              color: 'var(--blue-soft)',
              textTransform: 'uppercase',
            }}
          >
            <ChartLineUp size={16} weight="light" color="var(--blue-soft)" />
            <span>TRADE TOOLS · REPLAY & LAB</span>
          </div>
          <h1
            style={{
              margin: 0,
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: 'clamp(26px, 3.2vw, 36px)',
              letterSpacing: '-0.02em',
              fontWeight: 700,
              color: 'var(--text)',
            }}
          >
            Chart Lab
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: '15px',
              color: 'var(--muted)',
            }}
          >
            Replay the market bar by bar, mark up key market structures, and test your strategy on history.
          </p>
        </div>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '12px',
            fontWeight: 600,
            color: '#1A1203',
            background: 'var(--amber)',
            padding: '4px 12px',
            borderRadius: '999px',
          }}
        >
          <Info size={14} weight="bold" />
          <span>Sample data — not live prices</span>
        </div>
      </div>

      {/* Asset and Timeframe Selectors */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '14px',
          background: 'var(--surface)',
          border: '1px solid var(--line)',
          borderRadius: '14px',
          padding: '12px 16px',
        }}
      >
        {/* Asset Pills */}
        <div
          role="group"
          aria-label="Select Market Asset"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}
        >
          {ASSET_DEFS.map((a) => {
            const isSelected = a.id === selectedAsset;
            return (
              <button
                key={a.id}
                type="button"
                onClick={() => handleAssetChange(a.id)}
                style={{
                  minHeight: '38px',
                  padding: '0 14px',
                  borderRadius: '999px',
                  fontFamily: 'inherit',
                  fontSize: '13px',
                  cursor: 'pointer',
                  border: isSelected ? '1px solid #EAF1FF' : '1px solid var(--line-strong)',
                  background: isSelected ? '#EAF1FF' : 'transparent',
                  color: isSelected ? '#060F22' : '#EAF1FF',
                  fontWeight: isSelected ? 600 : 400,
                  transition: 'all 0.2s ease',
                }}
              >
                {a.id}
              </button>
            );
          })}
        </div>

        {/* Timeframe Pills */}
        <div
          role="group"
          aria-label="Select Timeframe"
          style={{ display: 'flex', gap: '6px' }}
        >
          {['M15', 'H1', 'H4', 'D1'].map((tf) => {
            const isSelected = tf === selectedTf;
            return (
              <button
                key={tf}
                type="button"
                onClick={() => handleTfChange(tf)}
                style={{
                  minHeight: '38px',
                  padding: '0 14px',
                  borderRadius: '999px',
                  fontFamily: 'var(--font-ibm-plex-mono)',
                  fontSize: '13px',
                  cursor: 'pointer',
                  border: isSelected ? '1px solid var(--blue)' : '1px solid var(--line-strong)',
                  background: isSelected ? 'rgba(74, 157, 255, 0.15)' : 'transparent',
                  color: isSelected ? 'var(--blue)' : 'var(--muted)',
                  fontWeight: isSelected ? 600 : 400,
                  transition: 'all 0.2s ease',
                }}
              >
                {tf}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Chart Canvas (Left) + Notes/Backtest Panel (Right) */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          alignItems: 'flex-start',
        }}
      >
        {/* CHART SECTION */}
        <section
          aria-label="Interactive Candlestick Replay Chart"
          style={{
            flex: '999 1 680px',
            minWidth: 0,
            background: 'var(--bg-sidebar)',
            border: '1px solid var(--line)',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 8px 30px rgba(2, 6, 20, 0.5)',
          }}
        >
          {/* Chart Header Bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '10px',
              padding: '12px 18px',
              borderBottom: '1px solid var(--line)',
              fontFamily: 'var(--font-ibm-plex-mono)',
              fontSize: '13px',
              color: 'var(--muted)',
              background: 'var(--surface)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: 'var(--text)', fontWeight: 600 }}>
                {def.id} · {selectedTf}
              </span>
              <span
                style={{
                  fontSize: '11px',
                  padding: '1px 6px',
                  borderRadius: '4px',
                  background: 'var(--surface-2)',
                  color: 'var(--blue-soft)',
                }}
              >
                {def.name}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '12px', fontSize: '13px' }}>
              <span>O <strong style={{ color: 'var(--text)' }}>{fmt(lastCandle.open)}</strong></span>
              <span>H <strong style={{ color: 'var(--text)' }}>{fmt(lastCandle.high)}</strong></span>
              <span>L <strong style={{ color: 'var(--text)' }}>{fmt(lastCandle.low)}</strong></span>
              <span>
                C <strong style={{ color: lastColor }}>{fmt(lastCandle.close)}</strong>
              </span>
            </div>
          </div>

          {/* Chart Center: Left Toolbar + Candlestick Area + Right Axis */}
          <div style={{ display: 'flex', position: 'relative' }}>
            {/* Left Drawing Toolbar */}
            <div
              role="toolbar"
              aria-label="Chart drawing tools"
              style={{
                flexShrink: 0,
                width: '54px',
                borderRight: '1px solid var(--line)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 0',
                background: 'var(--surface)',
              }}
            >
              {toolsList.map((tl) => {
                const isSelected = activeTool === tl.id;
                return (
                  <button
                    key={tl.id}
                    type="button"
                    onClick={() => setActiveTool(tl.id)}
                    aria-label={tl.label}
                    title={tl.label}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      border: isSelected ? '1px solid var(--blue)' : '1px solid transparent',
                      background: isSelected ? 'var(--surface-2)' : 'transparent',
                      color: isSelected ? 'var(--blue)' : 'var(--dim)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {tl.icon}
                  </button>
                );
              })}

              {drawnLines.length > 0 && (
                <button
                  type="button"
                  onClick={() => setDrawnLines([])}
                  title="Clear annotations"
                  style={{
                    fontSize: '10px',
                    fontFamily: 'var(--font-ibm-plex-mono)',
                    color: 'var(--down)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    marginTop: '8px',
                  }}
                >
                  Clear
                </button>
              )}
            </div>

            {/* Candlestick plotting canvas */}
            <div
              onClick={handleChartClick}
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                setHoverCoord({ x: e.clientX - r.left, y: e.clientY - r.top });
              }}
              onMouseLeave={() => setHoverCoord(null)}
              style={{
                flex: 1,
                minWidth: 0,
                position: 'relative',
                height: `${H}px`,
                backgroundColor: 'rgba(5, 12, 28, 0.95)',
                cursor:
                  activeTool === 'Crosshair'
                    ? 'crosshair'
                    : activeTool === 'Horizontal line'
                    ? 'row-resize'
                    : 'default',
                userSelect: 'none',
              }}
            >
              {/* Horizontal Grid lines */}
              {gridLevels.map((p, idx) => (
                <div
                  key={idx}
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    height: '1px',
                    backgroundColor: 'rgba(28, 53, 99, 0.4)',
                    top: `${getY(p)}px`,
                  }}
                />
              ))}

              {/* User drawn horizontal levels */}
              {drawnLines.map((yCoord, idx) => (
                <div
                  key={'userline_' + idx}
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    height: '1px',
                    borderTop: '1px dashed var(--amber)',
                    top: `${yCoord}px`,
                    zIndex: 2,
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      right: '8px',
                      top: '-18px',
                      fontFamily: 'var(--font-ibm-plex-mono)',
                      fontSize: '10px',
                      color: 'var(--amber)',
                      background: 'rgba(6, 15, 34, 0.9)',
                      padding: '1px 4px',
                      borderRadius: '3px',
                    }}
                  >
                    User Level #{idx + 1}
                  </span>
                </div>
              ))}

              {/* Candlesticks loop */}
              {visibleSlice.map((c, i) => {
                const isUp = c.close >= c.open;
                const candleColor = isUp ? 'var(--up)' : 'var(--down)';
                const top = getY(Math.max(c.open, c.close));
                const bodyH = Math.max(2, Math.abs(getY(c.open) - getY(c.close)));
                const wickTop = getY(c.high);
                const wickHeight = Math.max(1, getY(c.low) - getY(c.high));

                return (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      left: `${i * candleWidthPct}%`,
                      width: `${candleWidthPct}%`,
                    }}
                  >
                    {/* Wick */}
                    <div
                      style={{
                        position: 'absolute',
                        left: '50%',
                        width: '1px',
                        top: `${wickTop}px`,
                        height: `${wickHeight}px`,
                        backgroundColor: candleColor,
                      }}
                    />
                    {/* Body */}
                    <div
                      style={{
                        position: 'absolute',
                        left: '16%',
                        width: '68%',
                        top: `${top}px`,
                        height: `${bodyH}px`,
                        backgroundColor: candleColor,
                        borderRadius: '1px',
                        boxShadow: i === currentVisible - 1 ? `0 0 8px ${candleColor}` : 'none',
                      }}
                    />
                  </div>
                );
              })}

              {/* Current last price line */}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  height: 0,
                  borderTop: `1px dashed ${lastColor}`,
                  top: `${getY(lastCandle.close)}px`,
                  transition: 'top 0.25s ease',
                  zIndex: 3,
                }}
              />

              {/* Crosshair interactive guides */}
              {hoverCoord && activeTool === 'Crosshair' && (
                <>
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      height: '1px',
                      backgroundColor: 'rgba(74, 157, 255, 0.4)',
                      top: `${hoverCoord.y}px`,
                      pointerEvents: 'none',
                      zIndex: 4,
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      width: '1px',
                      backgroundColor: 'rgba(74, 157, 255, 0.4)',
                      left: `${hoverCoord.x}px`,
                      pointerEvents: 'none',
                      zIndex: 4,
                    }}
                  />
                </>
              )}
            </div>

            {/* Right Price Axis */}
            <div
              style={{
                flexShrink: 0,
                width: '88px',
                position: 'relative',
                height: `${H}px`,
                borderLeft: '1px solid var(--line)',
                fontFamily: 'var(--font-ibm-plex-mono)',
                fontSize: '11px',
                color: 'var(--dim)',
                background: 'var(--surface)',
              }}
            >
              {gridLevels.map((p, idx) => (
                <span
                  key={idx}
                  style={{
                    position: 'absolute',
                    left: '8px',
                    transform: 'translateY(-50%)',
                    top: `${getY(p)}px`,
                  }}
                >
                  {fmt(p)}
                </span>
              ))}

              {/* Current active price badge */}
              <div
                style={{
                  position: 'absolute',
                  left: '4px',
                  right: '4px',
                  transform: 'translateY(-50%)',
                  padding: '2px 4px',
                  borderRadius: '4px',
                  textAlign: 'center',
                  color: '#04101F',
                  fontWeight: 600,
                  fontSize: '11px',
                  backgroundColor: lastColor,
                  top: `${getY(lastCandle.close)}px`,
                  transition: 'top 0.25s ease',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                  zIndex: 5,
                }}
              >
                {fmt(lastCandle.close)}
              </div>
            </div>
          </div>

          {/* Replay Control Bar at bottom of chart */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '14px',
              padding: '14px 18px',
              borderTop: '1px solid var(--line)',
              background: 'var(--surface)',
            }}
          >
            {/* Replay Buttons */}
            <div
              role="group"
              aria-label="Replay controls"
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <button
                type="button"
                onClick={handleResetReplay}
                aria-label="Restart replay to start"
                title="Restart replay"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  border: '1px solid var(--line-strong)',
                  background: 'transparent',
                  color: 'var(--text)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <ArrowCounterClockwise size={18} weight="light" />
              </button>

              <button
                type="button"
                onClick={handleStepBack}
                aria-label="Step 1 bar backward"
                title="Previous bar"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  border: '1px solid var(--line-strong)',
                  background: 'transparent',
                  color: 'var(--text)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <CaretLeft size={20} weight="light" />
              </button>

              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="mq-btn"
                style={{
                  minWidth: '108px',
                  height: '44px',
                  padding: '0 18px',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'var(--amber)',
                  color: '#1A1203',
                  fontFamily: 'inherit',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                {isPlaying ? (
                  <>
                    <Pause size={18} weight="bold" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play size={18} weight="bold" />
                    <span>Play</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleStepForward}
                aria-label="Step 1 bar forward"
                title="Next bar"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  border: '1px solid var(--line-strong)',
                  background: 'transparent',
                  color: 'var(--text)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <CaretRight size={20} weight="light" />
              </button>

              {/* Speed toggle pills */}
              <div
                style={{
                  display: 'flex',
                  gap: '4px',
                  background: 'var(--surface-2)',
                  padding: '4px',
                  borderRadius: '8px',
                  marginLeft: '6px',
                }}
              >
                {[
                  { label: '1x', ms: 500 },
                  { label: '2x', ms: 300 },
                  { label: '5x', ms: 120 },
                ].map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => setPlaybackSpeed(s.ms)}
                    style={{
                      padding: '2px 8px',
                      borderRadius: '6px',
                      border: 'none',
                      fontFamily: 'var(--font-ibm-plex-mono)',
                      fontSize: '11px',
                      cursor: 'pointer',
                      background: playbackSpeed === s.ms ? 'var(--blue)' : 'transparent',
                      color: playbackSpeed === s.ms ? '#04101F' : 'var(--muted)',
                      fontWeight: 600,
                    }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Replay Counter status */}
            <div
              style={{
                fontFamily: 'var(--font-ibm-plex-mono)',
                fontSize: '13px',
                color: 'var(--dim)',
              }}
            >
              Replay · bar{' '}
              <strong style={{ color: 'var(--text)' }}>{currentVisible}</strong> of{' '}
              <strong style={{ color: 'var(--text)' }}>{N}</strong> ·{' '}
              <span style={{ color: 'var(--blue-soft)' }}>{activeTool}</span> selected
            </div>
          </div>
        </section>

        {/* SIDEBAR TOOLS (Notes, Backtesting, Historical Data Specs) */}
        <aside
          style={{
            flex: '1 1 320px',
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {/* Notes Card */}
          <section
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: '16px',
              padding: '22px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <PencilSimple size={18} weight="light" color="var(--amber)" />
              <h2
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-space-grotesk)',
                  fontSize: '18px',
                  color: 'var(--text)',
                }}
              >
                Notes on this chart
              </h2>
            </div>

            <form onSubmit={handleAddNote} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label
                htmlFor="chart-note-input"
                style={{ fontSize: '13px', color: 'var(--muted)' }}
              >
                What do you see at bar {currentVisible}?
              </label>

              <textarea
                id="chart-note-input"
                rows={3}
                value={noteDraft}
                onChange={(e) => setNoteDraft(e.target.value)}
                placeholder="e.g. Price formed a liquidity sweep below the previous day low with strong rejection..."
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1px solid var(--line-strong)',
                  background: 'var(--bg)',
                  color: 'var(--text)',
                  fontFamily: 'inherit',
                  fontSize: '14px',
                  resize: 'vertical',
                }}
              />

              <button
                type="submit"
                disabled={!noteDraft.trim()}
                style={{
                  minHeight: '42px',
                  borderRadius: '10px',
                  border: '1px solid var(--line-strong)',
                  background: noteDraft.trim() ? 'var(--surface-2)' : 'transparent',
                  color: noteDraft.trim() ? 'var(--text)' : 'var(--dim)',
                  fontFamily: 'inherit',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: noteDraft.trim() ? 'pointer' : 'default',
                  transition: 'all 0.2s ease',
                }}
              >
                Add note
              </button>
            </form>

            {notes.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  marginTop: '6px',
                  maxHeight: '220px',
                  overflowY: 'auto',
                }}
              >
                {notes.map((n) => (
                  <div
                    key={n.id}
                    style={{
                      fontSize: '13px',
                      background: 'var(--surface-2)',
                      border: '1px solid var(--line)',
                      borderRadius: '10px',
                      padding: '10px 12px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-ibm-plex-mono)',
                          fontSize: '11px',
                          color: 'var(--blue-soft)',
                          fontWeight: 500,
                        }}
                      >
                        {n.where}
                      </span>
                      <span style={{ fontSize: '11px', color: 'var(--dim)' }}>{n.time}</span>
                    </div>
                    <span style={{ color: '#C9D6EE', lineHeight: 1.5 }}>{n.text}</span>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Backtesting Sandbox */}
          <section
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: '16px',
              padding: '22px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Scales size={18} weight="light" color="var(--blue-soft)" />
              <h2
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-space-grotesk)',
                  fontSize: '18px',
                  color: 'var(--text)',
                }}
              >
                Backtest a strategy
              </h2>
            </div>

            <label
              htmlFor="bt-strategy-selector"
              style={{ fontSize: '13px', color: 'var(--muted)' }}
            >
              Choose strategy template
            </label>

            <select
              id="bt-strategy-selector"
              value={selectedStrategy}
              onChange={(e) => setSelectedStrategy(e.target.value)}
              style={{
                minHeight: '44px',
                padding: '0 12px',
                borderRadius: '10px',
                border: '1px solid var(--line-strong)',
                background: 'var(--bg)',
                color: 'var(--text)',
                fontFamily: 'inherit',
                fontSize: '14px',
              }}
            >
              <option value="EMA crossover (from Strategy Lab)">EMA crossover (from Strategy Lab)</option>
              <option value="Previous-day high breakout">Previous-day high breakout</option>
              <option value="Asian Range Liquidity Sweep">Asian Range Liquidity Sweep</option>
              <option value="My custom strategy">My custom strategy</option>
            </select>

            <button
              type="button"
              onClick={() => setBacktestRan(true)}
              style={{
                minHeight: '44px',
                borderRadius: '10px',
                border: 'none',
                background: 'var(--button)',
                color: '#FFFFFF',
                fontFamily: 'inherit',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              Run backtest on sample
            </button>

            {backtestRan && (
              <div
                className="mq-rise"
                style={{
                  fontSize: '13px',
                  color: '#B9C9E6',
                  background: 'rgba(31, 111, 229, 0.12)',
                  border: '1px solid var(--blue)',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  lineHeight: 1.55,
                }}
              >
                <div style={{ fontWeight: 600, color: 'var(--blue-soft)', marginBottom: '4px' }}>
                  Backtesting engine preview:
                </div>
                Full backtesting engine connects at launch. You will see every historical trade directly on
                the chart with trade markers, win rate, maximum drawdown, and an equity curve — objective
                historical simulation, never future promises.
              </div>
            )}
          </section>

          {/* At Launch Data Card */}
          <section
            style={{
              border: '1px solid var(--line)',
              borderRadius: '16px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              background: 'rgba(8, 21, 48, 0.6)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle size={16} weight="light" color="var(--up)" />
              <h2
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-space-grotesk)',
                  fontSize: '15px',
                  color: 'var(--text)',
                }}
              >
                Institutional Historical Feeds
              </h2>
            </div>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--muted)', lineHeight: 1.5 }}>
              At launch: Clean tick-by-tick and bar-by-bar history for FX majors, exotics (USDZAR, USDNGN),
              spot gold (XAUUSD), oil, equity indices, and crypto, with economic releases marked
              chronologically directly on the chart timeline.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
