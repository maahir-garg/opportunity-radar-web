import { Star, ThumbsUp } from 'lucide-react';
import type { Rating } from '@/lib/types';
import styles from './ReviewSummary.module.css';

export type ReviewSummaryProps = {
  rating: Rating;
  className?: string;
};

/**
 * "4.6 · 38 reviews" plus the recommendation percentage with its response
 * count. Fewer than three reviews shows the sparse state instead of an
 * authoritative-looking aggregate.
 */
export function ReviewSummary({ rating, className }: ReviewSummaryProps) {
  const classNames = [styles.summary, className ?? ''].filter(Boolean).join(' ');

  if (rating.average === null || rating.count < 3) {
    return (
      <p className={`${classNames} type-small ${styles.sparse}`}>
        Not enough reviews yet{rating.count > 0 ? ` · ${rating.count} so far` : ''}
      </p>
    );
  }

  return (
    <div className={classNames}>
      <p className={`type-label ${styles.score} tabular`}>
        <Star size={16} strokeWidth={1.75} aria-hidden="true" className={styles.star} />
        <span>
          {rating.average.toFixed(1)} · {rating.count} reviews
        </span>
      </p>
      {rating.wouldRecommendPercent !== null ? (
        <p className={`type-small ${styles.recommend} tabular`}>
          <ThumbsUp size={14} strokeWidth={1.75} aria-hidden="true" />
          <span>
            {rating.wouldRecommendPercent}% would recommend ({rating.wouldRecommendCount} responses)
          </span>
        </p>
      ) : null}
    </div>
  );
}
