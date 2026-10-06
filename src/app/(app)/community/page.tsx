'use client';

import React, { useState } from 'react';
import {
  UsersThree,
  ChatCircleDots,
  ShieldCheck,
  PaperPlaneTilt,
  CheckCircle,
  CalendarCheck,
  GraduationCap,
  Sparkle,
  Plus,
} from '@phosphor-icons/react';

interface Reply {
  id: string;
  name: string;
  tag?: 'AI tutor' | 'Mentor' | '';
  text: string;
  when: string;
}

interface Thread {
  id: number;
  lesson: string;
  title: string;
  replies: Reply[];
}

const INITIAL_THREADS: Thread[] = [
  {
    id: 0,
    lesson: 'F3 · Lesson 3',
    title: 'Why does a hot CPI sometimes weaken the dollar?',
    replies: [
      {
        id: 'r1',
        name: 'Student (Ibrahim)',
        tag: '',
        text: 'In the lesson it says hot CPI usually lifts USD, but last month it fell right after the release. Why?',
        when: '4h ago',
      },
      {
        id: 'r2',
        name: 'MarkIQ SI Tutor',
        tag: 'AI tutor',
        text: 'Markets react to everything at once. If traders already expected a hot number (pricing it in beforehand), or if other news like weakening consumer sentiment outweighed it, the usual reaction can flip. That is why the cards say "usually", not "always".',
        when: '3h ago',
      },
      {
        id: 'r3',
        name: 'Mentor (Naheem)',
        tag: 'Mentor',
        text: 'Also check the core figure vs headline. Frequently headline is hot due to a temporary oil surge, but core is cool. Institutional desks trade the core print.',
        when: '2h ago',
      },
    ],
  },
  {
    id: 1,
    lesson: 'T2 · Lesson 4',
    title: 'How do you tell a real breakout from a fake one?',
    replies: [
      {
        id: 'r4',
        name: 'Student (Amara)',
        tag: '',
        text: 'My breakouts keep failing on the 15-minute chart. Any systematic checklist before entering?',
        when: '6h ago',
      },
      {
        id: 'r5',
        name: 'Mentor (Naheem)',
        tag: 'Mentor',
        text: 'Wait for a full candle body to close beyond the key level, and observe whether the immediate retest holds with lower volume. Also check your Journal: if your 15m breakout win rate is below 40%, step up to the 1H or 4H timeframe.',
        when: '5h ago',
      },
    ],
  },
  {
    id: 2,
    lesson: 'A2 · Lesson 2',
    title: 'My EA compiles but never opens a trade on MT5 demo',
    replies: [
      {
        id: 'r6',
        name: 'Student (David)',
        tag: '',
        text: 'The MQL5 code generated from Strategy Lab compiled with 0 errors, but nothing happens on my demo account.',
        when: '12h ago',
      },
      {
        id: 'r7',
        name: 'MarkIQ SI Tutor',
        tag: 'AI tutor',
        text: 'Three quick things to verify: 1) Is the "Algo Trading" button pressed green in your MT5 terminal header? 2) In the EA inputs dialog under Common, is "Allow Algo Trading" ticked? 3) Check the Experts tab at the bottom of MT5 for any initialization error codes.',
        when: '11h ago',
      },
    ],
  },
  {
    id: 3,
    lesson: 'T5 · Lesson 1',
    title: 'Is 1% risk per trade too small for a small account?',
    replies: [
      {
        id: 'r8',
        name: 'Student (Fatima)',
        tag: '',
        text: 'With a $250 starting account, 1% risk is only $2.50. It feels like it will take forever to grow. Should I risk 5% instead?',
        when: '1d ago',
      },
      {
        id: 'r9',
        name: 'Mentor (Naheem)',
        tag: 'Mentor',
        text: 'Small risk keeps you in the game while you learn. If you risk 5% and hit a normal 6-trade losing streak, you lose 30% of your account and psychological tilt takes over. Grow your discipline and edge first; capital comes easily once your statistics prove consistency.',
        when: '20h ago',
      },
    ],
  },
];

interface StudyGroup {
  id: string;
  name: string;
  when: string;
  desc: string;
  size: string;
  focus: string;
}

const STUDY_GROUPS: StudyGroup[] = [
  {
    id: 'sg-fund',
    name: 'Fundamentals study group',
    when: 'Tuesdays · 19:00 WAT (18:00 GMT)',
    desc: 'Go through the week’s big releases together, dissect central bank speeches, and quiz each other on macro mechanics.',
    size: '28 members',
    focus: 'Macroeconomics & Rates',
  },
  {
    id: 'sg-price',
    name: 'Price action practice',
    when: 'Thursdays · 20:00 WAT (19:00 GMT)',
    desc: 'Replay charts together bar-by-bar in Chart Lab, mark support/resistance, and compare entries without risking capital.',
    size: '35 members',
    focus: 'Chart Analysis & Replay',
  },
  {
    id: 'sg-robots',
    name: 'Robot builders & MQL5',
    when: 'Saturdays · 11:00 WAT (10:00 GMT)',
    desc: 'Share MQL5 logic, troubleshoot Strategy Lab EA scripts, review backtest statistics, and discuss automated risk controls.',
    size: '21 members',
    focus: 'Algorithmic Systems',
  },
  {
    id: 'sg-prop',
    name: 'Prop challenge accountability',
    when: 'Daily check-in · 08:30 WAT',
    desc: 'Post your daily risk plan and daily stop limit before London open. Keep each other accountable to never blow maximum drawdown limits.',
    size: '46 members',
    focus: 'Risk Management',
  },
];

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<'Discussions' | 'Study groups'>('Discussions');
  const [activeThreadIndex, setActiveThreadIndex] = useState<number>(0);
  const [threads, setThreads] = useState<Thread[]>(INITIAL_THREADS);
  const [replyDraft, setReplyDraft] = useState('');
  const [joinedGroups, setJoinedGroups] = useState<string[]>(['sg-fund']);
  const [newThreadModal, setNewThreadModal] = useState(false);
  const [newThreadTitle, setNewThreadTitle] = useState('');
  const [newThreadLesson, setNewThreadLesson] = useState('F1 · Lesson 1');
  const [newThreadBody, setNewThreadBody] = useState('');

  const currentThread = threads[activeThreadIndex] || threads[0];

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    const text = replyDraft.trim();
    if (!text) return;

    setThreads((prev) =>
      prev.map((th, idx) => {
        if (idx !== activeThreadIndex) return th;
        const newReply: Reply = {
          id: 'r_' + Date.now(),
          name: 'You',
          tag: '',
          text,
          when: 'just now',
        };
        return {
          ...th,
          replies: [...th.replies, newReply],
        };
      })
    );
    setReplyDraft('');
  };

  const handleCreateThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newThreadTitle.trim() || !newThreadBody.trim()) return;

    const newThread: Thread = {
      id: threads.length,
      lesson: newThreadLesson,
      title: newThreadTitle.trim(),
      replies: [
        {
          id: 'r_orig_' + Date.now(),
          name: 'You',
          tag: '',
          text: newThreadBody.trim(),
          when: 'just now',
        },
      ],
    };

    setThreads([newThread, ...threads]);
    setActiveThreadIndex(0);
    setNewThreadModal(false);
    setNewThreadTitle('');
    setNewThreadBody('');
  };

  const toggleGroupJoin = (groupId: string) => {
    setJoinedGroups((prev) =>
      prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]
    );
  };

  return (
    <div
      style={{
        padding: '32px clamp(16px, 3vw, 40px) 80px',
        maxWidth: '1360px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      {/* Header and Tabs */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
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
            <UsersThree size={16} weight="light" color="var(--blue-soft)" />
            <span>LEARN TOGETHER</span>
          </div>
          <h1
            style={{
              margin: 0,
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: 'clamp(28px, 3.6vw, 42px)',
              letterSpacing: '-0.02em',
              fontWeight: 700,
              color: 'var(--text)',
            }}
          >
            Learn with other traders.
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: '15px',
              color: 'var(--muted)',
              maxWidth: '680px',
            }}
          >
            Engage with peer learners, certified mentors, and the MarkIQ SI Tutor.
            Focused entirely on learning, conceptual depth, and risk discipline.
          </p>
        </div>

        {/* Section Tabs */}
        <div
          role="tablist"
          aria-label="Community sections"
          style={{
            display: 'flex',
            gap: '4px',
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: '12px',
            padding: '4px',
          }}
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'Discussions'}
            onClick={() => setActiveTab('Discussions')}
            style={{
              minHeight: '40px',
              padding: '0 18px',
              borderRadius: '8px',
              border: 'none',
              fontFamily: 'inherit',
              fontSize: '14px',
              cursor: 'pointer',
              background: activeTab === 'Discussions' ? 'var(--button)' : 'transparent',
              color: activeTab === 'Discussions' ? '#FFFFFF' : 'var(--muted)',
              fontWeight: activeTab === 'Discussions' ? 600 : 400,
              transition: 'all 0.25s ease',
            }}
          >
            Discussions
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'Study groups'}
            onClick={() => setActiveTab('Study groups')}
            style={{
              minHeight: '40px',
              padding: '0 18px',
              borderRadius: '8px',
              border: 'none',
              fontFamily: 'inherit',
              fontSize: '14px',
              cursor: 'pointer',
              background: activeTab === 'Study groups' ? 'var(--button)' : 'transparent',
              color: activeTab === 'Study groups' ? '#FFFFFF' : 'var(--muted)',
              fontWeight: activeTab === 'Study groups' ? 600 : 400,
              transition: 'all 0.25s ease',
            }}
          >
            Study groups
          </button>
        </div>
      </div>

      {/* Code of Conduct Banner */}
      <div
        style={{
          border: '1px solid var(--line-strong)',
          borderRadius: '12px',
          padding: '14px 18px',
          fontSize: '14px',
          color: '#B9C9E6',
          background: 'rgba(8, 21, 48, 0.85)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <ShieldCheck size={22} weight="light" color="var(--amber)" style={{ flexShrink: 0 }} />
        <span>
          <strong>Community Rule:</strong> Be kind, explain your thinking, and share reasoning.
          Strictly no trade signals, paid call solicitations, or account-management offers allowed.
        </span>
      </div>

      {/* DISCUSSIONS TAB */}
      {activeTab === 'Discussions' && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            alignItems: 'flex-start',
          }}
        >
          {/* Thread list column */}
          <section
            aria-label="Discussion Threads"
            style={{
              flex: '1 1 340px',
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '4px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-ibm-plex-mono)',
                  fontSize: '12px',
                  color: 'var(--dim)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                Topics ({threads.length})
              </span>

              <button
                type="button"
                onClick={() => setNewThreadModal(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  background: 'var(--surface-2)',
                  border: '1px solid var(--line-strong)',
                  color: 'var(--text)',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                <Plus size={14} weight="bold" />
                <span>Ask question</span>
              </button>
            </div>

            {threads.map((t, idx) => {
              const isSelected = idx === activeThreadIndex;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveThreadIndex(idx)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '6px',
                    width: '100%',
                    textAlign: 'left',
                    padding: '16px',
                    borderRadius: '14px',
                    fontFamily: 'inherit',
                    color: 'var(--text)',
                    cursor: 'pointer',
                    background: isSelected ? 'var(--surface-2)' : 'var(--surface)',
                    border: isSelected ? '1px solid var(--blue)' : '1px solid var(--line)',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? '0 4px 16px rgba(4, 16, 40, 0.4)' : 'none',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-ibm-plex-mono)',
                      fontSize: '12px',
                      color: 'var(--blue-soft)',
                      fontWeight: 500,
                    }}
                  >
                    {t.lesson}
                  </span>
                  <span
                    style={{
                      fontWeight: 600,
                      fontSize: '15px',
                      lineHeight: 1.4,
                      color: 'var(--text)',
                    }}
                  >
                    {t.title}
                  </span>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '13px',
                      color: 'var(--dim)',
                      marginTop: '4px',
                    }}
                  >
                    <ChatCircleDots size={14} weight="light" />
                    <span>{t.replies.length} replies</span>
                  </div>
                </button>
              );
            })}
          </section>

          {/* Active Thread view */}
          <section
            aria-label="Active Thread Conversation"
            style={{
              flex: '2 1 500px',
              minWidth: 0,
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: '16px',
              padding: 'clamp(20px, 3vw, 28px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              boxShadow: '0 8px 24px rgba(2, 8, 24, 0.3)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-ibm-plex-mono)',
                  fontSize: '12px',
                  color: 'var(--blue-soft)',
                  fontWeight: 600,
                }}
              >
                {currentThread.lesson}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-ibm-plex-mono)',
                  fontSize: '12px',
                  color: 'var(--dim)',
                }}
              >
                Thread ID #{currentThread.id + 101}
              </span>
            </div>

            <h2
              style={{
                margin: 0,
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: '22px',
                lineHeight: 1.35,
                color: 'var(--text)',
              }}
            >
              {currentThread.title}
            </h2>

            {/* Posts / Replies */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                marginTop: '4px',
              }}
            >
              {currentThread.replies.map((p) => {
                const isYou = p.name === 'You';
                const isTutor = p.tag === 'AI tutor';
                const isMentor = p.tag === 'Mentor';

                return (
                  <div
                    key={p.id}
                    className="mq-rise"
                    style={{
                      display: 'flex',
                      gap: '14px',
                      padding: '16px 0',
                      borderTop: '1px solid var(--line)',
                    }}
                  >
                    {/* Avatar initial */}
                    <div
                      aria-hidden="true"
                      style={{
                        flexShrink: 0,
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'var(--font-space-grotesk)',
                        fontWeight: 700,
                        fontSize: '15px',
                        background: isYou
                          ? 'var(--button)'
                          : isTutor
                          ? 'rgba(74, 157, 255, 0.2)'
                          : 'var(--surface-2)',
                        color: isYou
                          ? '#FFFFFF'
                          : isTutor
                          ? 'var(--blue)'
                          : isMentor
                          ? 'var(--amber)'
                          : 'var(--blue-soft)',
                        border: isTutor
                          ? '1px solid var(--blue)'
                          : '1px solid var(--line-strong)',
                      }}
                    >
                      {p.name.charAt(0)}
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                        minWidth: 0,
                        flex: 1,
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '8px',
                          alignItems: 'center',
                        }}
                      >
                        <span style={{ fontWeight: 600, fontSize: '15px', color: 'var(--text)' }}>
                          {p.name}
                        </span>

                        {p.tag === 'AI tutor' && (
                          <span
                            style={{
                              fontSize: '11px',
                              fontWeight: 600,
                              padding: '2px 8px',
                              borderRadius: '999px',
                              background: 'var(--button)',
                              color: '#FFFFFF',
                            }}
                          >
                            AI Tutor
                          </span>
                        )}

                        {p.tag === 'Mentor' && (
                          <span
                            style={{
                              fontSize: '11px',
                              fontWeight: 600,
                              padding: '2px 8px',
                              borderRadius: '999px',
                              background: 'var(--amber)',
                              color: '#1A1203',
                            }}
                          >
                            Mentor
                          </span>
                        )}

                        <span
                          style={{
                            fontSize: '12px',
                            color: 'var(--dim)',
                            marginLeft: 'auto',
                            fontFamily: 'var(--font-ibm-plex-mono)',
                          }}
                        >
                          {p.when}
                        </span>
                      </div>

                      <div
                        style={{
                          fontSize: '15px',
                          color: '#C9D6EE',
                          lineHeight: 1.6,
                        }}
                      >
                        {p.text}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Reply Input Form */}
            <form
              onSubmit={handleSendReply}
              style={{
                display: 'flex',
                gap: '10px',
                paddingTop: '12px',
                borderTop: '1px solid var(--line)',
                alignItems: 'center',
              }}
            >
              <label
                htmlFor="community-reply-input"
                style={{
                  position: 'absolute',
                  width: '1px',
                  height: '1px',
                  overflow: 'hidden',
                  clip: 'rect(0 0 0 0)',
                }}
              >
                Write a reply
              </label>

              <input
                id="community-reply-input"
                type="text"
                value={replyDraft}
                onChange={(e) => setReplyDraft(e.target.value)}
                placeholder="Share your reasoning or ask a question…"
                style={{
                  flex: 1,
                  minWidth: 0,
                  minHeight: '46px',
                  padding: '0 16px',
                  borderRadius: '10px',
                  border: '1px solid var(--line-strong)',
                  background: 'var(--bg)',
                  color: 'var(--text)',
                  fontFamily: 'inherit',
                  fontSize: '15px',
                }}
              />

              <button
                type="submit"
                disabled={!replyDraft.trim()}
                style={{
                  minHeight: '46px',
                  padding: '0 20px',
                  borderRadius: '10px',
                  border: 'none',
                  background: replyDraft.trim() ? 'var(--button)' : 'var(--surface-2)',
                  color: replyDraft.trim() ? '#FFFFFF' : 'var(--dim)',
                  fontFamily: 'inherit',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: replyDraft.trim() ? 'pointer' : 'default',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease',
                }}
              >
                <span>Reply</span>
                <PaperPlaneTilt size={16} weight="bold" />
              </button>
            </form>
          </section>
        </div>
      )}

      {/* STUDY GROUPS TAB */}
      {activeTab === 'Study groups' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
          }}
        >
          {STUDY_GROUPS.map((g) => {
            const isJoined = joinedGroups.includes(g.id);

            return (
              <article
                key={g.id}
                className="mq-lift"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--line)',
                  borderRadius: '16px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '6px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-ibm-plex-mono)',
                      fontSize: '12px',
                      color: 'var(--amber)',
                      fontWeight: 600,
                    }}
                  >
                    {g.when}
                  </span>

                  <span
                    style={{
                      fontSize: '12px',
                      color: 'var(--dim)',
                      padding: '2px 8px',
                      background: 'var(--surface-2)',
                      borderRadius: '6px',
                    }}
                  >
                    {g.size}
                  </span>
                </div>

                <h2
                  style={{
                    margin: 0,
                    fontFamily: 'var(--font-space-grotesk)',
                    fontSize: '20px',
                    fontWeight: 600,
                    color: 'var(--text)',
                  }}
                >
                  {g.name}
                </h2>

                <p
                  style={{
                    margin: 0,
                    fontSize: '14px',
                    color: 'var(--muted)',
                    lineHeight: 1.55,
                    flex: '1 0 auto',
                  }}
                >
                  {g.desc}
                </p>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '13px',
                    color: 'var(--blue-soft)',
                  }}
                >
                  <GraduationCap size={16} weight="light" />
                  <span>Focus: {g.focus}</span>
                </div>

                <div style={{ paddingTop: '8px', marginTop: 'auto' }}>
                  <button
                    type="button"
                    onClick={() => toggleGroupJoin(g.id)}
                    style={{
                      minHeight: '44px',
                      padding: '0 20px',
                      borderRadius: '10px',
                      fontFamily: 'inherit',
                      fontWeight: 600,
                      fontSize: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.25s ease',
                      border: isJoined ? '1px solid #2E8C66' : 'none',
                      background: isJoined ? 'rgba(61, 220, 151, 0.12)' : 'var(--button)',
                      color: isJoined ? 'var(--up)' : '#FFFFFF',
                    }}
                  >
                    {isJoined ? (
                      <>
                        <CheckCircle size={16} weight="bold" />
                        <span>Joined (Meeting link in email)</span>
                      </>
                    ) : (
                      <>
                        <CalendarCheck size={16} weight="light" />
                        <span>Join group</span>
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Ask Question / New Thread Modal */}
      {newThreadModal && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(2, 6, 16, 0.75)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <form
            onSubmit={handleCreateThread}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--line-strong)',
              borderRadius: '20px',
              maxWidth: '560px',
              width: '100%',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.7)',
            }}
          >
            <h3
              style={{
                margin: 0,
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: '22px',
                color: 'var(--text)',
              }}
            >
              Ask a question to the community
            </h3>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '13px',
                  color: 'var(--muted)',
                  marginBottom: '6px',
                }}
              >
                Related Academy Lesson
              </label>
              <select
                value={newThreadLesson}
                onChange={(e) => setNewThreadLesson(e.target.value)}
                style={{
                  width: '100%',
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
                <option value="F1 · Lesson 1">F1 · Lesson 1: How Central Banks Move FX</option>
                <option value="F3 · Lesson 3">F3 · Lesson 3: The Consumer Price Index (CPI)</option>
                <option value="T2 · Lesson 4">T2 · Lesson 4: Support & Resistance Breakouts</option>
                <option value="T5 · Lesson 1">T5 · Lesson 1: Position Sizing & Risk Discipline</option>
                <option value="A1 · Lesson 2">A1 · Lesson 2: Writing MT5 Expert Advisors</option>
                <option value="General Trading">General Trading & Concept Discussion</option>
              </select>
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '13px',
                  color: 'var(--muted)',
                  marginBottom: '6px',
                }}
              >
                Question / Topic Title
              </label>
              <input
                type="text"
                value={newThreadTitle}
                onChange={(e) => setNewThreadTitle(e.target.value)}
                placeholder="e.g. When does liquidity widen the most during London open?"
                required
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  minHeight: '44px',
                  padding: '0 14px',
                  borderRadius: '10px',
                  border: '1px solid var(--line-strong)',
                  background: 'var(--bg)',
                  color: 'var(--text)',
                  fontFamily: 'inherit',
                  fontSize: '15px',
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '13px',
                  color: 'var(--muted)',
                  marginBottom: '6px',
                }}
              >
                Explain your thought process
              </label>
              <textarea
                rows={4}
                value={newThreadBody}
                onChange={(e) => setNewThreadBody(e.target.value)}
                placeholder="Describe what you observed and what you'd like guidance on…"
                required
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1px solid var(--line-strong)',
                  background: 'var(--bg)',
                  color: 'var(--text)',
                  fontFamily: 'inherit',
                  fontSize: '15px',
                  resize: 'vertical',
                }}
              />
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '10px',
                marginTop: '8px',
              }}
            >
              <button
                type="button"
                onClick={() => setNewThreadModal(false)}
                style={{
                  minHeight: '44px',
                  padding: '0 18px',
                  borderRadius: '10px',
                  border: '1px solid var(--line-strong)',
                  background: 'transparent',
                  color: 'var(--muted)',
                  fontFamily: 'inherit',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  minHeight: '44px',
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
                Post discussion
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
