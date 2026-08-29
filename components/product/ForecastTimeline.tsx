import styles from './ForecastTimeline.module.css';

export type ForecastItem = {
  id: string;
  title: string;
  status: 'confirmed' | 'expected';
  /** Days from PROTOTYPE_TODAY. Unused by the vertical layout below; kept so
   *  callers that compute these values don't need a second data shape. */
  startDay: number;
  endDay: number;
  /** Exact date for confirmed items, approximate window for expected ones. */
  dateLabel: string;
  /** Why an expected window is expected at all. */
  basis?: string;
  /** True when the window extends past the 30-day span. Unused here. */
  openEnded?: boolean;
};

export type ForecastTimelineProps = {
  items: ForecastItem[];
  className?: string;
};

type GroupProps = { title: string; items: ForecastItem[] };

function Group({ title, items }: GroupProps) {
  if (items.length === 0) return null;

  return (
    <section className={styles.group}>
      <h4 className={`type-caption ${styles.groupTitle}`}>{title}</h4>
      <ol className={styles.list}>
        {items.map((item, index) => (
          <li key={item.id} className={styles.row}>
            <span className={styles.rail} aria-hidden="true">
              <span
                className={`${styles.dot} ${item.status === 'confirmed' ? styles.dotConfirmed : styles.dotExpected}`}
              />
              {index < items.length - 1 ? <span className={styles.line} /> : null}
            </span>
            <span className={styles.rowBody}>
              <span className={`type-small ${styles.rowDate} tabular`}>
                {item.status === 'confirmed' ? 'Confirmed' : 'Expected'} · {item.dateLabel}
              </span>
              <span className={`type-label ${styles.rowTitle}`}>{item.title}</span>
              {item.basis ? (
                <span className={`type-small ${styles.rowBasis}`}>{item.basis}</span>
              ) : null}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

/**
 * A chronological list of confirmed deadlines and expected windows. Every
 * entry sits on a vertical rail, marked by a dot (filled for confirmed,
 * dashed-outline for expected) and connected to the next entry in its group
 * by a line. Confirmed deadlines are grouped under "Needs action"; seasonal
 * windows sit under "Worth watching".
 */
export function ForecastTimeline({ items, className }: ForecastTimelineProps) {
  const classNames = [styles.timeline, className ?? ''].filter(Boolean).join(' ');
  const confirmed = items.filter((item) => item.status === 'confirmed');
  const expected = items.filter((item) => item.status === 'expected');

  return (
    <div className={classNames}>
      <p className={`type-caption ${styles.legend}`}>
        <span className={styles.legendItem}>
          <span className={`${styles.legendMark} ${styles.legendConfirmed}`} aria-hidden="true" />
          Confirmed
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.legendMark} ${styles.legendExpected}`} aria-hidden="true" />
          Expected
        </span>
      </p>

      <Group title="Needs action" items={confirmed} />
      <Group title="Worth watching" items={expected} />
    </div>
  );
}
