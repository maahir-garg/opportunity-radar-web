/**
 * All copy for /about.
 *
 * Written in our own words from design-system/01-PRODUCT-UX-SPEC.txt — not
 * copied verbatim. Still bound by docs/BUILD-CONTRACT.md §7: no fabricated
 * counts, no NUS partnership claim, no "AI-powered", no accuracy or
 * acceptance-likelihood promises.
 */

export const aboutIntro = {
  lead: 'Radar is the decision layer that sits above the places NUS opportunities already live — it does not replace application portals or organiser pages. It gathers internships, research, competitions, exchanges, grants and talks into one profile-aware list, explains why each one fits, and helps you act before the deadline.',
} as const;

export const productStory: { overline: string; title: string; paragraphs: string[] } = {
  overline: 'Why we are building this',
  title: 'A feed instead of six tabs',
  paragraphs: [
    'In our interviews, NUS students described finding opportunities through whatever channel happened to surface one: an email from a faculty office, a forwarded Telegram message, a society Instagram post, a professor mentioning something in passing. Nothing points at all of it, so a student either checks several places out of habit or relies on luck.',
    'These are assumptions we tested in a small round of interviews, not settled facts — we treat them as hypotheses the prototype should help confirm or correct. What we heard consistently was that volume, not scarcity, is the problem: too many channels, too little context on any one item, and no single place to see what is actually closing soon.',
    'Radar answers that by keeping one shared catalogue with one data model, ranking a short list against a student profile instead of showing everything, attaching the evidence needed to judge each item, and turning anything saved into a plan with a status and a deadline in view.',
  ],
};

export type GoalId = 'G1' | 'G2' | 'G3';
export type GoalIcon = 'compass' | 'shield-check' | 'calendar-check';

export type Goal = {
  id: GoalId;
  icon: GoalIcon;
  title: string;
  description: string;
};

export const goals: Goal[] = [
  {
    id: 'G1',
    icon: 'compass',
    title: 'Discover relevant opportunities quickly',
    description:
      'One profile-aware list stands in for the six channels a student would otherwise have to check by hand.',
  },
  {
    id: 'G2',
    icon: 'shield-check',
    title: 'Decide with confidence',
    description:
      'Fit, source, freshness, eligibility and past-student experience sit next to the decision, not buried below it.',
  },
  {
    id: 'G3',
    icon: 'calendar-check',
    title: 'Act before the deadline',
    description:
      'Saving something starts a plan: a status, one next action, a reminder, and a 30-day view of what is due.',
  },
];

export type FeatureId = 'F1' | 'F2' | 'F3' | 'F4' | 'F5' | 'F6';
export type FeatureIcon =
  | 'user-cog'
  | 'search'
  | 'list-checks'
  | 'clipboard-list'
  | 'calendar-clock'
  | 'message-circle';

export type Feature = {
  id: FeatureId;
  icon: FeatureIcon;
  title: string;
  description: string;
};

export const features: Feature[] = [
  {
    id: 'F1',
    icon: 'user-cog',
    title: 'Profile and preferences',
    description:
      'A short first-use setup captures year, faculty and up to three interests. Every factor used in a recommendation stays visible and can be edited or removed.',
  },
  {
    id: 'F2',
    icon: 'search',
    title: 'Personalised discovery',
    description:
      'A For You feed sits next to conventional Explore search and filters, so a short list is the default and the full catalogue is one tap away.',
  },
  {
    id: 'F3',
    icon: 'list-checks',
    title: 'Explainable match',
    description:
      'Every match carries a plain-language label and a breakdown of what fits, what is unknown, and what might block eligibility — never a chance of acceptance.',
  },
  {
    id: 'F4',
    icon: 'clipboard-list',
    title: 'Decision-ready opportunity detail',
    description:
      'Organiser, source, last-checked date, deadline, eligibility, commitment and reviews live in one standard layout for every listing.',
  },
  {
    id: 'F5',
    icon: 'calendar-clock',
    title: 'Plan, forecast and reminders',
    description:
      'Saved items move through Saved, Preparing, Applied and Past. The 30-day Radar keeps confirmed dates visibly separate from expected windows.',
  },
  {
    id: 'F6',
    icon: 'message-circle',
    title: 'Ask Radar',
    description:
      'A plain-language way to search inside Explore. It returns the same catalogue cards with reasons and sources — it never invents a deadline or a rule.',
  },
];

export const featuresNote =
  'A lock-screen widget that surfaces one saved opportunity is on our list as a stretch goal. It is not part of the six features above and will not be built until this MVP works end to end.';

export type TraceabilityRow = {
  goal: string;
  features: string;
  surfaces: string;
  observe: string;
};

export const traceabilityRows: TraceabilityRow[] = [
  {
    goal: 'G1 — Discover',
    features: 'F1, F2, F3, F6',
    surfaces: 'Onboarding, For You, Explore, Ask Radar',
    observe: 'A student finds one opportunity that suits them and can say why it appeared.',
  },
  {
    goal: 'G2 — Decide',
    features: 'F3, F4',
    surfaces: 'Opportunity detail, Why this matches, Reviews',
    observe:
      'A student can point to the source, the eligibility rules, the commitment and the deadline without help.',
  },
  {
    goal: 'G3 — Act',
    features: 'F4, F5',
    surfaces: 'Detail, reminder setup, Plan, 30-day Radar',
    observe:
      'A student saves an item, sets a next action or reminder, and later finds it under the correct status.',
  },
];

export const notList: string[] = [
  'Host or process a complete application — every apply action leaves Radar for the official page.',
  'Write, generate or edit a resume, essay or application answer.',
  'Estimate your chance of acceptance. A match score measures profile fit, never admission likelihood.',
  'Run an open social feed, follower graph or direct-messaging system.',
  'Publish a review before it has been through moderation.',
  'Claim a live NUS data integration — every listing in this preview is fictional demo content, and any real pilot would need explicit source permission.',
];

export const assignmentContext: { overline: string; title: string; paragraphs: string[] } = {
  overline: 'Assignment context',
  title: 'What this site is, and is not',
  paragraphs: [
    'This site is coursework for CS3216 Software Product Engineering for Digital Markets at the National University of Singapore. It is a marketing page, built for Assignment 1 to explain the product and collect interest — it is not the product itself.',
    'The opportunity catalogue shown throughout the product preview on this site is fictional demo content, written to exercise the design system rather than represent real programmes or organisers.',
    'The tap-through interactive prototype — the actual screens a student would use — is a separate deliverable built in a design tool. This site only shows static compositions of it.',
  ],
} as const;
