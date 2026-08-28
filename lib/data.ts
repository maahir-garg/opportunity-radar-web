import rawMockData from '@/data/mock-data.json';
import type { Category, CategoryId, MockData, Opportunity, Review } from './types';

const mockData = rawMockData as MockData;

export const meta = mockData.meta;
export const profile = mockData.profile;
export const categories: Category[] = mockData.categories;
export const opportunities: Opportunity[] = mockData.opportunities;
export const reviews: Review[] = mockData.reviews;
export const assistantScenarios = mockData.assistantScenarios;
export const notifications = mockData.notifications;

/** Deterministic "today" for the prototype. Never use Date.now() in render. */
export const PROTOTYPE_TODAY: string = mockData.meta.prototypeToday;

export function getOpportunity(id: string): Opportunity | undefined {
  return opportunities.find((opportunity) => opportunity.id === id);
}

export function getCategory(id: CategoryId): Category | undefined {
  return categories.find((category) => category.id === id);
}

export function getReviewsFor(opportunityId: string): Review[] {
  return reviews.filter((review) => review.opportunityId === opportunityId);
}
