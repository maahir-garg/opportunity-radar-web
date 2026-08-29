import { ChevronRight } from 'lucide-react';
import { getCategory, getOpportunity, profile } from '@/lib/data';
import { OpportunityCard } from '../OpportunityCard';
import { Screen } from './ScreenChrome';
import { confirmedCount, expectedCount } from './forecast';
import styles from './ForYouScreen.module.css';

const featured = getOpportunity('proto-research-hcai');
const second = getOpportunity('proto-civic-tech');

const interestLabels = profile.interests
  .map((id) => getCategory(id)?.label)
  .filter((label): label is string => Boolean(label));

/** The personalised feed: a short list, not an inbox. */
export function ForYouScreen() {
  return (
    <Screen title="For You">
      <p className={`type-small ${styles.context}`}>
        Hello {profile.firstName}. Based on {profile.interests.length} interest
        {profile.interests.length === 1 ? '' : 's'} - {interestLabels.join(', ')}.{' '}
        <span className={styles.editLink}>Edit</span>
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
