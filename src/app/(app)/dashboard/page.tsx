'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Broadcast,
  ArrowUpRight,
  GraduationCap,
  TelegramLogo,
  BellRinging,
  BookOpen,
  ChartBar,
  Medal,
  UsersThree,
  Copy,
  Check,
} from '@phosphor-icons/react';

const COMING_UP = [
  { label: 'US jobless claims', time: 'Thu 13:30 WAT · 12:30 GMT', high: false },
  { label: 'US non-farm payrolls', time: 'Fri 13:30 WAT · 12:30 GMT', high: true },
  { label: 'Australia retail sales', time: 'Mon 01:30 WAT · 00:30 GMT', high: false },
];

const BADGE_LIST = [
  { label: 'First quiz passed', done: true },
  { label: '7-day learning streak', done: true },
  { label: '10 trades journaled', done: true },
  { label: 'First robot backtested', done: false },
];

export default function DashboardPage() {
  const [tgConnected, setTgConnected] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        padding: 'clamp(20px, 3vw, 40px)',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        boxSizing: 'border-box',
      }}
    >
      {/* Top Header */}
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
            className="mq-rise"
            style={{
              fontFamily: 'var(--font-ibm-plex-mono)',
              fontSize: '13px',
              color: 'var(--muted)',
            }}
          >
            Wednesday · 19:35 WAT · 18:35 GMT
          </span>
          <h1
            className="mq-rise mq-d1"
            style={{
              margin: 0,
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: 'clamp(28px, 3.6vw, 42px)',
              letterSpacing: '-0.02em',
              fontWeight: 700,
              color: 'var(--text)',
            }}
          >
            Welcome back.
          </h1>
        </div>

        <span
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: '#1A1203',
            backgroundColor: 'var(--amber)',
            padding: '4px 12px',
            borderRadius: 'var(--radius-chip)',
          }}
        >
          Example data
        </span>
      </div>

      {/* Live Now Alert Banner */}
      <Link
        href="/live-desk"
        className="mq-rise"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '10px 16px',
          padding: '14px 18px',
          borderRadius: 'var(--radius-card)',
          backgroundColor: '#0D2350',
          border: '1px solid var(--line-strong)',
          textDecoration: 'none',
          color: 'var(--text)',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-ibm-plex-mono)',
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.12em',
            color: '#1A0D06',
            backgroundColor: 'var(--down)',
            padding: '3px 10px',
            borderRadius: 'var(--radius-chip)',
            flexShrink: 0,
          }}
        >
          <span
            className="mq-pulse"
            aria-hidden="true"
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: '#1A0D06',
              display: 'inline-block',
              flexShrink: 0,
            }}
          />
          LIVE NOW
        </span>

        <span style={{ fontWeight: 600, fontSize: '15px' }}>FOMC press conference</span>
        <span style={{ color: '#B9C9E6', fontSize: '15px' }}>
          Fed held rates at 19:00 WAT · watch and get a live summary
        </span>

        <span
          style={{
            marginLeft: 'auto',
            color: 'var(--blue-soft)',
            fontWeight: 600,
            fontSize: '14px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            flexShrink: 0,
          }}
        >
          Open Live Desk
          <ArrowUpRight size={14} weight="light" />
        </span>
      </Link>

      {/* Row 1: Continue Learning · Coming Up · Journal */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: '18px',
        }}
      >
        {/* Card 1: Continue Learning */}
        <section
          className="mq-rise mq-d1 mq-lift"
          style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-card)',
            padding: '22px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span
              style={{
                fontFamily: 'var(--font-ibm-plex-mono)',
                fontSize: '12px',
                letterSpacing: '0.1em',
                color: 'var(--blue-soft)',
                textTransform: 'uppercase',
              }}
            >
              Continue Learning
            </span>
            <GraduationCap size={20} weight="light" color="var(--blue-soft)" />
          </div>

          <h2
            style={{
              margin: 0,
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: '20px',
              color: 'var(--text)',
            }}
          >
            How inflation data moves currencies
          </h2>

          <span style={{ fontSize: '14px', color: 'var(--muted)' }}>
            Fundamentals · Module F3 · Lesson 3 of 6
          </span>

          <div
            style={{
              height: '8px',
              backgroundColor: 'var(--surface-2)',
              borderRadius: '4px',
              overflow: 'hidden',
            }}
          >
            <div
              className="mq-grow"
              style={{
                width: '33%',
                height: '100%',
                backgroundColor: 'var(--blue)',
                borderRadius: '4px',
              }}
            />
          </div>

          <Link
            href="/lesson"
            className="mq-btn"
            style={{
              marginTop: 'auto',
              display: 'inline-flex',
              alignItems: 'center',
              minHeight: '44px',
              padding: '0 18px',
              borderRadius: 'var(--radius-btn)',
              backgroundColor: 'var(--amber)',
              color: '#1A1203',
              fontWeight: 600,
              fontSize: '14px',
              alignSelf: 'flex-start',
            }}
          >
            Resume lesson
          </Link>
        </section>

        {/* Card 2: Coming Up */}
        <section
          className="mq-rise mq-d2 mq-lift"
          style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-card)',
            padding: '22px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span
              style={{
                fontFamily: 'var(--font-ibm-plex-mono)',
                fontSize: '12px',
                letterSpacing: '0.1em',
                color: 'var(--blue-soft)',
                textTransform: 'uppercase',
              }}
            >
              Coming Up
            </span>
            <Link href="/markets" style={{ fontSize: '13px', color: 'var(--blue-soft)' }}>
              Full calendar
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {COMING_UP.map((ev, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 0',
                  borderBottom:
                    i < COMING_UP.length - 1 ? '1px solid #12264A' : 'none',
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '15px',
                    color: 'var(--text)',
                  }}
                >
                  {ev.high && (
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--down)',
                        display: 'inline-block',
                        flexShrink: 0,
                      }}
                    />
                  )}
                  {ev.label}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-ibm-plex-mono)',
                    fontSize: '13px',
                    color: 'var(--muted)',
                    textAlign: 'right',
                    flexShrink: 0,
                  }}
                >
                  {ev.time}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Card 3: Journal This Week */}
        <section
          className="mq-rise mq-d3 mq-lift"
          style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-card)',
            padding: '22px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span
              style={{
                fontFamily: 'var(--font-ibm-plex-mono)',
                fontSize: '12px',
                letterSpacing: '0.1em',
                color: 'var(--blue-soft)',
                textTransform: 'uppercase',
              }}
            >
              Journal · This Week
            </span>
            <Link href="/journal" style={{ fontSize: '13px', color: 'var(--blue-soft)' }}>
              Open journal
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: '10px',
            }}
          >
            {[
              { label: 'Trades', value: '5', color: 'var(--text)' },
              { label: 'Win rate', value: '60%', color: 'var(--text)' },
              { label: 'Net pips', value: '+29', color: 'var(--up)' },
            ].map((stat) => (
              <div key={stat.label}>
                <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '2px' }}>
                  {stat.label}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-ibm-plex-mono)',
                    fontSize: '22px',
                    fontWeight: 600,
                    color: stat.color,
                  }}
                >
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          <span style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.5 }}>
            Most costly mistake: trading the news spike.
          </span>
        </section>

        {/* Card 4: Your Alerts */}
        <section
          className="mq-rise mq-d4 mq-lift"
          style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-card)',
            padding: '22px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span
              style={{
                fontFamily: 'var(--font-ibm-plex-mono)',
                fontSize: '12px',
                letterSpacing: '0.1em',
                color: 'var(--blue-soft)',
                textTransform: 'uppercase',
              }}
            >
              Your Alerts
            </span>
            <Link href="/alerts" style={{ fontSize: '13px', color: 'var(--blue-soft)' }}>
              Edit
            </Link>
          </div>

          {[
            'High-impact releases, 15 min before',
            'Rate decisions and central bank heads',
            'Markets: EURUSD, XAUUSD, USOIL',
          ].map((line, i) => (
            <span
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '15px',
                color: i === 0 ? 'var(--text)' : 'var(--muted)',
              }}
            >
              {i === 0 && (
                <span
                  className="mq-pulse"
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--up)',
                    display: 'inline-block',
                    flexShrink: 0,
                  }}
                />
              )}
              {line}
            </span>
          ))}

          <span style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '2px' }}>
            Delivered by Telegram and browser
          </span>
        </section>
      </div>

      {/* Achievements + Certificate */}
      <section
        className="mq-reveal"
        style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--line)',
          borderRadius: 'var(--radius-card)',
          padding: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '24px',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            flex: '1 1 320px',
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-ibm-plex-mono)',
              fontSize: '12px',
              letterSpacing: '0.1em',
              color: 'var(--amber)',
              textTransform: 'uppercase',
            }}
          >
            Achievements
          </span>
          <h2
            style={{
              margin: 0,
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: '22px',
              color: 'var(--text)',
            }}
          >
            40% to your Fundamentals certificate
          </h2>
          <div
            style={{
              height: '8px',
              backgroundColor: 'var(--surface-2)',
              borderRadius: '4px',
              overflow: 'hidden',
            }}
          >
            <div
              className="mq-grow"
              style={{
                width: '40%',
                height: '100%',
                backgroundColor: 'var(--amber)',
                borderRadius: '4px',
              }}
            />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {BADGE_LIST.map((b) => (
              <span
                key={b.label}
                style={{
                  fontSize: '13px',
                  border: b.done ? '1px solid var(--line-strong)' : '1px dashed var(--line-strong)',
                  borderRadius: 'var(--radius-chip)',
                  padding: '4px 12px',
                  color: b.done ? 'var(--text)' : 'var(--dim)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
              >
                {b.done && <Medal size={13} weight="fill" color="var(--amber)" />}
                {b.label}
              </span>
            ))}
          </div>
        </div>

        {/* Certificate preview */}
        <div
          style={{
            flex: '1 1 300px',
            minWidth: 0,
            border: '1px solid #5A4417',
            borderRadius: '14px',
            padding: '22px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            textAlign: 'center',
            background: '#0D1B33',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-ibm-plex-mono)',
              fontSize: '11px',
              letterSpacing: '0.18em',
              color: 'var(--amber)',
              textTransform: 'uppercase',
            }}
          >
            Certificate of Completion
          </span>
          <span
            style={{
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: '22px',
              fontWeight: 700,
              color: 'var(--text)',
            }}
          >
            Market Fundamentals
          </span>
          <span style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.5 }}>
            MARKIQ SI Academy · unlocks when you finish all six modules
          </span>
          <span style={{ fontSize: '13px', color: 'var(--blue-soft)', marginTop: '4px' }}>
            Shareable on LinkedIn
          </span>
        </div>
      </section>

      {/* Row 3: Telegram + Invite Friends */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: '18px',
        }}
      >
        {/* Telegram Connect */}
        <section
          className="mq-reveal mq-lift"
          style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-card)',
            padding: '22px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span
              style={{
                fontFamily: 'var(--font-ibm-plex-mono)',
                fontSize: '12px',
                letterSpacing: '0.1em',
                color: 'var(--blue-soft)',
                textTransform: 'uppercase',
              }}
            >
              Telegram
            </span>
            <TelegramLogo size={20} weight="light" color="var(--blue-soft)" />
          </div>
          <h2
            style={{
              margin: 0,
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: '20px',
              color: 'var(--text)',
            }}
          >
            {tgConnected ? 'Connected to Telegram' : 'Connect your Telegram'}
          </h2>
          <p style={{ margin: 0, fontSize: '14px', color: 'var(--muted)', lineHeight: 1.5 }}>
            {tgConnected
              ? 'Your alerts and event cards arrive in the MARKIQ SI bot. You can ask it questions there too.'
              : 'Get your alerts and event cards in the MARKIQ SI Telegram bot, and ask it questions on the go.'}
          </p>
          <button
            type="button"
            onClick={() => setTgConnected((v) => !v)}
            style={{
              marginTop: 'auto',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '44px',
              padding: '0 18px',
              borderRadius: 'var(--radius-btn)',
              fontFamily: 'inherit',
              fontWeight: 600,
              fontSize: '14px',
              cursor: 'pointer',
              alignSelf: 'flex-start',
              backgroundColor: tgConnected ? 'transparent' : 'var(--button)',
              color: tgConnected ? 'var(--text)' : '#FFFFFF',
              border: tgConnected ? '1px solid var(--line-strong)' : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            {tgConnected ? 'Disconnect' : 'Connect Telegram'}
          </button>
        </section>

        {/* Invite Friends */}
        <section
          className="mq-reveal mq-lift"
          style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-card)',
            padding: '22px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span
              style={{
                fontFamily: 'var(--font-ibm-plex-mono)',
                fontSize: '12px',
                letterSpacing: '0.1em',
                color: 'var(--blue-soft)',
                textTransform: 'uppercase',
              }}
            >
              Invite Friends
            </span>
            <UsersThree size={20} weight="light" color="var(--blue-soft)" />
          </div>
          <h2
            style={{
              margin: 0,
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: '20px',
              color: 'var(--text)',
            }}
          >
            Learn together
          </h2>
          <p style={{ margin: 0, fontSize: '14px', color: 'var(--muted)', lineHeight: 1.5 }}>
            Share your link. When a friend joins during the beta, you both get early access to the full platform.
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <label
              htmlFor="ref-link"
              style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0 0 0 0)' }}
            >
              Your invite link
            </label>
            <input
              id="ref-link"
              type="text"
              readOnly
              value="markiqsi.com/invite/your-code"
              style={{
                flex: 1,
                minWidth: 0,
                minHeight: '44px',
                padding: '0 12px',
                borderRadius: 'var(--radius-btn)',
                border: '1px solid var(--line-strong)',
                background: 'var(--bg)',
                color: 'var(--muted)',
                fontFamily: 'var(--font-ibm-plex-mono)',
                fontSize: '13px',
              }}
            />
            <button
              type="button"
              onClick={copyLink}
              aria-label="Copy invite link"
              style={{
                minHeight: '44px',
                padding: '0 16px',
                borderRadius: 'var(--radius-btn)',
                border: '1px solid var(--line-strong)',
                background: 'var(--surface-2)',
                color: 'var(--text)',
                fontFamily: 'inherit',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease',
                flexShrink: 0,
              }}
            >
              {copied ? (
                <>
                  <Check size={14} weight="bold" color="var(--up)" />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={14} weight="light" />
                  Copy
                </>
              )}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
