import { Target, TriangleAlert } from 'lucide-react';
import type { OpportunityMatch } from '@/lib/types';
import styles from './MatchIndicator.module.css';

export type MatchIndicatorProps = {
  match: OpportunityMatch;
  size?: 'compact' | 'default';
  className?: string;
};

/**
 * A small target glyph before "95% Strong match". Never a circular progress
 * ring, never a number on its own. A known eligibility blocker overrides a
 * superficially high label.
 */
export function MatchIndicator({ match, size = 'default', className }: MatchIndicatorProps) {
  const hasBlocker = match.blockers.length > 0;
  const classNames = [
    styles.indicator,
    size === 'compact' ? styles.compact : styles.default,
    hasBlocker ? styles.blocked : styles.matched,
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  if (hasBlocker) {
    return (
      <p className={`${classNames} type-label`}>
        <TriangleAlert size={16} strokeWidth={1.75} aria-hidden="true" />
        <span>Eligibility issue</span>
      </p>
    );
  }

  return (
    <p className={`${classNames} type-label`}>
      <Target size={16} strokeWidth={1.75} aria-hidden="true" className={styles.icon} />
      <span className={`${styles.score} tabular`}>{match.score}%</span>
      <span>{match.label}</span>
    </p>
  );
}
