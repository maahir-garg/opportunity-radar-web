import type { ComponentType } from 'react';
import {
  Handshake,
  MapPinned,
  Newspaper,
  Send,
  Share2,
  Clapperboard,
  type LucideProps,
} from 'lucide-react';
import { SectionHeader } from '@/components/primitives/SectionHeader';
import { channels, consideredAndDeprioritised, type IconKey } from '@/lib/content/campaign';
import styles from './ChannelGrid.module.css';

const ICONS: Partial<Record<IconKey, ComponentType<LucideProps>>> = {
  send: Send,
  clapperboard: Clapperboard,
  'map-pinned': MapPinned,
  handshake: Handshake,
  newspaper: Newspaper,
  share: Share2,
};

/** Six channel cards plus the channels we considered and deprioritised. */
export function ChannelGrid() {
  return (
    <div>
      <SectionHeader
        overline="Channels"
        title="Six channels, one budget line"
        lead="Every channel meets students somewhere they already look. None of them require a new platform, a paid audience, or a claim we can't back up."
      />
      <ul className={styles.grid}>
        {channels.map((channel) => {
          const Icon = ICONS[channel.icon] ?? Send;
          return (
            <li className={styles.card} key={channel.id}>
              <Icon className={styles.icon} aria-hidden="true" />
              <h3 className="type-h3">{channel.name}</h3>
              <dl className={styles.details}>
                <div className={styles.row}>
                  <dt className="type-label">What we do</dt>
                  <dd className="type-small">{channel.whatWeDo}</dd>
                </div>
                <div className={styles.row}>
                  <dt className="type-label">Why it works</dt>
                  <dd className="type-small">{channel.whyItWorks}</dd>
                </div>
                <div className={styles.row}>
                  <dt className="type-label">Cost</dt>
                  <dd className="type-small">{channel.cost}</dd>
                </div>
                <div className={styles.row}>
                  <dt className="type-label">What we measure</dt>
                  <dd className="type-small">{channel.whatWeMeasure}</dd>
                </div>
              </dl>
            </li>
          );
        })}
      </ul>

      <div className={styles.deprioritised}>
        <h3 className="type-h3">Considered and deprioritised</h3>
        <dl className={styles.deprioritisedList}>
          {consideredAndDeprioritised.map((entry) => (
            <div className={styles.deprioritisedRow} key={entry.name}>
              <dt className="type-label">{entry.name}</dt>
              <dd className="type-small">{entry.reason}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
