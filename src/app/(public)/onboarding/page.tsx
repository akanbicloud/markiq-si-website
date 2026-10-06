'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowRight, ArrowLeft, Check, Sparkle, GoogleLogo } from '@phosphor-icons/react';

interface CountryDef {
  id: string;
  label: string;
  zone: string;
  off: number;
}

const COUNTRIES: CountryDef[] = [
  { id: 'NG', label: 'Nigeria · WAT (UTC+1)', zone: 'WAT', off: 1 },
  { id: 'GH', label: 'Ghana · GMT (UTC+0)', zone: 'GMT', off: 0 },
  { id: 'KE', label: 'Kenya · EAT (UTC+3)', zone: 'EAT', off: 3 },
  { id: 'ZA', label: 'South Africa · SAST (UTC+2)', zone: 'SAST', off: 2 },
  { id: 'GB', label: 'United Kingdom · BST (UTC+1 in summer)', zone: 'BST', off: 1 },
  { id: 'US', label: 'United States · New York ET', zone: 'ET', off: -4 },
];

const GOAL_DEFS = [
  { id: 'news', label: 'Understand the news', tool: 'Live Desk', href: '/live-desk' },
  { id: 'tech', label: 'Learn chart analysis', tool: 'Chart Lab', href: '/chart-lab' },
  { id: 'bots', label: 'Build trading robots', tool: 'Strategy Lab', href: '/strategy-lab' },
  { id: 'track', label: 'Track my trading', tool: 'Journal', href: '/journal' },
  { id: 'prop', label: 'Pass a prop-firm challenge', tool: 'Risk & prop tools', href: '/tools' },
];

function OnboardingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMode = searchParams.get('mode') === 'login' ? 'login' : 'signup';

  const [mode, setMode] = useState<'signup' | 'login'>(initialMode);
  const [step, setStep] = useState<number>(0);
  const [level, setLevel] = useState<string>('');
  const [country, setCountry] = useState<string>('NG');
  const [goals, setGoals] = useState<string[]>([]);

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const names = ['Account', 'Experience', 'Location', 'Goals', 'Your plan'];

  const cd = COUNTRIES.find((c) => c.id === country) || COUNTRIES[0];
  const local = (12.5 + cd.off + 24) % 24;
  const hh = String(Math.floor(local)).padStart(2, '0');
  const mm = local % 1 ? '30' : '00';
  const timePreview = cd.zone === 'GMT' ? '12:30 GMT' : `${hh}:${mm} ${cd.zone} · 12:30 GMT`;

  const toggleGoal = (id: string) => {
    setGoals((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const starts: Record<string, [string, string]> = {
    new: ['Fundamentals · Module 1: Market basics', 'Short lessons that explain how markets work, in plain words.'],
    some: ['Fundamentals · Module 3: Inflation, jobs and growth', 'Or take the 10-minute placement quiz to find your exact level.'],
    pro: ['Take the 10-minute placement quiz', 'Skip what you already know and go straight to advanced modules and automation.'],
  };

  const start = starts[level] || starts.new;
  const pickedTools = GOAL_DEFS.filter((g) => goals.includes(g.id));
  const recommendedTools = pickedTools.length > 0 ? pickedTools : GOAL_DEFS.slice(0, 2);

  const cantContinue = step === 1 && !level;

  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(24px, 4vw, 48px) 16px 80px',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ width: '100%', maxWidth: '560px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Top Mode Switcher */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span
            style={{
              fontFamily: 'var(--font-ibm-plex-mono)',
              fontSize: '12px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--blue-soft)',
            }}
          >
            {mode === 'login' ? 'SIGN IN' : 'GET STARTED'}
          </span>
          <button
            type="button"
            onClick={() => {
              setMode(mode === 'login' ? 'signup' : 'login');
              setStep(0);
            }}
            style={{
              minHeight: '40px',
              padding: '0 14px',
              borderRadius: 'var(--radius-btn)',
              border: '1px solid var(--line-strong)',
              background: 'transparent',
              color: 'var(--text)',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            {mode === 'login' ? 'Create an account' : 'Log in instead'}
          </button>
        </div>

        {/* Login Form Mode */}
        {mode === 'login' && (
          <section
            className="mq-rise"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: '20px',
              padding: 'clamp(24px, 5vw, 36px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
            }}
          >
            <h1 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '30px', color: 'var(--text)' }}>
              Welcome back
            </h1>
            <p style={{ margin: 0, color: 'var(--muted)', fontSize: '15px' }}>
              Sign in to continue your trading journey and access your live tools.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                router.push('/dashboard');
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
            >
              <div>
                <label htmlFor="li-email" style={{ fontSize: '13px', color: 'var(--muted)', display: 'block', marginBottom: '6px' }}>
                  Email address
                </label>
                <input
                  id="li-email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  style={{
                    width: '100%',
                    minHeight: '48px',
                    padding: '0 14px',
                    borderRadius: '12px',
                    border: '1px solid var(--line-strong)',
                    background: 'var(--bg)',
                    color: 'var(--text)',
                    fontSize: '15px',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label htmlFor="li-pass" style={{ fontSize: '13px', color: 'var(--muted)', display: 'block', marginBottom: '6px' }}>
                  Password
                </label>
                <input
                  id="li-pass"
                  type="password"
                  required
                  style={{
                    width: '100%',
                    minHeight: '48px',
                    padding: '0 14px',
                    borderRadius: '12px',
                    border: '1px solid var(--line-strong)',
                    background: 'var(--bg)',
                    color: 'var(--text)',
                    fontSize: '15px',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <button
                type="submit"
                className="mq-btn"
                style={{
                  minHeight: '52px',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'var(--amber)',
                  color: '#1A1203',
                  fontWeight: 600,
                  fontSize: '16px',
                  cursor: 'pointer',
                  marginTop: '8px',
                }}
              >
                Log in to MarkIQ SI
              </button>

              <button
                type="button"
                onClick={() => router.push('/dashboard')}
                style={{
                  minHeight: '48px',
                  borderRadius: '12px',
                  border: '1px solid var(--line-strong)',
                  background: 'transparent',
                  color: 'var(--text)',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <GoogleLogo size={18} weight="bold" />
                Continue with Google
              </button>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', fontSize: '13px' }}>
                <a href="#" style={{ color: 'var(--blue-soft)' }}>
                  Forgot password?
                </a>
                <span style={{ color: 'var(--dim)' }}>Protected by 2FA</span>
              </div>
            </form>
          </section>
        )}

        {/* 5-Step Signup Onboarding Mode */}
        {mode === 'signup' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Progress Bar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontFamily: 'var(--font-ibm-plex-mono)',
                  fontSize: '13px',
                  color: 'var(--muted)',
                }}
              >
                <span>Step {step + 1} of 5</span>
                <span style={{ color: 'var(--blue-soft)' }}>{names[step]}</span>
              </div>
              <div style={{ height: '6px', background: 'var(--surface-2)', borderRadius: '3px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    background: 'var(--blue)',
                    width: `${(step + 1) * 20}%`,
                    transition: 'width 0.4s ease',
                  }}
                />
              </div>
            </div>

            {/* Step 0: Account Creation */}
            {step === 0 && (
              <section
                className="mq-rise"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--line)',
                  borderRadius: '20px',
                  padding: 'clamp(24px, 5vw, 36px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
                }}
              >
                <h1 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '30px', color: 'var(--text)' }}>
                  Create your account
                </h1>
                <p style={{ margin: 0, color: 'var(--muted)', fontSize: '15px' }}>
                  Free during the private beta preview. No credit card required.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setStep(1);
                  }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
                >
                  <div>
                    <label htmlFor="su-name" style={{ fontSize: '13px', color: 'var(--muted)', display: 'block', marginBottom: '6px' }}>
                      First name or alias
                    </label>
                    <input
                      id="su-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Naheem"
                      style={{
                        width: '100%',
                        minHeight: '48px',
                        padding: '0 14px',
                        borderRadius: '12px',
                        border: '1px solid var(--line-strong)',
                        background: 'var(--bg)',
                        color: 'var(--text)',
                        fontSize: '15px',
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <div>
                    <label htmlFor="su-email" style={{ fontSize: '13px', color: 'var(--muted)', display: 'block', marginBottom: '6px' }}>
                      Email address
                    </label>
                    <input
                      id="su-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      style={{
                        width: '100%',
                        minHeight: '48px',
                        padding: '0 14px',
                        borderRadius: '12px',
                        border: '1px solid var(--line-strong)',
                        background: 'var(--bg)',
                        color: 'var(--text)',
                        fontSize: '15px',
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <div>
                    <label htmlFor="su-pass" style={{ fontSize: '13px', color: 'var(--muted)', display: 'block', marginBottom: '6px' }}>
                      Choose a password
                    </label>
                    <input
                      id="su-pass"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      style={{
                        width: '100%',
                        minHeight: '48px',
                        padding: '0 14px',
                        borderRadius: '12px',
                        border: '1px solid var(--line-strong)',
                        background: 'var(--bg)',
                        color: 'var(--text)',
                        fontSize: '15px',
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="mq-btn"
                    style={{
                      minHeight: '52px',
                      borderRadius: '12px',
                      border: 'none',
                      background: 'var(--amber)',
                      color: '#1A1203',
                      fontWeight: 600,
                      fontSize: '16px',
                      cursor: 'pointer',
                      marginTop: '6px',
                    }}
                  >
                    Continue to Experience →
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    style={{
                      minHeight: '48px',
                      borderRadius: '12px',
                      border: '1px solid var(--line-strong)',
                      background: 'transparent',
                      color: 'var(--text)',
                      fontSize: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                    }}
                  >
                    <GoogleLogo size={18} weight="bold" />
                    Continue with Google
                  </button>

                  <p style={{ margin: '6px 0 0', fontSize: '12px', color: 'var(--dim)', lineHeight: 1.5 }}>
                    By continuing you agree to the <Link href="/terms" style={{ color: 'var(--blue-soft)' }}>Terms</Link>, <Link href="/privacy" style={{ color: 'var(--blue-soft)' }}>Privacy Policy</Link>, and <Link href="/disclaimer" style={{ color: 'var(--blue-soft)' }}>Risk Disclaimer</Link>.
                  </p>
                </form>
              </section>
            )}

            {/* Step 1: Trading Experience */}
            {step === 1 && (
              <section
                className="mq-rise"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--line)',
                  borderRadius: '20px',
                  padding: 'clamp(24px, 5vw, 36px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
                }}
              >
                <h1 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '28px', color: 'var(--text)' }}>
                  How much trading experience do you have?
                </h1>
                <p style={{ margin: 0, color: 'var(--muted)', fontSize: '15px' }}>
                  This calibrates where you start in the Academy and the complexity of initial event cards.
                </p>

                <div role="radiogroup" aria-label="Experience level" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { id: 'new', title: 'New to trading', desc: 'I am just starting out and want macroeconomic basics explained simply.' },
                    { id: 'some', title: 'Some experience', desc: 'I have traded manually but want structured risk management and clearer economic insights.' },
                    { id: 'pro', title: 'Experienced / Systematic', desc: 'I trade actively and want advanced quantitative tools, backtesting, and automated robot builders.' },
                  ].map((lvl) => {
                    const isSelected = level === lvl.id;
                    return (
                      <button
                        key={lvl.id}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => setLevel(lvl.id)}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          gap: '4px',
                          width: '100%',
                          textAlign: 'left',
                          padding: '16px 18px',
                          borderRadius: '14px',
                          fontFamily: 'inherit',
                          color: 'var(--text)',
                          cursor: 'pointer',
                          backgroundColor: isSelected ? 'var(--surface-2)' : 'var(--bg)',
                          border: isSelected ? '2px solid var(--blue)' : '2px solid var(--line)',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <span style={{ fontWeight: 600, fontSize: '16px', color: isSelected ? 'var(--blue-soft)' : 'var(--text)' }}>
                          {lvl.title}
                        </span>
                        <span style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.4 }}>
                          {lvl.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Step 2: Location & Timezone */}
            {step === 2 && (
              <section
                className="mq-rise"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--line)',
                  borderRadius: '20px',
                  padding: 'clamp(24px, 5vw, 36px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
                }}
              >
                <h1 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '28px', color: 'var(--text)' }}>
                  Where are you trading from?
                </h1>
                <p style={{ margin: 0, color: 'var(--muted)', fontSize: '15px' }}>
                  Every economic release and card on MarkIQ SI is displayed in dual WAT &amp; GMT format.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label htmlFor="ob-country" style={{ fontSize: '13px', color: 'var(--muted)' }}>
                    Country and primary timezone
                  </label>
                  <select
                    id="ob-country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    style={{
                      minHeight: '48px',
                      padding: '0 12px',
                      borderRadius: '12px',
                      border: '1px solid var(--line-strong)',
                      backgroundColor: 'var(--bg)',
                      color: 'var(--text)',
                      fontFamily: 'inherit',
                      fontSize: '15px',
                      outline: 'none',
                    }}
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Live time preview card */}
                <div
                  style={{
                    background: 'var(--surface-2)',
                    borderRadius: '14px',
                    padding: '16px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    border: '1px solid var(--line)',
                  }}
                >
                  <span style={{ fontSize: '13px', color: 'var(--muted)' }}>
                    Example: US Nonfarm Payrolls at 08:30 New York time will show as:
                  </span>
                  <span style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '20px', color: 'var(--text)', fontWeight: 600 }}>
                    {timePreview}
                  </span>
                </div>
              </section>
            )}

            {/* Step 3: Goals */}
            {step === 3 && (
              <section
                className="mq-rise"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--line)',
                  borderRadius: '20px',
                  padding: 'clamp(24px, 5vw, 36px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
                }}
              >
                <h1 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '28px', color: 'var(--text)' }}>
                  What do you want from MarkIQ SI?
                </h1>
                <p style={{ margin: 0, color: 'var(--muted)', fontSize: '15px' }}>
                  Pick as many goals as you like to customize your dashboard shortcuts.
                </p>

                <div role="group" aria-label="Goals" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {GOAL_DEFS.map((g) => {
                    const isPressed = goals.includes(g.id);
                    return (
                      <button
                        key={g.id}
                        type="button"
                        aria-pressed={isPressed}
                        onClick={() => toggleGoal(g.id)}
                        style={{
                          minHeight: '48px',
                          padding: '0 18px',
                          borderRadius: '999px',
                          fontFamily: 'inherit',
                          fontSize: '14px',
                          cursor: 'pointer',
                          backgroundColor: isPressed ? 'var(--text)' : 'transparent',
                          color: isPressed ? 'var(--bg)' : 'var(--text)',
                          border: isPressed ? '1px solid var(--text)' : '1px solid var(--line-strong)',
                          fontWeight: isPressed ? 600 : 400,
                          transition: 'all 0.2s ease',
                        }}
                      >
                        {g.label}
                      </button>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Step 4: Your Plan */}
            {step === 4 && (
              <section
                className="mq-rise"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--line)',
                  borderRadius: '20px',
                  padding: 'clamp(24px, 5vw, 36px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '18px',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
                }}
              >
                <h1 style={{ margin: 0, fontFamily: 'var(--font-space-grotesk)', fontSize: '28px', color: 'var(--text)' }}>
                  Your personalized starting plan
                </h1>

                {/* Starting recommendation */}
                <div
                  style={{
                    background: 'var(--surface-2)',
                    borderRadius: '14px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    border: '1px solid var(--line-strong)',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: '11px', letterSpacing: '0.1em', color: 'var(--amber)' }}>
                    RECOMMENDED STARTING POINT
                  </span>
                  <span style={{ fontSize: '17px', fontWeight: 600, color: 'var(--text)' }}>
                    {start[0]}
                  </span>
                  <span style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.5 }}>
                    {start[1]}
                  </span>
                </div>

                {/* Recommended tools based on goals */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ fontSize: '13px', color: 'var(--muted)', fontFamily: 'var(--font-ibm-plex-mono)' }}>
                    RECOMMENDED FOR YOUR GOALS
                  </span>
                  {recommendedTools.map((t) => (
                    <div
                      key={t.id}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        minHeight: '48px',
                        padding: '0 16px',
                        border: '1px solid var(--line)',
                        borderRadius: '12px',
                        backgroundColor: 'var(--bg)',
                      }}
                    >
                      <span style={{ fontSize: '15px', color: 'var(--text)' }}>{t.tool}</span>
                      <span style={{ color: 'var(--blue-soft)', fontSize: '13px', fontWeight: 600 }}>Active</span>
                    </div>
                  ))}
                </div>

                {/* Telegram Bot Linking Note */}
                <div
                  style={{
                    background: 'rgba(74, 157, 255, 0.08)',
                    border: '1px solid var(--blue)',
                    borderRadius: '12px',
                    padding: '14px 16px',
                    fontSize: '13px',
                    color: 'var(--muted)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                  }}
                >
                  <span style={{ fontWeight: 600, color: 'var(--blue-soft)' }}>Telegram Bot Linking Available</span>
                  <span>Link your Telegram handle inside Settings → Alerts to receive instant push cards directly to your private chat.</span>
                </div>

                <Link
                  href="/dashboard"
                  className="mq-btn"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '52px',
                    borderRadius: '12px',
                    background: 'var(--amber)',
                    color: '#1A1203',
                    fontWeight: 600,
                    fontSize: '16px',
                    marginTop: '8px',
                  }}
                >
                  Go to my personal dashboard →
                </Link>
              </section>
            )}

            {/* Stepper Navigation Buttons (for steps 1, 2, 3) */}
            {step >= 1 && step <= 3 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  style={{
                    minHeight: '48px',
                    padding: '0 20px',
                    borderRadius: '12px',
                    border: '1px solid var(--line-strong)',
                    background: 'transparent',
                    color: 'var(--text)',
                    fontSize: '14px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <ArrowLeft size={16} />
                  Back
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (!cantContinue) setStep((s) => Math.min(4, s + 1));
                  }}
                  disabled={cantContinue}
                  style={{
                    minHeight: '48px',
                    padding: '0 28px',
                    borderRadius: '12px',
                    border: 'none',
                    fontWeight: 600,
                    fontSize: '15px',
                    backgroundColor: cantContinue ? 'var(--line-strong)' : 'var(--amber)',
                    color: cantContinue ? 'var(--dim)' : '#1A1203',
                    cursor: cantContinue ? 'not-allowed' : 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  Continue
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--muted)',
            fontFamily: 'var(--font-ibm-plex-mono)',
            fontSize: '14px',
          }}
        >
          Loading onboarding…
        </div>
      }
    >
      <OnboardingContent />
    </Suspense>
  );
}

