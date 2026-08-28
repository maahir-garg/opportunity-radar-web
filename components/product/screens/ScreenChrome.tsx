import type { ReactNode } from 'react';
import { ArrowLeft, Bell, Compass, House, ListChecks, CircleUser } from 'lucide-react';
import styles from './ScreenChrome.module.css';

export type ScreenProps = {
  title: string;
  variant?: 'root' | 'child';
  withBottomNav?: boolean;
  children: ReactNode;
};

const NAV = [
  { label: 'For You', Icon: House },
  { label: 'Explore', Icon: Compass },
  { label: 'Plan', Icon: ListChecks },
  { label: 'Profile', Icon: CircleUser },
] as const;

/**
 * Shared chrome for the marketing screen compositions: a top bar, a scrollable
 * body and the four-destination bottom navigation. Everything here is static
 * markup. There are no controls inside the phone, so nothing looks tappable
 * but dead.
 */
export function Screen({ title, variant = 'root', withBottomNav = true, children }: ScreenProps) {
  return (
    <div className={styles.screen}>
      <div className={styles.topBar}>
        {variant === 'child' ? (
          <ArrowLeft size={20} strokeWidth={1.75} aria-hidden="true" className={styles.topIcon} />
        ) : null}
        <p className={`type-h3 ${styles.topTitle}`}>{title}</p>
        {variant === 'root' ? (
          <Bell size={20} strokeWidth={1.75} aria-hidden="true" className={styles.topIcon} />
        ) : null}
      </div>

      <div className={styles.body}>{children}</div>

      {withBottomNav ? (
        <div className={styles.bottomNav}>
          {NAV.map(({ label, Icon }, index) => (
            <span
              key={label}
              className={`${styles.navItem} ${index === 0 ? styles.navCurrent : ''}`}
            >
              <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
              <span className={`type-caption ${styles.navLabel}`}>{label}</span>
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
