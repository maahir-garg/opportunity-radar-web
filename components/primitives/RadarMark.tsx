import styles from './RadarMark.module.css';

export type RadarMarkProps = {
  size?: number;
  withWordmark?: boolean;
  className?: string;
};

/**
 * The Radar logo lockup: three signal arcs sweeping from a single origin dot.
 * Two stroke widths and exactly one orange signal dot, per the design system's
 * "Iconography and imagery" rule. Legible down to 20px.
 */
export function RadarMark({ size = 28, withWordmark = false, className }: RadarMarkProps) {
  const classNames = [styles.mark, className ?? ''].filter(Boolean).join(' ');

  return (
    <span className={classNames}>
      <svg
        className={styles.svg}
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M27 25A20 20 0 0 0 7 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.45"
        />
        <path
          d="M20 25A13 13 0 0 0 7 12"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
          opacity="0.75"
        />
        <path
          d="M13 25A6 6 0 0 0 7 19"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
        />
        <circle cx="7" cy="25" r="2.75" fill="var(--radar-color-signal)" />
      </svg>
      {withWordmark ? <span className={`type-h3 ${styles.wordmark}`}>Radar</span> : null}
    </span>
  );
}
