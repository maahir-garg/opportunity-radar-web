# NUS Opportunity Radar — marketing site

The public marketing site for **NUS Opportunity Radar** (short name: **Radar**), a
student-built concept that helps NUS students find opportunities before they close.

Built for **CS3216 Assignment 1**:

| Milestone | Where it lives |
|---|---|
| **Milestone 10** — publicly accessible landing page with a sign-up form | [`/`](app/page.tsx) — hero, product preview, goals, trust section, FAQ, and the waitlist form at `#waitlist` |
| **Milestone 11** — small marketing campaign | [`/marketing`](app/marketing/page.tsx) — audience, six channels, video shot list, sample assets, six-week timeline, measurement, risks |
| Supporting context | [`/about`](app/about/page.tsx) — goals, features, requirement traceability · [`/privacy`](app/privacy/page.tsx) — what the form does and does not do |

> Radar is student-built for NUS students — not an official NUS service. Every
> listing, organiser, review and date shown in the product preview is fictional
> demo content used for design testing.

## Running it

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

Node 18.18+ is required (developed on Node 26, Next.js 16).

## Deploying to Vercel

The repository is a stock Next.js App Router project, so Vercel needs no
configuration beyond the defaults:

1. Push this folder to a Git repository.
2. In Vercel, **Add New → Project**, import the repository, and keep the detected
   framework preset (**Next.js**). No build or output overrides are needed.
3. Optionally set `NEXT_PUBLIC_SITE_URL` to the deployed origin (e.g.
   `https://opportunity-radar.vercel.app`) so canonical URLs, the sitemap and the
   Open Graph image resolve against the real domain.
4. Deploy, and hand the resulting URL in for Milestone 10.

There is no database, no environment secret and no external API, so a preview
deployment is fully functional.

## The sign-up form

The assignment states the form "doesn't have to actually save any data", and this
one deliberately does not. `POST /api/waitlist` validates the submission with the
same [`validateWaitlist`](lib/waitlist.ts) function the client uses, returns a
success or a field-level error map, and **persists nothing** — no database, no
mailing-list provider, no analytics. `/privacy` says so in plain language.

The form does implement the two tactics the course suggests for a pre-launch
landing page: a stated scarcity ("the first pilot opens to 100 students" — our own
plan, never a fabricated count of people who have already joined) and a
**reserved handle**, checked against a local reserved list as you type.

## How it is built

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript** (strict).
- **CSS Modules** only. Every colour, space, radius, type step, shadow, duration
  and easing comes from [`app/radar-tokens.css`](app/radar-tokens.css) — the web
  translation of the design system's token file. No raw hex or arbitrary spacing
  appears anywhere else in the codebase.
- **lucide-react** for icons, **Manrope** via `next/font/google`.
- No CSS framework, no UI kit, no form library, no animation library.

```
app/                  routes: /, /marketing, /about, /privacy, /api/waitlist
components/
  primitives/         Button, Container, Section, SectionHeader, Chip, RadarMark…
  site/               header, footer, skip link
  landing/            the landing page sections
  product/            the product-preview components and the three phone screens
  marketing/          the campaign page sections
  about/              the about page sections
  waitlist/           the sign-up form, handle field, interest picker, success panel
lib/                  types, mock data access, SGT date formatting, validation
data/mock-data.json   the fictional demo catalogue
design-system/        the source design system this site implements
docs/BUILD-CONTRACT.md the build rules every part of this site follows
```

### Deterministic dates

The preview is pinned to a prototype "today" of **28 Aug 2026** (from
`data/mock-data.json`) and every date is formatted in `Asia/Singapore`, so the
site renders identically on any machine and in any timezone — deadlines never
drift and screenshots stay stable.

### Accessibility

One `<main>` and one `<h1>` per page, a skip link, a keyboard-operable tab
switcher and disclosure menu, visible focus rings from the design tokens, 44px
touch targets, labelled form fields with an error summary, polite live regions for
form and availability feedback, and state that is never signalled by colour alone.

## Credits

Design system and product specification: `design-system/`. This site implements
that system; it does not restate the interactive prototype, which is a separate
Assignment 1 deliverable.
