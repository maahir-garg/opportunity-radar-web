import type { ReactNode } from 'react';
import styles from './FeatureCard.module.css';

export type FeatureCardProps = {
  /** Short label above the card, e.g. "Step 1" or "Planning". */
  label?: string;
  icon: ReactNode;
  title: string;
  description: string;
  /** Heading level, so each surface keeps a correct document outline. */
  as?: 'h3' | 'h4';
  tone?: 'card' | 'plain';
  className?: string;
};

/**
 * One card shape shared by the goals, features and steps, so the same
 * information always sits in the same place: label on top, the icon beside the
 * title, and the description running the full width underneath both.
 */
export function FeatureCard({
  label,
  icon,
  title,
  description,
  as: Heading = 'h3',
  tone = 'card',
  className,
}: FeatureCardProps) {
  const classNames = [styles.card, tone === 'plain' ? styles.plain : '', className ?? '']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames}>
      {label ? <p className={`type-caption ${styles.label}`}>{label}</p> : null}
      <div className={styles.heading}>
        <span className={styles.iconWrap} aria-hidden="true">
          {icon}
        </span>
        <Heading className={`type-h3 ${styles.title}`}>{title}</Heading>
      </div>
      <p className={`type-body ${styles.description}`}>{description}</p>
    </div>
  );
}
