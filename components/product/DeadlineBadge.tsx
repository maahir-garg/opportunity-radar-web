import { CalendarDays } from 'lucide-react';
import { deadlineUrgency, formatDeadline, relativeDeadline } from '@/lib/date';
import type { Availability } from '@/lib/types';
import styles from './DeadlineBadge.module.css';

export type DeadlineBadgeProps = {
  deadline: string | null;
  availability: Availability;
  className?: string;
};

type Tone = 'normal' | 'warning' | 'critical' | 'closed' | 'upcoming';

const TONE_CLASS: Record<Tone, string> = {
  normal: styles.normal,
  warning: styles.warning,
  critical: styles.critical,
  closed: styles.closed,
  upcoming: styles.upcoming,
};

/**
 * "Closes in 5 days · 2 Sep 2026, 11:59 PM SGT": relative urgency first, the
 * absolute date and timezone always present. Never pulses.
 */
export function DeadlineBadge({ deadline, availability, className }: DeadlineBadgeProps) {
  let tone: Tone = 'normal';
  let text: string;

  if (availability === 'cancelled') {
    tone = 'closed';
    text = 'Cancelled by the organiser';
  } else if (availability === 'full') {
    tone = 'closed';
    text = deadline ? `Places full · ${formatDeadline(deadline)}` : 'Places full';
  } else if (!deadline) {
    tone = 'upcoming';
    text = 'Dates not announced';
  } else {
    const urgency = deadlineUrgency(deadline);
    tone =
      urgency === 'closed'
        ? 'closed'
        : urgency === 'critical'
          ? 'critical'
          : urgency === 'closingSoon'
            ? 'warning'
            : 'normal';
    text =
      urgency === 'closed'
        ? relativeDeadline(deadline)
        : `${relativeDeadline(deadline)} · ${formatDeadline(deadline)}`;
  }

  const classNames = [styles.badge, TONE_CLASS[tone], 'type-small', 'tabular', className ?? '']
    .filter(Boolean)
    .join(' ');

  return (
    <p className={classNames}>
      <CalendarDays size={16} strokeWidth={1.75} aria-hidden="true" className={styles.icon} />
      <span>{text}</span>
    </p>
  );
}
