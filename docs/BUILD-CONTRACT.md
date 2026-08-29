# Radar marketing site — build contract

This is the single source of truth for every agent working on this repository.
Read it fully before writing code. Where it conflicts with your own taste, this
document wins. Where it is silent, `design-system/02-DESIGN-SYSTEM.txt` wins.

## 0. What we are building

A **public marketing website** for *NUS Opportunity Radar* (short name: **Radar**),
built for CS3216 Assignment 1:

- **Milestone 10** — a publicly accessible landing page with a sign-up form for
  users to indicate interest. The brief does not require the form to persist
  data; ours does anyway, through a provider layer (see §9 and the README), so
  a real sign-up is never silently dropped.
- **Milestone 11** — a small marketing campaign, published as a page on the site.

It is **not** the mobile product itself, and **we are not rebuilding the app** —
the interactive prototype is a separate deliverable made in a design tool. This
site contains only *product imagery*: three static screen compositions rendered
inside a phone frame, built from the same design system and the same mock data
so the marketing matches the product exactly. See §8 for the hard scope limit.

Deployment target: **Vercel**. Everything must build with `npm run build` and be
statically renderable except `app/api/waitlist/route.ts`.

## 1. Stack and conventions

- Next.js 16 App Router, React 19, TypeScript strict.
- **CSS Modules only** (`Component.module.css`). No Tailwind, no CSS-in-JS, no
  inline `style` attributes except for dynamic geometry values that genuinely
  cannot be expressed as a class (e.g. a timeline bar's `left`/`width` %). Set
  those through CSS custom properties, e.g. `style={{ ['--offset' as string]: '12%' }}`.
- `lucide-react` for all icons. No other icon source, no emoji as UI icons.
- No animation libraries. Transitions use the motion tokens only.
- Server Components by default. Add `'use client'` only to components that need
  state, effects, or event handlers.
- File naming: components `PascalCase.tsx` + `PascalCase.module.css`; lib files
  `camelCase.ts`.
- Every component that renders text takes its copy from this document or from
  `lib/content/*.ts`. Do not invent marketing claims (see §7).

## 2. Non-negotiable visual rules

1. **Tokens only.** Every colour, space, radius, font size, line height, shadow,
   duration and easing comes from a `--radar-*` custom property defined in
   `app/radar-tokens.css`. **No raw hex, rgb, hsl, px font sizes, or arbitrary
   spacing values may appear in any `*.module.css` or `*.tsx` outside
   `app/radar-tokens.css`.** A CI-style grep will check this at the end.
   - Allowed exceptions inside modules: `0`, `1px` / `2px` / `3px` borders and
     outlines, `100%`, `100vh`/`100dvh`, `50%`, percentage geometry, `999px` only
     via `--radar-radius-full`, `max-width` media query breakpoints in `px`
     (CSS variables cannot be used in media queries — use the literal breakpoints
     320 / 768 / 1024 / 1440), and `currentColor`.
   - SVG artwork may use `stroke="currentColor"` / `var(--radar-...)` only.
2. **Palette discipline.** Navy is the action colour. Orange is a *sparse signal
   accent* — a dot, a short signal label, a thin rule. Orange is never a large
   button fill or a body-text colour. Teal = strong match/verified. Amber =
   deadline warning. Red = error/closed. One semantic tint per compact component.
3. **No** glassmorphism, decorative gradients, neon glow, mesh/aurora, drop
   shadows on everything, pill-ifying every label, floating chatbot bubble,
   autoplay carousel, or looping "scanning" animation.
4. Elevation: level 0 for most cards; level 1 for sticky/floating; level 2 for
   sheets. Never nest elevated cards.
5. Radius: 8 compact, 12 fields/buttons/list cards, 16 cards/panels, 24 sheets,
   full **only** for status chips.
6. Motion: 120ms press, 180ms state change, 260ms sheet/reveal, standard easing
   `--radar-ease-standard`. Reduced motion is already handled in the token file;
   do not add motion that ignores it.
7. Grid: landing container max `--radar-size-content-landing-max` (1200px), 24px
   gutters desktop, 16px mobile. Text columns never exceed ~68ch.
8. Type scale is fixed (see §4). Never render essential text below 14px.

## 3. Accessibility (hard requirements)

- One `<main>` per page, a skip link, correct landmark and heading order
  (exactly one `h1` per page, no skipped levels).
- Focus visible everywhere: `:focus-visible { outline: 3px solid var(--radar-color-focus); outline-offset: var(--radar-focus-offset); }`
  — never `outline: none` without a replacement ring. Form controls are the one
  exception: an offset outline on an already-bordered field reads as two
  stacked outlines, so `.control:focus-visible` swaps it for a 2px blue edge
  plus a soft halo drawn with `box-shadow`, which is at least as visible and
  does not shift layout.
- Interactive targets ≥ 44×44px (`--radar-size-tap-minimum`).
- Icon-only controls have `aria-label`; decorative icons/SVGs get `aria-hidden="true"`.
- Tabs use `role="tablist"/"tab"/"tabpanel"` with `aria-selected`, `aria-controls`,
  arrow-key navigation, and roving `tabIndex`.
- Disclosures use `aria-expanded` + `aria-controls`.
- Dialog/sheet: `role="dialog"`, `aria-modal`, focus trap, Escape closes, focus
  returns to the opener.
- Form: real `<label>` for every field, `aria-describedby` for help text,
  `aria-invalid` + error text tied by id, error summary with `role="alert"`,
  success announced through a polite live region.
- State is never conveyed by colour alone — always pair with text or an icon.
- Must survive 200% zoom and 320px width with no horizontal scroll.

## 4. Typography utility classes (defined once in `app/globals.css`)

| Class | Size / line-height | Weight | Use |
|---|---|---|---|
| `.type-display` | `--radar-font-size-display` / `--radar-line-height-display` | 700 | landing hero only |
| `.type-h1` | heading-1 / line-height-heading-1 | 700 | page title |
| `.type-h2` | heading-2 / heading-2 | 700 | section title |
| `.type-h3` | heading-3 / heading-3 | 650 | card group / sheet title |
| `.type-title` | body-large(1.125rem) / heading-3(1.75rem) — see note | 650 | opportunity title |
| `.type-body-large` | body-large / body-large | 400 | lead paragraph |
| `.type-body` | body / body | 400 | default |
| `.type-label` | small / small | 650 | buttons, tabs, chips, fields |
| `.type-small` | small / small | 400 | metadata, helper |
| `.type-caption` | caption / caption | 600 | overline, provenance |

Note: `.type-title` uses `font-size: var(--radar-font-size-body-large)` with
`line-height: var(--radar-line-height-heading-3)` (18/24 in the spec — close
enough within the token set; do **not** invent a new token).

`.type-display` drops to `--radar-font-size-heading-1` below 768px.
Add `.tabular` → `font-variant-numeric: tabular-nums` for dates, counts, scores.

## 5. Shared type + data layer

`lib/types.ts` mirrors `data/mock-data.json` exactly. Field names must match the
JSON — do not rename.

```ts
export type CategoryId = 'career' | 'research' | 'venture' | 'competition'
  | 'global' | 'impact' | 'event' | 'funding';
export type Availability = 'upcoming' | 'open' | 'closingSoon' | 'closed' | 'full' | 'cancelled';
export type ProgressStatus = 'none' | 'saved' | 'preparing' | 'applied' | 'completed' | 'dismissed';
export type ForecastStatus = 'confirmed' | 'expected' | 'watching';
export type SourceStatus = 'official' | 'organiserVerified' | 'communitySubmitted' | 'needsReview';
```

plus `Category`, `Opportunity`, `OpportunityMatch`, `OpportunitySource`,
`Rating`, `Review`, `AssistantScenario`, `Notification`, `Profile`, `MockData`.
Nullable fields in the JSON (`applicationDeadline`, `programmeDates`,
`rating.average`, `match` on some records) must be `| null` / optional in the
types. **Read the JSON before writing the types.**

`lib/data.ts` — imports the JSON, casts to `MockData`, and exports:
`profile`, `categories`, `opportunities`, `reviews`, `assistantScenarios`,
`notifications`, `PROTOTYPE_TODAY` (= `meta.prototypeToday`), plus helpers
`getOpportunity(id)`, `getCategory(id)`, `getReviewsFor(id)`.

`lib/date.ts` — all formatting pinned to `Asia/Singapore` via `Intl.DateTimeFormat`
so server and client agree (no hydration mismatch, no host-TZ drift):
- `formatDeadline(iso)` → `2 Sep 2026, 11:59 PM SGT`
- `formatDate(iso)` → `2 Sep 2026`
- `formatDateRange(start, end)` → `14 Sep – 9 Oct 2026` (en dash; collapse the
  year/month when shared, e.g. `5–6 Sep 2026`)
- `formatCheckedAt(iso)` → `Checked 28 Aug 2026`
- `daysUntil(iso)` → integer, measured from `PROTOTYPE_TODAY`, not `Date.now()`
- `deadlineUrgency(iso)` → `'normal' | 'closingSoon' | 'critical' | 'closed'`
  (>7 days / 2–7 / ≤1 / past)
- `relativeDeadline(iso)` → `Closes in 5 days` | `Closes today` | `Closes tomorrow`
  | `Closed 25 Aug 2026`

**Everything is computed against `PROTOTYPE_TODAY` (2026-08-28T12:00:00+08:00)**
so the site is deterministic and screenshots are stable. Never call `Date.now()`
in render.

`lib/match.ts` — `matchLabel(score)` → `Strong match` (85–100) / `Good match`
(70–84) / `Possible match` (50–69); `matchTone(score, blockers)` → if
`blockers.length > 0` return `'eligibility'` (renders `Eligibility issue`).

## 6. Component inventory and ownership

Do not create files outside your assigned list. If you need something from
another agent's list, assume the documented prop signature and import it.

### 6.1 Primitives — `components/primitives/`
`Button`, `Container`, `Section`, `SectionHeader`, `Chip`, `RadarMark`,
`RadarArcs`, `Disclaimer`, `VisuallyHidden`.

```tsx
// Button: renders <button> or <a> (via `href`); never both.
type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'tertiary';   // default 'primary'
  size?: 'default' | 'large' | 'compact';           // 44 / 52 / 36px
  href?: string; external?: boolean;                // external adds rel+target+a11y name suffix
  iconLeft?: ReactNode; iconRight?: ReactNode;
  fullWidth?: boolean; loading?: boolean; disabled?: boolean;
  children: ReactNode;
} & (button or anchor attrs)

// Container: <div class={container}> max-width 1200px, responsive gutters.
//   props: { size?: 'landing' | 'text'; children }   'text' = max 68ch, centred.
// Section: <section id?> with vertical rhythm (--radar-space-16 mobile /
//   --radar-space-20 desktop) and an optional `tone` prop:
//   'canvas' | 'surface' | 'subdued' | 'navy' (navy = inverse text section).
// SectionHeader: { overline?, title, lead?, align?: 'start' | 'center' }
//   overline renders .type-caption uppercase-ish short label in signal text colour.
// Chip: { tone?: 'neutral' | 'match' | 'warning' | 'info' | 'signal' | 'error';
//   icon?: ReactNode; children } — pill radius, status use only.
// RadarMark: the logo lockup. Concentric arcs + one orange dot, two stroke
//   widths max. Props { size?: number; withWordmark?: boolean }.
// RadarArcs: large decorative background artwork (aria-hidden), flat strokes
//   only, no gradients.
// Disclaimer: renders the exact string
//   "Student-built for NUS students — not an official NUS service."
```

### 6.2 Site chrome — `components/site/`
`SiteHeader` (sticky, solid `--radar-color-surface`, 1px bottom border, height
64px; nav links: `How it works` `#how-it-works`, `Preview` `#preview`,
`Trust` `#trust`, `Campaign` `/marketing`; primary CTA `Join the waitlist` →
`#waitlist` on `/`, `/#waitlist` elsewhere; a real mobile menu button that
toggles an accessible disclosure panel, not a fake hamburger),
`SiteFooter` (three columns: brand + disclaimer, links, contact placeholder),
`SkipLink`.

### 6.3 Product preview — `components/product/`
`DeadlineBadge`, `MatchIndicator`, `WhyMatchPanel`, `SourceTrustBlock`,
`ReviewSummary`, `OpportunityCard`, `ForecastTimeline`, `CategoryIcon`,
`PhoneFrame`, `ProductPreview`, and three screens under
`components/product/screens/`: `ForYouScreen`, `WhyMatchScreen`, `RadarScreen`.
Nothing else. No detail screen, no Ask Radar screen, no notifications screen.

```tsx
// CategoryIcon: maps categoryId -> the exact Lucide icon named in
//   01-PRODUCT-UX-SPEC.txt "Canonical category taxonomy":
//   career BriefcaseBusiness | research FlaskConical | venture Rocket |
//   competition Trophy | global Globe2 | impact HeartHandshake |
//   event Presentation | funding BadgeDollarSign
// DeadlineBadge: { deadline: string | null; availability: Availability }
//   Renders "Closes in 5 days · 2 Sep 2026, 11:59 PM SGT" (relative first,
//   absolute always present). Closed/full/cancelled/upcoming have their own
//   wording. Critical may use error colour; it must not pulse.
// MatchIndicator: { score, label, blockers?, size?: 'compact' | 'default' }
//   -> "95% · Strong match". Never a circular progress ring. If blockers are
//   present -> "Eligibility issue" instead of a high label.
// WhyMatchPanel: { match } -> title "Why this matches", helper "Profile fit,
//   not chance of acceptance.", satisfied (Check) / unknown (CircleHelp) /
//   blockers (TriangleAlert) lists, closing note.
// SourceTrustBlock: { source, organiser } -> status label (Official source /
//   Organiser verified / Community submitted / Needs review), organiser,
//   destination domain, "Checked 28 Aug 2026", "View source" (external),
//   "Report an issue". On the marketing page these two actions may be rendered
//   as inert text-styled elements; do not render dead <a href="#">.
// ReviewSummary: { rating } -> "4.6 · 38 reviews" + "92% would recommend
//   (36 responses)". Fewer than 3 reviews -> "Not enough reviews yet".
// OpportunityCard: { opportunity, variant: 'featured' | 'list', showMatch?,
//   showRating?, interactive?: false }
//   Order: deadline line, title (2-line clamp), organiser + source status,
//   match, category/date/location metadata, rating (only when count >= 3).
//   Never nested in another card. Identical facts across variants.
// ForecastTimeline: { items } — a 30-day axis from PROTOTYPE_TODAY. Confirmed =
//   solid mark + exact date; Expected = dashed/hatched span + "Dates not
//   announced". Two-item legend plus an equivalent chronological list.
// PhoneFrame: { children; label } — 390px reference width, neutral bezel,
//   fixed inner viewport height with internal scroll, a decorative status strip
//   showing "9:41" (aria-hidden). No device photography.
// ProductPreview: 'use client'. Three-tab switcher, see section 8.
```

### 6.4 Landing sections — `components/landing/`
`Hero`, `InterviewQuotes`, `HowItWorks`, `Outcomes`, `TrustSection`, `Faq`,
`ClosingCta`.

### 6.5 Waitlist — `components/waitlist/`
`WaitlistForm` ('use client'), posting to `/api/waitlist`.

## 7. Copy rules and forbidden claims

**Voice:** direct, specific, honest, encouraging. Short sentences. No hype, no
"AI magic", no exclamation marks, no growth-hacky urgency.

**Never write, in any surface:**
- A live or fabricated user count, waitlist count, testimonial, partner logo,
  press mention, funding claim, or "trusted by N students".
- Any claim of NUS endorsement, partnership, official data access, or the NUS
  crest/seal/wordmark.
- "AI-powered" as a headline claim, "perfect match", "guaranteed", "best for you",
  "never miss anything again", or any accuracy/prediction promise.
- Any statement that the forecast predicts the future, or that a match score is a
  chance of acceptance.

**Always:**
- Footer + About carry exactly: `Student-built for NUS students — not an official NUS service.`
- Any surface showing mock listings carries: `Demo content — every listing, review, organiser and date shown here is fictional and used for design testing.`
- Match numbers are always paired with a label and a route to `Why this matches`,
  plus `Profile fit, not chance of acceptance.`
- Forecast items are visibly `Confirmed` or `Expected`; expected items state their
  basis and that dates are not announced.
- Deadlines are absolute with `SGT`; relative urgency is secondary.
- Interview quotes are attributed as coming from our own small round of student
  interviews, with no invented numbers.

## 8. `ProductPreview` — marketing product imagery, NOT a second app

**Scope guard: we are not rebuilding the mobile app.** The interactive prototype
is a separate deliverable made in a design tool. On this site the preview exists
only to *show what the product looks like* on a marketing page.

Build `components/product/ProductPreview.tsx` ('use client'): a tab switcher
above one `PhoneFrame`. Exactly **three** tabs, each rendering one static screen
composition. No internal navigation stack, no back button, no save/watch state
machine, no Ask Radar screen, no detail screen, no router changes.

Tabs and screens (`components/product/screens/`):

1. **`For You`** → `ForYouScreen`
   Top bar `For You` + a bell icon (decorative, `aria-hidden`); context line
   `Based on 3 interests`; a `Your 30-day Radar` preview row reading
   `2 confirmed deadlines · 1 expected window`; heading `Top matches` with a
   featured `OpportunityCard` for `proto-research-hcai` and a list card for
   `proto-civic-tech`; a bottom navigation strip (For You / Explore / Plan /
   Profile, For You marked current). Everything inside the frame is inert —
   `pointer-events: none` on the screen content is acceptable and preferred, so
   nothing inside the phone looks clickable but dead.

2. **`Why this matches`** → `WhyMatchScreen`
   A child top bar `Why this matches`, the score row `95% · Strong match`, the
   helper `Profile fit, not chance of acceptance.`, then the satisfied factors
   (Check icon), unknown facts (CircleHelp), and blockers (TriangleAlert) — all
   read verbatim from `proto-research-hcai.match` in the JSON — and a closing
   note `Matching uses only the profile details you give Radar.`

3. **`30-day Radar`** → `RadarScreen`
   A child top bar `30-day Radar`, the two-item legend (Confirmed / Expected),
   a compact `ForecastTimeline`, a `Needs action` list of the confirmed items
   falling inside 30 days of `PROTOTYPE_TODAY` (civic-tech 30 Aug, research
   2 Sep, product internship 15 Sep), a `Worth watching` row for the expected
   `proto-global-innovation` window, and the line `Expected windows use previous
   organiser dates; current dates have not been announced.`

Tab bar: real `role="tablist"` with arrow-key navigation, `aria-selected`,
roving `tabIndex`, and `tabpanel`s. That is the only interactivity.

Beneath the frame, always render the demo-content notice from §7.

On desktop (≥1024px) the section may show the phone beside a text column
explaining the two differentiators; below that, a single centred frame is fine.

## 9. Page inventory and content

### `/` — landing (Milestone 10)

Course requirement: the page must *explain what the app is about, generate
interest, and contain a form that records a visitor's information.* Design must
be attractive and the message succinct.

Order:

1. `SiteHeader`.
2. **Hero** — overline `NUS Opportunity Radar`; `h1` (`.type-display`):
   `Find the opportunities worth your time.`
   Lead (`.type-body-large`, ≤ 55 words): *Radar brings NUS internships,
   research, competitions, exchanges, grants and talks into one place, shows you
   a short list that fits your year and interests, explains why each one matched,
   and turns the ones you save into a deadline plan.*
   Primary CTA `Reserve your spot` → `#waitlist`; secondary `See how it works`
   → `#how-it-works`. A short honest line under the buttons:
   `Free for students · Pilot opens to the first 100 sign-ups · No NUS login required.`
   Then the `Disclaimer` line. A restrained `RadarArcs` motif sits behind or
   beside the text, never over it, and is `aria-hidden`.
3. **InterviewQuotes** — overline `What students told us`, framing sentence
   *We spoke to NUS students about how they find opportunities today.*, then the
   three real quotes, each in a quiet-surface card attributed
   `NUS undergraduate · interview 1` (…2, …3):
   - "Talk quality is hard to gauge upfront — there's no verification system."
   - "Everyone discovers and applies through Telegram, which is fragmented."
   - "There aren't enough NUS events on the centralised platforms we already use."
4. **HowItWorks** (`id="how-it-works"`) — three numbered steps, each with one
   Lucide icon:
   1. `Set up your Radar` — *Tell Radar your year, school, up to three interests
      and how much time you have. About a minute, editable later.*
   2. `See what actually fits` — *A short list instead of a full inbox. Every
      recommendation shows the deadline, the organiser, the source it came from
      and why it matched you.*
   3. `Plan the deadline` — *Save it, set a reminder, mark it applied, and see
      the next 30 days in one view.*
5. **Preview** (`id="preview"`) — `SectionHeader`: overline `Product preview`,
   title `Two things a group chat can't do.`, lead naming the two: an
   explainable match and a 30-day view that separates confirmed from expected.
   Then `ProductPreview` (§8) and the demo-content notice.
6. **Outcomes** (`id="outcomes"`) — three alternating rows, one per product goal,
   each with a real component as its visual and a `.type-caption` goal line:
   - `Goal 1 — Discover` · *One place instead of six channels.* Visual: featured
     `OpportunityCard` (`proto-research-hcai`).
   - `Goal 2 — Decide` · *The evidence sits next to the decision.* Visual:
     `SourceTrustBlock` + a short eligibility list + `ReviewSummary`.
   - `Goal 3 — Act` · *A deadline plan you can actually keep.* Visual: a small
     static Plan panel — `Next up`, a reminder row, and the four status tabs.
7. **TrustSection** (`id="trust"`) — four short items: *Every listing shows its
   source and when we last checked it.*; *Match scores explain themselves.*;
   *Forecasts separate confirmed dates from expected windows.*; *We are not an
   official NUS service, and we say so.* Then one honest limitation paragraph:
   *Radar is a student project at prototype stage. Everything shown on this page
   is demo content, there is no live NUS integration, and we will only launch
   with sources we are allowed to use.*
8. **Faq** — accessible disclosure list:
   - `Is this an official NUS product?` → No. Student-built, not affiliated, no
     NUS marks used.
   - `Where would the opportunities come from?` → Public organiser and faculty
     pages, student-society submissions, and listings we have permission to
     index. Every item keeps its source and last-checked date.
   - `What does the match percentage mean?` → Profile fit against the details you
     gave us — never a chance of acceptance. `Why this matches` is always one tap
     away.
   - `What is an "expected" opportunity?` → A seasonal window based on a previous
     year's listing, shown with its basis and marked `Dates not announced`.
   - `What happens to my email?` → Nothing is stored by this prototype site; the
     form confirms in your browser. See the privacy note.
   - `When can I use it?` → We are testing the prototype now and will email the
     list before the pilot. We are not promising a date.
9. **Waitlist** (`id="waitlist"`) — see §10.
10. `SiteFooter`.

### `/marketing` (Milestone 11)

A designed campaign page, not a text dump. The course explicitly rewards
*non-disruptive, creative, realistic* strategies with implementation detail, and
warns that video is not the only channel. Sections:

1. Header: `h1` `Find your signal — launch campaign`; lead stating the single
   goal (fill the pilot list with Year 2–3 undergraduates who already feel the
   discovery problem); a `Campaign at a glance` row: audience, 6-week window
   (4 pre-launch, launch week, 1 sustain), budget under S$150 (mostly printing),
   primary metric (qualified sign-ups, not impressions).
2. `Who we are talking to` — primary persona (Year 2–3 undergraduate, lives in
   Telegram, has missed a deadline) and secondary (societies and organisers who
   *want* attendance — they are both supply and distribution).
3. `Channels` — six channel cards, each with: what we do, why it works, cost,
   what we measure.
   - **Telegram** — the channel students already use. A weekly `3 closing this
     week` digest cross-posted with faculty/interest-group channels, each item
     deep-linking to the landing page with a per-channel UTM.
   - **Short vertical video (Instagram / TikTok)** — a `Missed It` series, one
     30–45s deadline story per post.
   - **On-campus physical** — A3 posters and laptop stickers with a QR code at
     COM, Central Library, UTown and faculty noticeboards, placed only on
     approved noticeboards (explicitly: no stickers on benches, nothing in
     restrooms — we call this out as a constraint we respect).
   - **Societies and organisers outreach** — a one-page pack: they get free
     visibility, we get listings. Includes a submission form.
   - **Existing newsletters** — a short paragraph inside society and faculty
     newsletters instead of starting our own list.
   - **Shareable opportunity links / word of mouth** — every opportunity gets a
     public share card; the reserved-handle mechanic gives people something to
     post.
   Then a `Considered and deprioritised` note covering Reddit r/NUS and
   NUSWhispers with the honest reason (those communities punish promotion), and
   paid ads (wrong audience economics for a campus product).
4. `Implementation details` —
   - **Promotional video outline**: a real shot list table of 8 beats
     (shot / on-screen text / voiceover / seconds) for a 40s vertical video.
     Concept: the same opportunity scrolls past in three different apps and is
     missed; Radar surfaces it once, with a deadline and a reason.
   - **Poster concept**: headline, radar motif, one line of body copy, QR.
   - **Sample Telegram post** and **sample Instagram caption**, written out.
   - **Society outreach email**, written out, with no partnership claim.
   - **6-week timeline table**: week-by-week, what ships in each channel.
5. `Measurement` — per-channel UTMs, landing→form conversion, the
   `How did you hear about Radar?` field on the form as the attribution hook,
   and the honest note that we have no results yet because nothing has launched.
6. `Why we think this works` — four short arguments: we meet students inside the
   channel they already use; the promise is legible in one line; organisers are
   supply *and* distribution; low cost with high repetition.
7. `Risks and what we would do` — four risks with mitigations: society
   gatekeeping, a thin catalogue at launch, "another platform" fatigue, and
   moderation/data-permission limits.

### `/about`
Product story, the three goals (G1–G3), the six MVP features (F1–F6), a
traceability table (goal → features → surfaces → what we would observe), a
`What Radar is not` list, the CS3216 Assignment 1 context, and the disclaimer.

### `/privacy`
Short and plain: what the form asks for, that this prototype site does not
persist submissions anywhere, that we would ask for consent before any real
pilot, that we never use faculty, year, nationality, disability or financial-aid
details to judge competitiveness, and a clearly-marked placeholder contact
`hello@opportunityradar.example`.

### `/api/waitlist` — POST
Validates the payload, then hands it to `lib/waitlist-store.ts`, which emails
it via Resend (`RESEND_API_KEY` + `WAITLIST_NOTIFY_EMAIL`), writes to
Upstash/Vercel KV (`KV_REST_API_URL` + `KV_REST_API_TOKEN`), or POSTs to
`WAITLIST_WEBHOOK_URL`, whichever is configured first, in that order.

- Stored → `200 { ok: true, message, handle }`.
- Invalid → `400 { ok: false, errors }`.
- Not stored, in production → `503` with an honest "we cannot take sign-ups"
  message. Never tell someone they are on the list when nothing was recorded.
- Not stored, outside production → `200` with `stored: false`, so local
  development works with no configuration.
- Storage failures and timeouts count as not stored. The route never 500s.

Never log raw emails or the submission object; log outcomes and provider tags
only.

## 10. Waitlist form (Milestone 10 requirement + the scarcity mechanic)

The course suggests two proven tactics: a promo for the first X sign-ups, and
letting people **claim a handle** (Cal.com style). We do both — honestly. We may
state our own plan ("the pilot opens to the first 100 sign-ups"); we may never
state a fabricated count of people who have already joined.

Section heading: `Reserve your spot in the Radar pilot.`
Lead: *We are opening the first pilot to 100 NUS students. Tell us what you care
about and we will send your Radar before anyone else.*

**Handle field (the hook), first in the form:**
- Label `Claim your Radar handle`, rendered as a prefix `radar.nus/@` + input.
- Lowercase a–z, 0–9 and underscore, 3–20 chars, normalised as the user types.
- Deterministic local availability check against a small hard-coded reserved list
  in `lib/handles.ts` (e.g. `admin, radar, nus, support, help, avery, test`) —
  debounce 250ms, then show `@handle is available` (match tone) or
  `@handle is taken — try another` (warning tone), each with an icon *and* text.
- Help text: `Your handle is only a reservation for the pilot. It is not public.`
- No fake "checking our servers" delay theatre beyond the debounce.

Remaining fields:
- `email` — required, `type="email"`, label `Email`, help `Any email works. We
  only write to you about the pilot.` Validate shape, never reject non-NUS domains.
- `year` — required select: `Year 1`…`Year 5+`, `Graduate student`, `Alumni`, `Staff`.
- `faculty` — required select: Computing, Business, Science, Engineering, Design
  and Engineering, Arts and Social Sciences, Law, Medicine, Dentistry, Nursing,
  Music, College of Humanities and Sciences, NUS College, Other.
- `interests` — checkbox group of the eight canonical categories, **at least one,
  at most three**, enforced with a live count message (`2 of 3 selected`) rather
  than surprise-disabled boxes.
- `channel` — optional select `How did you hear about Radar?` (Telegram,
  Instagram or TikTok, A friend, A poster on campus, A student society, Other).
  This is the attribution hook referenced by `/marketing`.
- `channelOther` — revealed only when `channel` is `Other`, labelled `Where did
  you hear about it?`, optional, 80 characters. Validated only when `Other` is
  selected and dropped otherwise. Its reveal wrapper clips overflow to animate,
  so it must leave room for the focus ring.
- `note` — optional textarea ≤ 300 chars, label `What do you miss out on most
  right now?`, with a live character count.
- Consent checkbox — required: `I'm happy to be contacted about the Radar pilot.`

Behaviour: validate on submit (not per keystroke), inline errors tied to fields
by `aria-describedby` + `aria-invalid`, an error summary with `role="alert"` that
links to the first invalid field, a loading submit button that keeps its width
and accessible name, then a success panel replacing the form:
`You're on the list, @handle.` + `We'll email you before the pilot opens.
Nothing here is shared with NUS.` + a `Add another response` reset. Announce the
result politely. A network failure shows a retry state and keeps every value the
user typed.

## 11. SEO / metadata / repo hygiene

- Root `metadata`: title template `%s · NUS Opportunity Radar`, default title
  `NUS Opportunity Radar — Find your signal.`, description, `openGraph`,
  `twitter: 'summary_large_image'`, `metadataBase` from
  `process.env.NEXT_PUBLIC_SITE_URL ?? 'https://opportunity-radar.vercel.app'`.
- `app/opengraph-image.tsx` using `next/og` `ImageResponse`: navy background,
  wordmark, `Find the opportunities worth your time.`, the disclaimer line. Token
  hex values may be hard-coded *in this one file* because `next/og` cannot read CSS.
- `app/robots.ts`, `app/sitemap.ts`, `app/not-found.tsx`.
- `README.md`: what it is, the milestone mapping, run/build/deploy instructions.
- `.gitignore` must exclude `node_modules`, `.next`, `.vercel`, `.env*`.

## 12. Definition of done (checked before any agent reports success)

- `npm run build` passes with zero TypeScript and zero ESLint errors.
- `grep -rEn '#[0-9a-fA-F]{3,8}\b' app components --include=*.css --include=*.tsx`
  returns nothing outside `app/radar-tokens.css` and `app/opengraph-image.tsx`.
- No horizontal scroll at 320px; layouts verified at 320 / 390 / 768 / 1440.
- Every interactive control is reachable by keyboard with a visible focus ring.
- Every page has exactly one `h1` and a sensible heading outline.
- No forbidden claim from §7 appears anywhere in the repo.

## 13. Next.js 16 specifics

This repo runs **Next.js 16 with the App Router and Turbopack**. Its APIs differ
from older training data. Before using any Next API (`metadata`/`generateMetadata`,
route handlers, `next/font`, `next/og`, `sitemap.ts`, `robots.ts`, CSS Modules,
`Link`), read the local copy of the docs first:

```
node_modules/next/dist/docs/01-app/...
```

Notable: `params`/`searchParams` are Promises in this version; route handlers use
the Web `Request`/`Response` API; `next/font/google` is the supported font route.
Do not add a `next.config` option you have not verified in those docs.
