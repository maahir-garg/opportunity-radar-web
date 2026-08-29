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

The assignment only requires the form to collect a visitor's information, but this
one actually stores it once you configure a provider (see "Sign-up storage" below).
`POST /api/waitlist` validates the submission with the same
[`validateWaitlist`](lib/waitlist.ts) function the client uses, hands a valid
submission to the storage layer, and returns a success or a field-level error map.
`/privacy` describes what is and is not done with a stored entry.

The form does implement the two tactics the course suggests for a pre-launch
landing page: a stated scarcity ("the first pilot opens to 100 students" — our own
plan, never a fabricated count of people who have already joined) and a
**reserved handle**, checked against a local reserved list as you type.

The "How did you hear about Radar?" field reveals a short free-text follow-up,
`channelOther`, only when the visitor picks "Other": the attribution hook the
`/marketing` page's measurement section refers to.

## Sign-up storage

`POST /api/waitlist` stores nothing until you configure one of two providers,
resolved in this order by [`lib/waitlist-store.ts`](lib/waitlist-store.ts):

1. **Upstash Redis / Vercel KV** (`KV_REST_API_URL` + `KV_REST_API_TOKEN`):
   recommended. In the Vercel dashboard: **Storage → Create Database**, add the
   Upstash-backed KV integration to this project, and Vercel injects both
   environment variables into the project automatically, no secrets to copy by
   hand. Each accepted submission is `RPUSH`ed as a JSON string onto
   `waitlist:submissions`, and the handle is reserved with `SETNX` first so the
   same handle can never silently claim two entries.
2. **A generic webhook** (`WAITLIST_WEBHOOK_URL`): every accepted submission is
   POSTed as JSON to this URL. Point it at Zapier, Make, n8n, a Discord/Slack
   incoming webhook, or an endpoint you write yourself. Only used when the KV
   variables above are not set.
3. **Neither configured**: nothing is stored. In production the API returns a
   clear `503` (`"We cannot take sign-ups at the moment. Please try again
   later."`) instead of ever telling a visitor they are on the list when nothing
   was recorded. In local development it logs a warning and still returns
   success, so `npm run dev` keeps working without any setup.

See [`.env.example`](.env.example) for both variable pairs with comments. The
storage call has a 5-second timeout and never throws past the route handler, so
a slow or unreachable provider degrades to the "not stored" path above rather
than a 500. The route never logs a raw email address or the submission itself,
only outcome counts.

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
