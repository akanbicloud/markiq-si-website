'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Play,
  CheckCircle,
  XCircle,
  PaperPlaneTilt,
  Lock,
  CircleNotch,
  ArrowRight,
  BookOpen,
} from '@phosphor-icons/react';

interface QuizQuestion {
  tag: string;
  section: string;
  text: string;
  options: string[];
  correct: number;
  why: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    tag: 'QUESTION 1',
    section: 'Key point 1: what CPI measures',
    text: 'What does the Consumer Price Index (CPI) measure?',
    options: [
      'The total value of goods a country produces',
      'Changes in the prices consumers pay for goods and services',
      'The number of new jobs created each month',
      "The central bank's benchmark interest rate",
    ],
    correct: 1,
    why: 'CPI tracks how the prices households pay change over time. GDP measures output, and payrolls measure jobs.',
  },
  {
    tag: 'QUESTION 2',
    section: 'Key point 2: forecasts and surprises',
    text: "On the economic calendar, what is the 'forecast'?",
    options: [
      "Last month's reported figure",
      "Economists' average consensus expectation before the release",
      "The central bank's inflation target",
      'The price a currency will reach',
    ],
    correct: 1,
    why: 'The forecast is the consensus expectation. Markets react primarily to how far the actual number deviates from it.',
  },
  {
    tag: 'QUESTION 3',
    section: 'Key point 3: inflation and interest rates',
    text: 'If inflation comes in hotter than expected, a central bank is more likely to…',
    options: [
      'Cut interest rates quickly',
      'Keep rates higher for longer, or raise them',
      'Stop publishing economic data',
      'Ignore the result completely',
    ],
    correct: 1,
    why: 'Central banks battle high inflation with higher interest rates, so a hot print makes cuts less likely.',
  },
  {
    tag: 'QUESTION 4',
    section: 'Key point 3: inflation and currencies',
    text: "Higher-than-expected CPI often (not always) leads that country's currency to…",
    options: [
      'Strengthen, as markets price in higher interest rates',
      'Weaken immediately and permanently',
      'Stay completely unchanged',
      'Halt trading for the day',
    ],
    correct: 0,
    why: 'Higher expected interest rates tend to attract capital into that currency. Note "often": other geopolitical news can outweigh it.',
  },
  {
    tag: 'REVIEW · LESSON 2',
    section: 'Lesson 2: forecast, actual and surprise',
    text: "What does 'surprise' mean on a MarkIQ SI event card?",
    options: [
      'An unscheduled breaking news event',
      'The gap between the actual reported number and the forecast',
      'A sudden spike in price volatility',
      'A technical indicator divergence',
    ],
    correct: 1,
    why: 'Surprise is actual minus forecast. The larger the surprise bar, the stronger the usual immediate market reaction.',
  },
];

const SUGGESTIONS = [
  'What is the difference between headline and core CPI?',
  'Why do higher interest rates usually strengthen a currency?',
  'When does a hotter CPI fail to lift the currency?',
];

export default function LessonPage() {
  const [reflection, setReflection] = useState('');
  const [reflectionSaved, setReflectionSaved] = useState(false);

  // Quiz state
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  // AI Tutor state
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'tutor'; text: string }>>([
    { role: 'user', text: 'What is the difference between headline and core CPI?' },
    {
      role: 'tutor',
      text: 'Core CPI strips out volatile food and energy prices, which can fluctuate wildly due to weather or geopolitical shocks. It gives central banks a cleaner view of underlying inflation trends. You will study this in depth in Lesson 4.',
    },
  ]);
  const [draft, setDraft] = useState('');

  const letters = ['A', 'B', 'C', 'D'];

  // Scoring
  let correctCount = 0;
  const missedSections: string[] = [];
  QUIZ_QUESTIONS.forEach((q, i) => {
    if (answers[i] === q.correct) {
      correctCount++;
    } else {
      missedSections.push(q.section);
    }
  });

  const pct = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);
  const passed = pct >= 80;
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === QUIZ_QUESTIONS.length;

  const handleSendTutor = (textToSend?: string) => {
    const qText = textToSend || draft;
    if (!qText.trim()) return;

    const newMsgs = [...messages, { role: 'user' as const, text: qText.trim() }];
    setMessages(newMsgs);
    if (!textToSend) setDraft('');

    // Dynamic tutor contextual response
    setTimeout(() => {
      let reply =
        'Great question on macroeconomic mechanics! In this module, remember that markets are forward-looking. Whenever an economic print surprises relative to the consensus forecast, asset prices reprice the likelihood of future central bank rate adjustments.';
      if (qText.toLowerCase().includes('rate')) {
        reply =
          'Higher interest rates offer investors higher yields on fixed-income assets denominated in that currency. As global capital flows toward higher yields, demand for that currency increases, strengthening its exchange rate.';
      } else if (qText.toLowerCase().includes('fail') || qText.toLowerCase().includes('not always')) {
        reply =
          'A hot CPI might fail to lift a currency if the economy is already in a severe recession (stagflation fears), or if high rates threaten the banking sector, or if another geopolitical crisis overshadows the economic release.';
      }
      setMessages([...newMsgs, { role: 'tutor', text: reply }]);
    }, 400);
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
      {/* Top Banner & Breadcrumb */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <nav aria-label="Breadcrumb" style={{ fontSize: '14px', color: 'var(--muted)', display: 'flex', gap: '8px' }}>
          <Link href="/academy" style={{ color: 'var(--blue-soft)' }}>Academy</Link>
          <span aria-hidden="true">/</span>
          <span>Fundamentals</span>
          <span aria-hidden="true">/</span>
          <span style={{ color: 'var(--text)' }}>F3 · Inflation, jobs and growth</span>
        </nav>

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
          Sample lesson · preview
        </span>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '28px', alignItems: 'flex-start' }}>
        {/* Left Column: Lesson Content & Quiz */}
        <div style={{ flex: '999 1 640px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Title Header */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div
              style={{
                fontFamily: 'var(--font-ibm-plex-mono)',
                fontSize: '12px',
                color: 'var(--blue-soft)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              LESSON 3 OF 6 · ABOUT 18 MIN
            </div>
            <h1
              className="mq-rise"
              style={{
                margin: 0,
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: 'clamp(28px, 4vw, 42px)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: 'var(--text)',
              }}
            >
              How inflation data moves currencies
            </h1>
          </div>

          {/* Video Player Card */}
          <div
            style={{
              aspectRatio: '16 / 9',
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius-card)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '14px',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at center, rgba(31, 111, 229, 0.2) 0%, transparent 70%)',
              }}
            />
            <button
              type="button"
              className="mq-btn"
              aria-label="Play video lesson"
              style={{
                width: '76px',
                height: '76px',
                borderRadius: '50%',
                border: 'none',
                background: 'var(--amber)',
                color: '#1A1203',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 2,
                boxShadow: '0 0 0 10px rgba(255, 181, 71, 0.2)',
              }}
            >
              <Play size={32} weight="fill" style={{ marginLeft: '4px' }} />
            </button>
            <div style={{ fontSize: '14px', color: 'var(--muted)', zIndex: 2 }}>
              Video lesson · 12 min · interactive walkthrough
            </div>
          </div>

          {/* Key Points */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '24px', color: 'var(--text)' }}>
              Key points
            </h2>
            <ul
              style={{
                margin: 0,
                paddingLeft: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                color: '#C9D6EE',
                fontSize: '15px',
                lineHeight: 1.6,
              }}
            >
              <li>
                <strong style={{ color: 'var(--text)' }}>CPI</strong> tracks the percentage change in prices households pay for everyday goods and services.
              </li>
              <li>
                Markets react to the <strong style={{ color: 'var(--text)' }}>surprise</strong> — the gap between the actual figure and the consensus forecast — far more than to the raw absolute number itself.
              </li>
              <li>
                Hotter-than-expected inflation makes central bank interest rate increases or higher-for-longer policy more likely, which usually (not always) strengthens the currency.
              </li>
              <li>
                Cooler-than-expected inflation does the opposite. Always quantify the surprise level on the event card before deciding whether to take action.
              </li>
            </ul>
          </section>

          {/* Active Recall: Write in Your Own Words */}
          <section
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius-card)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div
                style={{
                  fontFamily: 'var(--font-ibm-plex-mono)',
                  fontSize: '12px',
                  color: 'var(--amber)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                WRITE IT IN YOUR OWN WORDS
              </div>
              <label htmlFor="reflection-input" style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: '18px', fontWeight: 600, color: 'var(--text)' }}>
                Why might a hotter-than-expected CPI strengthen a currency? Connect it to what you learned about forecasts in Lesson 2.
              </label>
            </div>

            <textarea
              id="reflection-input"
              rows={4}
              value={reflection}
              onChange={(e) => {
                setReflection(e.target.value);
                setReflectionSaved(false);
              }}
              placeholder="Explain the mechanism in your own words…"
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '14px',
                borderRadius: '12px',
                border: '1px solid var(--line-strong)',
                background: 'var(--bg)',
                color: 'var(--text)',
                fontFamily: 'inherit',
                fontSize: '15px',
                resize: 'vertical',
                outline: 'none',
              }}
            />

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => setReflectionSaved(true)}
                style={{
                  minHeight: '42px',
                  padding: '0 20px',
                  borderRadius: '10px',
                  border: '1px solid var(--line-strong)',
                  background: 'var(--surface-2)',
                  color: 'var(--text)',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                Save my answer
              </button>
              {reflectionSaved && (
                <span style={{ fontSize: '14px', color: 'var(--up)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle size={16} weight="bold" />
                  Saved. The AI Tutor uses your reflections to calibrate lesson responses.
                </span>
              )}
            </div>
          </section>

          {/* Interactive Quiz Section */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <h2 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '26px', color: 'var(--text)' }}>
                  Lesson checkpoint quiz
                </h2>
                <p style={{ margin: 0, color: 'var(--muted)', fontSize: '14px' }}>
                  5 scenario-based questions. Score 80% or more to advance.
                </p>
              </div>

              <span style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '13px', color: 'var(--blue-soft)' }}>
                {answeredCount} of {QUIZ_QUESTIONS.length} answered
              </span>
            </div>

            {/* Questions list */}
            {QUIZ_QUESTIONS.map((q, qi) => {
              const selectedOpt = answers[qi];
              const isCorrect = selectedOpt === q.correct;

              return (
                <fieldset
                  key={qi}
                  style={{
                    margin: 0,
                    border: '1px solid var(--line)',
                    borderRadius: '14px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    background: '#081530',
                  }}
                >
                  <legend
                    style={{
                      padding: '0 8px',
                      fontFamily: 'var(--font-ibm-plex-mono)',
                      fontSize: '12px',
                      color: 'var(--blue-soft)',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {q.tag}
                  </legend>

                  <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text)' }}>
                    {q.text}
                  </div>

                  {/* Options */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {q.options.map((optText, oi) => {
                      const isChosen = selectedOpt === oi;
                      let bg = 'var(--surface)';
                      let borderColor = 'var(--line)';
                      let textColor = 'var(--text)';

                      if (submitted) {
                        if (oi === q.correct) {
                          bg = 'rgba(61, 220, 151, 0.12)';
                          borderColor = 'var(--up)';
                          textColor = 'var(--up)';
                        } else if (isChosen) {
                          bg = 'rgba(255, 138, 91, 0.12)';
                          borderColor = 'var(--down)';
                          textColor = 'var(--down)';
                        } else {
                          textColor = 'var(--dim)';
                        }
                      } else if (isChosen) {
                        bg = 'var(--surface-2)';
                        borderColor = 'var(--blue)';
                      }

                      return (
                        <button
                          key={oi}
                          type="button"
                          disabled={submitted}
                          onClick={() => setAnswers({ ...answers, [qi]: oi })}
                          style={{
                            display: 'flex',
                            gap: '12px',
                            alignItems: 'center',
                            width: '100%',
                            boxSizing: 'border-box',
                            textAlign: 'left',
                            padding: '12px 16px',
                            borderRadius: '10px',
                            fontFamily: 'inherit',
                            fontSize: '14px',
                            color: textColor,
                            minHeight: '46px',
                            backgroundColor: bg,
                            border: `2px solid ${borderColor}`,
                            cursor: submitted ? 'default' : 'pointer',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <span style={{ fontFamily: 'var(--font-ibm-plex-mono)', color: 'var(--blue-soft)', width: '20px', flexShrink: 0 }}>
                            {letters[oi]}
                          </span>
                          <span style={{ flex: 1 }}>{optText}</span>
                          {submitted && oi === q.correct && (
                            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--up)' }}>Correct</span>
                          )}
                          {submitted && isChosen && oi !== q.correct && (
                            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--down)' }}>Your pick</span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {submitted && (
                    <div
                      style={{
                        padding: '10px 14px',
                        borderRadius: '8px',
                        backgroundColor: isCorrect ? 'rgba(61, 220, 151, 0.08)' : 'rgba(255, 138, 91, 0.08)',
                        border: isCorrect ? '1px solid var(--up)' : '1px solid var(--down)',
                        fontSize: '13px',
                        color: 'var(--text)',
                        lineHeight: 1.4,
                      }}
                    >
                      <strong style={{ color: isCorrect ? 'var(--up)' : 'var(--down)' }}>
                        {isCorrect ? 'Correct! ' : 'Explanation: '}
                      </strong>
                      {q.why}
                    </div>
                  )}
                </fieldset>
              );
            })}

            {/* Quiz Submit Button & Results */}
            {!submitted ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => setSubmitted(true)}
                  disabled={!allAnswered}
                  className="mq-btn"
                  style={{
                    minHeight: '48px',
                    padding: '0 28px',
                    borderRadius: 'var(--radius-btn)',
                    border: 'none',
                    backgroundColor: allAnswered ? 'var(--amber)' : 'var(--surface-2)',
                    color: allAnswered ? '#1A1203' : 'var(--dim)',
                    fontWeight: 600,
                    fontSize: '15px',
                    cursor: allAnswered ? 'pointer' : 'not-allowed',
                  }}
                >
                  Check my answers
                </button>
                {!allAnswered && (
                  <span style={{ fontSize: '13px', color: 'var(--dim)' }}>
                    Answer all 5 questions to verify your score.
                  </span>
                )}
              </div>
            ) : (
              <div
                className="mq-rise"
                style={{
                  background: 'var(--surface)',
                  border: `2px solid ${passed ? 'var(--up)' : 'var(--down)'}`,
                  borderRadius: '16px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px' }}>
                  <span style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '42px', fontWeight: 600, color: passed ? 'var(--up)' : 'var(--down)' }}>
                    {pct}%
                  </span>
                  <span style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: '22px', fontWeight: 700, color: 'var(--text)' }}>
                    {passed ? 'Passed! Excellent work.' : 'Review required to advance.'}
                  </span>
                </div>

                <p style={{ margin: 0, color: 'var(--muted)', fontSize: '15px' }}>
                  {passed
                    ? 'You have successfully achieved the 80% passing threshold for Lesson 3 and unlocked Lesson 4.'
                    : 'You scored below the 80% passing mark. Review the sections indicated below and retake the quiz when ready.'}
                </p>

                {!passed && missedSections.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)' }}>Sections to review:</div>
                    {missedSections.map((sec, idx) => (
                      <div key={idx} style={{ fontSize: '14px', color: '#FFC9B5' }}>
                        • {sec}
                      </div>
                    ))}
                  </div>
                )}

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  {passed ? (
                    <Link
                      href="/academy"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '46px',
                        padding: '0 24px',
                        borderRadius: 'var(--radius-btn)',
                        backgroundColor: 'var(--amber)',
                        color: '#1A1203',
                        fontWeight: 600,
                        fontSize: '15px',
                      }}
                    >
                      Continue course to Lesson 4 →
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setAnswers({});
                      }}
                      style={{
                        minHeight: '46px',
                        padding: '0 22px',
                        borderRadius: 'var(--radius-btn)',
                        border: '1px solid var(--line-strong)',
                        background: 'transparent',
                        color: 'var(--text)',
                        fontWeight: 600,
                        fontSize: '14px',
                        cursor: 'pointer',
                      }}
                    >
                      Retake quiz
                    </button>
                  )}
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Right Column: Module Progress Checklist & AI Tutor */}
        <aside style={{ flex: '1 1 340px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Module Progress Card */}
          <section
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius-card)',
              padding: '22px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '18px', color: 'var(--text)' }}>
                Module F3
              </h2>
              <span style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '12px', color: 'var(--muted)' }}>
                {passed ? '3 of 6 done' : '2 of 6 done'}
              </span>
            </div>

            {/* Progress Bar */}
            <div style={{ height: '8px', background: 'var(--surface-2)', borderRadius: '4px', overflow: 'hidden' }}>
              <div
                style={{
                  width: passed ? '50%' : '33%',
                  height: '100%',
                  background: 'var(--blue)',
                  borderRadius: '4px',
                  transition: 'width 0.4s ease',
                }}
              />
            </div>

            {/* Step list */}
            <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '14px' }}>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '8px 10px', borderRadius: '8px' }}>
                <CheckCircle size={18} weight="fill" style={{ color: 'var(--up)', flexShrink: 0 }} />
                <span style={{ flex: 1, color: 'var(--text)' }}>1. What inflation is</span>
                <span style={{ fontFamily: 'var(--font-ibm-plex-mono)', color: 'var(--up)', fontSize: '12px' }}>100%</span>
              </li>

              <li style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '8px 10px', borderRadius: '8px' }}>
                <CheckCircle size={18} weight="fill" style={{ color: 'var(--up)', flexShrink: 0 }} />
                <span style={{ flex: 1, color: 'var(--text)' }}>2. Forecast, actual &amp; surprise</span>
                <span style={{ fontFamily: 'var(--font-ibm-plex-mono)', color: 'var(--up)', fontSize: '12px' }}>80%</span>
              </li>

              <li style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '8px 10px', borderRadius: '8px', background: 'var(--surface-2)' }}>
                {passed ? (
                  <CheckCircle size={18} weight="fill" style={{ color: 'var(--up)', flexShrink: 0 }} />
                ) : (
                  <CircleNotch size={18} weight="bold" className="mq-pulse" style={{ color: 'var(--amber)', flexShrink: 0 }} />
                )}
                <span style={{ flex: 1, fontWeight: 600, color: 'var(--text)' }}>3. How inflation moves currencies</span>
                {passed && <span style={{ fontFamily: 'var(--font-ibm-plex-mono)', color: 'var(--up)', fontSize: '12px' }}>{pct}%</span>}
              </li>

              <li style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '8px 10px', borderRadius: '8px', color: 'var(--dim)' }}>
                <Lock size={16} weight="light" style={{ flexShrink: 0 }} />
                <span style={{ flex: 1 }}>4. Headline versus core inflation</span>
              </li>

              <li style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '8px 10px', borderRadius: '8px', color: 'var(--dim)' }}>
                <Lock size={16} weight="light" style={{ flexShrink: 0 }} />
                <span style={{ flex: 1 }}>5. Jobs data: payrolls &amp; unemployment</span>
              </li>

              <li style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '8px 10px', borderRadius: '8px', color: 'var(--dim)' }}>
                <Lock size={16} weight="light" style={{ flexShrink: 0 }} />
                <span style={{ flex: 1 }}>Checkpoint quiz</span>
              </li>
            </ol>
          </section>

          {/* AI Tutor Panel */}
          <section
            aria-label="AI Tutor"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--line-strong)',
              borderRadius: 'var(--radius-card)',
              padding: '22px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.4)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="mq-pulse" style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--up)' }} />
                <h2 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '18px', color: 'var(--text)' }}>
                  Ask the AI Tutor
                </h2>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--dim)', border: '1px solid var(--line-strong)', padding: '2px 8px', borderRadius: '999px' }}>
                Lesson F3 Context
              </span>
            </div>

            {/* Conversation Messages */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '300px', overflowY: 'auto' }}>
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '12px',
                    fontSize: '13px',
                    lineHeight: 1.5,
                    backgroundColor: m.role === 'user' ? 'var(--surface-2)' : '#081735',
                    border: m.role === 'user' ? '1px solid var(--line)' : '1px solid var(--blue)',
                    color: m.role === 'user' ? 'var(--text)' : '#D0E2FF',
                    alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '92%',
                  }}
                >
                  {m.text}
                </div>
              ))}
            </div>

            {/* Suggested Question Chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {SUGGESTIONS.map((sug, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendTutor(sug)}
                  style={{
                    minHeight: '32px',
                    padding: '0 10px',
                    borderRadius: '999px',
                    border: '1px solid var(--line-strong)',
                    background: 'transparent',
                    color: 'var(--blue-soft)',
                    fontSize: '12px',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  {sug}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendTutor();
              }}
              style={{ display: 'flex', gap: '8px' }}
            >
              <input
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Ask about this lesson…"
                style={{
                  flex: 1,
                  minWidth: 0,
                  minHeight: '44px',
                  padding: '0 12px',
                  borderRadius: '10px',
                  border: '1px solid var(--line-strong)',
                  background: 'var(--bg)',
                  color: 'var(--text)',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                aria-label="Send question to AI tutor"
                style={{
                  width: '44px',
                  height: '44px',
                  flexShrink: 0,
                  borderRadius: '10px',
                  border: 'none',
                  background: 'var(--button)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <PaperPlaneTilt size={18} weight="bold" />
              </button>
            </form>

            <p style={{ margin: 0, fontSize: '11px', color: 'var(--dim)', lineHeight: 1.4 }}>
              The tutor explains curriculum concepts. It does not provide trading signals, buy/sell calls, or financial advice.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
