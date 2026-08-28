import { getOpportunity } from '@/lib/data';
import { WhyMatchPanel } from '../WhyMatchPanel';
import { Screen } from './ScreenChrome';
import styles from './WhyMatchScreen.module.css';

const opportunity = getOpportunity('proto-research-hcai');

/** The sheet behind every match number. */
export function WhyMatchScreen() {
  if (!opportunity?.match) return null;

  return (
    <Screen title="Why this matches" variant="child" withBottomNav={false}>
      <div className={styles.header}>
        <p className={`type-caption ${styles.overline}`}>Opportunity</p>
        <p className={`type-title ${styles.title}`}>{opportunity.title}</p>
        <p className={`type-small ${styles.organiser}`}>{opportunity.organiser}</p>
      </div>
      <WhyMatchPanel match={opportunity.match} />
    </Screen>
  );
}
