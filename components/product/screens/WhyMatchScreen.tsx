import { X } from 'lucide-react';
import { getOpportunity } from '@/lib/data';
import { WhyMatchPanel } from '../WhyMatchPanel';
import { ForYouScreen } from './ForYouScreen';
import styles from './WhyMatchScreen.module.css';

const opportunity = getOpportunity('proto-research-hcai');

/**
 * The sheet behind every match number. In the real product this is a
 * bottom-sheet dialog layered over whichever screen the student was already
 * on (For You, here) — never a full-page navigation target — so the
 * background screen and its bottom nav stay visible and dimmed behind it,
 * and the opportunity itself is not re-introduced inside the sheet.
 */
export function WhyMatchScreen() {
  if (!opportunity?.match) return null;

  return (
    <div className={styles.stage}>
      <div className={styles.background} aria-hidden="true">
        <ForYouScreen />
      </div>
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={styles.sheet} role="dialog" aria-label="Why this matches">
        <span className={styles.handle} aria-hidden="true" />
        <div className={styles.sheetHeader}>
          <p className={`type-h3 ${styles.sheetTitle}`}>Why this matches</p>
          <X size={20} strokeWidth={1.75} aria-hidden="true" className={styles.closeIcon} />
        </div>
        <div className={styles.sheetBody}>
          <WhyMatchPanel match={opportunity.match} />
        </div>
      </div>
    </div>
  );
}
