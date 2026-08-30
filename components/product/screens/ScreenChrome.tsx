import type { ReactNode } from 'react';
import { ArrowLeft, Bell, Compass, House, Bookmark, CircleUser } from 'lucide-react';
import styles from './ScreenChrome.module.css';

export type ScreenProps = {
  title: string;
  variant?: 'root' | 'child';
  withBottomNav?: boolean;
  /**
   * Overrides the default top-right glyph (the notification bell on a root
   * screen, nothing on a child screen) — e.g. the info icon on the 30-day
   * Radar screen. Pass null to force no icon.
   */
  topRightIcon?: ReactNode;
  children: ReactNode;
};

const NAV = [
  { label: 'For You', Icon: House },
  { label: 'Explore', Icon: Compass },
  { label: 'Saved', Icon: Bookmark },
  { label: 'Profile', Icon: CircleUser },
] as const;

/**
 * Shared chrome for the marketing screen compositions: a top bar, a scrollable
 * body and the four-destination bottom navigation. Everything here is static
 * markup. There are no controls inside the phone, so nothing looks tappable
 * but dead.
 */
export function Screen({
  title,
  variant = 'root',
  withBottomNav = true,
  topRightIcon,
  children,
}: ScreenProps) {
  const rightIcon =
    topRightIcon !== undefined
      ? topRightIcon
      : variant === 'root'
        ? <Bell size={20} strokeWidth={1.75} aria-hidden="true" />
        : null;

  return (
    <div className={styles.screen}>
      <div className={styles.topBar}>
        {variant === 'child' ? (
          <ArrowLeft size={20} strokeWidth={1.75} aria-hidden="true" className={styles.topIcon} />
        ) : null}
        <p className={`type-h3 ${styles.topTitle}`}>{title}</p>
        {rightIcon ? <span className={styles.topIcon}>{rightIcon}</span> : null}
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
