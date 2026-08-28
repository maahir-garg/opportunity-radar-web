import { UserCog, Search, ListChecks, ClipboardList, CalendarClock, MessageCircle } from 'lucide-react';
import { FeatureCard } from '@/components/primitives/FeatureCard';
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
            <li key={feature.id}>
              <FeatureCard
                label={feature.label}
                icon={<Icon size={20} strokeWidth={1.75} />}
                title={feature.title}
                description={feature.description}
              />
            </li>
          );
        })}
      </ul>
      {note ? <p className={`type-small ${styles.note}`}>{note}</p> : null}
    </div>
  );
}
