import { Compass, ShieldCheck, CalendarCheck } from 'lucide-react';
import type { Goal, GoalIcon } from '@/lib/content/about';
import styles from './GoalsGrid.module.css';

const ICONS: Record<GoalIcon, typeof Compass> = {
  compass: Compass,
  'shield-check': ShieldCheck,
  'calendar-check': CalendarCheck,
};

export type GoalsGridProps = {
  goals: Goal[];
};

export function GoalsGrid({ goals }: GoalsGridProps) {
  return (
    <ul className={styles.grid}>
      {goals.map((goal) => {
        const Icon = ICONS[goal.icon];
        return (
          <li className={styles.card} key={goal.id}>
            <span className={styles.iconWrap} aria-hidden="true">
              <Icon size={24} strokeWidth={1.75} />
            </span>
            <p className={`type-caption ${styles.code}`}>{goal.id}</p>
            <h3 className={`type-h3 ${styles.title}`}>{goal.title}</h3>
            <p className={`type-body ${styles.description}`}>{goal.description}</p>
          </li>
        );
      })}
    </ul>
  );
}
