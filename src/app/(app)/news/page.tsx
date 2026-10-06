'use client';

import React, { useState } from 'react';
import { Newspaper, CaretDown, CaretUp, CheckCircle, Warning } from '@phosphor-icons/react';

interface NewsStory {
  id: number;
  cat: 'Geopolitics' | 'Central banks' | 'Economic data' | 'Energy' | 'Tech';
  status: string;
  high: boolean;
  time: string;
  title: string;
  summary: string;
  moves: Array<{ asset: string; move: number }>;
  why: string;
  sources: string;
  timeline: Array<{ t: string; text: string }>;
}

const STORIES_DATA: NewsStory[] = [
  {
    id: 1,
    cat: 'Geopolitics',
    status: 'Confirmed',
    high: true,
    time: 'Today · 08:20 WAT · 07:20 GMT',
    title: 'Strikes reported near a major Gulf oil shipping route',
    summary:
      'Overnight strikes were reported close to shipping lanes that carry a large share of the world’s oil. Several tankers changed course while officials assessed the damage.',
    moves: [
      { asset: 'GOLD', move: 1.4 },
      { asset: 'OIL', move: 3.1 },
      { asset: 'USD', move: 0.3 },
      { asset: 'US500', move: -0.8 },
    ],
    why: 'Fear of an oil supply disruption pushed crude higher, and investors moved money into gold as a safe place to wait.',
    sources: '4 sources · updated 12 min ago',
    timeline: [
      { t: '05:40 · 04:40', text: 'First reports of explosions near the shipping lane.' },
      { t: '06:55 · 05:55', text: 'Two tankers confirmed to have changed course.' },
      { t: '08:20 · 07:20', text: 'Officials confirm the strikes; no damage to tankers reported.' },
    ],
  },
  {
    id: 2,
    cat: 'Central banks',
    status: 'Confirmed',
    high: true,
    time: 'Today · 19:00 WAT · 18:00 GMT',
    title: 'Fed holds rates and signals patience',
    summary:
      'The Federal Reserve kept interest rates unchanged, as expected, and said it wants more data before deciding its next move.',
    moves: [
      { asset: 'USD', move: -0.2 },
      { asset: 'GOLD', move: 0.5 },
      { asset: 'US500', move: 0.4 },
      { asset: 'EURUSD', move: 0.2 },
    ],
    why: 'No surprise on rates, but the patient tone made near-term hikes look less likely, which softened the dollar.',
    sources: 'Official statement · 6 sources',
    timeline: [
      { t: '19:00 · 18:00', text: 'Decision published: benchmark rate remains unchanged.' },
      { t: '19:30 · 18:30', text: 'Press conference begins; Chair stresses data dependence.' },
      { t: '20:15 · 19:15', text: 'Markets settle with the dollar slightly lower against majors.' },
    ],
  },
  {
    id: 3,
    cat: 'Economic data',
    status: 'Confirmed',
    high: true,
    time: 'Tuesday · 13:30 WAT · 12:30 GMT',
    title: 'US inflation comes in hotter than expected',
    summary:
      'Consumer prices rose faster than economists forecast, marking the second elevated monthly reading in a row.',
    moves: [
      { asset: 'USD', move: 0.6 },
      { asset: 'GOLD', move: -0.9 },
      { asset: 'EURUSD', move: -0.5 },
      { asset: 'US500', move: -0.7 },
    ],
    why: 'Persistent inflation makes central bank rate cuts less likely in the near term, strengthening the dollar.',
    sources: 'BLS official release · 5 sources',
    timeline: [
      { t: '13:30 · 12:30', text: 'US headline CPI prints 3.4% y/y vs 3.1% forecast.' },
      { t: '13:45 · 12:45', text: 'Treasury yields rise across the curve; dollar index touches session highs.' },
    ],
  },
  {
    id: 4,
    cat: 'Energy',
    status: 'Developing',
    high: false,
    time: 'Monday · 16:45 WAT · 15:45 GMT',
    title: 'OPEC+ ministers discuss compliance and production targets',
    summary:
      'Delegates confirmed constructive discussions ahead of next month’s quota review, focusing on adherence to agreed targets.',
    moves: [
      { asset: 'OIL', move: 0.8 },
      { asset: 'CAD', move: 0.2 },
    ],
    why: 'Strict compliance talk supports crude prices and commodity-linked currencies like the Canadian dollar.',
    sources: 'OPEC press secretariat · 3 sources',
    timeline: [
      { t: '15:30 · 14:30', text: 'Monitoring committee meeting commences.' },
      { t: '16:45 · 15:45', text: 'Joint statement emphasizes continued discipline.' },
    ],
  },
];

export default function NewsFeedPage() {
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [highOnly, setHighOnly] = useState<boolean>(false);
  const [expandedStoryIds, setExpandedStoryIds] = useState<number[]>([1]);

  const categories = ['All', 'Geopolitics', 'Central banks', 'Economic data', 'Energy', 'Tech'];

  const toggleExpand = (id: number) => {
    setExpandedStoryIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const filteredStories = STORIES_DATA.filter((story) => {
    if (selectedCat !== 'All' && story.cat !== selectedCat) return false;
    if (highOnly && !story.high) return false;
    return true;
  });

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
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: '14px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxWidth: '720px' }}>
          <div
            className="mq-rise"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-ibm-plex-mono)',
              fontSize: '12px',
              letterSpacing: '0.12em',
              color: 'var(--blue-soft)',
              textTransform: 'uppercase',
            }}
          >
            <span
              className="mq-pulse"
              aria-hidden="true"
              style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: 'var(--up)' }}
            />
            NEWS FEED &amp; REACTION
          </div>

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
            What happened, and what it moved.
          </h1>
          <p style={{ margin: 0, color: 'var(--muted)', fontSize: '15px' }}>
            Every market-moving story in a few lines: the event, how markets reacted, and why it matters.
          </p>
        </div>

        <span
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: '#1A1203',
            background: 'var(--amber)',
            padding: '4px 12px',
            borderRadius: '999px',
          }}
        >
          Example stories · provenance labeled
        </span>
      </div>

      {/* Filter Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          position: 'sticky',
          top: 0,
          zIndex: 10,
          backgroundColor: 'rgba(6, 15, 34, 0.95)',
          backdropFilter: 'blur(10px)',
          padding: '10px 0',
        }}
      >
        {/* Category Pills */}
        <div role="group" aria-label="Topic" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {categories.map((cat) => {
            const isActive = selectedCat === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCat(cat)}
                style={{
                  minHeight: '38px',
                  padding: '0 14px',
                  borderRadius: 'var(--radius-chip)',
                  fontFamily: 'inherit',
                  fontSize: '13px',
                  fontWeight: isActive ? 600 : 400,
                  cursor: 'pointer',
                  border: isActive ? '1px solid var(--text)' : '1px solid var(--line-strong)',
                  backgroundColor: isActive ? 'var(--text)' : 'transparent',
                  color: isActive ? 'var(--bg)' : 'var(--text)',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* High Impact Toggle */}
        <button
          type="button"
          role="switch"
          aria-checked={highOnly}
          onClick={() => setHighOnly(!highOnly)}
          style={{
            minHeight: '38px',
            padding: '0 14px',
            borderRadius: 'var(--radius-chip)',
            border: highOnly ? '1px solid var(--down)' : '1px solid var(--line-strong)',
            backgroundColor: highOnly ? 'rgba(255, 138, 91, 0.15)' : 'transparent',
            color: highOnly ? 'var(--down)' : 'var(--text)',
            fontFamily: 'inherit',
            fontSize: '13px',
            fontWeight: 500,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: highOnly ? 'var(--down)' : 'var(--dim)',
            }}
          />
          High impact only
        </button>
      </div>

      {/* Stories List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {filteredStories.map((story) => {
          const isExpanded = expandedStoryIds.includes(story.id);

          return (
            <article
              key={story.id}
              className="mq-rise mq-lift"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--line)',
                borderRadius: '18px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              {/* Story Top Badges & Dual Time */}
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px 12px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-ibm-plex-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: 'var(--blue-soft)',
                    border: '1px solid var(--line-strong)',
                    padding: '2px 8px',
                    borderRadius: '6px',
                  }}
                >
                  {story.cat}
                </span>

                <span
                  style={{
                    fontSize: '11px',
                    color: 'var(--up)',
                    border: '1px solid rgba(61, 220, 151, 0.4)',
                    padding: '2px 8px',
                    borderRadius: '6px',
                  }}
                >
                  {story.status}
                </span>

                {story.high && (
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#1A0D06',
                      background: 'var(--down)',
                      padding: '2px 9px',
                      borderRadius: '999px',
                    }}
                  >
                    High impact
                  </span>
                )}

                <span
                  style={{
                    marginLeft: 'auto',
                    fontFamily: 'var(--font-ibm-plex-mono)',
                    fontSize: '12px',
                    color: 'var(--muted)',
                  }}
                >
                  {story.time}
                </span>
              </div>

              {/* Title & Summary */}
              <h2
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-space-grotesk)',
                  fontSize: '22px',
                  lineHeight: 1.25,
                  color: 'var(--text)',
                }}
              >
                {story.title}
              </h2>

              <p style={{ margin: 0, color: 'var(--muted)', fontSize: '15px', lineHeight: 1.6 }}>
                {story.summary}
              </p>

              {/* Market Reaction Chips */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: 'var(--dim)', fontFamily: 'var(--font-ibm-plex-mono)' }}>
                  MARKET REACTION
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {story.moves.map((m) => {
                    const isUp = m.move >= 0;
                    const color = isUp ? 'var(--up)' : 'var(--down)';
                    return (
                      <span
                        key={m.asset}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '4px 10px',
                          borderRadius: '8px',
                          backgroundColor: 'var(--surface-2)',
                          border: '1px solid var(--line)',
                          fontSize: '13px',
                        }}
                      >
                        <span style={{ fontFamily: 'var(--font-ibm-plex-mono)', color: 'var(--text)', fontWeight: 600 }}>
                          {m.asset}
                        </span>
                        <span style={{ color, fontFamily: 'var(--font-ibm-plex-mono)', fontWeight: 500 }}>
                          {isUp ? '▲ +' : '▼ '}
                          {Math.abs(m.move)}%
                        </span>
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Why It Matters */}
              <div
                style={{
                  background: 'var(--surface-2)',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  fontSize: '14px',
                  color: 'var(--text)',
                  border: '1px solid var(--line-strong)',
                  lineHeight: 1.5,
                }}
              >
                <span style={{ color: 'var(--blue-soft)', fontWeight: 600 }}>Why it matters: </span>
                {story.why}
              </div>

              {/* Bottom Actions: Expand Timeline & Sources */}
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                <button
                  type="button"
                  aria-expanded={isExpanded}
                  onClick={() => toggleExpand(story.id)}
                  style={{
                    minHeight: '38px',
                    padding: '0 14px',
                    borderRadius: '10px',
                    border: '1px solid var(--line-strong)',
                    background: 'transparent',
                    color: 'var(--text)',
                    fontFamily: 'inherit',
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span>{isExpanded ? 'Hide timeline' : 'View timeline updates'}</span>
                  {isExpanded ? <CaretUp size={14} /> : <CaretDown size={14} />}
                </button>

                <span style={{ fontSize: '13px', color: 'var(--dim)' }}>{story.sources}</span>
              </div>

              {/* Expandable Timeline Updates */}
              {isExpanded && (
                <ol
                  className="mq-rise"
                  style={{
                    margin: 0,
                    padding: 0,
                    listStyle: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    borderTop: '1px solid var(--line)',
                    paddingTop: '16px',
                  }}
                >
                  {story.timeline.map((u, idx) => (
                    <li key={idx} style={{ display: 'flex', gap: '14px', fontSize: '14px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-ibm-plex-mono)',
                          color: 'var(--blue-soft)',
                          flexShrink: 0,
                          width: '110px',
                          fontSize: '13px',
                        }}
                      >
                        {u.t}
                      </span>
                      <span style={{ color: 'var(--text)', lineHeight: 1.5 }}>{u.text}</span>
                    </li>
                  ))}
                </ol>
              )}
            </article>
          );
        })}

        {filteredStories.length === 0 && (
          <p style={{ margin: '20px 0', color: 'var(--muted)', textAlign: 'center' }}>
            No stories match these active filters.
          </p>
        )}
      </div>

      <p style={{ margin: 0, fontSize: '12px', color: 'var(--dim)', lineHeight: 1.5 }}>
        Summaries are compiled from official statements and verified news releases, paired with real price movements. They describe past events; they are never trading advice.
      </p>
    </div>
  );
}
