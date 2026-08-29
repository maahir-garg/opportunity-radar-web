import { MapPin, ShieldCheck } from 'lucide-react';
import { formatCheckedAt, formatDateRange } from '@/lib/date';
import { getCategory } from '@/lib/data';
import type { Opportunity, SourceStatus } from '@/lib/types';
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
 * Source-trust tone. Official and organiser-verified sources read as green
 * (the same "match" teal used elsewhere for confidence); community
 * submissions read neutral-informational; anything flagged for review reads
 * amber, the same tone as a match blocker.
 */
const SOURCE_TONE_CLASS: Record<SourceStatus, string> = {
  official: styles.sourceVerified,
  organiserVerified: styles.sourceVerified,
  communitySubmitted: styles.sourceCommunity,
  needsReview: styles.sourceReview,
};

/**
 * The one canonical opportunity card. Both variants render the same facts in
 * the same order: deadline, title, organiser and source, fit, metadata,
 * rating, so nothing changes between surfaces.
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

      <p className={`type-small ${styles.organiser}`}>{opportunity.organiser}</p>

      <p
        className={`type-small ${styles.sourceBadge} ${SOURCE_TONE_CLASS[opportunity.source.status]}`}
      >
        <ShieldCheck size={14} strokeWidth={1.75} aria-hidden="true" />
        <span>{SOURCE_LABEL[opportunity.source.status] ?? opportunity.source.label}</span>
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

      <div className={styles.footer}>
        <p className={`type-caption ${styles.checked}`}>
          {formatCheckedAt(opportunity.source.lastChecked)}
        </p>
        <span
          className={`type-small ${styles.saveButton} ${
            opportunity.progress.status === 'saved' ? styles.saved : ''
          }`}
        >
          {opportunity.progress.status === 'saved' ? 'Saved' : 'Save'}
        </span>
      </div>
    </article>
  );
}
