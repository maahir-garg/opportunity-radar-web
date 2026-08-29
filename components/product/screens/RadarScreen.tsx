import { Info } from 'lucide-react';
import { ForecastTimeline } from '../ForecastTimeline';
import { Screen } from './ScreenChrome';
import { timelineItems } from './forecast';
import styles from './RadarScreen.module.css';

/** The 30-day planning view: what is confirmed, and what is only expected. */
export function RadarScreen() {
  return (
    <Screen
      title="30-day Radar"
      variant="child"
      topRightIcon={<Info size={20} strokeWidth={1.75} aria-hidden="true" />}
    >
      <ForecastTimeline items={timelineItems} />
      <p className={`type-small ${styles.explanation}`}>
        Expected windows use previous organiser dates; current dates have not been announced.
      </p>
    </Screen>
  );
}
