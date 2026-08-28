import { ChevronRight } from 'lucide-react';
import { getOpportunity, profile } from '@/lib/data';
import { OpportunityCard } from '../OpportunityCard';
import { Screen } from './ScreenChrome';
import { confirmedCount, expectedCount } from './forecast';
import styles from './ForYouScreen.module.css';

const featured = getOpportunity('proto-research-hcai');
const second = getOpportunity('proto-civic-tech');

/** The personalised feed: a short list, not an inbox. */
export function ForYouScreen() {
  return (
    <Screen title="For You">
      <p className={`type-small ${styles.context}`}>
        Based on {profile.interests.length} interests · Year {profile.year}, {profile.faculty}
      </p>

      <div className={styles.forecastCard}>
        <div className={styles.forecastText}>
          <p className={`type-label ${styles.forecastTitle}`}>Your 30-day Radar</p>
          <p className={`type-small ${styles.forecastMeta} tabular`}>
            {confirmedCount} confirmed deadlines · {expectedCount} expected window
            {expectedCount === 1 ? '' : 's'}
          </p>
        </div>
        <ChevronRight size={20} strokeWidth={1.75} aria-hidden="true" />
      </div>

      <section className={styles.group}>
        <h3 className={`type-caption ${styles.groupTitle}`}>Top matches</h3>
        {featured ? <OpportunityCard opportunity={featured} variant="featured" /> : null}
        {second ? <OpportunityCard opportunity={second} variant="list" /> : null}
      </section>
    </Screen>
  );
}
