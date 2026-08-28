import { MapPin } from 'lucide-react';
import { formatDateRange } from '@/lib/date';
import { getCategory } from '@/lib/data';
import type { Opportunity } from '@/lib/types';
import { CategoryIcon } from './CategoryIcon';
import { DeadlineBadge } from './DeadlineBadge';
import { MatchIndicator } from './MatchIndicator';
import { ReviewSummary } from './ReviewSummary';
import styles from './OpportunityCard.module.css';

export type OpportunityCardProps = {
  opportunity: Opportunity;
  variant?: 'featured' | 'list';
  showMatch?: boolean;
  showRating?: boolean;
  showSummary?: boolean;
  reasonLimit?: number;
  /**
   * The element used for the title. Marketing imagery passes 'p' so the
   * illustration does not inject headings into the page outline.
   */
  titleAs?: 'h3' | 'h4' | 'p';
  className?: string;
};

const SOURCE_LABEL: Record<string, string> = {
  official: 'Official source',
  organiserVerified: 'Organiser verified',
  communitySubmitted: 'Community submitted',
  needsReview: 'Needs review',
};

/**
 * The one canonical opportunity card. Both variants render the same facts in
 * the same order — deadline, title, organiser and source, fit, metadata,
 * rating — so nothing changes between surfaces.
 */
export function OpportunityCard({
  opportunity,
  variant = 'list',
  showMatch = true,
  showRating = true,
  showSummary,
  reasonLimit = 2,
  titleAs: Title = 'h3',
  className,
}: OpportunityCardProps) {
  const category = getCategory(opportunity.categoryId);
  const isFeatured = variant === 'featured';
  const withSummary = showSummary ?? isFeatured;
  const reasons = showMatch && isFeatured ? (opportunity.match?.reasons ?? []).slice(0, reasonLimit) : [];

  const classNames = [styles.card, isFeatured ? styles.featured : styles.list, className ?? '']
    .filter(Boolean)
    .join(' ');

  return (
    <article className={classNames}>
      <DeadlineBadge
        deadline={opportunity.applicationDeadline}
        availability={opportunity.availability}
      />

      <Title className={`${isFeatured ? 'type-title' : 'type-label'} ${styles.title}`}>
        {opportunity.title}
      </Title>

      <p className={`type-small ${styles.organiser}`}>
        {opportunity.organiser} · {SOURCE_LABEL[opportunity.source.status] ?? opportunity.source.label}
      </p>

      {withSummary ? <p className={`type-small ${styles.summary}`}>{opportunity.summary}</p> : null}

      {showMatch && opportunity.match ? (
        <MatchIndicator match={opportunity.match} size={isFeatured ? 'default' : 'compact'} />
      ) : null}

      {reasons.length > 0 ? (
        <ul className={styles.reasons}>
          {reasons.map((reason) => (
            <li key={reason} className={`type-small ${styles.reason}`}>
              {reason}
            </li>
          ))}
        </ul>
      ) : null}

      <p className={`type-small ${styles.meta}`}>
        <span className={styles.metaItem}>
          <CategoryIcon categoryId={opportunity.categoryId} />
          {category?.label}
        </span>
        {opportunity.programmeDates ? (
          <span className={`${styles.metaItem} tabular`}>
            {formatDateRange(opportunity.programmeDates.start, opportunity.programmeDates.end)}
          </span>
        ) : null}
        <span className={styles.metaItem}>
          <MapPin size={16} strokeWidth={1.75} aria-hidden="true" />
          {opportunity.location}
        </span>
      </p>

      {showRating && opportunity.rating.count >= 3 ? (
        <ReviewSummary rating={opportunity.rating} className={styles.rating} />
      ) : null}
    </article>
  );
}
