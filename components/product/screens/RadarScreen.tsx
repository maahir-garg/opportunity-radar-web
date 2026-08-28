import { ForecastTimeline } from '../ForecastTimeline';
import { Screen } from './ScreenChrome';
import { timelineItems } from './forecast';
import styles from './RadarScreen.module.css';

/** The 30-day planning view: what is confirmed, and what is only expected. */
export function RadarScreen() {
  return (
    <Screen title="30-day Radar" variant="child" withBottomNav={false}>
      <ForecastTimeline items={timelineItems} />
      <p className={`type-small ${styles.explanation}`}>
        Expected windows use previous organiser dates; current dates have not been announced.
      </p>
    </Screen>
  );
}
