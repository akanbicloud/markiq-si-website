# MARKIQ SI — Website Build Brief

**Read this file first.** It is the handoff for building the real MARKIQ SI website from the approved design.

- Live design preview (private to the owner): https://claude.ai/artifact/Ma5KX4sw9ydrB7rWj4K1ZG
- The design source for every page is in `design/` (one `.dc.html` file per page).
- Design approved: 3 October 2026

---

## 1. What MARKIQ SI is

MARKIQ SI ("Market Intelligence · Super Intelligence") is a market-intelligence platform for both beginners and experienced traders. It covers FX majors and exotics, gold, oil, indices, stocks and crypto. It has two parts:

1. **The Telegram bot and channel**, which is already built and in live testing. It sends event cards before and after high-impact releases, using plain language, surprise bars, and the times in both WAT and GMT.
2. **This website**, which brings the bot's intelligence together with education (the Academy and AI Tutor) and trading tools (the Strategy Lab robot builder, Chart Lab, Journal, and risk tools).

Always write "SI", never "AI", in the brand name. Show every time as **WAT and GMT** together, e.g. `13:30 WAT · 12:30 GMT`.

---

## 2. Tech stack for the real build

| Need | Use |
|---|---|
| Framework | **Next.js** (App Router) + TypeScript |
| Styling | Tailwind CSS, or CSS modules, using the tokens below |
| Animation | **Framer Motion** |
| Smooth scroll | **Lenis** |
| Icons | **Phosphor Icons, Light weight** (`@phosphor-icons/react`, `weight="light"`). Do not use Lucide. |
| Charts | TradingView Lightweight Charts (Chart Lab), plus a simple SVG/Recharts setup for the small charts |
| Code editor (Strategy Lab) | Monaco Editor |
| Video (Live Desk) | YouTube embed (`youtube-nocookie.com`), from official central bank channels only |

The design canvas could not load Framer Motion or Lenis, so the motion in the preview is emulated in CSS (see section 5). Rebuild that motion with Framer Motion and Lenis in the real site.

---

## 3. Design tokens

### Colours (dark blue, luxurious)
```
--bg:          #060F22   page background
--bg-sidebar:  #050C1C   app sidebar
--surface:     #0B1A36   cards
--surface-2:   #102449   raised / active
--line:        #1C3563   card borders
--line-strong: #2B4A82   inputs, outlines
--text:        #EAF1FF
--muted:       #A3B5D6
--dim:         #7F93B8
--blue:        #4A9DFF   brand accent ("SI" badge)
--blue-soft:   #7DB8FF   links, labels
--button:      #1F6FE5   secondary buttons (white text)
--amber:       #FFB547   primary CTA (text #1A1203)
--up:          #3DDC97   rose / profit / positive
--down:        #FF8A5B   fell / loss / high impact
```
Never use pure red or green. Up is mint `#3DDC97` and down is coral `#FF8A5B`.

### Typography (Google Fonts)
- **Space Grotesk** 500/700: headings and logo
- **IBM Plex Sans** 400/500/600: body text (16px, line-height 1.55)
- **IBM Plex Mono** 400/500: numbers, prices, times, small labels (letter-spacing 0.12em on uppercase eyebrows)

### Shape
- Cards: 16px radius, 1px border `--line`, padding 22–26px
- Buttons: 12px radius, min-height 48–52px
- Chips: pill shape (999px), min-height 40px
- Every tap target is at least 44px

---

## 4. Logo

The logo is the word **MARKIQ** in Space Grotesk 700 with 0.06em letter-spacing, followed by a small **SI** badge in IBM Plex Mono with dark text `#04101F` on `#4A9DFF` and a 4px radius.

---

## 5. Motion

The CSS classes in the design files map to Framer Motion like this:

| Design class | Meaning | Framer Motion / Lenis |
|---|---|---|
| `mq-rise` + `mq-d1..d4` | Fade up 28px, 1s, ease `[.16,1,.3,1]`, staggered 0.1–0.45s | `initial={{opacity:0,y:28}} animate={{opacity:1,y:0}}` with staggerChildren |
| `mq-reveal` | Rise when scrolled into view | `whileInView`, `viewport={{once:true, amount:.3}}` |
| `mq-lift` | Card lifts 4px, border brightens | `whileHover={{y:-4}}` |
| `mq-btn` | CTA lifts 2px with an amber glow | `whileHover={{y:-2}}` + box-shadow |
| `mq-float` | Hero card drifts slowly (8s) | looping `animate` |
| `mq-grow` | Surprise bar grows from the left | `scaleX` 0→1 |
| `mq-marquee` | Market ticker strip (48s loop) | looping `x` |
| `mq-pulse` | "LIVE" dot | opacity loop |
| `mq-bar` | Width transitions on stats bars | `layout` / animate width |
| `mq-pop` | Dots pop in (Reaction Explorer) | scale 0.4→1, staggered |

Smooth scrolling everywhere uses Lenis. **Respect `prefers-reduced-motion`**: turn off every animation and Lenis when it is set.

---

## 6. Pages (16)

### Public site (top navigation bar)
| File | Page | Key content |
|---|---|---|
| `Main.dc.html` | **Home** | Hero with a phone showing Telegram alerts arriving, market ticker, 12 tool cards, **live trading-sessions clock** (Sydney/Tokyo/London/New York in WAT, automatic clock changes, weekend closed), founder section (photo of Oloyede Naheem Pelumi, story, skills), "how to read an event card", Academy teaser, Strategy Lab teaser, promises, waitlist, footer |
| `Academy.dc.html` | **Academy** | 21 courses with a track filter (All / Fundamentals / Technicals / Automation). Each card has generated cover art: rate bars for Fundamentals, candlesticks for Technicals, node network for Automation |

### Signed-in app (left sidebar)
Sidebar groups: Dashboard · MARKETS (News feed, Market dashboard, Live Desk, Reaction Explorer, Research) · LEARN (Academy, AI Tutor, Community) · TRADE TOOLS (Strategy Lab, Chart Lab, Journal, Risk & prop tools) · SETTINGS (Alerts)

| File | Page | Key content |
|---|---|---|
| `Onboarding.dc.html` | Sign up / log in / onboarding | 5 steps: Account → Experience → Location → Goals → Your plan |
| `Dashboard.dc.html` | Personal dashboard | "Live now" banner, continue learning, certificate progress, coming-up events, Telegram link status, community |
| `Lesson.dc.html` | Lesson + quiz + **AI Tutor** | Lesson content, quiz (**80% to pass**, retake allowed), AI tutor chat panel |
| `StrategyLab.dc.html` | **Strategy Lab** (strategy → robot) | Plain-English rules become MQL5 EA code, a backtest summary, demo-first warning |
| `ChartLab.dc.html` | **Chart Lab** | Chart with replay, backtest and annotate |
| `LiveDesk.dc.html` | **Live Desk** | Embedded YouTube broadcast (e.g. FOMC press conference), live summary feed, live event card, upcoming list |
| `Journal.dc.html` | **Trading Journal** | Trade log, **P&L calendar** (daily colour, weekly totals), stats |
| `Markets.dc.html` | Market dashboard | Currency strength, economic calendar (day tabs, impact filter), latest event cards |
| `Explorer.dc.html` | Historical Reaction Explorer | Event × market × 15/60 min; hotter vs cooler outcomes |
| `Research.dc.html` | Research hub | Weekly outlooks and explainers |
| `Alerts.dc.html` | Alert settings | Channels (Telegram/email/browser), impact, topics, markets, timing, quiet hours |
| `Tools.dc.html` | Risk & prop tools | Position-size calculator, prop-firm drawdown tracker |
| `Community.dc.html` | Community | Lesson discussions, study groups. No signals or paid calls. |
| `News.dc.html` | News feed | Summarised stories (wars, central banks, data, oil) with market reactions |

**Still missing before going public:** a Pricing page, plus Terms, Privacy and a **Risk Disclaimer**. Add the risk disclaimer first.

---

## 7. Rules (non-negotiable)

1. **No fabricated data.** Every number shown to users must come from a real, named source with provenance. The design files use example data and are labelled "Example data". In the real build, show an empty state rather than invent figures.
2. **Not financial advice.** History describes the past; it is never a trade signal. Use "usually", never "will".
3. **Strategy Lab / robots:** demo account first, Algo Trading off by default, read-only (investor) credentials where possible. Never store trading passwords.
4. **Secrets live only in `.env`** (e.g. `BEA_API_KEY`, `BLS_API_KEY`, the Telegram bot token). Never put them in code, prompts, chat or git. Add `.env` to `.gitignore`.
5. **Do not scrape sites whose terms forbid it** (e.g. Forex Factory). Use official sources (BLS, BEA, central banks) and licensed APIs.
6. **Times:** always WAT + GMT, and handle DST changes (US, UK/EU, Australia) automatically.
7. **Accessibility:** WCAG AA contrast, 44px tap targets, keyboard navigation, reduced-motion support.
8. **Mobile-first:** everything must work at 375px wide with no horizontal scroll, and the sidebar collapses into a menu.

---

## 8. How the design files are written

The `.dc.html` files use a small design-canvas format. Read them as **reference**, not as production code:
- The markup is inside `<x-dc>`. Styles and fonts are in `<helmet>`.
- `{{name}}` are values filled in by the `renderVals()` method of the `Component` class at the bottom of each file.
- `<sc-for list="{{items}}" as="x">` is a loop; `<sc-if value="{{cond}}">` is a conditional.
- State and click handlers live in the `Component` class, which is the same idea as React `useState`.

To convert a page to Next.js, turn the markup into a React component, the `sc-for` loops into `.map()`, `sc-if` into `&&`, and `renderVals()` logic into hooks.

---

## 9. Suggested build order

1. Set up the Next.js project, design tokens, fonts, Lenis, the layout shell (public nav and app sidebar)
2. Home + Academy (public)
3. Legal pages + Pricing
4. Auth + Onboarding + Telegram linking
5. Dashboard, Markets, News, Alerts (connect to the bot's existing event data)
6. Lesson + quiz + AI Tutor
7. Journal (P&L calendar), Risk & prop tools
8. Live Desk, Reaction Explorer, Research, Community
9. Chart Lab, Strategy Lab (most complex, so build them last)

## 10. Starting prompt for Antigravity / Claude Code

> Read `BUILD_BRIEF.md` fully, then read the design files in `design/`. Set up a Next.js + TypeScript project using the tokens, fonts, motion and rules in the brief. Start with step 1 of the build order only, then stop and show me. Do not invent any data, and do not put secrets anywhere except `.env`.
