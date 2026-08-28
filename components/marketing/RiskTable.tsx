import { TriangleAlert } from 'lucide-react';
import { SectionHeader } from '@/components/primitives/SectionHeader';
import { risks } from '@/lib/content/campaign';
import styles from './RiskTable.module.css';

/** Four risks and what we would do about each: four cards, not a wall of text. */
export function RiskTable() {
  return (
    <div>
      <SectionHeader overline="Risks" title="Risks and what we would do" />
      <ul className={styles.grid}>
        {risks.map((row) => (
          <li className={styles.card} key={row.risk}>
            <div className={styles.riskHead}>
              <TriangleAlert className={styles.icon} aria-hidden="true" />
              <p className="type-label">{row.risk}</p>
            </div>
            <div className={styles.mitigation}>
              <p className={`type-caption ${styles.mitigationLabel}`}>What we would do</p>
              <p className="type-small">{row.mitigation}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
