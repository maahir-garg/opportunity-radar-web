# NUS Opportunity Radar landing site

A landing page with a sign-up form for NUS Opportunity Radar (short name: Radar), a concept for helping NUS students find opportunities before they close. I built it for CS3216 Assignment 1 as a course project.

## Status

This is a concept site, not a launched product. The product it describes does not exist beyond design mockups, and every listing, organiser, review and date in the product preview is fictional demo content. It is not an official NUS service. The site is live at https://opportunity-radar-web-signup.vercel.app. The repository is not maintained.

Whether the deployed form stores sign-ups depends on environment variables I cannot see from the code (see "Sign-up storage" below). If no storage provider is configured, the production API refuses submissions instead of pretending they were saved.

## What it does

The assignment milestones map to these routes:

- `/` (Milestone 10): hero, product preview, goals, trust section, FAQ and the sign-up form at `#waitlist`.
- `/marketing` (Milestone 11): a small campaign plan covering audience, six channels, a video shot list, sample assets, a six-week timeline, measurement and risks.
- `/about`: goals, features and requirement traceability.
- `/privacy`: what the form does and does not do.
- `POST /api/waitlist`: validates a submission with the same `validateWaitlist` function the client uses, then hands it to the storage layer.

The sign-up form includes a handle reservation field checked against a small hard-coded reserved list as you type, and a follow-up free-text field that appears only when "Other" is chosen under "How did you hear about Radar?". The product preview is three static phone-frame screens built from fictional data in `data/mock-data.json`, with dates pinned to a prototype "today" of 28 August 2026 and formatted in Asia/Singapore so the page renders the same everywhere.

## Tech stack

- Next.js 16 (App Router) with React 19 and TypeScript
- CSS Modules, with design tokens in `app/radar-tokens.css`; no CSS framework
- lucide-react for icons and Manrope through `next/font/google`
- Hosted on Vercel

## Running it locally

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts: `npm run build`, `npm run start` and `npm run lint`. No environment variables are needed to run the site. In development, the sign-up form returns success without storing anything when no provider is configured.

## Sign-up storage

`lib/waitlist-store.ts` uses the first provider that is configured:

1. Upstash Redis or Vercel KV, using `KV_REST_API_URL` and `KV_REST_API_TOKEN`. Each accepted submission is pushed onto a list, and the handle is reserved first so one handle cannot claim two entries.
2. A generic webhook, using `WAITLIST_WEBHOOK_URL`. Each accepted submission is posted to it as JSON. It is only used when the KV variables are not set.
3. Neither: nothing is stored. In production the API returns a 503 with an error message; in development it logs a warning and returns success.

The storage call has a 5-second timeout, and the route does not log email addresses or submissions. `NEXT_PUBLIC_SITE_URL` is optional and sets the base URL for canonical links, the sitemap and the Open Graph image. See `.env.example` for all four names.

## Project layout

```
app/                   routes: /, /marketing, /about, /privacy, /api/waitlist
components/            primitives, landing, product preview, marketing, about, waitlist form
lib/                   types, mock data access, date formatting, validation, handle rules, storage
data/mock-data.json    the fictional demo catalogue
design-system/         the design system and product specification the site implements
docs/BUILD-CONTRACT.md the build rules used while making the site
```

## Tests and checks

There is no test suite. `npm run lint` runs ESLint.

## Credits

The design system and product specification are in `design-system/`. The interactive prototype is a separate Assignment 1 deliverable and is not part of this repository.
