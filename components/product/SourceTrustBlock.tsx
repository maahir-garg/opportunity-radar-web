import { ExternalLink, Flag, ShieldCheck } from 'lucide-react';
import { formatCheckedAt } from '@/lib/date';
import type { OpportunitySource, SourceStatus } from '@/lib/types';
import styles from './SourceTrustBlock.module.css';

export type SourceTrustBlockProps = {
  source: OpportunitySource;
  organiser: string;
  className?: string;
};

const STATUS_LABEL: Record<SourceStatus, string> = {
  official: 'Official source',
  organiserVerified: 'Organiser verified',
  communitySubmitted: 'Community submitted',
  needsReview: 'Needs review',
};

const STATUS_CLASS: Record<SourceStatus, string> = {
  official: styles.official,
  organiserVerified: styles.official,
  communitySubmitted: styles.community,
  needsReview: styles.review,
};

/**
 * Provenance and freshness beside the decision. "Official source" describes the
 * destination page — it never means Radar is an official NUS product.
 */
export function SourceTrustBlock({ source, organiser, className }: SourceTrustBlockProps) {
  const classNames = [styles.block, className ?? ''].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      <p className={`type-label ${styles.status} ${STATUS_CLASS[source.status]}`}>
        <ShieldCheck size={16} strokeWidth={1.75} aria-hidden="true" />
        <span>{STATUS_LABEL[source.status]}</span>
      </p>
      <p className={`type-small ${styles.detail}`}>
        {organiser} · {source.domain}
      </p>
      <p className={`type-small ${styles.detail} tabular`}>{formatCheckedAt(source.lastChecked)}</p>
      <p className={`type-small ${styles.actions}`}>
        <span className={styles.action}>
          <ExternalLink size={14} strokeWidth={1.75} aria-hidden="true" />
          View source
        </span>
        <span className={styles.action}>
          <Flag size={14} strokeWidth={1.75} aria-hidden="true" />
          Report an issue
        </span>
      </p>
    </div>
  );
}
