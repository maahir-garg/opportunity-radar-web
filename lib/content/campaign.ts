/**
 * All copy for /marketing: the launch campaign plan for the Radar pilot.
 *
 * Everything here must obey docs/BUILD-CONTRACT.md §7: no fabricated counts,
 * no testimonials, no claimed NUS partnership, no "AI-powered", no promised
 * launch date, no invented metrics or results. Where we have no results yet,
 * we say so.
 */

export type IconKey =
  | 'send'
  | 'clapperboard'
  | 'map-pinned'
  | 'handshake'
  | 'newspaper'
  | 'share'
  | 'users'
  | 'calendar-range'
  | 'wallet'
  | 'target'
  | 'check'
  | 'triangle-alert';

export type GlanceItem = {
  icon: IconKey;
  label: string;
  value: string;
};

export const campaignHeader = {
  overline: 'Launch campaign',
  title: 'Find your signal: launch campaign',
  lead: 'One goal: fill the pilot list with Year 2–3 NUS undergraduates who already feel the discovery problem: the missed deadline, the opportunity buried in a group chat, the six places you’d have to check to be sure you saw everything.',
} as const;

export const glanceItems: GlanceItem[] = [
  {
    icon: 'users',
    label: 'Audience',
    value: 'Year 2–3 undergraduates who already feel the discovery problem',
  },
  {
    icon: 'calendar-range',
    label: 'Window',
    value: '6 weeks: 4 pre-launch, 1 launch week, 1 sustain week',
  },
  {
    icon: 'wallet',
    label: 'Budget',
    value: 'Under S$150, almost entirely A3 printing and stickers',
  },
  {
    icon: 'target',
    label: 'Primary metric',
    value: 'Qualified sign-ups, not impressions',
  },
];

export type Persona = {
  id: string;
  kind: 'Primary' | 'Secondary';
  name: string;
  summary: string;
  details: { label: string; value: string }[];
};

export const personas: Persona[] = [
  {
    id: 'undergraduate',
    kind: 'Primary',
    name: 'Year 2–3 undergraduate',
    summary:
      'Lives in Telegram, not a portal. Has already missed at least one deadline because it surfaced somewhere they don’t check daily.',
    details: [
      { label: 'Where they are', value: 'Faculty and interest-group Telegram chats, email they skim, Instagram they scroll' },
      { label: 'What they need', value: 'A short list that fits their year and interests, with the deadline and the reason up front' },
      { label: 'How we reach them', value: 'Inside the channels they already open: a digest, a short video, a poster near where they walk' },
    ],
  },
  {
    id: 'societies',
    kind: 'Secondary',
    name: 'Societies and organisers',
    summary:
      'They want attendance and applicants. They are both a source of listings and a distribution channel. They can post their own events and share Radar with their members.',
    details: [
      { label: 'Where they are', value: 'Running their own Telegram channels, Instagram pages and mailing lists' },
      { label: 'What they need', value: 'Free visibility for their event or programme, with no extra admin' },
      { label: 'How we reach them', value: 'A short outreach email and a one-page pack, plus a submission form for their listings' },
    ],
  },
];

export type ChannelCard = {
  id: string;
  icon: IconKey;
  name: string;
  whatWeDo: string;
  whyItWorks: string;
  cost: string;
  whatWeMeasure: string;
};

export const channels: ChannelCard[] = [
  {
    id: 'telegram',
    icon: 'send',
    name: 'Telegram',
    whatWeDo:
      'A weekly "3 closing this week" digest, cross-posted into faculty and interest-group channels we already have access to. Each item deep-links to the landing page with a per-channel UTM.',
    whyItWorks:
      'This is where students already read announcements. A digest is quick to scan and easy for a channel admin to forward.',
    cost: 'Free: one moderator’s time to write and post each week',
    whatWeMeasure: 'Clicks tagged utm_source=telegram and sign-ups where the form’s attribution field says Telegram',
  },
  {
    id: 'video',
    icon: 'clapperboard',
    name: 'Short vertical video',
    whatWeDo:
      'A "Missed It" series on Instagram and TikTok: one 30–45s deadline story per post, each built around one real-shaped scenario (see the shot list below).',
    whyItWorks:
      'Vertical video already gets watched in these feeds, and a single deadline is a small, complete story that needs no explanation.',
    cost: 'Free to post: filming and editing done on a phone, no paid promotion',
    whatWeMeasure: 'Link-in-bio clicks tagged utm_source=instagram and video completion rate on-platform',
  },
  {
    id: 'physical',
    icon: 'map-pinned',
    name: 'On-campus physical',
    whatWeDo:
      'A3 posters and laptop stickers with a QR code at COM, Central Library, UTown and faculty noticeboards, placed only on noticeboards where posting is already allowed.',
    whyItWorks:
      'Repetition in places students already pass builds recognition, and a QR code removes the friction of typing a URL.',
    cost: 'Under S$150 for printing, the only line item in the budget',
    whatWeMeasure: 'Scans tagged utm_source=poster; we respect noticeboard rules and never place anything on benches or in restrooms',
  },
  {
    id: 'outreach',
    icon: 'handshake',
    name: 'Societies and organisers outreach',
    whatWeDo:
      'A one-page pack sent to societies and organisers: what Radar is, what we’re asking for, and a submission form for their listings.',
    whyItWorks:
      'They get free visibility for their programme; we get listings and a channel willing to share Radar with their own members.',
    cost: 'Free: email and a shared form',
    whatWeMeasure: 'Listings submitted per society and sign-ups tagged utm_source=society',
  },
  {
    id: 'newsletters',
    icon: 'newspaper',
    name: 'Existing newsletters',
    whatWeDo:
      'A short paragraph placed inside society and faculty newsletters that already go out, instead of starting a Radar mailing list of our own.',
    whyItWorks:
      'These lists already have an audience and a trust relationship. We are borrowing reach, not building it from zero.',
    cost: 'Free: we only need one editor to agree to include the paragraph',
    whatWeMeasure: 'Sign-ups tagged utm_source=newsletter, grouped by which newsletter carried it',
  },
  {
    id: 'word-of-mouth',
    icon: 'share',
    name: 'Shareable links and word of mouth',
    whatWeDo:
      'Every opportunity gets a public share card, and the reserved-handle sign-up mechanic gives early users something worth posting about.',
    whyItWorks:
      'A specific, useful link is easier to forward than a general pitch for "an app." A claimed handle gives people a reason to tell a friend.',
    cost: 'Free: built into the product itself',
    whatWeMeasure: 'Sign-ups tagged utm_source=sharecard and referral mentions in the optional note field',
  },
];

export type DeprioritisedChannel = {
  name: string;
  reason: string;
};

export const consideredAndDeprioritised: DeprioritisedChannel[] = [
  {
    name: 'Reddit r/NUS and NUSWhispers',
    reason:
      'These communities actively punish overt promotion. We would only post there if a moderator or an existing thread invited it, not as a planned channel.',
  },
  {
    name: 'Paid social ads',
    reason:
      'Wrong economics for a single-campus product with a near-zero budget. We would be paying to reach people outside NUS to find the small number who are inside it.',
  },
];

export type ShotListRow = {
  id: number;
  shot: string;
  onScreenText: string;
  voiceover: string;
  seconds: number;
};

export const videoConceptSummary =
  'The same opportunity scrolls past unnoticed in three different apps: Telegram, email, Instagram. Radar surfaces it once, with a deadline and a one-line reason it matters. Closes on the landing URL and the disclaimer.';

export const shotList: ShotListRow[] = [
  {
    id: 1,
    shot: 'Phone scrolling a busy Telegram group chat; a scholarship talk flyer passes by mid-scroll.',
    onScreenText: 'You saw this once.',
    voiceover: 'This talk got posted in a 400-person group chat.',
    seconds: 5,
  },
  {
    id: 2,
    shot: 'Thumb keeps scrolling past the same message as new ones stack on top of it.',
    onScreenText: 'Then it’s gone.',
    voiceover: 'Then two hundred messages happened.',
    seconds: 4,
  },
  {
    id: 3,
    shot: 'Cut to an inbox; the same flyer sits unopened inside a faculty newsletter.',
    onScreenText: 'It was in your inbox too.',
    voiceover: 'It was also in the newsletter you didn’t open.',
    seconds: 5,
  },
  {
    id: 4,
    shot: 'Cut to an Instagram feed; the same flyer appears as a story, swiped past.',
    onScreenText: 'And your Instagram.',
    voiceover: 'And a society posted it here, for about six hours.',
    seconds: 4,
  },
  {
    id: 5,
    shot: 'Screen wipes to a phone opening Radar; the For You screen loads.',
    onScreenText: 'Radar catches it once.',
    voiceover: 'Radar picks it up once.',
    seconds: 5,
  },
  {
    id: 6,
    shot: 'For You screen: the same talk as an opportunity card with deadline and match reason visible.',
    onScreenText: 'Deadline. Why it matched. One place.',
    voiceover: 'With the deadline, why it matched you, and where it came from.',
    seconds: 6,
  },
  {
    id: 7,
    shot: '30-day Radar screen scrolling past confirmed and expected items.',
    onScreenText: 'Confirmed and expected, side by side.',
    voiceover: 'So your next 30 days aren’t a surprise.',
    seconds: 5,
  },
  {
    id: 8,
    shot: 'Close card: Radar wordmark, landing URL, disclaimer line.',
    onScreenText: 'radar.nus/join · Student-built for NUS students',
    voiceover: 'Radar. Built by NUS students, for NUS students.',
    seconds: 6,
  },
];

export const shotListTotalSeconds = shotList.reduce((total, row) => total + row.seconds, 0);

export const posterConcept = {
  headline: 'Find your signal.',
  body: 'One weekly list of what’s closing soon, matched to your year and interests.',
  qrLabel: 'QR placeholder: links to radar.nus/join',
  footer: 'Student-built for NUS students. Not an official NUS service.',
};

export const telegramSamplePost = {
  channelName: 'Radar Weekly · 3 closing this week',
  body: [
    '3 closing this week:',
    '• SoC UROP applications: closes 2 Sep, 11:59pm',
    '• NUS Enterprise pitch night sign-up: closes 4 Sep, 6pm',
    '• Data science mentorship intake: closes 5 Sep, 11:59pm',
    '',
    'Full list + why each one matched: radar.nus/join',
  ].join('\n'),
};

export const instagramSampleCaption = {
  handle: '@radar.nus',
  caption:
    'You scrolled past this in three different apps this week. We put it in one place, with the deadline and the reason it matched you. Link in bio.',
};

export const outreachEmail = {
  subject: 'A free way to get your event in front of students who’d actually go',
  to: 'exco@[societyname].nus.edu.sg',
  body: [
    'Hi [name],',
    '',
    'I’m building Radar, a student project that collects internships, research, competitions, exchanges, grants and talks from around NUS into one list, matched to what someone’s actually interested in.',
    '',
    'We’re not affiliated with NUS and this isn’t a partnership pitch, just a request: could we list your upcoming events and applications? It’s free, takes about two minutes with the form below, and every listing keeps your name as the organiser and links straight back to your own page.',
    '',
    'Submission form: [link]',
    '',
    'Happy to answer any questions.',
    '',
    '[name]',
  ].join('\n'),
};

export type TimelineRow = {
  week: string;
  label: string;
  cells: Partial<Record<
    'telegram' | 'video' | 'physical' | 'outreach' | 'newsletters' | 'word-of-mouth',
    string
  >>;
};

export const timelineChannelOrder: {
  id: 'telegram' | 'video' | 'physical' | 'outreach' | 'newsletters' | 'word-of-mouth';
  label: string;
}[] = [
  { id: 'telegram', label: 'Telegram' },
  { id: 'video', label: 'Video' },
  { id: 'physical', label: 'Physical' },
  { id: 'outreach', label: 'Outreach' },
  { id: 'newsletters', label: 'Newsletters' },
  { id: 'word-of-mouth', label: 'Word of mouth' },
];

export const timeline: TimelineRow[] = [
  {
    week: 'Week −4',
    label: 'Prep',
    cells: {
      outreach: 'Send one-page pack + submission form to 10 societies',
      physical: 'Finalise poster and sticker artwork',
    },
  },
  {
    week: 'Week −3',
    label: 'Prep',
    cells: {
      outreach: 'Follow up; confirm the first 3 listings',
      newsletters: 'Pitch the newsletter paragraph to 2 faculty comms teams',
      physical: 'Print A3 posters and stickers',
    },
  },
  {
    week: 'Week −2',
    label: 'Prep',
    cells: {
      physical: 'Put up posters and stickers on approved noticeboards at COM, Central Library, UTown',
      video: 'Film and edit the first Missed It short',
      telegram: 'Set up the weekly digest format; confirm 2 interest-group channels will cross-post',
    },
  },
  {
    week: 'Week −1',
    label: 'Prep',
    cells: {
      telegram: 'Post a teaser digest ("coming next week")',
      video: 'Publish the first Missed It short',
      newsletters: 'Newsletter paragraph goes out with the regular faculty mailer',
    },
  },
  {
    week: 'Week 0',
    label: 'Launch',
    cells: {
      telegram: 'First live "3 closing this week" digest',
      video: 'Publish the launch video (the 8-beat shot list)',
      'word-of-mouth': 'Share cards go live on every opportunity page',
      outreach: 'Societies cross-post the launch to their own channels',
    },
  },
  {
    week: 'Week +1',
    label: 'Sustain',
    cells: {
      telegram: 'Second weekly digest',
      video: 'Second Missed It short',
      physical: 'Refresh any poster taken down or covered over',
    },
  },
];

export type UtmRow = {
  channel: string;
  utm: string;
};

export const utmRows: UtmRow[] = [
  { channel: 'Telegram digest', utm: '?utm_source=telegram&utm_medium=digest&utm_campaign=findyoursignal_w1' },
  { channel: 'Instagram / TikTok video', utm: '?utm_source=instagram&utm_medium=video&utm_campaign=findyoursignal_missedit' },
  { channel: 'On-campus poster QR', utm: '?utm_source=poster&utm_medium=qr&utm_campaign=findyoursignal_oncampus' },
  { channel: 'Society outreach email', utm: '?utm_source=society&utm_medium=email&utm_campaign=findyoursignal_outreach' },
  { channel: 'Newsletter paragraph', utm: '?utm_source=newsletter&utm_medium=email&utm_campaign=findyoursignal_newsletter' },
  { channel: 'Share card / word of mouth', utm: '?utm_source=sharecard&utm_medium=referral&utm_campaign=findyoursignal_wom' },
];

export const measurementNotes = {
  conversion:
    'Landing → form conversion is read as sign-ups divided by landing visits carrying that UTM, using whatever basic page-view count our hosting gives us, no separate analytics platform.',
  attribution:
    'The sign-up form asks "How did you hear about Radar?" (Telegram, Instagram or TikTok, a friend, a poster on campus, a student society, or other). That single field is our attribution backstop when a UTM gets stripped by forwarding or screenshotting.',
  honest:
    'We have no results yet, because nothing has launched. Every number on this page is a plan, not a measurement.',
};

export type WhyItWorksPoint = {
  title: string;
  body: string;
};

export const whyItWorks: WhyItWorksPoint[] = [
  {
    title: 'We meet students where they already are',
    body: 'Telegram, existing newsletters and the noticeboards students already pass, not a new app or list they have to opt into first.',
  },
  {
    title: 'The promise fits in one line',
    body: '"3 closing this week" or one deadline story is legible without a pitch. Nobody has to be sold on the idea before they get the value.',
  },
  {
    title: 'Organisers are supply and distribution at once',
    body: 'A society that submits a listing also has a reason to share Radar with its own members. The same relationship does double duty.',
  },
  {
    title: 'Low cost means we can repeat, not just launch once',
    body: 'Almost every channel is free. The only spend is a small print run, which means we can run this weekly through the sustain week instead of one expensive push.',
  },
];

export type RiskRow = {
  risk: string;
  mitigation: string;
};

export const risks: RiskRow[] = [
  {
    risk: 'Society gatekeeping: some societies won’t promote something built by students outside their exco.',
    mitigation: 'No partnership claim, ever. We lead with a no-obligation submission form and start with societies we already have a personal connection to.',
  },
  {
    risk: 'Thin catalogue at launch: an empty-looking list undermines trust on day one.',
    mitigation: 'Hand-source a couple of dozen credible listings from public organiser and faculty pages before launch week, and say plainly in outreach that the catalogue is still growing.',
  },
  {
    risk: '"Another platform" fatigue: students are wary of one more place to check.',
    mitigation: 'Position Radar as a filter delivered inside channels they already use (Telegram, newsletters), not a destination they have to remember to visit.',
  },
  {
    risk: 'Moderation and data-permission limits: we can’t scrape or republish content without permission.',
    mitigation: 'Only index public organiser pages, faculty pages and listings submitted with consent; keep source status visible on every listing.',
  },
];
