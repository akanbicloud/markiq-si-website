'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Clock,
  EnvelopeSimple,
  CheckCircle,
  ArrowRight,
  X,
  ShareNetwork,
  BookmarkSimple,
  Sparkle,
  TrendUp,
  Scales,
} from '@phosphor-icons/react';

interface Article {
  id: string;
  cat: 'Weekly outlook' | 'Event breakdown' | 'Explainer';
  read: string;
  title: string;
  desc: string;
  date: string;
  fullBody?: {
    summary: string;
    sections: { heading: string; content: string }[];
    keyTakeaway: string;
  };
}

const ARTICLES: Article[] = [
  {
    id: 'fed-holds',
    cat: 'Event breakdown',
    read: '5 min',
    title: 'Fed holds: what the press conference changed',
    desc: 'The decision was expected. The guidance was the story. Here is what moved and why.',
    date: 'Wednesday · 20:30 WAT',
    fullBody: {
      summary:
        'The Federal Reserve left the target federal funds rate unchanged at 5.25%–5.50%, as unanimously forecast. However, the tone of the Chair’s press conference shifted the market’s pricing of the first rate cut from September into November.',
      sections: [
        {
          heading: '1. Why the decision was already priced in',
          content:
            'Interest rate swap markets assigned a 98% probability to no rate change heading into the 18:00 GMT announcement. Currency markets barely flinched when the statement was published: EURUSD moved by just 6 pips in the first minute.',
        },
        {
          heading: '2. The 30 minutes that actually mattered',
          content:
            'At 18:30 GMT (19:30 WAT), the press conference began. Chair Powell stressed that recent inflation readings have "not given the Committee greater confidence" that inflation is moving sustainably toward 2%. That single phrase sent US 2-year Treasury yields up 9 basis points.',
        },
        {
          heading: '3. Asset reaction across the board',
          content:
            'The US Dollar Index (DXY) rose +0.48% over the next 90 minutes. Gold (XAUUSD) fell $24 from $2,348 to $2,324 before stabilising. US equity futures dipped 0.6% before recovering.',
        },
      ],
      keyTakeaway:
        'When an interest rate decision is 90%+ expected, the policy statement is rarely the mover. The live press conference Q&A is where asymmetric repricing happens.',
    },
  },
  {
    id: 'hot-cpi',
    cat: 'Event breakdown',
    read: '4 min',
    title: 'Hot CPI, strong dollar: a closer look',
    desc: 'How the surprise compared with past releases, and how gold and EURUSD reacted.',
    date: 'Tuesday · 14:30 WAT',
    fullBody: {
      summary:
        'US Core CPI arrived at +0.4% m/m versus the +0.3% consensus estimate (+1.8 sigma surprise). This was the third consecutive warmer-than-expected print.',
      sections: [
        {
          heading: 'Surprise magnitude breakdown',
          content:
            'A +0.1% surprise on monthly core inflation might sound trivial to non-traders, but over the last 36 months, a positive surprise of this magnitude produced an average 15-minute EURUSD drop of 42 pips.',
        },
        {
          heading: 'Gold’s rapid divergence',
          content:
            'Spot gold initially tumbled $18 within 3 minutes of the print. However, within 4 hours, dip buyers absorbed the move, leaving an extended lower wick on the 4H chart.',
        },
      ],
      keyTakeaway:
        'High-impact surprise bars in MarkIQ SI give you the historical distribution of moves so you never enter blindly during first-minute spread widenings.',
    },
  },
  {
    id: 'headline-vs-core',
    cat: 'Explainer',
    read: '6 min',
    title: 'Headline versus core inflation, simply',
    desc: 'Why central banks watch the number without food and energy.',
    date: 'Monday · 10:00 WAT',
    fullBody: {
      summary:
        'Headline inflation measures the full consumer basket. Core inflation strips out food and energy. Why would central banks ignore items households buy every single day?',
      sections: [
        {
          heading: 'The volatility of tomatoes and crude oil',
          content:
            'A frost in Spain or an oil tanker pipeline disruption can cause headline prices to spike 5% in a month and collapse 5% the next. Central bank rate changes take 12 to 18 months to filter through the economy. Policy cannot chase short-term weather or geopolitical supply shocks.',
        },
        {
          heading: 'Sticky versus flexible prices',
          content:
            'Core inflation tracks services, housing rents, medical care, and manufactured goods. These prices change slowly. When core inflation rises, it indicates structural wage pressure and broad demand.',
        },
      ],
      keyTakeaway:
        'Always check Core CPI first on release day. If headline is hot but core is cool, initial dollar rallies frequently fail and reverse.',
    },
  },
  {
    id: 'oil-shipping-news',
    cat: 'Explainer',
    read: '7 min',
    title: 'Why oil jumps on shipping news',
    desc: 'Chokepoints, supply fears and what usually happens next.',
    date: 'Last Friday · 16:00 WAT',
    fullBody: {
      summary:
        'Nearly 20% of global petroleum consumption passes through the Strait of Hormuz, and 12% through the Bab el-Mandeb / Suez corridor. When headlines mention tanker diversions, crude spikes immediately.',
      sections: [
        {
          heading: 'The risk premium calculation',
          content:
            'Physical oil doesn’t disappear immediately when shipping is disrupted; it takes 10 to 14 extra days to sail around the Cape of Good Hope. This ties up tanker capacity and inflates freight rates.',
        },
        {
          heading: 'The historical retracement pattern',
          content:
            'Data across 14 naval security alerts between 2019 and 2024 shows that crude oil spikes an average of +3.4% in the first 24 hours, but retraces 60% of that surge within 10 trading days unless actual output facilities are damaged.',
        },
      ],
      keyTakeaway:
        'Beware of buying crude at the top of acute maritime conflict headlines. Unless wells or refineries are struck, logistics premiums tend to mean-revert.',
    },
  },
  {
    id: 'last-week-review',
    cat: 'Weekly outlook',
    read: '8 min',
    title: 'Last week in review: the dollar’s busy week',
    desc: 'A calm recap of the releases that mattered and the ones that did not.',
    date: 'Sunday · 18:00 WAT',
    fullBody: {
      summary:
        'A comprehensive retrospective of Non-Farm Payrolls, ISM Services, and UK GDP. Separating genuine regime shifts from noisy headline noise.',
      sections: [
        {
          heading: 'NFP: The headline beat vs household survey divergence',
          content:
            'Non-farm payrolls added 254k vs 147k expected. But the unemployment rate unexpectedly ticked down from 4.2% to 4.1%. This double beat caused aggressive dollar buying across all G10 pairs.',
        },
        {
          heading: 'The pound’s resilience',
          content:
            'Despite broad dollar strength, GBPUSD held above 1.3000 support, underpinned by Bank of England chief economist comments signalling a slower easing trajectory.',
        },
      ],
      keyTakeaway:
        'Reviewing the previous week’s price reaction against release numbers builds institutional intuition faster than looking at isolated candles.',
    },
  },
  {
    id: 'reading-rate-decision-60s',
    cat: 'Explainer',
    read: '5 min',
    title: 'Reading a rate decision in 60 seconds',
    desc: 'The three things to check first when a central bank announces.',
    date: 'Oct 1 · 11:30 WAT',
    fullBody: {
      summary:
        'Central bank statements are dense, legalistic documents of 1,200+ words. Here is the exact 3-point checklist institutional desks scan in the first 60 seconds.',
      sections: [
        {
          heading: 'Step 1: The Vote Split (10 seconds)',
          content:
            'Did any members dissent? If an 8-1 vote shifted to 6-3, the direction of the dissenters tells you where the committee is headed two meetings from now.',
        },
        {
          heading: 'Step 2: Forward Guidance adjectives (20 seconds)',
          content:
            'Look for deletions or insertions of words like "careful", "restrictive", "balanced", or "patient". Quantitative easing adjustments are also noted here.',
        },
        {
          heading: 'Step 3: Economic Projections table (30 seconds)',
          content:
            'Check the dot plot or staff macroeconomic forecasts. Did the median inflation projection for next year rise by even 0.1%? That justifies higher-for-longer policy.',
        },
      ],
      keyTakeaway:
        'Don’t try to read the entire statement at 13:00 GMT. Scan the vote tally, search for keyword shifts, then wait for the press conference.',
    },
  },
];

const CAT_COLORS: Record<string, string> = {
  'Event breakdown': 'var(--down)', // coral
  'Explainer': 'var(--blue-soft)', // blue-soft
  'Weekly outlook': 'var(--amber)', // amber
};

export default function ResearchPage() {
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  const filteredArticles =
    selectedCat === 'All'
      ? ARTICLES
      : ARTICLES.filter((a) => a.cat === selectedCat);

  const toggleBookmark = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
    }
  };

  return (
    <div
      style={{
        padding: '32px clamp(16px, 3vw, 40px) 80px',
        maxWidth: '1360px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '28px',
      }}
    >
      {/* Header Section */}
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
            <BookOpen size={16} weight="light" color="var(--blue-soft)" />
            <span>Research & Institutional Commentary</span>
          </div>
          <h1
            style={{
              margin: 0,
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: 'clamp(28px, 3.5vw, 40px)',
              letterSpacing: '-0.02em',
              fontWeight: 700,
              color: 'var(--text)',
            }}
          >
            The week ahead, explained.
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: '15px',
              color: 'var(--muted)',
              maxWidth: '680px',
            }}
          >
            Calm, data-driven analysis of macro events, central bank statements,
            and currency drivers. Describes historical distributions — never financial advice.
          </p>
        </div>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
            fontWeight: 600,
            color: '#1A1203',
            background: 'var(--amber)',
            padding: '5px 14px',
            borderRadius: '999px',
          }}
        >
          <Sparkle size={14} weight="bold" />
          <span>Curated Market Intelligence</span>
        </div>
      </div>

      {/* Featured Weekly Outlook Banner */}
      <article
        onClick={() =>
          setActiveArticle({
            id: 'featured-outlook',
            cat: 'Weekly outlook',
            read: '8 min read',
            title: 'Week ahead: two central banks, the Fed minutes and a busy Friday',
            desc: 'What is scheduled, what each release could mean for the dollar, gold and oil, and what history says about similar weeks — in plain words.',
            date: 'Sunday 18:00 WAT · 17:00 GMT',
            fullBody: {
              summary:
                'Welcome to this week’s institutional outlook. Over the next five trading days, markets face policy rate decisions from the Reserve Bank of New Zealand (RBNZ) and European Central Bank (ECB), plus the release of minutes from the last FOMC meeting and Friday’s US Producer Price Index (PPI).',
              sections: [
                {
                  heading: '1. Wednesday: RBNZ Rate Decision (02:00 WAT)',
                  content:
                    'Markets are pricing an 82% chance of a 50 bps rate cut to 4.75%. Inflation in New Zealand fell back within the 1-3% target band ahead of schedule. The New Zealand Dollar (NZDUSD) has tested the 0.6120 support floor three times this month.',
                },
                {
                  heading: '2. Wednesday: FOMC Minutes Release (19:00 WAT · 18:00 GMT)',
                  content:
                    'Traders will scrutinize the debate surrounding the jumbo 50 bps cut. If the minutes reveal strong resistance from regional Fed presidents, market expectations for consecutive cuts may be tempered, providing tailwinds for the US Dollar.',
                },
                {
                  heading: '3. Thursday: ECB Rate Decision (13:15 WAT · 12:15 GMT)',
                  content:
                    'A fast-deteriorating PMI picture across Germany and France has forced the market to price another 25 bps rate cut. President Lagarde’s press conference at 13:45 WAT will be monitored closely for guidance regarding December.',
                },
                {
                  heading: '4. Friday: US PPI & University of Michigan Sentiment',
                  content:
                    'Friday brings consumer inflation expectations. Historically, when 1-year consumer expectations tick up by 0.2% or more, 10-year US Treasury yields gain an average of 4 basis points within 60 minutes.',
                },
              ],
              keyTakeaway:
                'Avoid holding high leverage across Wednesday and Thursday overlap hours. Two central banks plus Fed minutes in 24 hours creates multi-directional volatility spikes.',
            },
          })
        }
        className="mq-lift"
        style={{
          background: 'linear-gradient(135deg, #0D2350 0%, #091736 100%)',
          border: '1px solid #2B4A82',
          borderRadius: '20px',
          padding: 'clamp(24px, 3.5vw, 40px)',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          cursor: 'pointer',
          position: 'relative',
          boxShadow: '0 12px 32px rgba(4, 12, 32, 0.4)',
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
              letterSpacing: '0.12em',
              color: 'var(--amber)',
              fontWeight: 600,
            }}
          >
            FEATURED OUTLOOK · 8 MIN READ
          </span>
          <span
            style={{
              fontFamily: 'var(--font-ibm-plex-mono)',
              fontSize: '12px',
              color: 'var(--dim)',
            }}
          >
            Sunday 18:00 WAT · 17:00 GMT
          </span>
        </div>

        <h2
          style={{
            margin: 0,
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: 'clamp(24px, 3vw, 34px)',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            color: 'var(--text)',
            maxWidth: '840px',
          }}
        >
          Week ahead: two central banks, the Fed minutes and a busy Friday
        </h2>

        <p
          style={{
            margin: 0,
            color: '#B9C9E6',
            fontSize: '16px',
            lineHeight: 1.6,
            maxWidth: '780px',
          }}
        >
          What is scheduled, what each release could mean for the dollar, gold, and oil,
          and what historical distributions say about similar weeks — in plain, honest words.
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginTop: '8px',
            flexWrap: 'wrap',
          }}
        >
          <button
            type="button"
            className="mq-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              minHeight: '48px',
              padding: '0 24px',
              borderRadius: '12px',
              background: 'var(--amber)',
              color: '#1A1203',
              fontFamily: 'var(--font-ibm-plex-sans)',
              fontWeight: 600,
              fontSize: '15px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <span>Read full outlook</span>
            <ArrowRight size={18} weight="bold" />
          </button>

          <span
            style={{
              fontSize: '13px',
              color: 'var(--muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Clock size={16} weight="light" color="var(--blue-soft)" />
            Covers RBNZ, ECB, FOMC Minutes, and US PPI
          </span>
        </div>
      </article>

      {/* Filter and Section Heading */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '14px',
          marginTop: '8px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h2
            style={{
              margin: 0,
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: '22px',
              color: 'var(--text)',
            }}
          >
            Research Library
          </h2>
          <span
            style={{
              fontFamily: 'var(--font-ibm-plex-mono)',
              fontSize: '12px',
              color: 'var(--dim)',
              padding: '2px 8px',
              background: 'var(--surface-2)',
              borderRadius: '6px',
            }}
          >
            {filteredArticles.length} articles
          </span>
        </div>

        {/* Filter Pills */}
        <div
          role="group"
          aria-label="Filter research articles"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}
        >
          {['All', 'Weekly outlook', 'Event breakdown', 'Explainer'].map((f) => {
            const isSelected = f === selectedCat;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setSelectedCat(f)}
                style={{
                  minHeight: '40px',
                  padding: '0 16px',
                  borderRadius: '999px',
                  fontFamily: 'inherit',
                  fontSize: '14px',
                  cursor: 'pointer',
                  border: isSelected ? '1px solid #EAF1FF' : '1px solid var(--line-strong)',
                  background: isSelected ? '#EAF1FF' : 'transparent',
                  color: isSelected ? '#060F22' : '#EAF1FF',
                  fontWeight: isSelected ? 600 : 400,
                  transition: 'all 0.25s ease',
                }}
              >
                {f}
              </button>
            );
          })}
        </div>
      </div>

      {/* Articles Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '20px',
        }}
      >
        {filteredArticles.map((a) => {
          const isBookmarked = bookmarkedIds.includes(a.id);
          return (
            <article
              key={a.id}
              onClick={() => setActiveArticle(a)}
              className="mq-lift"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--line)',
                borderRadius: '16px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                cursor: 'pointer',
                transition: 'border-color 0.3s ease, transform 0.3s ease',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-ibm-plex-mono)',
                    fontSize: '12px',
                    letterSpacing: '0.06em',
                    color: CAT_COLORS[a.cat] || 'var(--blue-soft)',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                  }}
                >
                  {a.cat} · {a.read}
                </span>

                <button
                  type="button"
                  onClick={(e) => toggleBookmark(e, a.id)}
                  aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: isBookmarked ? 'var(--amber)' : 'var(--dim)',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <BookmarkSimple
                    size={20}
                    weight={isBookmarked ? 'fill' : 'light'}
                  />
                </button>
              </div>

              <h3
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-space-grotesk)',
                  fontSize: '19px',
                  lineHeight: 1.35,
                  fontWeight: 600,
                  color: 'var(--text)',
                }}
              >
                {a.title}
              </h3>

              <p
                style={{
                  margin: 0,
                  fontSize: '14px',
                  color: 'var(--muted)',
                  lineHeight: 1.55,
                  flex: '1 0 auto',
                }}
              >
                {a.desc}
              </p>

              <div
                style={{
                  marginTop: 'auto',
                  paddingTop: '12px',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-ibm-plex-mono)',
                    fontSize: '12px',
                    color: 'var(--dim)',
                  }}
                >
                  {a.date}
                </span>

                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--blue-soft)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  Read breakdown <ArrowRight size={14} weight="bold" />
                </span>
              </div>
            </article>
          );
        })}
      </div>

      {/* Sunday Outlook Email Subscription Card */}
      <section
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--line)',
          borderRadius: '16px',
          padding: '28px 24px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '24px',
          alignItems: 'center',
          boxShadow: '0 8px 24px rgba(2, 8, 24, 0.4)',
        }}
      >
        <div style={{ flex: '1 1 340px', minWidth: 0 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '6px',
            }}
          >
            <EnvelopeSimple size={20} weight="light" color="var(--amber)" />
            <h2
              style={{
                margin: 0,
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: '20px',
                color: 'var(--text)',
              }}
            >
              The Sunday outlook, delivered by email
            </h2>
          </div>
          <p
            style={{
              margin: 0,
              fontSize: '14px',
              color: 'var(--muted)',
              lineHeight: 1.5,
            }}
          >
            One calm email each Sunday evening at 18:00 WAT (17:00 GMT). Key releases,
            historical surprise ranges, and what to watch — zero spam, unsubscribe anytime.
          </p>
        </div>

        <form
          onSubmit={handleSubscribe}
          style={{
            flex: '1 1 340px',
            minWidth: 0,
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
          }}
        >
          <label
            htmlFor="research-email-input"
            style={{
              position: 'absolute',
              width: '1px',
              height: '1px',
              overflow: 'hidden',
              clip: 'rect(0 0 0 0)',
            }}
          >
            Email address for Sunday outlook
          </label>
          <input
            id="research-email-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={subscribed}
            placeholder="trader@domain.com"
            required
            style={{
              flex: '1 1 200px',
              minWidth: 0,
              minHeight: '48px',
              padding: '0 16px',
              borderRadius: '12px',
              border: '1px solid var(--line-strong)',
              background: 'var(--bg)',
              color: 'var(--text)',
              fontFamily: 'inherit',
              fontSize: '15px',
            }}
          />
          <button
            type="submit"
            disabled={subscribed}
            className="mq-btn"
            style={{
              minHeight: '48px',
              padding: '0 24px',
              borderRadius: '12px',
              border: 'none',
              background: subscribed ? 'rgba(61, 220, 151, 0.15)' : 'var(--amber)',
              color: subscribed ? 'var(--up)' : '#1A1203',
              fontFamily: 'inherit',
              fontWeight: 600,
              fontSize: '15px',
              cursor: subscribed ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              borderWidth: subscribed ? '1px' : '0',
              borderStyle: 'solid',
              borderColor: subscribed ? 'var(--up)' : 'transparent',
            }}
          >
            {subscribed ? (
              <>
                <CheckCircle size={18} weight="bold" />
                <span>Subscribed</span>
              </>
            ) : (
              <span>Subscribe free</span>
            )}
          </button>
        </form>
      </section>

      {/* Regulatory Notice & Rule 2 Badge */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          borderTop: '1px solid var(--line)',
          paddingTop: '18px',
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: '13px',
            color: 'var(--dim)',
            lineHeight: 1.5,
          }}
        >
          <strong>Rule 2 Compliance Notice:</strong> MarkIQ SI Research describes historical distributions
          and structural macro mechanics. It does not provide buy or sell advice, price guarantees,
          or account management. Past historical reactions do not guarantee future market behavior.
        </p>
      </div>

      {/* Reader Modal / Drawer when an article is clicked */}
      {activeArticle && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeArticle.title}
          onClick={() => setActiveArticle(null)}
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
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--line-strong)',
              borderRadius: '20px',
              maxWidth: '720px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: 'clamp(24px, 4vw, 36px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.7)',
              position: 'relative',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-ibm-plex-mono)',
                    fontSize: '12px',
                    letterSpacing: '0.08em',
                    color: CAT_COLORS[activeArticle.cat] || 'var(--blue-soft)',
                    fontWeight: 600,
                  }}
                >
                  {activeArticle.cat.toUpperCase()} · {activeArticle.read}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-ibm-plex-mono)',
                    fontSize: '12px',
                    color: 'var(--dim)',
                  }}
                >
                  Published: {activeArticle.date}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                aria-label="Close article"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  border: '1px solid var(--line)',
                  background: 'var(--surface-2)',
                  color: 'var(--text)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <X size={18} weight="bold" />
              </button>
            </div>

            <h2
              style={{
                margin: 0,
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: 'clamp(22px, 3vw, 28px)',
                lineHeight: 1.25,
                color: 'var(--text)',
              }}
            >
              {activeArticle.title}
            </h2>

            {activeArticle.fullBody ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '18px',
                  fontSize: '15px',
                  color: '#C9D6EE',
                  lineHeight: 1.65,
                }}
              >
                <div
                  style={{
                    padding: '14px 16px',
                    background: 'var(--surface-2)',
                    borderRadius: '12px',
                    borderLeft: '3px solid var(--blue)',
                    color: 'var(--text)',
                    fontSize: '15px',
                  }}
                >
                  {activeArticle.fullBody.summary}
                </div>

                {activeArticle.fullBody.sections.map((sec, idx) => (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <h3
                      style={{
                        margin: 0,
                        fontFamily: 'var(--font-space-grotesk)',
                        fontSize: '18px',
                        color: 'var(--text)',
                      }}
                    >
                      {sec.heading}
                    </h3>
                    <p style={{ margin: 0, color: 'var(--muted)' }}>{sec.content}</p>
                  </div>
                ))}

                <div
                  style={{
                    background: 'rgba(255, 181, 71, 0.08)',
                    border: '1px solid #5A4417',
                    borderRadius: '12px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-space-grotesk)',
                      fontWeight: 600,
                      color: 'var(--amber)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <Scales size={18} weight="bold" />
                    <span>Institutional Takeaway</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '14px', color: '#E8D9BC' }}>
                    {activeArticle.fullBody.keyTakeaway}
                  </p>
                </div>
              </div>
            ) : (
              <p style={{ color: 'var(--muted)', fontSize: '15px' }}>{activeArticle.desc}</p>
            )}

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '14px',
                borderTop: '1px solid var(--line)',
                flexWrap: 'wrap',
                gap: '10px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-ibm-plex-mono)',
                  fontSize: '12px',
                  color: 'var(--dim)',
                }}
              >
                MarkIQ SI Research Desk · Lagos & London
              </span>

              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                style={{
                  minHeight: '40px',
                  padding: '0 20px',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'var(--button)',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                Done reading
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
