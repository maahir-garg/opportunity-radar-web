import { SectionHeader } from '@/components/primitives/SectionHeader';
import { personas } from '@/lib/content/campaign';
import styles from './AudienceSection.module.css';

/** "Who we are talking to" — primary and secondary personas. */
export function AudienceSection() {
  return (
    <div>
      <SectionHeader
        overline="Audience"
        title="Who we are talking to"
        lead="Two audiences, and they reinforce each other: the students we want on the pilot, and the societies who can put Radar in front of them."
      />
      <div className={styles.grid}>
        {personas.map((persona) => (
          <article className={styles.card} key={persona.id}>
            <p className={`type-caption ${styles.kind}`}>{persona.kind} persona</p>
            <h3 className="type-h3">{persona.name}</h3>
            <p className={`type-body ${styles.summary}`}>{persona.summary}</p>
            <dl className={styles.details}>
              {persona.details.map((detail) => (
                <div className={styles.detailRow} key={detail.label}>
                  <dt className="type-label">{detail.label}</dt>
                  <dd className="type-small">{detail.value}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}
