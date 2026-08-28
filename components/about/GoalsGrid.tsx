import { Compass, ShieldCheck, CalendarCheck } from 'lucide-react';
import { FeatureCard } from '@/components/primitives/FeatureCard';
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
          <li key={goal.id}>
            <FeatureCard
              label={goal.label}
              icon={<Icon size={20} strokeWidth={1.75} />}
              title={goal.title}
              description={goal.description}
            />
          </li>
        );
      })}
    </ul>
  );
}
