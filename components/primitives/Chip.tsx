import type { ReactNode } from 'react';
import styles from './Chip.module.css';

export type ChipTone = 'neutral' | 'match' | 'warning' | 'info' | 'signal' | 'error';

export type ChipProps = {
  tone?: ChipTone;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
};

const TONE_CLASS: Record<ChipTone, string> = {
  neutral: styles.neutral,
  match: styles.match,
  warning: styles.warning,
  info: styles.info,
  signal: styles.signal,
  error: styles.error,
};

export function Chip({ tone = 'neutral', icon, children, className }: ChipProps) {
  const classNames = [styles.chip, TONE_CLASS[tone], className ?? ''].filter(Boolean).join(' ');

  return (
    <span className={classNames}>
      {icon ? (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      ) : null}
      {children}
    </span>
  );
}
