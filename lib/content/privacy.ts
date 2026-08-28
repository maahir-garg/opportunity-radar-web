/**
 * All copy for /privacy.
 *
 * Bound by docs/BUILD-CONTRACT.md §7 and §9: honest about what is and is not
 * stored, no fabricated NUS partnership, no accuracy claims, and the exact
 * placeholder contact address.
 */

export const privacyIntro = {
  lead: 'A short, plain account of what the sign-up form asks for, what happens to it, and what we would never do with it.',
} as const;

export type ProseBlock = {
  heading: string;
  paragraphs: string[];
  list?: string[];
};

export const privacySections: ProseBlock[] = [
  {
    heading: 'What the sign-up form asks for',
    paragraphs: [
      'Joining the pilot list on the landing page asks for a handful of things: a reserved handle, an email address, your year of study, your faculty, up to three interests, and two optional fields — how you heard about Radar, and a short note on what you miss out on most right now.',
    ],
  },
  {
    heading: 'What happens to it: nothing is stored',
    paragraphs: [
      'This is a prototype marketing site, not a live product. The form validates what you type and shows a confirmation in your own browser — that is the whole flow. There is no database behind it, no analytics vendor, no mailing-list provider, and no third-party tracking script anywhere on this site.',
      'If we ever run a real pilot, we would build a proper sign-up with its own consent step and ask again, in plain language, exactly where the data goes and who can see it. Nothing here should be read as that consent.',
    ],
  },
  {
    heading: 'What we would never do with it',
    paragraphs: [
      'Faculty, year of study, nationality, disability status and financial-aid status are not signals of how competitive an applicant is, and Radar would never use them that way, or to rank one student against another.',
      'Recommendations only ever use the preferences a student explicitly gives Radar — interests, year, and stated goals — and every one of those factors stays visible on the profile and can be edited or removed at any time.',
    ],
  },
  {
    heading: 'The catalogue is fictional',
    paragraphs: [
      'Every listing, organiser, review, rating and date shown in the product preview on this site is invented demo content, written to test the design system. None of it describes a real NUS programme, and none of it was scraped or sourced from a live system.',
    ],
  },
  {
    heading: 'Not an NUS service',
    paragraphs: [
      'Opportunity Radar is a student project built for CS3216 coursework. It is not affiliated with, endorsed by, or operated by the National University of Singapore, and no NUS crest, seal or wordmark appears anywhere on this site.',
    ],
  },
];

export const privacyContact = {
  heading: 'Contact',
  paragraph:
    'Questions about this page can go to hello@opportunityradar.example — a placeholder inbox set up for this coursework prototype, not a monitored support address.',
  email: 'hello@opportunityradar.example',
} as const;

export const lastReviewed = 'Last reviewed 28 August 2026';
