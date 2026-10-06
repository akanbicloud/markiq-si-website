'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  VideoCamera,
  PencilSimple,
  Question,
  CheckCircle,
  ChatCircleDots,
  SquaresFour,
  Stack,
  ChartLineUp,
  Robot,
  Compass,
} from '@phosphor-icons/react';

import { SANITY_COURSES } from '@/sanity/coursesData';

interface Course {
  code: string;
  track: 'Fundamentals' | 'Technicals' | 'Automation';
  title: string;
  level: string;
  summary: string;
  recommended?: boolean;
}

const COURSES_DATA: Course[] = SANITY_COURSES.map((c) => ({
  code: c.code,
  track: c.track,
  title: c.title,
  level: c.level,
  summary: c.description,
  recommended: c.recommended,
}));

const TRACK_COLORS = {
  Fundamentals: '#7DB8FF',
  Technicals: '#3DDC97',
  Automation: '#FFB547',
};

const TRACK_TINTS = {
  Fundamentals: '#173C78',
  Technicals: '#0F4A44',
  Automation: '#4A3A1A',
};

// Generative cover art generator
function generateCoverArt(course: Course) {
  let seed = 7;
  for (let i = 0; i < course.code.length; i++) {
    seed = (seed * 31 + course.code.charCodeAt(i)) % 233280;
  }
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  if (course.track === 'Technicals') {
    let price = 50;
    const candles: Array<{
      wickLeft: number;
      lo: number;
      height: number;
      bodyLeft: number;
      bodyBottom: number;
      bodyHeight: number;
      up: boolean;
    }> = [];

    for (let i = 0; i < 15; i++) {
      const open = price;
      price = Math.max(18, Math.min(82, price + (rand() - 0.45) * 16));
      const hi = Math.max(open, price) + rand() * 7;
      const lo = Math.min(open, price) - rand() * 7;
      const up = price >= open;
      const x = 30 + i * 4.6;

      candles.push({
        wickLeft: x,
        lo,
        height: Math.max(4, hi - lo),
        bodyLeft: x,
        bodyBottom: Math.min(open, price),
        bodyHeight: Math.max(2, Math.abs(price - open)),
        up,
      });
    }

    return (
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {candles.map((c, idx) => (
          <React.Fragment key={idx}>
            <span
              style={{
                position: 'absolute',
                left: `calc(${c.wickLeft}% + 3px)`,
                width: '1px',
                bottom: `${c.lo}%`,
                height: `${c.height}%`,
                backgroundColor: c.up ? 'var(--up)' : 'var(--down)',
                opacity: 0.55,
              }}
            />
            <span
              style={{
                position: 'absolute',
                left: `${c.bodyLeft}%`,
                width: '7px',
                borderRadius: '1px',
                bottom: `${c.bodyBottom}%`,
                height: `${c.bodyHeight}%`,
                backgroundColor: c.up ? 'var(--up)' : 'var(--down)',
              }}
            />
          </React.Fragment>
        ))}
      </div>
    );
  }

  if (course.track === 'Fundamentals') {
    let h = 25 + rand() * 15;
    const bars: Array<{ left: number; height: number; isLast: boolean; opacity: number }> = [];
    const n = 12;

    for (let i = 0; i < n; i++) {
      h = Math.max(14, Math.min(78, h + (rand() - 0.4) * 14));
      const isLast = i === n - 1;
      bars.push({
        left: 34 + i * 5.4,
        height: h,
        isLast,
        opacity: isLast ? 1 : 0.35 + i * 0.045,
      });
    }

    const dashedBottom = 40 + rand() * 20;

    return (
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {bars.map((b, idx) => (
          <span
            key={idx}
            style={{
              position: 'absolute',
              left: `${b.left}%`,
              bottom: 0,
              width: '4.2%',
              height: `${b.height}%`,
              borderRadius: '3px 3px 0 0',
              background: b.isLast
                ? 'var(--amber)'
                : `linear-gradient(180deg, ${TRACK_COLORS.Fundamentals}, rgba(125, 184, 255, 0.12))`,
              opacity: b.opacity,
            }}
          />
        ))}
        <span
          style={{
            position: 'absolute',
            left: '30%',
            right: 0,
            bottom: `${dashedBottom}%`,
            borderTop: '1px dashed rgba(234, 241, 255, 0.4)',
          }}
        />
      </div>
    );
  }

  // Automation: Neural / node network
  const pts: Array<{ x: number; y: number; val: number }> = [];
  for (let row = 0; row < 3; row++) {
    for (let colI = 0; colI < 5; colI++) {
      pts.push({ x: 38 + colI * 13, y: 22 + row * 28, val: rand() });
    }
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {pts.map((p, i) => (
        <React.Fragment key={i}>
          {i % 5 !== 4 && p.val > 0.3 && (
            <span
              style={{
                position: 'absolute',
                left: `${p.x}%`,
                top: `calc(${p.y}% + 4px)`,
                width: '13%',
                height: '1px',
                backgroundColor: 'rgba(255, 181, 71, 0.35)',
              }}
            />
          )}
          {i < 10 && p.val < 0.55 && (
            <span
              style={{
                position: 'absolute',
                left: `calc(${p.x}% + 4px)`,
                top: `${p.y}%`,
                width: '1px',
                height: '28%',
                backgroundColor: 'rgba(255, 181, 71, 0.25)',
              }}
            />
          )}
        </React.Fragment>
      ))}
      {pts.map((p, idx) => {
        const on = p.val > 0.72;
        return (
          <span
            key={idx}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: '9px',
              height: '9px',
              borderRadius: '50%',
              backgroundColor: on ? 'var(--amber)' : '#081530',
              border: on ? '1px solid var(--amber)' : '1px solid rgba(255, 181, 71, 0.6)',
              boxShadow: on ? '0 0 14px rgba(255, 181, 71, 0.7)' : 'none',
              boxSizing: 'border-box',
            }}
          />
        );
      })}
    </div>
  );
}

export default function AcademyPage() {
  const [selectedTrack, setSelectedTrack] = useState<'All' | 'Fundamentals' | 'Technicals' | 'Automation'>('All');

  const filteredCourses = useMemo(() => {
    if (selectedTrack === 'All') return COURSES_DATA;
    return COURSES_DATA.filter((c) => c.track === selectedTrack);
  }, [selectedTrack]);

  const countLabel = `${filteredCourses.length} ${
    filteredCourses.length === 1 ? 'course' : 'courses'
  } ${selectedTrack === 'All' ? 'across three tracks' : `in ${selectedTrack}`}`;

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
      {/* 1. Academy Hero Header */}
      <section
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: 'clamp(48px, 6vw, 80px) 16px clamp(36px, 5vw, 56px)',
          display: 'flex',
          flexDirection: 'column',
          gap: '22px',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
          <span
            style={{
              fontFamily: 'var(--font-ibm-plex-mono)',
              fontSize: '12px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--blue-soft)',
            }}
          >
            MarkIQ SI ACADEMY
          </span>
          <span
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--muted)',
              border: '1px solid var(--line-strong)',
              padding: '2px 10px',
              borderRadius: '999px',
            }}
          >
            Launching soon
          </span>
        </div>

        <h1
          className="mq-rise mq-d1"
          style={{
            margin: 0,
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: 'clamp(32px, 5vw, 58px)',
            lineHeight: 1.05,
            letterSpacing: '-0.025em',
            maxWidth: '880px',
            color: 'var(--text)',
          }}
        >
          From your first chart to your first trading robot.
        </h1>

        <p
          className="mq-rise mq-d2"
          style={{
            margin: 0,
            fontSize: 'clamp(16px, 2.2vw, 19px)',
            color: 'var(--muted)',
            maxWidth: '720px',
            lineHeight: 1.6,
          }}
        >
          Three tracks that systematically build on each other: understand why markets move, read the charts with precision, and automate your execution with robots, indicators and scanners.
        </p>

        <div className="hero-btn-group mq-rise mq-d3">
          <Link
            href="/lesson"
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
            Try a sample lesson
          </Link>

          <Link
            href="#how"
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
            How the Academy works
          </Link>
        </div>
      </section>

      {/* 2. How Every Lesson Works (5 steps) */}
      <section
        id="how"
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
            padding: 'clamp(48px, 6vw, 72px) 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
            boxSizing: 'border-box',
          }}
        >
          <h2
            style={{
              margin: 0,
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: 'clamp(26px, 3.5vw, 34px)',
              letterSpacing: '-0.02em',
              color: 'var(--text)',
            }}
          >
            How every lesson works
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '18px',
            }}
          >
            <div
              className="mq-lift"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-card)',
                padding: '22px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '26px', color: 'var(--blue)', fontWeight: 600 }}>
                1
              </div>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '19px' }}>Watch</h3>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: '14px', lineHeight: 1.5 }}>
                A concise video lesson focused on core mechanics, with clear visual summaries underneath for rapid review.
              </p>
            </div>

            <div
              className="mq-lift"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-card)',
                padding: '22px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '26px', color: 'var(--blue)', fontWeight: 600 }}>
                2
              </div>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '19px' }}>Write</h3>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: '14px', lineHeight: 1.5 }}>
                Explain the key concept in your own words. Active recall is what locks economic intuition in place.
              </p>
            </div>

            <div
              className="mq-lift"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-card)',
                padding: '22px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '26px', color: 'var(--blue)', fontWeight: 600 }}>
                3
              </div>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '19px' }}>Quiz</h3>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: '14px', lineHeight: 1.5 }}>
                Scenario-based questions covering this lesson plus spaced-repetition checks from previous topics.
              </p>
            </div>

            <div
              className="mq-lift"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-card)',
                padding: '22px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '26px', color: 'var(--amber)', fontWeight: 600 }}>
                4
              </div>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '19px' }}>Pass or review</h3>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: '14px', lineHeight: 1.5 }}>
                Score 80% or more to unlock the next lesson. Below that, receive targeted guidance on what to review.
              </p>
            </div>

            <div
              className="mq-lift"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-card)',
                padding: '22px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '26px', color: 'var(--blue)', fontWeight: 600 }}>
                5
              </div>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '19px' }}>Ask anytime</h3>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: '14px', lineHeight: 1.5 }}>
                The AI Tutor sits beside every lesson. Ask questions tailored specifically to your learning curve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Finding Your Way Around (6 cards) */}
      <section
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: 'clamp(48px, 6vw, 72px) 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '28px',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '760px' }}>
          <h2
            style={{
              margin: 0,
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: 'clamp(26px, 3.5vw, 34px)',
              letterSpacing: '-0.02em',
              color: 'var(--text)',
            }}
          >
            Finding your way around
          </h2>
          <p style={{ margin: 0, color: 'var(--muted)', fontSize: '17px' }}>
            New here? This is everything you need to navigate your learning journey.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px',
          }}
        >
          <div
            className="mq-lift"
            style={{
              border: '1px solid var(--line)',
              background: 'var(--surface)',
              borderRadius: 'var(--radius-card)',
              padding: '20px',
              display: 'flex',
              gap: '14px',
            }}
          >
            <SquaresFour size={26} weight="light" style={{ color: 'var(--amber)', flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 600, color: 'var(--text)' }}>Your dashboard</div>
              <div style={{ color: 'var(--muted)', fontSize: '14px', marginTop: '4px', lineHeight: 1.5 }}>
                Tracks where you paused, your quiz mastery scores, and recommendations for what to study next.
              </div>
            </div>
          </div>

          <div
            className="mq-lift"
            style={{
              border: '1px solid var(--line)',
              background: 'var(--surface)',
              borderRadius: 'var(--radius-card)',
              padding: '20px',
              display: 'flex',
              gap: '14px',
            }}
          >
            <Stack size={26} weight="light" style={{ color: 'var(--amber)', flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 600, color: 'var(--text)' }}>Tracks, modules, lessons</div>
              <div style={{ color: 'var(--muted)', fontSize: '14px', marginTop: '4px', lineHeight: 1.5 }}>
                Each track is divided into structured modules. Pass checkpoint quizzes to advance progressively.
              </div>
            </div>
          </div>

          <div
            className="mq-lift"
            style={{
              border: '1px solid var(--line)',
              background: 'var(--surface)',
              borderRadius: 'var(--radius-card)',
              padding: '20px',
              display: 'flex',
              gap: '14px',
            }}
          >
            <ChartLineUp size={26} weight="light" style={{ color: 'var(--amber)', flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 600, color: 'var(--text)' }}>Practise in Chart Lab</div>
              <div style={{ color: 'var(--muted)', fontSize: '14px', marginTop: '4px', lineHeight: 1.5 }}>
                Replay historical price movements candle-by-candle and mark up setups to test what you learned.
              </div>
            </div>
          </div>

          <div
            className="mq-lift"
            style={{
              border: '1px solid var(--line)',
              background: 'var(--surface)',
              borderRadius: 'var(--radius-card)',
              padding: '20px',
              display: 'flex',
              gap: '14px',
            }}
          >
            <Robot size={26} weight="light" style={{ color: 'var(--amber)', flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 600, color: 'var(--text)' }}>Build in Strategy Lab</div>
              <div style={{ color: 'var(--muted)', fontSize: '14px', marginTop: '4px', lineHeight: 1.5 }}>
                Automation students convert plain language rules into algorithmic robots and test them safely.
              </div>
            </div>
          </div>

          <div
            className="mq-lift"
            style={{
              border: '1px solid var(--line)',
              background: 'var(--surface)',
              borderRadius: 'var(--radius-card)',
              padding: '20px',
              display: 'flex',
              gap: '14px',
            }}
          >
            <ChatCircleDots size={26} weight="light" style={{ color: 'var(--amber)', flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 600, color: 'var(--text)' }}>Stuck? Ask the AI Tutor</div>
              <div style={{ color: 'var(--muted)', fontSize: '14px', marginTop: '4px', lineHeight: 1.5 }}>
                Integrated into every lesson screen. Ask clarification questions without fear of judgment.
              </div>
            </div>
          </div>

          <div
            className="mq-lift"
            style={{
              border: '1px solid var(--line)',
              background: 'var(--surface)',
              borderRadius: 'var(--radius-card)',
              padding: '20px',
              display: 'flex',
              gap: '14px',
            }}
          >
            <Compass size={26} weight="light" style={{ color: 'var(--amber)', flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 600, color: 'var(--text)' }}>Not sure where to start?</div>
              <div style={{ color: 'var(--muted)', fontSize: '14px', marginTop: '4px', lineHeight: 1.5 }}>
                Begin with Fundamentals Module 1. Experienced traders can take a placement assessment to jump ahead.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Courses Directory (21 courses with generative cover art) */}
      <section
        style={{
          backgroundColor: '#081530',
          borderTop: '1px solid var(--line)',
          width: '100%',
        }}
      >
        <div
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            padding: 'clamp(48px, 6vw, 72px) 16px clamp(64px, 8vw, 96px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
            boxSizing: 'border-box',
          }}
        >
          {/* Header & Filter Controls */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '20px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h2
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-space-grotesk)',
                  fontSize: 'clamp(28px, 4vw, 36px)',
                  letterSpacing: '-0.02em',
                  color: 'var(--text)',
                }}
              >
                Courses
              </h2>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: '16px' }}>{countLabel}</p>
            </div>

            {/* Filter Pills */}
            <div
              role="group"
              aria-label="Filter by track"
              style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}
            >
              {(['All', 'Fundamentals', 'Technicals', 'Automation'] as const).map((track) => {
                const isActive = selectedTrack === track;
                return (
                  <button
                    key={track}
                    type="button"
                    onClick={() => setSelectedTrack(track)}
                    style={{
                      minHeight: '44px',
                      padding: '0 18px',
                      borderRadius: 'var(--radius-chip)',
                      fontFamily: 'inherit',
                      fontSize: '14px',
                      fontWeight: isActive ? 600 : 400,
                      cursor: 'pointer',
                      border: isActive ? '1px solid var(--text)' : '1px solid var(--line-strong)',
                      backgroundColor: isActive ? 'var(--text)' : 'transparent',
                      color: isActive ? 'var(--bg)' : 'var(--text)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {track}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Courses Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '20px',
            }}
          >
            {filteredCourses.map((c) => {
              const trackColor = TRACK_COLORS[c.track];
              const trackTint = TRACK_TINTS[c.track];

              return (
                <article
                  key={c.code}
                  className="mq-lift"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--line)',
                    borderRadius: 'var(--radius-card)',
                    padding: '22px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    overflow: 'hidden',
                  }}
                >
                  {/* Generative Visual Cover */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'relative',
                      margin: '-22px -22px 4px',
                      height: '136px',
                      overflow: 'hidden',
                      borderBottom: '1px solid var(--line)',
                      background: `radial-gradient(120% 140% at 85% 0%, ${trackTint} 0%, #081530 65%)`,
                    }}
                  >
                    {generateCoverArt(c)}
                    {/* Watermark Code */}
                    <span
                      style={{
                        position: 'absolute',
                        left: '18px',
                        bottom: '4px',
                        fontFamily: 'var(--font-space-grotesk)',
                        fontWeight: 700,
                        fontSize: '44px',
                        letterSpacing: '-0.02em',
                        color: 'rgba(234, 241, 255, 0.12)',
                        userSelect: 'none',
                      }}
                    >
                      {c.code}
                    </span>
                  </div>

                  {/* Top Tags */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-ibm-plex-mono)',
                        fontSize: '12px',
                        letterSpacing: '0.06em',
                        color: trackColor,
                        fontWeight: 500,
                      }}
                    >
                      {c.code} · {c.track}
                    </span>

                    {c.recommended && (
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          color: '#1A1203',
                          backgroundColor: 'var(--amber)',
                          padding: '2px 8px',
                          borderRadius: '999px',
                        }}
                      >
                        Recommended
                      </span>
                    )}
                  </div>

                  {/* Course Details */}
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: 'var(--font-space-grotesk)',
                      fontSize: '19px',
                      lineHeight: 1.3,
                      color: 'var(--text)',
                    }}
                  >
                    {c.title}
                  </h3>

                  <p
                    style={{
                      margin: 0,
                      color: 'var(--muted)',
                      fontSize: '14px',
                      lineHeight: 1.55,
                    }}
                  >
                    {c.summary}
                  </p>

                  {/* Bottom Level & Status */}
                  <div
                    style={{
                      marginTop: 'auto',
                      paddingTop: '10px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '13px',
                      color: 'var(--muted)',
                      borderTop: '1px solid rgba(28, 53, 99, 0.4)',
                    }}
                  >
                    <span>{c.level}</span>
                    <span
                      style={{
                        border: '1px solid var(--line-strong)',
                        borderRadius: '999px',
                        padding: '2px 10px',
                        fontSize: '12px',
                        color: 'var(--dim)',
                      }}
                    >
                      Coming soon
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
