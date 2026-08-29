import { SectionHeader } from '@/components/primitives/SectionHeader';
import { whyItWorks } from '@/lib/content/campaign';
import styles from './WhyItWorks.module.css';

/** Four short arguments for why this plan should reach the right students. */
export function WhyItWorks() {
  return (
    <div>
      <SectionHeader overline="Rationale" title="Why we think this works" />
      <ol className={styles.grid}>
        {whyItWorks.map((point, index) => (
          <li className={styles.card} key={point.title}>
            <div className={styles.heading}>
              <span className={`type-caption tabular ${styles.index}`} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className={`type-h3 ${styles.title}`}>{point.title}</h3>
            </div>
            <p className={`type-small ${styles.body}`}>{point.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
