import { SectionHeader } from '@/components/primitives/SectionHeader';
import { VisuallyHidden } from '@/components/primitives/VisuallyHidden';
import { shotList, shotListTotalSeconds, videoConceptSummary } from '@/lib/content/campaign';
import styles from './VideoStoryboard.module.css';

/** The promotional video's shot list: 8 beats totalling roughly 40 seconds. */
export function VideoStoryboard() {
  return (
    <div>
      <SectionHeader
        overline="Implementation — video"
        title="Promotional video outline"
        lead={videoConceptSummary}
      />
      <div className={styles.scroll} tabIndex={0} role="region" aria-label="Video shot list table">
        <table className={styles.table}>
          <caption>
            <VisuallyHidden>
              Shot list for the launch video, listing each shot, its on-screen text, voiceover and
              duration in seconds
            </VisuallyHidden>
          </caption>
          <thead>
            <tr>
              <th className="type-caption" scope="col">
                #
              </th>
              <th className="type-caption" scope="col">
                Shot
              </th>
              <th className="type-caption" scope="col">
                On-screen text
              </th>
              <th className="type-caption" scope="col">
                Voiceover
              </th>
              <th className="type-caption" scope="col">
                Seconds
              </th>
            </tr>
          </thead>
          <tbody>
            {shotList.map((row) => (
              <tr key={row.id}>
                <th className="type-small tabular" scope="row">
                  {row.id}
                </th>
                <td className="type-small">{row.shot}</td>
                <td className="type-small">{row.onScreenText}</td>
                <td className="type-small">{row.voiceover}</td>
                <td className={`type-small tabular ${styles.seconds}`}>{row.seconds}s</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th className="type-label" scope="row" colSpan={4}>
                Total
              </th>
              <td className={`type-label tabular ${styles.seconds}`}>{shotListTotalSeconds}s</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
