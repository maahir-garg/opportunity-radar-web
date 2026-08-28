import { UserCog, Search, ListChecks, ClipboardList, CalendarClock, MessageCircle } from 'lucide-react';
import type { Feature, FeatureIcon } from '@/lib/content/about';
import styles from './FeatureList.module.css';

const ICONS: Record<FeatureIcon, typeof UserCog> = {
  'user-cog': UserCog,
  search: Search,
  'list-checks': ListChecks,
  'clipboard-list': ClipboardList,
  'calendar-clock': CalendarClock,
  'message-circle': MessageCircle,
};

export type FeatureListProps = {
  features: Feature[];
  note?: string;
};

export function FeatureList({ features, note }: FeatureListProps) {
  return (
    <div>
      <ul className={styles.grid}>
        {features.map((feature) => {
          const Icon = ICONS[feature.icon];
          return (
            <li className={styles.card} key={feature.id}>
              <span className={styles.iconWrap} aria-hidden="true">
                <Icon size={20} strokeWidth={1.75} />
              </span>
              <p className={`type-caption ${styles.code}`}>{feature.id}</p>
              <h3 className={`type-h3 ${styles.title}`}>{feature.title}</h3>
              <p className={`type-small ${styles.description}`}>{feature.description}</p>
            </li>
          );
        })}
      </ul>
      {note ? <p className={`type-small ${styles.note}`}>{note}</p> : null}
    </div>
  );
}
