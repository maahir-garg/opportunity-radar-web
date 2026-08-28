import styles from './RadarArcs.module.css';

export type RadarArcsProps = {
  className?: string;
};

/**
 * Large decorative artwork echoing the logo: concentric signal arcs from one
 * origin, plus a sparse dot field. Flat strokes, no gradients. Purely
 * decorative, aria-hidden and pointer-events: none. It fills its positioned
 * ancestor; the section owner decides placement so it never sits under text.
 */
export function RadarArcs({ className }: RadarArcsProps) {
  const classNames = [styles.arcs, className ?? ''].filter(Boolean).join(' ');

  return (
    <svg
      className={classNames}
      viewBox="0 0 520 520"
      fill="none"
      preserveAspectRatio="xMaxYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="currentColor" strokeLinecap="round" fill="none">
        <path d="M500 500A480 480 0 0 0 20 20" strokeWidth="1" opacity="0.5" />
        <path d="M400 500A380 380 0 0 0 20 120" strokeWidth="1" opacity="0.55" />
        <path d="M300 500A280 280 0 0 0 20 220" strokeWidth="1.75" opacity="0.6" />
        <path d="M200 500A180 180 0 0 0 20 320" strokeWidth="1.75" opacity="0.65" />
        <path d="M110 500A90 90 0 0 0 20 410" strokeWidth="1.75" opacity="0.7" />
      </g>
      <circle cx="20" cy="500" r="7" fill="var(--radar-color-signal)" opacity="0.9" />
      <g fill="currentColor">
        <circle cx="236" cy="176" r="4" opacity="0.45" />
        <circle cx="392" cy="300" r="3.5" opacity="0.4" />
        <circle cx="140" cy="336" r="3" opacity="0.4" />
        <circle cx="316" cy="86" r="3" opacity="0.35" />
        <circle cx="452" cy="188" r="2.5" opacity="0.3" />
      </g>
    </svg>
  );
}
