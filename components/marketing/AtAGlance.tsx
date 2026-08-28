import type { ComponentType } from 'react';
import { CalendarRange, Target, Users, Wallet, type LucideProps } from 'lucide-react';
import { glanceItems, type IconKey } from '@/lib/content/campaign';
import styles from './AtAGlance.module.css';

const ICONS: Partial<Record<IconKey, ComponentType<LucideProps>>> = {
  users: Users,
  'calendar-range': CalendarRange,
  wallet: Wallet,
  target: Target,
};

/** "Campaign at a glance" row: audience, window, budget and primary metric. */
export function AtAGlance() {
  return (
    <div className={styles.glance}>
      <h2 className="type-h3">Campaign at a glance</h2>
      <dl className={styles.grid}>
        {glanceItems.map((item) => {
          const Icon = ICONS[item.icon] ?? Target;
          return (
            <div className={styles.item} key={item.label}>
              <dt className={styles.term}>
                <Icon className={styles.icon} aria-hidden="true" />
                <span className="type-caption">{item.label}</span>
              </dt>
              <dd className="type-body">{item.value}</dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
