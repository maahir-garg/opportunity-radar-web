import { SectionHeader } from '@/components/primitives/SectionHeader';
import { VisuallyHidden } from '@/components/primitives/VisuallyHidden';
import { measurementNotes, utmRows } from '@/lib/content/campaign';
import styles from './MeasurementSection.module.css';

/** How we would measure the campaign: literal UTMs, conversion and attribution. */
export function MeasurementSection() {
  return (
    <div>
      <SectionHeader overline="Measurement" title="How we would know it worked" />
      <div className={styles.scroll} tabIndex={0} role="region" aria-label="UTM parameters by channel table">
        <table className={styles.table}>
          <caption>
            <VisuallyHidden>UTM query string used by each channel&rsquo;s links</VisuallyHidden>
          </caption>
          <thead>
            <tr>
              <th className="type-caption" scope="col">
                Channel
              </th>
              <th className="type-caption" scope="col">
                UTM
              </th>
            </tr>
          </thead>
          <tbody>
            {utmRows.map((row) => (
              <tr key={row.channel}>
                <th className="type-small" scope="row">
                  {row.channel}
                </th>
                <td className={`type-small tabular ${styles.utm}`}>
                  <code>{row.utm}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className={styles.cards}>
        {utmRows.map((row) => (
          <li className={styles.card} key={row.channel}>
            <p className="type-label">{row.channel}</p>
            <code className={`type-small tabular ${styles.utmCard}`}>{row.utm}</code>
          </li>
        ))}
      </ul>

      <dl className={styles.notes}>
        <div className={styles.note}>
          <dt className="type-label">Landing → form conversion</dt>
          <dd className="type-small">{measurementNotes.conversion}</dd>
        </div>
        <div className={styles.note}>
          <dt className="type-label">The attribution backstop</dt>
          <dd className="type-small">{measurementNotes.attribution}</dd>
        </div>
        <div className={`${styles.note} ${styles.honest}`}>
          <dt className="type-label">Results so far</dt>
          <dd className="type-small">{measurementNotes.honest}</dd>
        </div>
      </dl>
    </div>
  );
}
