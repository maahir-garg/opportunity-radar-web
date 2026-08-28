import { Container } from '@/components/primitives/Container';
import { Section } from '@/components/primitives/Section';
import { RadarArcs } from '@/components/primitives/RadarArcs';
import { WaitlistForm } from '@/components/waitlist/WaitlistForm';
import styles from './WaitlistSection.module.css';

const PROMISES = [
  'We email you once, before the pilot opens.',
  'Your handle is held for you until then.',
  'Nothing you enter here is shared with NUS.',
] as const;

export function WaitlistSection() {
  return (
    <Section id="waitlist" tone="subdued" className={styles.section}>
      <RadarArcs className={styles.arcs} />
      <Container className={styles.inner}>
        <div className={styles.copy}>
          <p className={`type-caption ${styles.overline}`}>Join the pilot</p>
          <h2 className={`type-h1 ${styles.title}`}>Reserve your spot in the Radar pilot.</h2>
          <p className={`type-body-large ${styles.lead}`}>
            We are opening the first pilot to 100 NUS students. Tell us what you care about and we
            will send you your Radar before anyone else.
          </p>
          <ul className={styles.promises}>
            {PROMISES.map((promise) => (
              <li key={promise} className={`type-small ${styles.promise}`}>
                {promise}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.formWrap}>
          <WaitlistForm />
        </div>
      </Container>
    </Section>
  );
}
