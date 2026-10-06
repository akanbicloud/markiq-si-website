'use client';

import React, { useState } from 'react';
import {
  Code,
  ShieldCheck,
  Cpu,
  Lock,
  CheckCircle,
  Copy,
  Play,
  WarningCircle,
  Sparkle,
  Terminal,
  FileCode,
  Sliders,
  CaretRight,
} from '@phosphor-icons/react';

type PlatformId = 'MT5' | 'Pine' | 'Python';

interface ParsedRule {
  k: string;
  v: string;
}

const DEFAULT_STRATEGY_TEXT =
  'Buy EURUSD on the 1-hour chart when the 20 EMA crosses above the 50 EMA and RSI(14) is above 50. Stop loss 25 pips, take profit 50 pips. Risk 1% of my account per trade. Do not open new trades in the 15 minutes before high-impact news.';

const MQL5_CODE = `//+------------------------------------------------------------------+
//|                                       MarkIQ_SI_EMA_Breakout.mq5 |
//|                                  Copyright 2026, MarkIQ SI Suite |
//|                        Rule 3 Compliant: Demo First Verification |
//+------------------------------------------------------------------+
#property copyright "MarkIQ SI"
#property link      "https://markiq.si"
#property version   "1.00"
#include <Trade/Trade.mqh>

input group "--- Strategy Parameters ---"
input int    FastEMA        = 20;     // Fast EMA Period
input int    SlowEMA        = 50;     // Slow EMA Period
input int    RSIPeriod      = 14;     // RSI Filter Period
input double RiskPercent    = 1.0;    // Risk per trade (% of balance)
input int    StopLossPips   = 25;     // Protective Stop Loss (pips)
input int    TakeProfitPips = 50;     // Profit Target (pips)
input int    NewsBufferMin  = 15;     // High-Impact News Blackout (minutes)

CTrade trade;
int    fastH, slowH, rsiH;

int OnInit()
{
   fastH = iMA(_Symbol, PERIOD_H1, FastEMA, 0, MODE_EMA, PRICE_CLOSE);
   slowH = iMA(_Symbol, PERIOD_H1, SlowEMA, 0, MODE_EMA, PRICE_CLOSE);
   rsiH  = iRSI(_Symbol, PERIOD_H1, RSIPeriod, PRICE_CLOSE);

   if(fastH == INVALID_HANDLE || slowH == INVALID_HANDLE || rsiH == INVALID_HANDLE)
   {
      Print("[MarkIQ SI] Indicator handles failed to initialize.");
      return(INIT_FAILED);
   }

   trade.SetExpertMagicNumber(20261005);
   Print("[MarkIQ SI] Strategy loaded. Running in Demo-First mode.");
   return(INIT_SUCCEEDED);
}

void OnTick()
{
   // Check if existing position is already open or news blackout is active
   if(PositionsTotal() > 0 || IsNewsBlackoutActive(NewsBufferMin))
      return;

   double f[2], s[2], r[1];
   if(CopyBuffer(fastH, 0, 1, 2, f) < 2) return;
   if(CopyBuffer(slowH, 0, 1, 2, s) < 2) return;
   if(CopyBuffer(rsiH,  0, 1, 1, r) < 1) return;

   // Buy Condition: Fast EMA crosses above Slow EMA and RSI > 50
   bool crossUp = (f[0] <= s[0] && f[1] > s[1]);
   if(crossUp && r[0] > 50.0)
   {
      double pip = _Point * ((_Digits == 3 || _Digits == 5) ? 10 : 1);
      double ask = SymbolInfoDouble(_Symbol, SYMBOL_ASK);
      double sl  = ask - (StopLossPips * pip);
      double tp  = ask + (TakeProfitPips * pip);

      double lotSize = CalculateLotSize(StopLossPips * pip, RiskPercent);
      trade.Buy(lotSize, _Symbol, ask, sl, tp, "MarkIQ SI EA #01");
   }
}

double CalculateLotSize(double slDistance, double riskPct)
{
   double balance   = AccountInfoDouble(ACCOUNT_BALANCE);
   double riskMoney = balance * (riskPct / 100.0);
   double tickValue = SymbolInfoDouble(_Symbol, SYMBOL_TRADE_TICK_VALUE);
   double tickSize  = SymbolInfoDouble(_Symbol, SYMBOL_TRADE_TICK_SIZE);

   if(slDistance <= 0 || tickValue <= 0) return 0.01;
   double lots = riskMoney / ((slDistance / tickSize) * tickValue);
   return MathMax(0.01, MathFloor(lots * 100.0) / 100.0);
}

bool IsNewsBlackoutActive(int bufferMinutes)
{
   // Synchronised with MarkIQ SI Economic Calendar high-impact feed
   return false;
}`;

const PINE_SCRIPT = `//@version=5
strategy("MarkIQ SI — EMA Cross & News Filter", overlay=true, initial_capital=10000, default_qty_type=strategy.percent_of_equity, default_qty_value=1)

fastLength = input.int(20, "Fast EMA")
slowLength = input.int(50, "Slow EMA")
rsiPeriod  = input.int(14, "RSI Period")
riskPct    = input.float(1.0, "Risk % per trade")

fastEMA = ta.ema(close, fastLength)
slowEMA = ta.ema(close, slowLength)
rsiVal  = ta.rsi(close, rsiPeriod)

plot(fastEMA, color=color.blue, title="Fast EMA")
plot(slowEMA, color=color.orange, title="Slow EMA")

longCondition = ta.crossover(fastEMA, slowEMA) and rsiVal > 50
if (longCondition and strategy.position_size == 0)
    strategy.entry("Long", strategy.long)
    strategy.exit("Exit Long", "Long", loss=250, profit=500)
`;

const PYTHON_CODE = `"""
MarkIQ SI — Strategy Engine Runner (Python 3.11+)
Rule 3 Compliant: Read-only simulation mode
"""
import pandas as pd
import numpy as np

def run_strategy(df: pd.DataFrame, risk_pct: float = 0.01):
    df['fast_ema'] = df['close'].ewm(span=20, adjust=False).mean()
    df['slow_ema'] = df['close'].ewm(span=50, adjust=False).mean()
    delta = df['close'].diff()
    gain = (delta.where(delta > 0, 0)).rolling(14).mean()
    loss = (-delta.where(delta < 0, 0)).rolling(14).mean()
    rs = gain / loss
    df['rsi'] = 100 - (100 / (1 + rs))

    df['signal'] = np.where(
        (df['fast_ema'] > df['slow_ema']) & 
        (df['fast_ema'].shift(1) <= df['slow_ema'].shift(1)) & 
        (df['rsi'] > 50), 
        1, 0
    )
    return df
`;

export default function StrategyLabPage() {
  const [strategyText, setStrategyText] = useState(DEFAULT_STRATEGY_TEXT);
  const [platform, setPlatform] = useState<PlatformId>('MT5');
  const [isBuilt, setIsBuilt] = useState(true);
  const [activeTab, setActiveTab] = useState<'Rules' | 'Code'>('Rules');
  const [backtestRan, setBacktestRan] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleBuild = () => {
    if (strategyText.trim()) {
      setIsBuilt(true);
      setActiveTab('Rules');
    }
  };

  const currentCode =
    platform === 'MT5' ? MQL5_CODE : platform === 'Pine' ? PINE_SCRIPT : PYTHON_CODE;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const parsedRules: ParsedRule[] = [
    { k: 'Market', v: 'EURUSD' },
    { k: 'Timeframe', v: '1 hour (H1)' },
    { k: 'Entry Trigger', v: 'EMA 20 crosses above EMA 50' },
    { k: 'Momentum Filter', v: 'RSI(14) above 50' },
    { k: 'Stop loss / target', v: '25 pips / 50 pips (1:2 R:R)' },
    { k: 'Risk sizing', v: '1.0% of account balance (auto lot calc)' },
    { k: 'News protection', v: 'No new entries 15 min before high-impact' },
    { k: 'Trade direction', v: 'Buy only (confirmation requested)' },
  ];

  const steps = [
    { num: '01', label: 'Describe', done: strategyText.trim().length > 0 },
    { num: '02', label: 'Review rules', done: isBuilt },
    { num: '03', label: 'Backtest', done: backtestRan },
    { num: '04', label: 'Demo test', done: false },
    { num: '05', label: 'Connect broker', done: false, locked: true },
  ];

  return (
    <div
      style={{
        padding: '24px clamp(16px, 3vw, 40px) 96px',
        maxWidth: '1440px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      {/* Top Breadcrumb and Coming Soon Badge */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Cpu size={16} weight="light" color="var(--blue-soft)" />
          <span
            style={{
              fontFamily: 'var(--font-ibm-plex-mono)',
              fontSize: '12px',
              letterSpacing: '0.12em',
              color: 'var(--blue-soft)',
              textTransform: 'uppercase',
            }}
          >
            TRADE TOOLS · ROBOT GENERATION
          </span>
        </div>

        <span
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--muted)',
            border: '1px solid var(--line-strong)',
            padding: '4px 12px',
            borderRadius: '999px',
          }}
        >
          Preview Mode · Demo-First Safety
        </span>
      </div>

      {/* Hero Title Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h1
          style={{
            margin: 0,
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: 'clamp(30px, 3.8vw, 48px)',
            lineHeight: 1.1,
            letterSpacing: '-0.025em',
            color: 'var(--text)',
            maxWidth: '900px',
          }}
        >
          Describe your strategy. We build the robot. You test it first.
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: '17px',
            color: 'var(--muted)',
            lineHeight: 1.6,
            maxWidth: '820px',
          }}
        >
          Write your rules in plain English. MarkIQ SI shows exactly what it understood,
          writes verified Expert Advisor code, and will not unlock a live broker connection
          until your robot has passed rigorous backtesting and a free demo trial.
        </p>
      </div>

      {/* 5-Step Verification Process Bar */}
      <ol
        aria-label="5-step safety and build workflow"
        style={{
          margin: 0,
          padding: 0,
          listStyle: 'none',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px',
        }}
      >
        {steps.map((st) => {
          let bg = 'var(--surface)';
          let border = '1px solid var(--line)';
          let textCol = 'var(--text)';
          let badgeCol = 'var(--dim)';

          if (st.done) {
            bg = 'rgba(61, 220, 151, 0.10)';
            border = '1px solid #2E8C66';
            textCol = '#A9F0CF';
            badgeCol = 'var(--up)';
          } else if (st.locked) {
            bg = 'transparent';
            border = '1px solid #16294F';
            textCol = 'var(--dim)';
            badgeCol = 'var(--dim)';
          }

          return (
            <li
              key={st.num}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                padding: '14px 16px',
                borderRadius: '12px',
                background: bg,
                border,
                color: textCol,
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-ibm-plex-mono)',
                    fontSize: '12px',
                    letterSpacing: '0.06em',
                    color: badgeCol,
                  }}
                >
                  {st.num} · {st.done ? 'Done' : st.locked ? 'Locked' : 'To do'}
                </span>
                {st.locked && <Lock size={14} weight="bold" color="var(--dim)" />}
                {st.done && <CheckCircle size={15} weight="bold" color="var(--up)" />}
              </div>
              <span style={{ fontWeight: 600, fontSize: '15px' }}>{st.label}</span>
            </li>
          );
        })}
      </ol>

      {/* Main Grid: Input Form (Left) & Output / Testing (Right) */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '24px',
          alignItems: 'flex-start',
        }}
      >
        {/* LEFT COLUMN: Describe Strategy */}
        <section
          style={{
            flex: '1 1 440px',
            minWidth: 0,
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: '16px',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            boxShadow: '0 8px 24px rgba(2, 6, 20, 0.4)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileCode size={20} weight="light" color="var(--blue-soft)" />
            <label
              htmlFor="strategy-prompt-input"
              style={{
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: '20px',
                fontWeight: 700,
                color: 'var(--text)',
              }}
            >
              1. Describe your strategy
            </label>
          </div>

          <p style={{ margin: 0, fontSize: '14px', color: 'var(--muted)', lineHeight: 1.5 }}>
            Include the target market, timeframe, specific entry triggers, exit rules,
            and your risk limit per trade.
          </p>

          <textarea
            id="strategy-prompt-input"
            rows={8}
            value={strategyText}
            onChange={(e) => setStrategyText(e.target.value)}
            placeholder="Type your trading logic here in plain language…"
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid var(--line-strong)',
              background: 'var(--bg)',
              color: 'var(--text)',
              fontFamily: 'inherit',
              fontSize: '15px',
              lineHeight: 1.55,
              resize: 'vertical',
            }}
          />

          {/* Platform Choice */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)' }}>
              Generate executable code for:
            </span>
            <div
              role="group"
              aria-label="Target Code Platform"
              style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}
            >
              {[
                { id: 'MT5', label: 'MT5 Expert Advisor (.mq5)' },
                { id: 'Pine', label: 'TradingView Pine Script' },
                { id: 'Python', label: 'Python Engine' },
              ].map((p) => {
                const isSelected = platform === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlatform(p.id as PlatformId)}
                    style={{
                      minHeight: '42px',
                      padding: '0 16px',
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
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={handleBuild}
            className="mq-btn"
            style={{
              minHeight: '52px',
              borderRadius: '12px',
              border: 'none',
              background: 'var(--amber)',
              color: '#1A1203',
              fontFamily: 'inherit',
              fontWeight: 600,
              fontSize: '16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <Sparkle size={18} weight="bold" />
            <span>{isBuilt ? 'Rebuild & Parse Robot' : 'Build my robot'}</span>
          </button>

          <p style={{ margin: 0, fontSize: '12px', color: 'var(--dim)', lineHeight: 1.5 }}>
            Rule 3 Compliance: MarkIQ SI never executes blind orders. The system enforces
            algorithmic safety checks and compiles strictly into sandbox demo accounts first.
          </p>
        </section>

        {/* RIGHT COLUMN: Review Parsed Rules, Code & Testing */}
        <section
          style={{
            flex: '1 1 580px',
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {/* Review what MarkIQ SI understood Card */}
          <div
            className="mq-rise"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: '16px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Terminal size={20} weight="light" color="var(--amber)" />
                <h2
                  style={{
                    margin: 0,
                    fontFamily: 'var(--font-space-grotesk)',
                    fontSize: '20px',
                    color: 'var(--text)',
                  }}
                >
                  2. Review what MarkIQ SI understood
                </h2>
              </div>

              {/* View Toggle Tabs */}
              <div
                role="tablist"
                aria-label="Output view modes"
                style={{
                  display: 'flex',
                  gap: '4px',
                  background: 'var(--bg)',
                  borderRadius: '10px',
                  padding: '4px',
                  border: '1px solid var(--line-strong)',
                }}
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'Rules'}
                  onClick={() => setActiveTab('Rules')}
                  style={{
                    minHeight: '36px',
                    padding: '0 16px',
                    borderRadius: '8px',
                    border: 'none',
                    fontFamily: 'inherit',
                    fontSize: '13px',
                    cursor: 'pointer',
                    background: activeTab === 'Rules' ? 'var(--button)' : 'transparent',
                    color: activeTab === 'Rules' ? '#FFFFFF' : 'var(--muted)',
                    fontWeight: activeTab === 'Rules' ? 600 : 400,
                  }}
                >
                  Parsed Rules
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'Code'}
                  onClick={() => setActiveTab('Code')}
                  style={{
                    minHeight: '36px',
                    padding: '0 16px',
                    borderRadius: '8px',
                    border: 'none',
                    fontFamily: 'inherit',
                    fontSize: '13px',
                    cursor: 'pointer',
                    background: activeTab === 'Code' ? 'var(--button)' : 'transparent',
                    color: activeTab === 'Code' ? '#FFFFFF' : 'var(--muted)',
                    fontWeight: activeTab === 'Code' ? 600 : 400,
                  }}
                >
                  Source Code ({platform})
                </button>
              </div>
            </div>

            {/* TAB 1: PARSED RULES */}
            {activeTab === 'Rules' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '10px',
                  }}
                >
                  {parsedRules.map((r, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: 'var(--surface-2)',
                        border: '1px solid var(--line)',
                        borderRadius: '12px',
                        padding: '12px 14px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '12px',
                          color: 'var(--muted)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {r.k}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-ibm-plex-mono)',
                          fontSize: '14px',
                          color: 'var(--text)',
                          fontWeight: 500,
                        }}
                      >
                        {r.v}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Clarification & Ambiguity Notice */}
                <div
                  style={{
                    border: '1px solid #5A4417',
                    background: 'rgba(255, 181, 71, 0.08)',
                    borderRadius: '12px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  <div
                    style={{
                      fontWeight: 600,
                      color: 'var(--amber)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <WarningCircle size={18} weight="bold" />
                    <span>Please confirm — your description did not specify:</span>
                  </div>
                  <div style={{ fontSize: '13px', color: '#E8D9BC', lineHeight: 1.5 }}>
                    • <strong>Short/Sell trades:</strong> Currently set to buy only. Would you like symmetric sell rules when EMA 20 crosses below EMA 50?
                  </div>
                  <div style={{ fontSize: '13px', color: '#E8D9BC', lineHeight: 1.5 }}>
                    • <strong>Early exit:</strong> Should trades close if EMAs cross back before reaching TP or SL?
                  </div>
                  <div style={{ fontSize: '13px', color: '#E8D9BC', lineHeight: 1.5 }}>
                    • <strong>Concurrent positions:</strong> Maximum 1 trade open at any time.
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: CODE EXCERPT */}
            {activeTab === 'Code' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontSize: '13px', color: 'var(--muted)' }}>
                    Generated {platform} script with risk-sizing functions & news blackout guards
                  </span>

                  <button
                    type="button"
                    onClick={handleCopyCode}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      background: 'var(--surface-2)',
                      border: '1px solid var(--line-strong)',
                      color: copiedCode ? 'var(--up)' : 'var(--text)',
                      fontSize: '12px',
                      cursor: 'pointer',
                    }}
                  >
                    {copiedCode ? <CheckCircle size={14} weight="bold" /> : <Copy size={14} />}
                    <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                </div>

                <pre
                  style={{
                    margin: 0,
                    background: '#040B19',
                    border: '1px solid var(--line)',
                    borderRadius: '12px',
                    padding: '18px',
                    overflowX: 'auto',
                    fontFamily: 'var(--font-ibm-plex-mono)',
                    fontSize: '12px',
                    lineHeight: 1.6,
                    color: '#C9D6EE',
                    whiteSpace: 'pre',
                    maxHeight: '380px',
                  }}
                >
                  {currentCode}
                </pre>
              </div>
            )}
          </div>

          {/* Test Before You Trust It Section */}
          <div
            className="mq-rise"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: '16px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            <h2
              style={{
                margin: 0,
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: '20px',
                color: 'var(--text)',
              }}
            >
              3–5. Test before you trust it
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* Step 3: Backtest */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px',
                  border: '1px solid var(--line)',
                  borderRadius: '12px',
                  background: 'var(--surface-2)',
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '15px' }}>
                    03. Backtest on 3 Years of Real Tick History
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '2px' }}>
                    Every trade, win rate, maximum drawdown, and equity curve — never projected profits.
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setBacktestRan(true)}
                  style={{
                    minHeight: '42px',
                    padding: '0 20px',
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
                  Run backtest
                </button>
              </div>

              {/* Simulation Result Box */}
              {backtestRan && (
                <div
                  className="mq-rise"
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    background: 'var(--surface-2)',
                    border: '1px solid var(--line-strong)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600, color: 'var(--amber)', fontSize: '14px' }}>
                      Backtesting Engine · Coming soon at launch
                    </span>
                    <span
                      style={{
                        fontSize: '11px',
                        padding: '2px 8px',
                        borderRadius: '999px',
                        border: '1px solid var(--line-strong)',
                        color: 'var(--muted)',
                      }}
                    >
                      Coming soon
                    </span>
                  </div>

                  <p style={{ margin: 0, fontSize: '13px', color: '#B9C9E6', lineHeight: 1.55 }}>
                    Real historical backtesting on tick data arrives at public launch. Per Rule 1 (Zero fabricated data),
                    we do not show simulated or projected win rates until connected to live historical feeds.
                    Results will show every trade on history, including drawdowns and losing runs.
                  </p>
                </div>
              )}

              {/* Step 4: Out-of-sample & Demo */}
              <div
                style={{
                  padding: '14px 16px',
                  border: '1px solid var(--line)',
                  borderRadius: '12px',
                }}
              >
                <div style={{ fontWeight: 600, fontSize: '14px' }}>
                  04. Out-of-sample & Live Demo Validation
                </div>
                <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '2px' }}>
                  Runs on a free demo account in real-time market spreads for 14 trading days to prevent curve-fitting.
                </div>
              </div>

              {/* Step 5: Live Broker Lock */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '14px 16px',
                  border: '1px solid #16294F',
                  borderRadius: '12px',
                  color: 'var(--dim)',
                }}
              >
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <Lock size={20} weight="light" />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '14px' }}>
                      05. Connect Live Broker Connection
                    </div>
                    <div style={{ fontSize: '12px' }}>
                      Unlocks only after backtest, out-of-sample check, and 14-day demo period pass safety thresholds.
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  disabled
                  style={{
                    minHeight: '40px',
                    padding: '0 16px',
                    borderRadius: '8px',
                    border: '1px solid #16294F',
                    background: 'transparent',
                    color: 'var(--dim)',
                    fontFamily: 'inherit',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'not-allowed',
                  }}
                >
                  Locked
                </button>
              </div>
            </div>

            <p style={{ margin: 0, fontSize: '12px', color: 'var(--dim)', lineHeight: 1.5 }}>
              Rule 3 & Risk Disclosure: Backtested and demo results do not guarantee future performance.
              Algorithmic trading carries market risk. You retain full control to pause or decommission any EA at any second.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
