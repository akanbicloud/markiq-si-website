import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Broadcast,
  GraduationCap,
  ChatCircleText,
  Robot,
  ChartLineUp,
  Newspaper,
  PresentationChart,
  Gauge,
  HourglassHigh,
  BookOpen,
  ShieldCheck,
  UsersThree,
  ArrowRight,
  Sparkle,
} from '@phosphor-icons/react/dist/ssr';
import TradingSessionsClock from '@/components/TradingSessionsClock';
import MarketTicker from '@/components/MarketTicker';
import EarlyAccessWaitlist from '@/components/EarlyAccessWaitlist';

export const metadata = {
  title: 'MarkIQ SI — Market Intelligence · Super Intelligence',
  description:
    'Know what moves the market. Learn to trade it. Dual WAT & GMT economic intelligence, Academy, and trading automation tools.',
};

export default function HomePage() {
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
      {/* 1. Hero Section */}
      <section
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: 'clamp(48px, 7vw, 96px) 16px clamp(48px, 6vw, 80px)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'clamp(40px, 6vw, 64px)',
          alignItems: 'center',
          boxSizing: 'border-box',
          width: '100%',
        }}
      >
        {/* Left Column: Hero Text & Actions */}
        <div
          style={{
            flex: '1 1 500px',
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          {/* Eyebrow */}
          <div
            className="mq-rise"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-ibm-plex-mono)',
              fontSize: 'clamp(11px, 2.2vw, 13px)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--amber)',
              padding: '6px 14px',
              borderRadius: 'var(--radius-chip)',
              background: 'var(--surface-2)',
              border: '1px solid var(--line-strong)',
              alignSelf: 'flex-start',
              maxWidth: '100%',
              boxSizing: 'border-box',
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: 'var(--amber)',
                display: 'inline-block',
                flexShrink: 0,
              }}
            />
            <span style={{ color: 'var(--amber)' }}>Market Intelligence · Super Intelligence</span>
          </div>

          <h1
            className="mq-rise mq-d1"
            style={{
              margin: 0,
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: 'clamp(32px, 5.2vw, 62px)',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              fontWeight: 700,
              color: 'var(--text)',
            }}
          >
            Know what moves the market. Learn to trade it.
          </h1>

          <p
            className="mq-rise mq-d2"
            style={{
              margin: 0,
              fontSize: 'clamp(16px, 2.2vw, 19px)',
              lineHeight: 1.6,
              color: 'var(--muted)',
              maxWidth: '580px',
            }}
          >
            MarkIQ SI watches economic releases, central banks and world news, explains every move in plain words, and teaches you to build your own trading tools — from your first lesson to your first robot.
          </p>

          {/* Action CTAs */}
          <div className="hero-btn-group mq-rise mq-d3">
            <Link
              href="#access"
              className="mq-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '52px',
                padding: '0 26px',
                borderRadius: 'var(--radius-btn)',
                background: 'var(--amber)',
                color: '#1A1203',
                fontWeight: 600,
                fontSize: '16px',
                boxSizing: 'border-box',
              }}
            >
              Get early access
            </Link>

            <Link
              href="/academy"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '52px',
                padding: '0 26px',
                borderRadius: 'var(--radius-btn)',
                border: '1px solid var(--line-strong)',
                color: 'var(--text)',
                fontWeight: 500,
                fontSize: '16px',
                backgroundColor: 'var(--surface)',
                boxSizing: 'border-box',
              }}
            >
              Explore the Academy
            </Link>
          </div>

          {/* Value Badges */}
          <div
            className="mq-rise mq-d4"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px 24px',
              fontSize: '14px',
              color: 'var(--muted)',
              paddingTop: '6px',
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <span aria-hidden="true" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--amber)' }} />
              Private beta on Telegram
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <span aria-hidden="true" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--amber)' }} />
              Beginner to advanced
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <span aria-hidden="true" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--amber)' }} />
              Times in WAT and GMT
            </span>
          </div>
        </div>

        {/* Right Column: Hero Telegram Phone Mockup */}
        <div
          className="mq-rise mq-d2"
          style={{
            flex: '1 1 420px',
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
            position: 'relative',
          }}
        >
          {/* Ambient Glow */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: '8% 6% 12%',
              borderRadius: '50%',
              background: 'radial-gradient(closest-side, rgba(74, 157, 255, 0.25), rgba(74, 157, 255, 0) 70%)',
              filter: 'blur(16px)',
              pointerEvents: 'none',
            }}
          />

          {/* Phone Frame */}
          <div
            className="mq-float"
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '350px',
              backgroundColor: '#02060F',
              border: '1px solid var(--line-strong)',
              borderRadius: '44px',
              padding: '12px',
              boxShadow: '0 40px 90px rgba(0, 0, 0, 0.65), inset 0 0 0 2px var(--surface)',
            }}
          >
            <div
              role="img"
              aria-label="Example: MarkIQ SI alerts arriving in Telegram on a phone"
              style={{
                backgroundColor: '#0A1630',
                borderRadius: '34px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Phone Status Bar */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 24px 6px',
                  fontFamily: 'var(--font-ibm-plex-mono)',
                  fontSize: '12px',
                  color: '#C9D6EE',
                }}
              >
                <span>13:30</span>
                <span
                  aria-hidden="true"
                  style={{
                    width: '84px',
                    height: '22px',
                    borderRadius: '999px',
                    backgroundColor: '#02060F',
                  }}
                />
                <span>5G</span>
              </div>

              {/* Telegram Channel Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 16px 12px',
                  borderBottom: '1px solid var(--line)',
                  backgroundColor: '#0D1D3D',
                }}
              >
                <span
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--button)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-space-grotesk)',
                    fontWeight: 700,
                    fontSize: '13px',
                    color: '#FFFFFF',
                  }}
                >
                  MQ
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.25 }}>
                  <span style={{ fontWeight: 600, fontSize: '15px' }}>MarkIQ SI</span>
                  <span style={{ fontSize: '12px', color: 'var(--dim)' }}>channel · live intelligence</span>
                </div>
              </div>

              {/* Feed Messages */}
              <div
                style={{
                  padding: '14px 12px 18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  background: 'linear-gradient(180deg, #0A1630 0%, #08122A 100%)',
                }}
              >
                <div
                  style={{
                    alignSelf: 'center',
                    fontSize: '11px',
                    color: 'var(--muted)',
                    background: 'var(--surface-2)',
                    padding: '2px 10px',
                    borderRadius: '999px',
                  }}
                >
                  Today
                </div>

                {/* Pre-Release Alert */}
                <div
                  style={{
                    background: 'var(--surface-2)',
                    borderRadius: '14px 14px 14px 4px',
                    padding: '10px 12px',
                    fontSize: '13px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    maxWidth: '88%',
                  }}
                >
                  <span style={{ fontWeight: 600, color: 'var(--text)' }}>In 15 min: US CPI (y/y)</span>
                  <span style={{ color: '#B9C9E6', fontSize: '12px' }}>Forecast 3.1%. Hotter usually lifts the dollar.</span>
                  <span
                    style={{
                      alignSelf: 'flex-end',
                      fontFamily: 'var(--font-ibm-plex-mono)',
                      fontSize: '10px',
                      color: 'var(--dim)',
                    }}
                  >
                    13:15 WAT · 12:15 GMT
                  </span>
                </div>

                {/* Main Event Card (Released) */}
                <div
                  style={{
                    background: 'var(--surface-2)',
                    borderRadius: '14px 14px 14px 4px',
                    padding: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '9px',
                    borderLeft: '3px solid var(--down)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 600, fontSize: '14px' }}>US CPI · Released</span>
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 600,
                        color: '#1A0D06',
                        background: 'var(--down)',
                        padding: '1px 8px',
                        borderRadius: '999px',
                      }}
                    >
                      High impact
                    </span>
                  </div>

                  {/* Numbers Grid */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '6px',
                      fontFamily: 'var(--font-ibm-plex-mono)',
                    }}
                  >
                    <div style={{ background: 'var(--surface)', borderRadius: '8px', padding: '6px 8px' }}>
                      <div style={{ fontSize: '10px', color: 'var(--muted)' }}>Actual</div>
                      <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text)' }}>3.4%</div>
                    </div>
                    <div style={{ background: 'var(--surface)', borderRadius: '8px', padding: '6px 8px' }}>
                      <div style={{ fontSize: '10px', color: 'var(--muted)' }}>Forecast</div>
                      <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text)' }}>3.1%</div>
                    </div>
                    <div style={{ background: 'var(--surface)', borderRadius: '8px', padding: '6px 8px' }}>
                      <div style={{ fontSize: '10px', color: 'var(--muted)' }}>Previous</div>
                      <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text)' }}>3.3%</div>
                    </div>
                  </div>

                  <div style={{ fontSize: '12px', color: 'var(--text)' }}>
                    Large surprise · <span style={{ color: 'var(--down)', fontWeight: 600 }}>Hotter than expected</span>
                  </div>

                  {/* Surprise Bar */}
                  <div
                    className="mq-grow"
                    style={{ display: 'flex', gap: '3px' }}
                    aria-label="Surprise level 7 of 10"
                  >
                    {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                      <span
                        key={i}
                        style={{
                          flex: 1,
                          height: '6px',
                          borderRadius: '2px',
                          backgroundColor: 'var(--down)',
                        }}
                      />
                    ))}
                    {[8, 9, 10].map((i) => (
                      <span
                        key={i}
                        style={{
                          flex: 1,
                          height: '6px',
                          borderRadius: '2px',
                          backgroundColor: 'var(--line)',
                        }}
                      />
                    ))}
                  </div>

                  {/* Plain Language Explanation */}
                  <div style={{ fontSize: '12px', color: '#C9D6EE', lineHeight: 1.4 }}>
                    <span style={{ color: 'var(--blue-soft)', fontWeight: 600 }}>Simply:</span> prices rose faster than expected, so the dollar got stronger.
                  </div>

                  {/* Interactive Mini Action Chips */}
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <span
                      style={{
                        flex: 1,
                        textAlign: 'center',
                        fontSize: '11px',
                        color: 'var(--blue-soft)',
                        border: '1px solid var(--line-strong)',
                        borderRadius: '8px',
                        padding: '5px 0',
                      }}
                    >
                      What is CPI?
                    </span>
                    <span
                      style={{
                        flex: 1,
                        textAlign: 'center',
                        fontSize: '11px',
                        color: 'var(--blue-soft)',
                        border: '1px solid var(--line-strong)',
                        borderRadius: '8px',
                        padding: '5px 0',
                      }}
                    >
                      Historical reaction
                    </span>
                  </div>

                  <span
                    style={{
                      alignSelf: 'flex-end',
                      fontFamily: 'var(--font-ibm-plex-mono)',
                      fontSize: '10px',
                      color: 'var(--dim)',
                    }}
                  >
                    13:30 WAT · 12:30 GMT
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Pulse Pill */}
          <div
            className="mq-rise mq-d4"
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--line-strong)',
              borderRadius: 'var(--radius-btn)',
              padding: '10px 14px',
              fontSize: '13px',
              boxShadow: '0 16px 40px rgba(0,0,0,0.45)',
            }}
          >
            <span
              aria-hidden="true"
              className="mq-pulse"
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--up)',
                flexShrink: 0,
              }}
            />
            <span>
              <span style={{ color: 'var(--up)', fontWeight: 600 }}>USD</span> moved to 1st in currency strength · 15 min after
            </span>
          </div>

          <div style={{ position: 'relative', fontSize: '12px', color: 'var(--dim)', textAlign: 'center' }}>
            Illustrative example. Live cards use official data and label their sources.
          </div>
        </div>
      </section>

      {/* 2. Market Ticker Strip */}
      <MarketTicker />

      {/* 3. The Platform Section (12 Tools) */}
      <section
        id="tools"
        style={{
          backgroundColor: '#081530',
          borderTop: '1px solid var(--line)',
          borderBottom: '1px solid var(--line)',
          width: '100%',
        }}
      >
        <div
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            padding: 'clamp(56px, 8vw, 96px) 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '720px' }}>
            <div
              style={{
                fontFamily: 'var(--font-ibm-plex-mono)',
                fontSize: '12px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--blue-soft)',
              }}
            >
              THE PLATFORM
            </div>
            <h2
              style={{
                margin: 0,
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: 'clamp(30px, 4.5vw, 44px)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: 'var(--text)',
              }}
            >
              Everything you need to understand, learn and build.
            </h2>
          </div>

          {/* 12 Tools Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
            }}
          >
            {/* Tool 1 */}
            <div
              className="mq-lift"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-card)',
                padding: '26px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Broadcast size={32} weight="light" style={{ color: 'var(--blue-soft)' }} />
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#04140C', background: 'var(--up)', padding: '3px 10px', borderRadius: '999px' }}>
                  Private beta
                </span>
              </div>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '22px', color: 'var(--amber)' }}>Live Intelligence</h3>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: '15px', lineHeight: 1.55 }}>
                A card before and after every major release, rate decision and market-moving headline. One card per event, updated as it develops — no spam.
              </p>
              <Link href="#access" style={{ marginTop: 'auto', fontWeight: 600, color: 'var(--blue-soft)', fontSize: '15px' }}>
                Join the Telegram beta →
              </Link>
            </div>

            {/* Tool 2 */}
            <div
              className="mq-lift"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-card)',
                padding: '26px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <GraduationCap size={32} weight="light" style={{ color: 'var(--blue-soft)' }} />
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)', border: '1px solid var(--line-strong)', padding: '2px 10px', borderRadius: '999px' }}>
                  Coming soon
                </span>
              </div>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '22px', color: 'var(--amber)' }}>Academy</h3>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: '15px', lineHeight: 1.55 }}>
                Fundamentals, technical analysis and trading automation, step by step. Every lesson ends with a quiz that tells you when you&apos;re ready to move on.
              </p>
              <Link href="/academy" style={{ marginTop: 'auto', fontWeight: 600, color: 'var(--blue-soft)', fontSize: '15px' }}>
                See the courses →
              </Link>
            </div>

            {/* Tool 3 */}
            <div
              className="mq-lift"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-card)',
                padding: '26px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <ChatCircleText size={32} weight="light" style={{ color: 'var(--blue-soft)' }} />
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)', border: '1px solid var(--line-strong)', padding: '2px 10px', borderRadius: '999px' }}>
                  Coming soon
                </span>
              </div>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '22px', color: 'var(--amber)' }}>AI Tutor</h3>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: '15px', lineHeight: 1.55 }}>
                Ask anything about what you&apos;ve learned, any time. Answers are tied to your lessons and explained at your exact level.
              </p>
              <Link href="/lesson" style={{ marginTop: 'auto', fontWeight: 600, color: 'var(--blue-soft)', fontSize: '15px' }}>
                Try a sample lesson →
              </Link>
            </div>

            {/* Tool 4 */}
            <div
              className="mq-lift"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-card)',
                padding: '26px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Robot size={32} weight="light" style={{ color: 'var(--blue-soft)' }} />
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)', border: '1px solid var(--line-strong)', padding: '2px 10px', borderRadius: '999px' }}>
                  Coming soon
                </span>
              </div>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '22px', color: 'var(--amber)' }}>Strategy Lab</h3>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: '15px', lineHeight: 1.55 }}>
                Describe your strategy in plain words. MarkIQ SI turns it into a trading robot you can backtest and demo-test before going near a live account.
              </p>
              <Link href="/strategy-lab" style={{ marginTop: 'auto', fontWeight: 600, color: 'var(--blue-soft)', fontSize: '15px' }}>
                See how it works →
              </Link>
            </div>

            {/* Tool 5 */}
            <div
              className="mq-lift"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-card)',
                padding: '26px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <ChartLineUp size={32} weight="light" style={{ color: 'var(--blue-soft)' }} />
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)', border: '1px solid var(--line-strong)', padding: '2px 10px', borderRadius: '999px' }}>
                  Coming soon
                </span>
              </div>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '22px', color: 'var(--amber)' }}>Chart Lab</h3>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: '15px', lineHeight: 1.55 }}>
                Charts for currencies, gold, oil, indices and crypto. Replay the past bar by bar, mark it up, and test your ideas on history.
              </p>
              <Link href="/chart-lab" style={{ marginTop: 'auto', fontWeight: 600, color: 'var(--blue-soft)', fontSize: '15px' }}>
                Open Chart Lab →
              </Link>
            </div>

            {/* Tool 6 */}
            <div
              className="mq-lift"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-card)',
                padding: '26px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Newspaper size={32} weight="light" style={{ color: 'var(--blue-soft)' }} />
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)', border: '1px solid var(--line-strong)', padding: '2px 10px', borderRadius: '999px' }}>
                  Coming soon
                </span>
              </div>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '22px', color: 'var(--amber)' }}>News Feed</h3>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: '15px', lineHeight: 1.55 }}>
                Wars, central banks, data and oil shocks, each summed up in a few lines with how gold, the dollar and other markets reacted.
              </p>
              <Link href="/news" style={{ marginTop: 'auto', fontWeight: 600, color: 'var(--blue-soft)', fontSize: '15px' }}>
                Read the feed →
              </Link>
            </div>

            {/* Tool 7 */}
            <div
              className="mq-lift"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-card)',
                padding: '26px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <PresentationChart size={32} weight="light" style={{ color: 'var(--blue-soft)' }} />
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)', border: '1px solid var(--line-strong)', padding: '2px 10px', borderRadius: '999px' }}>
                  Coming soon
                </span>
              </div>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '22px', color: 'var(--amber)' }}>Live Desk</h3>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: '15px', lineHeight: 1.55 }}>
                Watch Fed and central bank broadcasts live, with a running summary and the event card updating beside the stream.
              </p>
              <Link href="/live-desk" style={{ marginTop: 'auto', fontWeight: 600, color: 'var(--blue-soft)', fontSize: '15px' }}>
                Open the Live Desk →
              </Link>
            </div>

            {/* Tool 8 */}
            <div
              className="mq-lift"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-card)',
                padding: '26px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Gauge size={32} weight="light" style={{ color: 'var(--blue-soft)' }} />
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)', border: '1px solid var(--line-strong)', padding: '2px 10px', borderRadius: '999px' }}>
                  Coming soon
                </span>
              </div>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '22px', color: 'var(--amber)' }}>Market Dashboard</h3>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: '15px', lineHeight: 1.55 }}>
                Currency strength, the economic calendar in your local time, and the latest event cards all unified on one screen.
              </p>
              <Link href="/markets" style={{ marginTop: 'auto', fontWeight: 600, color: 'var(--blue-soft)', fontSize: '15px' }}>
                See the dashboard →
              </Link>
            </div>

            {/* Tool 9 */}
            <div
              className="mq-lift"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-card)',
                padding: '26px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <HourglassHigh size={32} weight="light" style={{ color: 'var(--blue-soft)' }} />
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)', border: '1px solid var(--line-strong)', padding: '2px 10px', borderRadius: '999px' }}>
                  Coming soon
                </span>
              </div>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '22px', color: 'var(--amber)' }}>Reaction Explorer</h3>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: '15px', lineHeight: 1.55 }}>
                See what usually happened to any market after CPI, jobs reports and rate decisions, split by hotter and cooler surprises.
              </p>
              <Link href="/explorer" style={{ marginTop: 'auto', fontWeight: 600, color: 'var(--blue-soft)', fontSize: '15px' }}>
                Explore history →
              </Link>
            </div>

            {/* Tool 10 */}
            <div
              className="mq-lift"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-card)',
                padding: '26px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <BookOpen size={32} weight="light" style={{ color: 'var(--blue-soft)' }} />
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)', border: '1px solid var(--line-strong)', padding: '2px 10px', borderRadius: '999px' }}>
                  Coming soon
                </span>
              </div>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '22px', color: 'var(--amber)' }}>Trading Journal</h3>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: '15px', lineHeight: 1.55 }}>
                Log every trade, see your P&amp;L calendar, and let your own numbers show which setups and trading habits work best.
              </p>
              <Link href="/journal" style={{ marginTop: 'auto', fontWeight: 600, color: 'var(--blue-soft)', fontSize: '15px' }}>
                Open the journal →
              </Link>
            </div>

            {/* Tool 11 */}
            <div
              className="mq-lift"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-card)',
                padding: '26px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <ShieldCheck size={32} weight="light" style={{ color: 'var(--blue-soft)' }} />
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)', border: '1px solid var(--line-strong)', padding: '2px 10px', borderRadius: '999px' }}>
                  Coming soon
                </span>
              </div>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '22px', color: 'var(--amber)' }}>Risk &amp; Prop Tools</h3>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: '15px', lineHeight: 1.55 }}>
                Size every position correctly and track prop-firm daily-loss and drawdown limits before they put your evaluation account at risk.
              </p>
              <Link href="/tools" style={{ marginTop: 'auto', fontWeight: 600, color: 'var(--blue-soft)', fontSize: '15px' }}>
                Try the calculator →
              </Link>
            </div>

            {/* Tool 12 */}
            <div
              className="mq-lift"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-card)',
                padding: '26px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <UsersThree size={32} weight="light" style={{ color: 'var(--blue-soft)' }} />
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)', border: '1px solid var(--line-strong)', padding: '2px 10px', borderRadius: '999px' }}>
                  Coming soon
                </span>
              </div>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '22px', color: 'var(--amber)' }}>Community</h3>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: '15px', lineHeight: 1.55 }}>
                Lesson discussions and study groups with other learners and mentors. No signals, no paid calls, just collaborative learning.
              </p>
              <Link href="/community" style={{ marginTop: 'auto', fontWeight: 600, color: 'var(--blue-soft)', fontSize: '15px' }}>
                Join the community →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. How an Event Card Works */}
      <section
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: 'clamp(56px, 8vw, 96px) 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '40px',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '720px' }}>
          <div
            style={{
              fontFamily: 'var(--font-ibm-plex-mono)',
              fontSize: '12px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--blue-soft)',
            }}
          >
            HOW AN EVENT CARD WORKS
          </div>
          <h2
            style={{
              margin: 0,
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: 'clamp(28px, 4.5vw, 42px)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: 'var(--text)',
            }}
          >
            Before, during and after — all in one card.
          </h2>
          <p style={{ margin: 0, color: 'var(--muted)', fontSize: 'clamp(15px, 2vw, 18px)', lineHeight: 1.6 }}>
            Instead of a flood of fragmented messages, each major market release gets a single card that updates itself in place as the story unfolds.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
          }}
        >
          <div style={{ borderTop: '2px solid var(--blue)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontFamily: 'var(--font-ibm-plex-mono)', color: 'var(--blue-soft)', fontSize: '13px' }}>15 min before</div>
            <h3 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '20px' }}>The heads-up</h3>
            <p style={{ margin: 0, color: 'var(--muted)', fontSize: '15px', lineHeight: 1.5 }}>
              Forecast, previous figure, and what would count as a genuine surprise — so you are calm and prepared, not hurried.
            </p>
          </div>

          <div style={{ borderTop: '2px solid var(--blue)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontFamily: 'var(--font-ibm-plex-mono)', color: 'var(--blue-soft)', fontSize: '13px' }}>At release</div>
            <h3 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '20px' }}>The number lands</h3>
            <p style={{ margin: 0, color: 'var(--muted)', fontSize: '15px', lineHeight: 1.5 }}>
              Actual versus forecast, the surprise level metric, and which direction it pushed the currency — directly confirmed by official data.
            </p>
          </div>

          <div style={{ borderTop: '2px solid var(--blue)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontFamily: 'var(--font-ibm-plex-mono)', color: 'var(--blue-soft)', fontSize: '13px' }}>15 and 60 min after</div>
            <h3 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '20px' }}>The reaction</h3>
            <p style={{ margin: 0, color: 'var(--muted)', fontSize: '15px', lineHeight: 1.5 }}>
              Currency strength shifts before and after, tracking how the assets and indices that matter actually reacted.
            </p>
          </div>

          <div style={{ borderTop: '2px solid var(--amber)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontFamily: 'var(--font-ibm-plex-mono)', color: 'var(--amber)', fontSize: '13px' }}>Context</div>
            <h3 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '20px' }}>The history</h3>
            <p style={{ margin: 0, color: 'var(--muted)', fontSize: '15px', lineHeight: 1.5 }}>
              What usually happened after comparable releases in the past, with sample sizes clearly stated — never a speculative trade signal.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Live Trading Sessions Clock Section */}
      <section
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: 'clamp(40px, 6vw, 80px) 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            maxWidth: '700px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-ibm-plex-mono)',
              fontSize: '12px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--blue-soft)',
            }}
          >
            TRADING SESSIONS · LIVE CLOCK
          </span>
          <h2
            style={{
              margin: 0,
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: 'clamp(28px, 4.5vw, 42px)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: 'var(--text)',
            }}
          >
            The market never sleeps. Here&apos;s when it moves, in your time.
          </h2>
          <p style={{ margin: 0, color: 'var(--muted)', fontSize: 'clamp(15px, 2vw, 17px)' }}>
            Sydney, Tokyo, London and New York, shown in WAT and adjusted automatically when daylight saving time changes.
          </p>
        </div>

        {/* Dynamic Trading Sessions Clock Component */}
        <TradingSessionsClock />
      </section>

      {/* 6. Academy Track Preview Section */}
      <section
        style={{
          backgroundColor: '#081530',
          borderTop: '1px solid var(--line)',
          borderBottom: '1px solid var(--line)',
          width: '100%',
        }}
      >
        <div
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            padding: 'clamp(56px, 8vw, 96px) 16px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '48px',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ flex: '1 1 380px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div
              style={{
                fontFamily: 'var(--font-ibm-plex-mono)',
                fontSize: '12px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--blue-soft)',
              }}
            >
              MarkIQ SI ACADEMY
            </div>
            <h2
              style={{
                margin: 0,
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: 'clamp(30px, 4vw, 42px)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: 'var(--text)',
              }}
            >
              Learn the market. Then automate it.
            </h2>
            <p style={{ margin: 0, color: 'var(--muted)', fontSize: 'clamp(15px, 2vw, 18px)', lineHeight: 1.6 }}>
              Video lessons, written exercises and quizzes that verify your understanding before you advance. Score 80% or more to unlock the next lesson — or see exactly which section to review.
            </p>
            <Link
              href="/academy"
              style={{
                alignSelf: 'flex-start',
                display: 'inline-flex',
                alignItems: 'center',
                minHeight: '48px',
                padding: '0 24px',
                borderRadius: 'var(--radius-btn)',
                border: '1px solid var(--line-strong)',
                color: 'var(--text)',
                fontWeight: 600,
                fontSize: '15px',
                backgroundColor: 'var(--surface)',
              }}
            >
              Browse all 21 courses →
            </Link>
          </div>

          <div
            style={{
              flex: '2 1 540px',
              minWidth: 0,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '18px',
            }}
          >
            <div
              className="mq-lift"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-card)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '12px', color: 'var(--blue-soft)', letterSpacing: '0.08em' }}>
                TRACK 1
              </div>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '20px' }}>Fundamentals</h3>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: '14px', lineHeight: 1.55 }}>
                The economic calendar, inflation, payrolls, GDP, central bank decisions, and trading volatile news releases safely.
              </p>
            </div>

            <div
              className="mq-lift"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-card)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '12px', color: 'var(--up)', letterSpacing: '0.08em' }}>
                TRACK 2
              </div>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '20px' }}>Technicals</h3>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: '14px', lineHeight: 1.55 }}>
                Candlesticks, market structure, key indicators, building an edge, and mathematical risk management.
              </p>
            </div>

            <div
              className="mq-lift"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-card)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '12px', color: 'var(--amber)', letterSpacing: '0.08em' }}>
                TRACK 3
              </div>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '20px' }}>Automation</h3>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: '14px', lineHeight: 1.55 }}>
                Build Expert Advisors (MQL5), custom indicators, multi-pair scanners, and rigorous out-of-sample backtesting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Strategy Lab Section Teaser */}
      <section
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: 'clamp(56px, 8vw, 96px) 16px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '48px',
          alignItems: 'center',
          boxSizing: 'border-box',
          width: '100%',
        }}
      >
        <div style={{ flex: '1 1 440px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              fontFamily: 'var(--font-ibm-plex-mono)',
              fontSize: '12px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--blue-soft)',
            }}
          >
            STRATEGY LAB
          </div>
          <h2
            style={{
              margin: 0,
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: 'clamp(28px, 4vw, 42px)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: 'var(--text)',
            }}
          >
            Describe your strategy. Get a robot you can test.
          </h2>
          <p style={{ margin: 0, color: 'var(--muted)', fontSize: 'clamp(15px, 2vw, 18px)', lineHeight: 1.6 }}>
            Write your strategy rules in plain English the way you would explain them to a trader friend. MarkIQ SI translates them into executable MQL5 EA code, shows you exactly what it parsed, and guides you through backtesting and demo testing.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-ibm-plex-mono)', color: 'var(--blue-soft)', width: '24px', fontWeight: 600 }}>01</span>
              Describe your idea in plain words
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-ibm-plex-mono)', color: 'var(--blue-soft)', width: '24px', fontWeight: 600 }}>02</span>
              Review the rules MarkIQ SI understood
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-ibm-plex-mono)', color: 'var(--blue-soft)', width: '24px', fontWeight: 600 }}>03</span>
              Backtest on historical data with tick precision
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-ibm-plex-mono)', color: 'var(--blue-soft)', width: '24px', fontWeight: 600 }}>04</span>
              Run it on a demo account first
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-ibm-plex-mono)', color: 'var(--amber)', width: '24px', fontWeight: 600 }}>05</span>
              Only then connect your live broker
            </div>
          </div>

          <Link
            href="/strategy-lab"
            style={{
              alignSelf: 'flex-start',
              display: 'inline-flex',
              alignItems: 'center',
              minHeight: '48px',
              padding: '0 24px',
              borderRadius: 'var(--radius-btn)',
              background: 'var(--button)',
              color: '#FFFFFF',
              fontWeight: 600,
              fontSize: '15px',
            }}
          >
            Open Strategy Lab
          </Link>
        </div>

        {/* Translation Demo Card */}
        <div
          className="mq-lift"
          style={{
            flex: '1 1 400px',
            minWidth: 0,
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-card)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
          }}
        >
          <div style={{ fontSize: '13px', color: 'var(--muted)', fontFamily: 'var(--font-ibm-plex-mono)' }}>YOUR STRATEGY INPUT</div>
          <div
            style={{
              background: 'var(--surface-2)',
              borderRadius: 'var(--radius-btn)',
              padding: '16px',
              fontSize: '15px',
              color: 'var(--text)',
              lineHeight: 1.5,
              border: '1px solid var(--line-strong)',
            }}
          >
            Buy EURUSD on the 1-hour chart when the 20 EMA crosses above the 50 EMA and RSI is above 50. Stop 25 pips, target 50 pips. Risk 1% per trade.
          </div>

          <div style={{ fontSize: '13px', color: 'var(--muted)', fontFamily: 'var(--font-ibm-plex-mono)' }}>WHAT MarkIQ SI PARSED</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '13px' }}>
            <span style={{ border: '1px solid var(--line-strong)', background: 'var(--surface-2)', borderRadius: '8px', padding: '6px 12px', color: 'var(--blue-soft)' }}>
              EURUSD · H1
            </span>
            <span style={{ border: '1px solid var(--line-strong)', background: 'var(--surface-2)', borderRadius: '8px', padding: '6px 12px', color: 'var(--up)' }}>
              EMA 20 ↗ EMA 50
            </span>
            <span style={{ border: '1px solid var(--line-strong)', background: 'var(--surface-2)', borderRadius: '8px', padding: '6px 12px', color: 'var(--blue-soft)' }}>
              RSI(14) &gt; 50
            </span>
            <span style={{ border: '1px solid var(--line-strong)', background: 'var(--surface-2)', borderRadius: '8px', padding: '6px 12px', color: 'var(--amber)' }}>
              SL 25 · TP 50
            </span>
            <span style={{ border: '1px solid var(--line-strong)', background: 'var(--surface-2)', borderRadius: '8px', padding: '6px 12px', color: 'var(--text)' }}>
              Risk 1%
            </span>
          </div>

          <div style={{ fontSize: '13px', color: 'var(--dim)', borderTop: '1px solid var(--line)', paddingTop: '14px', lineHeight: 1.4 }}>
            Past and backtested results never guarantee future performance. Live accounts unlock only after thorough demo validation.
          </div>
        </div>
      </section>

      {/* 8. Built on Three Promises Section */}
      <section
        style={{
          backgroundColor: '#081530',
          borderTop: '1px solid var(--line)',
          borderBottom: '1px solid var(--line)',
          width: '100%',
        }}
      >
        <div
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            padding: 'clamp(56px, 8vw, 96px) 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '36px',
            boxSizing: 'border-box',
          }}
        >
          <h2
            style={{
              margin: 0,
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: 'clamp(28px, 4vw, 38px)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              maxWidth: '760px',
              color: 'var(--text)',
            }}
          >
            Built on three unbreakable promises.
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '28px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '21px', color: 'var(--blue-soft)' }}>
                Data first, AI second
              </h3>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: '15px', lineHeight: 1.55 }}>
                Numbers come from official statistical agencies and verified central banks, verified by deterministic code. The intelligence explains and synthesizes — it never invents data.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '21px', color: 'var(--up)' }}>
                Describes, never advises
              </h3>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: '15px', lineHeight: 1.55 }}>
                We show what happened, why, and what historical data reports. You retain full control of your risk — what you trade is always your own deliberate choice.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '21px', color: 'var(--amber)' }}>
                Honest by default
              </h3>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: '15px', lineHeight: 1.55 }}>
                Small historical samples, delayed feeds, and missing prices are always prominently disclosed — never masked behind confident assumptions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Founder Section */}
      <section
        aria-labelledby="founder-title"
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: 'clamp(56px, 8vw, 96px) 16px',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'clamp(32px, 5vw, 56px)',
            alignItems: 'center',
          }}
        >
          {/* Founder Photo */}
          <div style={{ flex: '0 1 320px', minWidth: 0, margin: '0 auto' }}>
            <div
              style={{
                position: 'relative',
                borderRadius: '24px',
                padding: '1px',
                background: 'linear-gradient(160deg, #4A9DFF 0%, #1C3563 45%, #FFB547 100%)',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '4 / 5',
                  overflow: 'hidden',
                  borderRadius: '23px',
                }}
              >
                <Image
                  src="/founder.jpg"
                  alt="Oloyede Naheem Pelumi, founder of MarkIQ SI"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 320px"
                  priority
                />
              </div>
              <span
                style={{
                  position: 'absolute',
                  left: '14px',
                  bottom: '14px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(6, 15, 34, 0.88)',
                  border: '1px solid var(--line-strong)',
                  borderRadius: '999px',
                  padding: '6px 14px',
                  fontSize: '12px',
                  color: 'var(--text)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span
                  aria-hidden="true"
                  style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--up)' }}
                />
                Founder · MarkIQ SI
              </span>
            </div>
          </div>

          {/* Founder Bio */}
          <div style={{ flex: '1 1 480px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <span
              style={{
                fontFamily: 'var(--font-ibm-plex-mono)',
                fontSize: '12px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--blue-soft)',
              }}
            >
              WHO&apos;S BEHIND MarkIQ SI
            </span>

            <h2
              id="founder-title"
              style={{
                margin: 0,
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: 'clamp(28px, 4vw, 40px)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: 'var(--text)',
              }}
            >
              Built by a trader, for traders.
            </h2>

            <p style={{ margin: 0, color: 'var(--text)', fontSize: 'clamp(16px, 2vw, 18px)', lineHeight: 1.6 }}>
              I&apos;ve been actively trading since 2021. Through CPI surprises, emergency rate hikes, and geopolitical breaking headlines, market prices consistently moved long before commentators explained why.
            </p>

            <p style={{ margin: 0, color: 'var(--muted)', fontSize: 'clamp(15px, 2vw, 17px)', lineHeight: 1.6 }}>
              Holding a BSc in Computer Science and working as an AI and machine learning engineer, I built what was missing: official macroeconomic data verified deterministically, explained in plain language, paired with deep education and tools that enable you to think independently.
            </p>

            {/* Skill Tags */}
            <div role="list" aria-label="Founder background" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {[
                'AI & machine learning',
                'Deep learning',
                'Computer vision',
                'Data analytics',
                'Python & MQL5',
                'Cybersecurity',
              ].map((skill) => (
                <span
                  key={skill}
                  role="listitem"
                  style={{
                    fontSize: '13px',
                    color: 'var(--text)',
                    border: '1px solid var(--line-strong)',
                    backgroundColor: 'var(--surface)',
                    borderRadius: 'var(--radius-chip)',
                    padding: '5px 14px',
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.3, paddingTop: '6px' }}>
              <span style={{ fontWeight: 600, fontSize: '18px', fontFamily: 'var(--font-space-grotesk)' }}>
                Oloyede Naheem Pelumi
              </span>
              <span style={{ fontSize: '14px', color: 'var(--dim)' }}>
                Founder, MarkIQ SI · AI &amp; Machine Learning Engineer
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Early Access Waitlist Form */}
      <EarlyAccessWaitlist />
    </div>
  );
}
