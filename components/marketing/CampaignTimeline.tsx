import { SectionHeader } from '@/components/primitives/SectionHeader';
import { VisuallyHidden } from '@/components/primitives/VisuallyHidden';
import { timeline, timelineChannelOrder } from '@/lib/content/campaign';
import styles from './CampaignTimeline.module.css';

/** Six-week timeline: weeks −4 to +1 across the six channels. */
export function CampaignTimeline() {
  return (
    <div>
      <SectionHeader
        overline="Implementation: schedule"
        title="Six-week timeline"
        lead="Four weeks to prepare, one launch week, one sustain week. Each cell is a concrete artefact, not a placeholder."
      />
      <div
        className={styles.scroll}
        tabIndex={0}
        role="region"
        aria-label="Six-week campaign timeline table"
      >
        <table className={styles.table}>
          <caption>
            <VisuallyHidden>
              Campaign timeline from week minus 4 to week plus 1, showing what ships in each
              channel every week
            </VisuallyHidden>
          </caption>
          <thead>
            <tr>
              <th className="type-caption" scope="col">
                Week
              </th>
              {timelineChannelOrder.map((channel) => (
                <th className="type-caption" scope="col" key={channel.id}>
                  {channel.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeline.map((row) => (
              <tr key={row.week}>
                <th className="type-small" scope="row">
                  <span className={styles.week}>{row.week}</span>
                  <span className={`type-caption ${styles.weekLabel}`}>{row.label}</span>
                </th>
                {timelineChannelOrder.map((channel) => (
                  <td className="type-small" key={channel.id}>
                    {row.cells[channel.id] ?? (
                      <span className={styles.empty}>
                        <VisuallyHidden>Nothing scheduled</VisuallyHidden>
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className={styles.cards}>
        {timeline.map((row) => {
          const activeChannels = timelineChannelOrder.filter((channel) => row.cells[channel.id]);
          return (
            <li className={styles.card} key={row.week}>
              <div className={styles.cardHead}>
                <span className="type-label">{row.week}</span>
                <span className={`type-caption ${styles.cardPhase}`}>{row.label}</span>
              </div>
              {activeChannels.length > 0 ? (
                <dl className={styles.cardList}>
                  {activeChannels.map((channel) => (
                    <div className={styles.cardRow} key={channel.id}>
                      <dt className={`type-caption ${styles.cardTerm}`}>{channel.label}</dt>
                      <dd className="type-small">{row.cells[channel.id]}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className={`type-small ${styles.cardEmpty}`}>Nothing scheduled this week.</p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
