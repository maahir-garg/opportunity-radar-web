import { RadarArcs } from '@/components/primitives/RadarArcs';
import { campaignHeader } from '@/lib/content/campaign';
import styles from './CampaignHero.module.css';

/** Page header: the single h1 for /marketing plus the campaign's lead sentence. */
export function CampaignHero() {
  return (
    <div className={styles.hero}>
      <RadarArcs className={styles.arcs} />
      <div className={styles.content}>
        <p className={`type-caption ${styles.overline}`}>{campaignHeader.overline}</p>
        <h1 className="type-h1">{campaignHeader.title}</h1>
        <p className={`type-body-large ${styles.lead}`}>{campaignHeader.lead}</p>
      </div>
    </div>
  );
}
