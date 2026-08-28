import type { CSSProperties } from 'react';
import { ChevronRight } from 'lucide-react';
import { formatDate } from '@/lib/date';
import { PROTOTYPE_TODAY } from '@/lib/data';
import styles from './ForecastTimeline.module.css';

export type ForecastItem = {
  id: string;
  title: string;
  status: 'confirmed' | 'expected';
  /** Days from PROTOTYPE_TODAY. */
  startDay: number;
  endDay: number;
  /** Exact date for confirmed items, approximate window for expected ones. */
  dateLabel: string;
  /** Why an expected window is expected at all. */
  basis?: string;
  /** True when the window extends past the 30-day axis. */
  openEnded?: boolean;
};

export type ForecastTimelineProps = {
  items: ForecastItem[];
  className?: string;
};

const SPAN_DAYS = 30;
const TICK_DAYS = [0, 10, 20, 30];

function offset(day: number): string {
  const clamped = Math.min(Math.max(day, 0), SPAN_DAYS);
  return `${(clamped / SPAN_DAYS) * 100}%`;
}

function tickDate(day: number): string {
  const base = new Date(PROTOTYPE_TODAY);
  base.setUTCDate(base.getUTCDate() + day);
  return formatDate(base.toISOString()).replace(/ \d{4}$/, '');
}

type GroupProps = { title: string; items: ForecastItem[] };

function Group({ title, items }: GroupProps) {
  if (items.length === 0) return null;

  return (
    <section className={styles.group}>
      <h4 className={`type-caption ${styles.groupTitle}`}>{title}</h4>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.id} className={styles.row}>
            <span
              className={`${styles.rowMark} ${item.status === 'confirmed' ? styles.rowConfirmed : styles.rowExpected}`}
              aria-hidden="true"
            />
            <span className={styles.rowText}>
              <span className={`type-label ${styles.rowTitle}`}>{item.title}</span>
              <span className={`type-small ${styles.rowDate} tabular`}>
                {item.status === 'confirmed' ? 'Confirmed' : 'Expected'} · {item.dateLabel}
              </span>
              {item.basis ? (
                <span className={`type-small ${styles.rowBasis}`}>{item.basis}</span>
              ) : null}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * A 30-day planning axis. Confirmed dates use a solid mark; expected windows
 * use a dashed span and say so in text. The grouped list below carries the
 * same information for anyone who cannot use the graphic.
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

      <div className={styles.graphic} aria-hidden="true">
        <div className={styles.axis}>
          {TICK_DAYS.map((day, index) => (
            <span
              key={day}
              className={`${styles.tick} ${index === TICK_DAYS.length - 1 ? styles.tickLast : ''}`}
              style={{ '--tick-offset': offset(day) } as CSSProperties}
            >
              <span className={`type-caption ${styles.tickLabel} tabular`}>{tickDate(day)}</span>
              <span className={styles.tickLine} />
            </span>
          ))}
        </div>

        <div className={styles.lanes}>
          {expected.map((item) => (
            <span
              key={item.id}
              className={styles.expectedBand}
              style={
                {
                  '--band-start': offset(item.startDay),
                  '--band-width': `${((Math.min(item.endDay, SPAN_DAYS) - Math.max(item.startDay, 0)) / SPAN_DAYS) * 100}%`,
                } as CSSProperties
              }
            >
              {item.openEnded ? (
                <ChevronRight size={14} strokeWidth={2} className={styles.bandArrow} />
              ) : null}
            </span>
          ))}
          {confirmed.map((item) => (
            <span
              key={item.id}
              className={styles.confirmedMark}
              style={{ '--mark-offset': offset(item.startDay) } as CSSProperties}
            />
          ))}
        </div>
      </div>

      <Group title="Needs action" items={confirmed} />
      <Group title="Worth watching" items={expected} />
    </div>
  );
}
