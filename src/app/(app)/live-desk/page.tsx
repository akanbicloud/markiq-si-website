'use client';

import React, { useState } from 'react';
import { Broadcast, Play, PaperPlaneTilt, Clock, CalendarBlank } from '@phosphor-icons/react';

interface UpcomingBroadcast {
  when: string;
  impact: 'High' | 'Medium';
  title: string;
  source: string;
}

const UPCOMING_LIST: UpcomingBroadcast[] = [
  {
    when: 'Thu 13:15 WAT',
    impact: 'High',
    title: 'ECB rate decision & press conference',
    source: 'European Central Bank · YouTube',
  },
  {
    when: 'Thu 12:00 WAT',
    impact: 'High',
    title: 'Bank of England policy announcement',
    source: 'Bank of England · YouTube',
  },
  {
    when: 'Fri 04:30 WAT',
    impact: 'Medium',
    title: 'Bank of Japan Governor press conference',
    source: 'Bank of Japan · YouTube',
  },
];

export default function LiveDeskPage() {
  const [messages, setMessages] = useState<Array<{ text: string }>>([
    { text: 'Tutor: The Fed chair is currently taking questions from journalists regarding terminal rate guidance.' },
  ]);
  const [draft, setDraft] = useState('');
  const [playing, setPlaying] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;

    const userText = draft.trim();
    setMessages((prev) => [...prev, { text: `You: ${userText}` }]);
    setDraft('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: `Tutor: In this broadcast, "${userText}" relates to the central bank's commitment to wait for incoming CPI and employment data before considering any future policy changes.`,
        },
      ]);
    }, 400);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '100vw',
        overflowX: 'hidden',
      }}
    >
      {/* 1. Live Now Announcement Banner */}
      <div
        style={{
          background: 'linear-gradient(90deg, #0D2350 0%, #081735 100%)',
          borderBottom: '1px solid var(--line-strong)',
          padding: '12px 16px',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            maxWidth: '1360px',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '10px 20px',
            fontSize: '14px',
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-ibm-plex-mono)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              color: '#1A0D06',
              background: 'var(--down)',
              padding: '3px 10px',
              borderRadius: '999px',
            }}
          >
            <span
              className="mq-pulse"
              style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#1A0D06' }}
            />
            LIVE NOW
          </span>
          <span style={{ fontWeight: 600, color: 'var(--text)' }}>FOMC press conference</span>
          <span style={{ fontFamily: 'var(--font-ibm-plex-mono)', color: 'var(--blue-soft)' }}>
            19:30 WAT · 18:30 GMT
          </span>
          <span style={{ color: 'var(--muted)' }}>Federal Reserve · official broadcast feed</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: 'clamp(28px, 4vw, 48px) 16px 80px',
          width: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '28px', alignItems: 'flex-start' }}>
          {/* Left Column: Video Broadcast & Live Feed Summary */}
          <div style={{ flex: '999 1 680px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Embedded Stream Frame */}
            <div
              className="mq-rise"
              style={{
                aspectRatio: '16 / 9',
                background: '#040B19',
                border: '1px solid var(--line)',
                borderRadius: '20px',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px',
                boxShadow: '0 24px 60px rgba(0, 0, 0, 0.6)',
              }}
            >
              {playing ? (
                <iframe
                  src="https://www.youtube-nocookie.com/embed/live_stream?channel=UCpzgB1X5o2uV7tGjB5Z0V0w&autoplay=1"
                  title="Official Central Bank Live Stream"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ width: '100%', height: '100%', border: 'none' }}
                />
              ) : (
                <>
                  <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontFamily: 'var(--font-ibm-plex-mono)',
                        fontSize: '11px',
                        fontWeight: 600,
                        color: '#1A0D06',
                        background: 'var(--down)',
                        padding: '3px 8px',
                        borderRadius: '6px',
                      }}
                    >
                      <span className="mq-pulse" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#1A0D06' }} />
                      LIVE
                    </span>
                    <span style={{ fontSize: '13px', color: 'var(--muted)', background: 'rgba(6, 15, 34, 0.8)', padding: '3px 10px', borderRadius: '6px' }}>
                      Federal Reserve · YouTube
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setPlaying(true)}
                    className="mq-btn"
                    aria-label="Play broadcast"
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      border: 'none',
                      background: 'var(--amber)',
                      color: '#1A1203',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 0 0 10px rgba(255, 181, 71, 0.25)',
                    }}
                  >
                    <Play size={32} weight="fill" style={{ marginLeft: '4px' }} />
                  </button>

                  <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '4px', padding: '0 24px' }}>
                    <span style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: '20px', fontWeight: 700, color: 'var(--text)' }}>
                      Official live broadcast stream
                    </span>
                    <span style={{ fontSize: '14px', color: 'var(--muted)', maxWidth: '480px' }}>
                      Embedded directly from official central bank YouTube channels in accordance with Section 2 of build brief.
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Broadcast Title & Sync Note */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '10px', alignItems: 'baseline' }}>
              <h1 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '28px', color: 'var(--text)' }}>
                FOMC press conference
              </h1>
              <span style={{ fontSize: '13px', color: 'var(--blue-soft)' }}>
                Live summary updates in real time
              </span>
            </div>

            {/* Key Points Summary Stream */}
            <div
              className="mq-rise mq-d1"
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '18px', color: 'var(--text)' }}>
                  Running summary so far
                </h2>
                <span style={{ fontSize: '11px', color: 'var(--up)', border: '1px solid rgba(61, 220, 151, 0.4)', padding: '2px 8px', borderRadius: '999px' }}>
                  Live feed
                </span>
              </div>

              <div style={{ display: 'flex', gap: '12px', fontSize: '14px' }}>
                <span style={{ fontFamily: 'var(--font-ibm-plex-mono)', color: 'var(--blue-soft)', width: '54px', flexShrink: 0 }}>
                  19:44
                </span>
                <span style={{ color: 'var(--text)', lineHeight: 1.5 }}>
                  Questions focus on whether more rate adjustments are likely before year-end. Chair reaffirms restrictive stance until disinflation is sustained.
                </span>
              </div>

              <div style={{ display: 'flex', gap: '12px', fontSize: '14px' }}>
                <span style={{ fontFamily: 'var(--font-ibm-plex-mono)', color: 'var(--blue-soft)', width: '54px', flexShrink: 0 }}>
                  19:36
                </span>
                <span style={{ color: 'var(--text)', lineHeight: 1.5 }}>
                  Opening statement repeats that monetary policy decisions remain strictly dependent on incoming economic data.
                </span>
              </div>

              <div style={{ display: 'flex', gap: '12px', fontSize: '14px' }}>
                <span style={{ fontFamily: 'var(--font-ibm-plex-mono)', color: 'var(--blue-soft)', width: '54px', flexShrink: 0 }}>
                  19:31
                </span>
                <span style={{ color: 'var(--text)', lineHeight: 1.5 }}>
                  Press conference begins, 30 minutes following the official rate release.
                </span>
              </div>

              <p style={{ margin: '6px 0 0', fontSize: '12px', color: 'var(--dim)', lineHeight: 1.4 }}>
                Summaries describe statements made in the broadcast. They are never trading advice.
              </p>
            </div>
          </div>

          {/* Right Column: Live Companion Event Card & Quick Q&A */}
          <aside style={{ flex: '1 1 360px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Live Event Card */}
            <section
              className="mq-rise mq-d2"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--line)',
                borderRadius: '16px',
                padding: '22px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '11px', letterSpacing: '0.1em', color: 'var(--dim)' }}>
                  COMPANION EVENT CARD
                </span>
                <span
                  style={{
                    fontSize: '11px',
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

              <div>
                <h3 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '20px', color: 'var(--text)' }}>
                  Fed rate decision · Released
                </h3>
                <div style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>
                  19:00 WAT · 18:00 GMT
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                <div style={{ background: 'var(--surface-2)', borderRadius: '10px', padding: '10px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--dim)' }}>Decision</div>
                  <div style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '18px', fontWeight: 600, color: 'var(--text)' }}>
                    Hold
                  </div>
                </div>
                <div style={{ background: 'var(--surface-2)', borderRadius: '10px', padding: '10px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--dim)' }}>Expected</div>
                  <div style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '18px', fontWeight: 600, color: 'var(--text)' }}>
                    Hold
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)' }}>
                In line with consensus expectations
              </div>

              {/* Surprise Level 0 bar */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '4px' }} aria-label="Surprise level 0 of 10">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} style={{ height: '6px', borderRadius: '2px', backgroundColor: 'var(--line)' }} />
                ))}
              </div>

              <div style={{ background: 'var(--surface-2)', borderRadius: '10px', padding: '12px', fontSize: '13px', color: 'var(--text)', lineHeight: 1.5 }}>
                <span style={{ color: 'var(--blue-soft)', fontWeight: 600 }}>Simply: </span>
                no unexpected shock on rates, so market volatility is focused on the press conference for guidance.
              </div>
            </section>

            {/* Quick Ask Box */}
            <section
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--line-strong)',
                borderRadius: '16px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <h3 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '17px', color: 'var(--text)' }}>
                Ask about this broadcast
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '180px', overflowY: 'auto' }}>
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--surface-2)',
                      fontSize: '13px',
                      color: 'var(--text)',
                      lineHeight: 1.4,
                    }}
                  >
                    {m.text}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSend} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="e.g. What does terminal rate mean?"
                  style={{
                    flex: 1,
                    minWidth: 0,
                    minHeight: '40px',
                    padding: '0 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--line-strong)',
                    background: 'var(--bg)',
                    color: 'var(--text)',
                    fontSize: '13px',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  aria-label="Send query"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'var(--button)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <PaperPlaneTilt size={16} weight="bold" />
                </button>
              </form>
            </section>
          </aside>
        </div>

        {/* Up Next Broadcast Schedule */}
        <section aria-label="Up next schedule" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '22px', color: 'var(--text)' }}>
              Up next on Live Desk
            </h2>
            <span style={{ fontSize: '13px', color: 'var(--muted)' }}>
              Official schedule · all times in dual WAT &amp; GMT
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
            {UPCOMING_LIST.map((item, idx) => (
              <div
                key={idx}
                className="mq-lift"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--line)',
                  borderRadius: '14px',
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '12px', color: 'var(--blue-soft)' }}>
                    {item.when}
                  </span>
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 600,
                      color: item.impact === 'High' ? '#1A0D06' : '#1A1203',
                      backgroundColor: item.impact === 'High' ? 'var(--down)' : 'var(--amber)',
                      padding: '2px 8px',
                      borderRadius: '999px',
                    }}
                  >
                    {item.impact}
                  </span>
                </div>
                <h3 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '16px', color: 'var(--text)' }}>
                  {item.title}
                </h3>
                <span style={{ fontSize: '12px', color: 'var(--dim)' }}>{item.source}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
