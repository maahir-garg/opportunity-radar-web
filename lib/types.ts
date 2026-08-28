// Mirrors data/mock-data.json exactly. Field names must match the JSON —
// do not rename. See docs/BUILD-CONTRACT.md §5.

export type CategoryId =
  | 'career'
  | 'research'
  | 'venture'
  | 'competition'
  | 'global'
  | 'impact'
  | 'event'
  | 'funding';

export type Availability =
  | 'upcoming'
  | 'open'
  | 'closingSoon'
  | 'closed'
  | 'full'
  | 'cancelled';

export type ProgressStatus =
  | 'none'
  | 'saved'
  | 'preparing'
  | 'applied'
  | 'completed'
  | 'dismissed';

export type ForecastStatus = 'confirmed' | 'expected' | 'watching';

export type SourceStatus =
  | 'official'
  | 'organiserVerified'
  | 'communitySubmitted'
  | 'needsReview';

export type Category = {
  id: CategoryId;
  label: string;
  icon: string;
};

export type OpportunityEligibility = {
  confirmed: string[];
  toCheck: string[];
  blockers: string[];
};

export type OpportunityCommitment = {
  label: string;
  provenance: string;
};

export type OpportunitySource = {
  status: SourceStatus;
  label: string;
  domain: string;
  url: string;
  lastChecked: string;
};

export type OpportunityMatch = {
  score: number;
  label: string;
  reasons: string[];
  missing: string[];
  blockers: string[];
  disclaimer: string;
};

export type Rating = {
  average: number | null;
  count: number;
  wouldRecommendPercent: number | null;
  wouldRecommendCount: number;
};

export type OpportunityProgress = {
  status: ProgressStatus;
  nextAction: string | null;
  reminderAt: string | null;
  updatedAt: string | null;
};

export type PreviousOccurrence = {
  announced: string;
  applicationDeadline: string;
};

export type OpportunityForecast = {
  status: ForecastStatus;
  basis: string;
  previousOccurrence: PreviousOccurrence | null;
};

export type ProgrammeDates = {
  start: string;
  end: string;
};

export type Opportunity = {
  id: string;
  title: string;
  organiser: string;
  categoryId: CategoryId;
  tags: string[];
  summary: string;
  availability: Availability;
  applicationDeadline: string | null;
  programmeDates: ProgrammeDates | null;
  location: string;
  mode: string;
  eligibility: OpportunityEligibility;
  commitment: OpportunityCommitment;
  source: OpportunitySource;
  match: OpportunityMatch | null;
  rating: Rating;
  reviewIds: string[];
  progress: OpportunityProgress;
  forecast: OpportunityForecast;
};

export type Reviewer = {
  displayName: string;
  year: number;
  faculty: string;
  participationYear: number;
  verification: string;
};

export type Review = {
  id: string;
  opportunityId: string;
  rating: number;
  wouldRecommend: boolean;
  commitmentAccuracy: string;
  organiserCommunication: string;
  bestFor: string[];
  note: string;
  reviewer: Reviewer;
  createdAt: string;
};

export type AssistantScenario = {
  id: string;
  matches: string[];
  interpretedCriteria: string[];
  resultOpportunityIds: string[];
  response: string;
};

export type Notification = {
  id: string;
  type: string;
  opportunityId: string;
  createdAt: string;
  isRead: boolean;
  title: string;
  body: string;
};

export type EligibilityFacts = {
  isNusUndergraduate: boolean;
  minimumYear: number;
  summerAvailability: boolean;
};

export type Profile = {
  id: string;
  firstName: string;
  year: number;
  faculty: string;
  interests: CategoryId[];
  goals: string[];
  preferredModes: string[];
  preferredCommitmentHoursPerWeekMax: number;
  eligibilityFacts: EligibilityFacts;
};

export type MockDataMeta = {
  schemaVersion: string;
  prototypeToday: string;
  timezone: string;
  isPrototypeData: boolean;
  notice: string;
};

export type MockData = {
  meta: MockDataMeta;
  profile: Profile;
  categories: Category[];
  opportunities: Opportunity[];
  reviews: Review[];
  assistantScenarios: AssistantScenario[];
  notifications: Notification[];
};
