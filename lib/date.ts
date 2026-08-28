// All formatting is pinned to Asia/Singapore so server and client render
// identically regardless of host timezone, and all "today" math is measured
// against PROTOTYPE_TODAY — never Date.now(). See docs/BUILD-CONTRACT.md §5.
//
// Month names are resolved from a fixed table rather than an Intl locale
// string: different ICU data sets abbreviate September as "Sep" or "Sept"
// depending on locale/runtime, and the contract requires the exact form
// "2 Sep 2026, 11:59 PM SGT".

import { PROTOTYPE_TODAY } from './data';

const TIME_ZONE = 'Asia/Singapore';

const MONTH_ABBR = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;

type DateParts = { day: number; month: number; year: number };
type TimeParts = { hour: number; minute: number; dayPeriod: 'AM' | 'PM' };

const dateFieldsFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: TIME_ZONE,
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
});

const dateTimeFieldsFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: TIME_ZONE,
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
});

function partsMap(parts: Intl.DateTimeFormatPart[]): Record<string, string> {
  const map: Record<string, string> = {};
  for (const part of parts) {
    map[part.type] = part.value;
  }
  return map;
}

function getDateParts(iso: string): DateParts {
  const map = partsMap(dateFieldsFormatter.formatToParts(new Date(iso)));
  return { day: Number(map.day), month: Number(map.month), year: Number(map.year) };
}

function getDateTimeParts(iso: string): DateParts & TimeParts {
  const map = partsMap(dateTimeFieldsFormatter.formatToParts(new Date(iso)));
  return {
    day: Number(map.day),
    month: Number(map.month),
    year: Number(map.year),
    hour: Number(map.hour),
    minute: Number(map.minute),
    dayPeriod: map.dayPeriod === 'PM' ? 'PM' : 'AM',
  };
}

function formatDateParts({ day, month, year }: DateParts): string {
  return `${day} ${MONTH_ABBR[month - 1]} ${year}`;
}

/** "2 Sep 2026" */
export function formatDate(iso: string): string {
  return formatDateParts(getDateParts(iso));
}

/** "2 Sep 2026, 11:59 PM SGT" */
export function formatDeadline(iso: string): string {
  const parts = getDateTimeParts(iso);
  const minute = String(parts.minute).padStart(2, '0');
  return `${formatDateParts(parts)}, ${parts.hour}:${minute} ${parts.dayPeriod} SGT`;
}

/** "Checked 28 Aug 2026" */
export function formatCheckedAt(iso: string): string {
  return `Checked ${formatDate(iso)}`;
}

/**
 * "14 Sep – 9 Oct 2026" across months, collapsing to "5–6 Sep 2026" when the
 * month and year are shared.
 */
export function formatDateRange(start: string, end: string): string {
  const startParts = getDateParts(start);
  const endParts = getDateParts(end);
  const sameYear = startParts.year === endParts.year;
  const sameMonth = sameYear && startParts.month === endParts.month;

  if (sameMonth) {
    return `${startParts.day}–${endParts.day} ${MONTH_ABBR[endParts.month - 1]} ${endParts.year}`;
  }
  if (sameYear) {
    return `${startParts.day} ${MONTH_ABBR[startParts.month - 1]} – ${endParts.day} ${MONTH_ABBR[endParts.month - 1]} ${endParts.year}`;
  }
  return `${formatDateParts(startParts)} – ${formatDateParts(endParts)}`;
}

function dayKey({ day, month, year }: DateParts): number {
  return Date.UTC(year, month - 1, day);
}

/** Whole calendar days (in Asia/Singapore) between PROTOTYPE_TODAY and iso. */
export function daysUntil(iso: string): number {
  const todayKey = dayKey(getDateParts(PROTOTYPE_TODAY));
  const targetKey = dayKey(getDateParts(iso));
  return Math.round((targetKey - todayKey) / 86_400_000);
}

export type DeadlineUrgency = 'normal' | 'closingSoon' | 'critical' | 'closed';

/** >7 days normal, 2–7 closingSoon, ≤1 critical, past closed. */
export function deadlineUrgency(iso: string): DeadlineUrgency {
  const days = daysUntil(iso);
  if (days < 0) return 'closed';
  if (days <= 1) return 'critical';
  if (days <= 7) return 'closingSoon';
  return 'normal';
}

/** "Closes in 5 days" | "Closes today" | "Closes tomorrow" | "Closed 25 Aug 2026" */
export function relativeDeadline(iso: string): string {
  const days = daysUntil(iso);
  if (days < 0) return `Closed ${formatDate(iso)}`;
  if (days === 0) return 'Closes today';
  if (days === 1) return 'Closes tomorrow';
  return `Closes in ${days} days`;
}
