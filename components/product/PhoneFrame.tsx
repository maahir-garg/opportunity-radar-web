import type { ReactNode } from 'react';
import styles from './PhoneFrame.module.css';

export type PhoneFrameProps = {
  children: ReactNode;
  className?: string;
};

/**
 * A 390px-reference device frame for marketing imagery. The content inside is
 * a static composition, not a working app. It is inert by design.
 */
export function PhoneFrame({ children, className }: PhoneFrameProps) {
  const classNames = [styles.frame, className ?? ''].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      <div className={styles.bezel}>
        <div className={styles.statusBar} aria-hidden="true">
          <span className={`type-caption ${styles.time} tabular`}>9:41</span>
          <span className={styles.indicators}>
            <span className={styles.bar} />
            <span className={styles.bar} />
            <span className={styles.battery} />
          </span>
        </div>
        <div className={styles.screen}>{children}</div>
      </div>
    </div>
  );
}
