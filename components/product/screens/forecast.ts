import { daysUntil, formatDate, formatDeadline } from '@/lib/date';
import { opportunities } from '@/lib/data';
import type { ForecastItem } from '../ForecastTimeline';

const SPAN_DAYS = 30;

/** Confirmed deadlines falling inside the next 30 days, soonest first. */
export const confirmedItems = opportunities
  .filter(
    (opportunity) =>
      opportunity.forecast.status === 'confirmed' &&
      opportunity.applicationDeadline !== null &&
      daysUntil(opportunity.applicationDeadline) >= 0 &&
      daysUntil(opportunity.applicationDeadline) <= SPAN_DAYS,
  )
  .sort((a, b) => daysUntil(a.applicationDeadline!) - daysUntil(b.applicationDeadline!));

/** Seasonal windows with no announced dates. */
export const expectedOpportunities = opportunities.filter(
  (opportunity) => opportunity.forecast.status === 'expected',
);

export const confirmedCount = confirmedItems.length;
export const expectedCount = expectedOpportunities.length;

export const timelineItems: ForecastItem[] = [
  ...confirmedItems.map((opportunity) => ({
    id: opportunity.id,
    title: opportunity.title,
    status: 'confirmed' as const,
    startDay: daysUntil(opportunity.applicationDeadline!),
    endDay: daysUntil(opportunity.applicationDeadline!),
    dateLabel: formatDeadline(opportunity.applicationDeadline!),
  })),
  ...expectedOpportunities.map((opportunity) => {
    const previous = opportunity.forecast.previousOccurrence;
    return {
      id: opportunity.id,
      title: opportunity.title,
      status: 'expected' as const,
      startDay: 24,
      endDay: SPAN_DAYS,
      openEnded: true,
      dateLabel: 'Around October 2026 · dates not announced',
      basis: previous
        ? `Based on the previous cycle, which opened ${formatDate(previous.announced)}.`
        : opportunity.forecast.basis,
    };
  }),
];
