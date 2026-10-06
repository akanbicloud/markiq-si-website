'use client';

import React, { useState } from 'react';
import { Calculator, ShieldWarning, CheckCircle, Warning, Gauge } from '@phosphor-icons/react';

export default function RiskAndPropToolsPage() {
  // Calculator state
  const [balance, setBalance] = useState('1000');
  const [riskPct, setRiskPct] = useState('1');
  const [pair, setPair] = useState('EURUSD');
  const [stopLoss, setStopLoss] = useState('25');
  const [pairPrice, setPairPrice] = useState('149.50');

  // Prop firm state
  const [startBal, setStartBal] = useState('10000');
  const [dayOpenBal, setDayOpenBal] = useState('10150');
  const [currentEquity, setCurrentEquity] = useState('9980');
  const [dailyLossLimitPct, setDailyLossLimitPct] = useState('5');
  const [maxDrawdownPct, setMaxDrawdownPct] = useState('10');
  const [profitTargetPct, setProfitTargetPct] = useState('8');

  // Calculations for Position Size Calculator
  const num = (v: string) => {
    const n = parseFloat(v);
    return isNaN(n) ? 0 : n;
  };

  const needsPrice = pair === 'USDJPY' || pair === 'USDCAD' || pair === 'USDCHF';
  const priceVal = num(pairPrice);

  let pipValStandard = 10; // USD per pip for 1.00 lot EURUSD, GBPUSD, AUDUSD
  if (pair === 'USDJPY') {
    pipValStandard = priceVal > 0 ? 1000 / priceVal : 0;
  } else if (pair === 'USDCAD' || pair === 'USDCHF') {
    pipValStandard = priceVal > 0 ? 10 / priceVal : 0;
  } else if (pair === 'XAUUSD') {
    pipValStandard = 10; // Gold 1 standard lot (100 oz): 1 pip ($0.10) = $10
  }

  const riskMoney = (num(balance) * num(riskPct)) / 100;
  const slPips = num(stopLoss);
  const rawLots = slPips > 0 && pipValStandard > 0 ? riskMoney / (slPips * pipValStandard) : 0;
  const safeLots = Math.floor(rawLots * 100) / 100;
  const actualRiskMoney = safeLots * slPips * pipValStandard;
  const totalUnits = safeLots * 100000;

  // Prop firm calculations
  const sStart = num(startBal);
  const sDay = num(dayOpenBal);
  const sEq = num(currentEquity);

  const dlAmount = (sStart * num(dailyLossLimitPct)) / 100;
  const mdAmount = (sStart * num(maxDrawdownPct)) / 100;
  const targetAmount = sStart * (1 + num(profitTargetPct) / 100);

  const dailyFloor = sDay - dlAmount;
  const maxFloor = sStart - mdAmount;

  const dailyRoom = sEq - dailyFloor;
  const overallRoom = sEq - maxFloor;
  const profitRemaining = targetAmount - sEq;

  const dailyUsedPct = Math.max(0, Math.min(100, ((sDay - sEq) / dlAmount) * 100));
  const overallUsedPct = Math.max(0, Math.min(100, ((sStart - sEq) / mdAmount) * 100));
  const targetAchievedPct = Math.max(0, Math.min(100, ((sEq - sStart) / (targetAmount - sStart)) * 100));

  const isDailyBreached = dailyRoom <= 0;
  const isOverallBreached = overallRoom <= 0;
  const isTargetHit = sEq >= targetAmount;

  let propStatus = 'Safe & in good standing';
  let propStatusColor = 'var(--up)';
  let advice = `You have $${dailyRoom.toFixed(2)} room left today before hitting your daily loss limit.`;

  if (isDailyBreached || isOverallBreached) {
    propStatus = 'Breach triggered';
    propStatusColor = 'var(--down)';
    advice = 'Trading must be halted immediately. Account threshold has been crossed.';
  } else if (dailyRoom < dlAmount * 0.3) {
    propStatus = 'Caution: near daily limit';
    propStatusColor = 'var(--amber)';
    advice = `Warning: Less than 30% of daily buffer remains ($${dailyRoom.toFixed(2)}). Reduce lot sizes or step away for the session.`;
  } else if (isTargetHit) {
    propStatus = 'Profit target achieved!';
    propStatusColor = 'var(--up)';
    advice = 'Congratulations! You have satisfied the profit target for this challenge evaluation.';
  }

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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
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
          RISK &amp; PROP FIRM TOOLS
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
          Size every trade. Protect every account.
        </h1>
        <p style={{ margin: 0, color: 'var(--muted)', fontSize: '15px' }}>
          Math-first position sizing and prop-firm drawdown guards so one bad trade never terminates your evaluation.
        </p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'flex-start' }}>
        {/* Tool 1: Position Size Calculator */}
        <section
          aria-label="Position size calculator"
          style={{
            flex: '1 1 440px',
            minWidth: 0,
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Calculator size={22} weight="light" style={{ color: 'var(--blue-soft)' }} />
            <h2 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '20px', color: 'var(--text)' }}>
              Position size calculator
            </h2>
          </div>

          {/* Form fields */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label htmlFor="rc-bal" style={{ fontSize: '12px', color: 'var(--muted)' }}>Account balance ($)</label>
              <input
                id="rc-bal"
                type="number"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                style={{
                  minHeight: '44px',
                  padding: '0 10px',
                  borderRadius: '10px',
                  border: '1px solid var(--line-strong)',
                  backgroundColor: 'var(--bg)',
                  color: 'var(--text)',
                  fontFamily: 'var(--font-ibm-plex-mono)',
                  fontSize: '14px',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label htmlFor="rc-risk" style={{ fontSize: '12px', color: 'var(--muted)' }}>Risk per trade (%)</label>
              <input
                id="rc-risk"
                type="number"
                step="0.1"
                value={riskPct}
                onChange={(e) => setRiskPct(e.target.value)}
                style={{
                  minHeight: '44px',
                  padding: '0 10px',
                  borderRadius: '10px',
                  border: '1px solid var(--line-strong)',
                  backgroundColor: 'var(--bg)',
                  color: 'var(--text)',
                  fontFamily: 'var(--font-ibm-plex-mono)',
                  fontSize: '14px',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label htmlFor="rc-pair" style={{ fontSize: '12px', color: 'var(--muted)' }}>Market</label>
              <select
                id="rc-pair"
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
                <option>AUDUSD</option>
                <option>USDJPY</option>
                <option>USDCAD</option>
                <option>USDCHF</option>
                <option>XAUUSD</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label htmlFor="rc-sl" style={{ fontSize: '12px', color: 'var(--muted)' }}>Stop loss (pips)</label>
              <input
                id="rc-sl"
                type="number"
                value={stopLoss}
                onChange={(e) => setStopLoss(e.target.value)}
                style={{
                  minHeight: '44px',
                  padding: '0 10px',
                  borderRadius: '10px',
                  border: '1px solid var(--line-strong)',
                  backgroundColor: 'var(--bg)',
                  color: 'var(--text)',
                  fontFamily: 'var(--font-ibm-plex-mono)',
                  fontSize: '14px',
                }}
              />
            </div>

            {needsPrice && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', gridColumn: '1 / -1' }}>
                <label htmlFor="rc-price" style={{ fontSize: '12px', color: 'var(--muted)' }}>
                  Current price (required for non-USD quoted pair)
                </label>
                <input
                  id="rc-price"
                  type="number"
                  step="0.0001"
                  value={pairPrice}
                  onChange={(e) => setPairPrice(e.target.value)}
                  style={{
                    minHeight: '44px',
                    padding: '0 10px',
                    borderRadius: '10px',
                    border: '1px solid var(--line-strong)',
                    backgroundColor: 'var(--bg)',
                    color: 'var(--text)',
                    fontFamily: 'var(--font-ibm-plex-mono)',
                    fontSize: '14px',
                  }}
                />
              </div>
            )}
          </div>

          {/* Result Card */}
          <div
            style={{
              background: 'var(--surface-2)',
              borderRadius: '14px',
              padding: '20px',
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px',
              border: '1px solid var(--line-strong)',
            }}
          >
            <div>
              <span style={{ fontSize: '12px', color: 'var(--muted)' }}>POSITION SIZE</span>
              <div style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '32px', fontWeight: 700, color: 'var(--amber)' }}>
                {safeLots.toFixed(2)} <span style={{ fontSize: '14px', color: 'var(--text)', fontWeight: 500 }}>lots</span>
              </div>
              <span style={{ fontSize: '12px', color: 'var(--dim)' }}>
                {totalUnits.toLocaleString()} units
              </span>
            </div>

            <div>
              <span style={{ fontSize: '12px', color: 'var(--muted)' }}>CAPITAL AT RISK</span>
              <div style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '32px', fontWeight: 700, color: 'var(--text)' }}>
                ${actualRiskMoney.toFixed(2)}
              </div>
              <span style={{ fontSize: '12px', color: 'var(--dim)' }}>
                ${(safeLots * pipValStandard).toFixed(2)} per pip
              </span>
            </div>
          </div>

          <p style={{ margin: 0, fontSize: '12px', color: 'var(--dim)', lineHeight: 1.5 }}>
            Calculation rounds down to 0.01 standard lots so you strictly never risk more than your chosen {riskPct}%.
          </p>
        </section>

        {/* Tool 2: Prop Firm Tracker */}
        <section
          aria-label="Prop-firm tracker"
          style={{
            flex: '1 1 440px',
            minWidth: 0,
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Gauge size={22} weight="light" style={{ color: 'var(--blue-soft)' }} />
              <h2 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '20px', color: 'var(--text)' }}>
                Prop-firm tracker
              </h2>
            </div>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: propStatusColor,
                border: `1px solid ${propStatusColor}`,
                padding: '2px 10px',
                borderRadius: '999px',
              }}
            >
              {propStatus}
            </span>
          </div>

          {/* Inputs Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label htmlFor="pf-start" style={{ fontSize: '11px', color: 'var(--muted)' }}>Starting Bal</label>
              <input
                id="pf-start"
                type="number"
                value={startBal}
                onChange={(e) => setStartBal(e.target.value)}
                style={{
                  minHeight: '40px',
                  padding: '0 8px',
                  borderRadius: '8px',
                  border: '1px solid var(--line-strong)',
                  backgroundColor: 'var(--bg)',
                  color: 'var(--text)',
                  fontFamily: 'var(--font-ibm-plex-mono)',
                  fontSize: '13px',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label htmlFor="pf-day" style={{ fontSize: '11px', color: 'var(--muted)' }}>Day Open</label>
              <input
                id="pf-day"
                type="number"
                value={dayOpenBal}
                onChange={(e) => setDayOpenBal(e.target.value)}
                style={{
                  minHeight: '40px',
                  padding: '0 8px',
                  borderRadius: '8px',
                  border: '1px solid var(--line-strong)',
                  backgroundColor: 'var(--bg)',
                  color: 'var(--text)',
                  fontFamily: 'var(--font-ibm-plex-mono)',
                  fontSize: '13px',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label htmlFor="pf-eq" style={{ fontSize: '11px', color: 'var(--muted)' }}>Equity</label>
              <input
                id="pf-eq"
                type="number"
                value={currentEquity}
                onChange={(e) => setCurrentEquity(e.target.value)}
                style={{
                  minHeight: '40px',
                  padding: '0 8px',
                  borderRadius: '8px',
                  border: '1px solid var(--line-strong)',
                  backgroundColor: 'var(--bg)',
                  color: 'var(--text)',
                  fontFamily: 'var(--font-ibm-plex-mono)',
                  fontSize: '13px',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label htmlFor="pf-dl" style={{ fontSize: '11px', color: 'var(--muted)' }}>Daily Loss %</label>
              <input
                id="pf-dl"
                type="number"
                value={dailyLossLimitPct}
                onChange={(e) => setDailyLossLimitPct(e.target.value)}
                style={{
                  minHeight: '40px',
                  padding: '0 8px',
                  borderRadius: '8px',
                  border: '1px solid var(--line-strong)',
                  backgroundColor: 'var(--bg)',
                  color: 'var(--text)',
                  fontFamily: 'var(--font-ibm-plex-mono)',
                  fontSize: '13px',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label htmlFor="pf-md" style={{ fontSize: '11px', color: 'var(--muted)' }}>Max DD %</label>
              <input
                id="pf-md"
                type="number"
                value={maxDrawdownPct}
                onChange={(e) => setMaxDrawdownPct(e.target.value)}
                style={{
                  minHeight: '40px',
                  padding: '0 8px',
                  borderRadius: '8px',
                  border: '1px solid var(--line-strong)',
                  backgroundColor: 'var(--bg)',
                  color: 'var(--text)',
                  fontFamily: 'var(--font-ibm-plex-mono)',
                  fontSize: '13px',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label htmlFor="pf-pt" style={{ fontSize: '11px', color: 'var(--muted)' }}>Target %</label>
              <input
                id="pf-pt"
                type="number"
                value={profitTargetPct}
                onChange={(e) => setProfitTargetPct(e.target.value)}
                style={{
                  minHeight: '40px',
                  padding: '0 8px',
                  borderRadius: '8px',
                  border: '1px solid var(--line-strong)',
                  backgroundColor: 'var(--bg)',
                  color: 'var(--text)',
                  fontFamily: 'var(--font-ibm-plex-mono)',
                  fontSize: '13px',
                }}
              />
            </div>
          </div>

          {/* Progress Meters */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingTop: '4px' }}>
            {/* Daily loss meter */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: 'var(--text)' }}>Daily loss consumed</span>
                <span style={{ fontFamily: 'var(--font-ibm-plex-mono)', color: 'var(--muted)' }}>
                  ${Math.max(0, sDay - sEq).toFixed(2)} of ${dlAmount.toFixed(2)} ({dailyUsedPct.toFixed(0)}%)
                </span>
              </div>
              <div style={{ height: '8px', background: 'var(--surface-2)', borderRadius: '4px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${dailyUsedPct}%`,
                    backgroundColor: dailyUsedPct > 70 ? 'var(--down)' : 'var(--amber)',
                    borderRadius: '4px',
                    transition: 'width 0.4s ease',
                  }}
                />
              </div>
            </div>

            {/* Max drawdown meter */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: 'var(--text)' }}>Max trailing drawdown consumed</span>
                <span style={{ fontFamily: 'var(--font-ibm-plex-mono)', color: 'var(--muted)' }}>
                  ${Math.max(0, sStart - sEq).toFixed(2)} of ${mdAmount.toFixed(2)} ({overallUsedPct.toFixed(0)}%)
                </span>
              </div>
              <div style={{ height: '8px', background: 'var(--surface-2)', borderRadius: '4px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${overallUsedPct}%`,
                    backgroundColor: overallUsedPct > 70 ? 'var(--down)' : 'var(--blue)',
                    borderRadius: '4px',
                    transition: 'width 0.4s ease',
                  }}
                />
              </div>
            </div>

            {/* Profit target meter */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: 'var(--text)' }}>Target progress</span>
                <span style={{ fontFamily: 'var(--font-ibm-plex-mono)', color: 'var(--up)' }}>
                  ${Math.max(0, sEq - sStart).toFixed(2)} of ${(targetAmount - sStart).toFixed(2)} ({targetAchievedPct.toFixed(0)}%)
                </span>
              </div>
              <div style={{ height: '8px', background: 'var(--surface-2)', borderRadius: '4px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${targetAchievedPct}%`,
                    backgroundColor: 'var(--up)',
                    borderRadius: '4px',
                    transition: 'width 0.4s ease',
                  }}
                />
              </div>
            </div>
          </div>

          <div
            style={{
              padding: '12px 14px',
              borderRadius: '10px',
              backgroundColor: 'var(--surface-2)',
              border: '1px solid var(--line-strong)',
              fontSize: '13px',
              color: 'var(--text)',
              lineHeight: 1.5,
            }}
          >
            {advice}
          </div>
        </section>
      </div>
    </div>
  );
}
