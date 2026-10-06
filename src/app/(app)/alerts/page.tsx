'use client';

import React, { useState } from 'react';
import { Bell, Check, TelegramLogo, Envelope, Desktop, Clock } from '@phosphor-icons/react';

export default function AlertsSettingsPage() {
  const [channels, setChannels] = useState({
    tg: true,
    email: false,
    browser: true,
  });

  const [impact, setImpact] = useState<'All' | 'High'>('High');
  const [topics, setTopics] = useState<string[]>(['Rate decisions', 'Inflation', 'Jobs']);
  const [markets, setMarkets] = useState<string[]>(['EURUSD', 'XAUUSD', 'USOIL']);
  const [timing, setTiming] = useState({
    t15: true,
    release: true,
    h60: false,
  });

  const [quietFrom, setQuietFrom] = useState('23:00');
  const [quietTo, setQuietTo] = useState('06:00');
  const [saved, setSaved] = useState(false);

  const allTopics = [
    'Rate decisions',
    'Inflation',
    'Jobs',
    'GDP',
    'Central bank speeches',
    'Geopolitics',
  ];

  const allMarkets = [
    'EURUSD',
    'GBPUSD',
    'USDJPY',
    'AUDUSD',
    'USDCAD',
    'XAUUSD',
    'USOIL',
    'US500',
  ];

  const toggleTopic = (t: string) => {
    setTopics((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
    setSaved(false);
  };

  const toggleMarket = (m: string) => {
    setMarkets((prev) => (prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
  };

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
          NOTIFICATION SETTINGS
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
          Only what matters to you.
        </h1>
        <p style={{ margin: 0, color: 'var(--muted)', fontSize: '15px' }}>
          Choose what MarkIQ SI tells you about, where, and when — with zero noise.
        </p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'flex-start' }}>
        {/* Left Settings Column */}
        <div style={{ flex: '999 1 540px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Section 1: Where to Send */}
          <section
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
            <h2 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '20px', color: 'var(--text)' }}>
              Where to send alerts
            </h2>

            {/* Telegram channel switch */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '16px',
                padding: '12px 0',
                borderTop: '1px solid var(--line)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <TelegramLogo size={24} weight="light" style={{ color: 'var(--blue-soft)' }} />
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text)' }}>Telegram bot &amp; channel</div>
                  <div style={{ fontSize: '13px', color: 'var(--muted)' }}>
                    Instant card alerts with surprise bars and dual WAT &amp; GMT times
                  </div>
                </div>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={channels.tg}
                onClick={() => {
                  setChannels((c) => ({ ...c, tg: !c.tg }));
                  setSaved(false);
                }}
                style={{
                  width: '48px',
                  height: '28px',
                  borderRadius: '999px',
                  border: 'none',
                  backgroundColor: channels.tg ? 'var(--button)' : 'var(--surface-2)',
                  position: 'relative',
                  cursor: 'pointer',
                  padding: '2px',
                  transition: 'background-color 0.2s ease',
                }}
              >
                <span
                  style={{
                    display: 'block',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    transform: channels.tg ? 'translateX(20px)' : 'translateX(0px)',
                    transition: 'transform 0.2s ease',
                  }}
                />
              </button>
            </div>

            {/* Email Digest switch */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '16px',
                padding: '12px 0',
                borderTop: '1px solid var(--line)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Envelope size={24} weight="light" style={{ color: 'var(--blue-soft)' }} />
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text)' }}>Email morning briefing</div>
                  <div style={{ fontSize: '13px', color: 'var(--muted)' }}>
                    Daily economic calendar preview and weekly central bank outlook
                  </div>
                </div>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={channels.email}
                onClick={() => {
                  setChannels((c) => ({ ...c, email: !c.email }));
                  setSaved(false);
                }}
                style={{
                  width: '48px',
                  height: '28px',
                  borderRadius: '999px',
                  border: 'none',
                  backgroundColor: channels.email ? 'var(--button)' : 'var(--surface-2)',
                  position: 'relative',
                  cursor: 'pointer',
                  padding: '2px',
                  transition: 'background-color 0.2s ease',
                }}
              >
                <span
                  style={{
                    display: 'block',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    transform: channels.email ? 'translateX(20px)' : 'translateX(0px)',
                    transition: 'transform 0.2s ease',
                  }}
                />
              </button>
            </div>

            {/* Browser push notifications */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '16px',
                padding: '12px 0',
                borderTop: '1px solid var(--line)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Desktop size={24} weight="light" style={{ color: 'var(--blue-soft)' }} />
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text)' }}>Browser notifications</div>
                  <div style={{ fontSize: '13px', color: 'var(--muted)' }}>
                    Desktop popups when high-impact data prints while Chart Lab is open
                  </div>
                </div>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={channels.browser}
                onClick={() => {
                  setChannels((c) => ({ ...c, browser: !c.browser }));
                  setSaved(false);
                }}
                style={{
                  width: '48px',
                  height: '28px',
                  borderRadius: '999px',
                  border: 'none',
                  backgroundColor: channels.browser ? 'var(--button)' : 'var(--surface-2)',
                  position: 'relative',
                  cursor: 'pointer',
                  padding: '2px',
                  transition: 'background-color 0.2s ease',
                }}
              >
                <span
                  style={{
                    display: 'block',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    transform: channels.browser ? 'translateX(20px)' : 'translateX(0px)',
                    transition: 'transform 0.2s ease',
                  }}
                />
              </button>
            </div>
          </section>

          {/* Section 2: Which Events */}
          <section
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
            <h2 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '20px', color: 'var(--text)' }}>
              Which events
            </h2>

            {/* Impact filter */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '13px', color: 'var(--muted)' }}>Impact threshold</span>
              <div role="radiogroup" aria-label="Impact level" style={{ display: 'flex', gap: '8px' }}>
                {(['High', 'All'] as const).map((lvl) => {
                  const isSelected = impact === lvl;
                  return (
                    <button
                      key={lvl}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => {
                        setImpact(lvl);
                        setSaved(false);
                      }}
                      style={{
                        minHeight: '38px',
                        padding: '0 16px',
                        borderRadius: 'var(--radius-chip)',
                        border: isSelected ? '1px solid var(--amber)' : '1px solid var(--line-strong)',
                        backgroundColor: isSelected ? 'var(--amber)' : 'transparent',
                        color: isSelected ? '#1A1203' : 'var(--text)',
                        fontWeight: isSelected ? 600 : 400,
                        fontSize: '13px',
                        cursor: 'pointer',
                      }}
                    >
                      {lvl === 'High' ? 'High impact only' : 'All economic events'}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Topics Filter */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '13px', color: 'var(--muted)' }}>Topics of interest</span>
              <div role="group" aria-label="Topics" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {allTopics.map((topic) => {
                  const isSelected = topics.includes(topic);
                  return (
                    <button
                      key={topic}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => toggleTopic(topic)}
                      style={{
                        minHeight: '36px',
                        padding: '0 14px',
                        borderRadius: 'var(--radius-chip)',
                        border: isSelected ? '1px solid var(--blue)' : '1px solid var(--line-strong)',
                        backgroundColor: isSelected ? 'rgba(74, 157, 255, 0.15)' : 'transparent',
                        color: isSelected ? 'var(--blue-soft)' : 'var(--text)',
                        fontSize: '13px',
                        cursor: 'pointer',
                        fontWeight: isSelected ? 500 : 400,
                      }}
                    >
                      {topic}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Markets Filter */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '13px', color: 'var(--muted)' }}>Markets you trade</span>
              <div role="group" aria-label="Markets" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {allMarkets.map((mkt) => {
                  const isSelected = markets.includes(mkt);
                  return (
                    <button
                      key={mkt}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => toggleMarket(mkt)}
                      style={{
                        minHeight: '36px',
                        padding: '0 14px',
                        borderRadius: 'var(--radius-chip)',
                        fontFamily: 'var(--font-ibm-plex-mono)',
                        border: isSelected ? '1px solid var(--up)' : '1px solid var(--line-strong)',
                        backgroundColor: isSelected ? 'rgba(61, 220, 151, 0.12)' : 'transparent',
                        color: isSelected ? 'var(--up)' : 'var(--text)',
                        fontSize: '13px',
                        cursor: 'pointer',
                        fontWeight: isSelected ? 600 : 400,
                      }}
                    >
                      {mkt}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Section 3: Timing & Quiet Hours */}
          <section
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
            <h2 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '20px', color: 'var(--text)' }}>
              When to receive cards
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { id: 't15', label: '15 min before release', desc: 'Pre-event card with forecast, previous, and surprise bounds' },
                { id: 'release', label: 'At release moment', desc: 'Confirmed actual number, surprise bar, and plain-English breakdown' },
                { id: 'h60', label: '60 min after reaction', desc: 'Price extension review and shift in currency strength' },
              ].map((t) => {
                const checked = timing[t.id as keyof typeof timing];
                return (
                  <div
                    key={t.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '8px 0',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: '14px' }}>{t.label}</div>
                      <div style={{ fontSize: '13px', color: 'var(--muted)' }}>{t.desc}</div>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={checked}
                      onClick={() => {
                        setTiming((prev) => ({ ...prev, [t.id]: !checked }));
                        setSaved(false);
                      }}
                      style={{
                        width: '44px',
                        height: '24px',
                        borderRadius: '999px',
                        border: 'none',
                        backgroundColor: checked ? 'var(--button)' : 'var(--surface-2)',
                        position: 'relative',
                        cursor: 'pointer',
                        padding: '2px',
                        transition: 'background-color 0.2s ease',
                      }}
                    >
                      <span
                        style={{
                          display: 'block',
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          backgroundColor: '#FFFFFF',
                          transform: checked ? 'translateX(20px)' : 'translateX(0px)',
                          transition: 'transform 0.2s ease',
                        }}
                      />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Quiet Hours */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                alignItems: 'center',
                paddingTop: '16px',
                borderTop: '1px solid var(--line)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Clock size={20} weight="light" style={{ color: 'var(--blue-soft)' }} />
                <span style={{ fontSize: '14px', color: 'var(--text)', fontWeight: 500 }}>
                  Quiet hours (WAT):
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="time"
                  value={quietFrom}
                  onChange={(e) => setQuietFrom(e.target.value)}
                  style={{
                    minHeight: '38px',
                    padding: '0 8px',
                    borderRadius: '8px',
                    border: '1px solid var(--line-strong)',
                    background: 'var(--bg)',
                    color: 'var(--text)',
                    fontFamily: 'var(--font-ibm-plex-mono)',
                    fontSize: '13px',
                  }}
                />
                <span style={{ color: 'var(--dim)', fontSize: '13px' }}>to</span>
                <input
                  type="time"
                  value={quietTo}
                  onChange={(e) => setQuietTo(e.target.value)}
                  style={{
                    minHeight: '38px',
                    padding: '0 8px',
                    borderRadius: '8px',
                    border: '1px solid var(--line-strong)',
                    background: 'var(--bg)',
                    color: 'var(--text)',
                    fontFamily: 'var(--font-ibm-plex-mono)',
                    fontSize: '13px',
                  }}
                />
              </div>

              <span style={{ fontSize: '12px', color: 'var(--dim)' }}>
                Emergency rate decisions still come through silently.
              </span>
            </div>
          </section>

          {/* Save Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              type="button"
              onClick={handleSave}
              className="mq-btn"
              style={{
                minHeight: '50px',
                padding: '0 28px',
                borderRadius: 'var(--radius-btn)',
                border: 'none',
                background: 'var(--amber)',
                color: '#1A1203',
                fontFamily: 'inherit',
                fontWeight: 600,
                fontSize: '16px',
                cursor: 'pointer',
              }}
            >
              Save alert settings
            </button>

            {saved && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--up)', fontSize: '14px' }}>
                <Check size={18} weight="bold" />
                Settings saved successfully!
              </span>
            )}
          </div>
        </div>

        {/* Right Preview Column */}
        <aside
          style={{
            flex: '1 1 320px',
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <span style={{ fontSize: '13px', color: 'var(--muted)', fontFamily: 'var(--font-ibm-plex-mono)' }}>
            SAMPLE OF AN ALERT YOU&apos;LL RECEIVE
          </span>

          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--line-strong)',
              borderRadius: 'var(--radius-card)',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.4)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '11px', color: 'var(--blue-soft)' }}>
                MarkIQ SI · {channels.tg ? 'TELEGRAM' : 'BROWSER'}
              </span>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 600,
                  color: '#1A0D06',
                  background: 'var(--down)',
                  padding: '2px 8px',
                  borderRadius: '999px',
                }}
              >
                High impact
              </span>
            </div>

            <div style={{ fontWeight: 600, fontSize: '16px', color: 'var(--text)' }}>
              US CPI (y/y) · Released
            </div>

            <div style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '12px', color: 'var(--dim)' }}>
              13:30 WAT · 12:30 GMT
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '6px',
                fontFamily: 'var(--font-ibm-plex-mono)',
                fontSize: '12px',
              }}
            >
              <div style={{ background: 'var(--surface-2)', padding: '6px 8px', borderRadius: '6px' }}>
                <span style={{ color: 'var(--dim)', fontSize: '10px' }}>Actual</span>
                <div style={{ fontWeight: 600, color: 'var(--text)' }}>3.4%</div>
              </div>
              <div style={{ background: 'var(--surface-2)', padding: '6px 8px', borderRadius: '6px' }}>
                <span style={{ color: 'var(--dim)', fontSize: '10px' }}>Forecast</span>
                <div style={{ fontWeight: 600, color: 'var(--text)' }}>3.1%</div>
              </div>
              <div style={{ background: 'var(--surface-2)', padding: '6px 8px', borderRadius: '6px' }}>
                <span style={{ color: 'var(--dim)', fontSize: '10px' }}>Previous</span>
                <div style={{ fontWeight: 600, color: 'var(--text)' }}>3.3%</div>
              </div>
            </div>

            <div style={{ fontSize: '13px', color: '#C9D6EE', lineHeight: 1.4 }}>
              <span style={{ color: 'var(--blue-soft)', fontWeight: 600 }}>Simply:</span> prices rose faster than expected; USD gained strength across all major pairs.
            </div>
          </div>

          <div
            style={{
              background: 'rgba(74, 157, 255, 0.08)',
              border: '1px solid var(--blue)',
              borderRadius: '12px',
              padding: '14px',
              fontSize: '13px',
              color: 'var(--muted)',
              lineHeight: 1.5,
            }}
          >
            Configured for {markets.length} markets and {topics.length} topics. All timestamps automatically adjusted to your local WAT clock.
          </div>
        </aside>
      </div>
    </div>
  );
}
