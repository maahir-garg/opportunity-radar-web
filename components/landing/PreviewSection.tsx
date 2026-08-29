import { Container } from '@/components/primitives/Container';
import { Section } from '@/components/primitives/Section';
import { SectionHeader } from '@/components/primitives/SectionHeader';
import { ProductPreview } from '@/components/product/ProductPreview';
import styles from './PreviewSection.module.css';

const POINTS = [
  {
    title: 'An explainable match',
    body: 'Radar shows a percentage only next to a plain-language label and a "Why this matches" breakdown: what fits your profile, and what it could not confirm about you. It measures profile fit, never your chance of acceptance.',
  },
  {
    title: 'A 30-day view that admits what it does not know',
    body: 'Every upcoming item sits in one chronological list, each entry marked by a dot and a connecting line. Confirmed deadlines are grouped under "Needs action" with an exact date; seasonal windows that have not been announced yet sit under "Worth watching," with the previous year they are based on one tap away.',
  },
] as const;

export function PreviewSection() {
  return (
    <Section id="preview" tone="canvas">
      <Container>
        <SectionHeader
          overline="Product preview"
          title="Two things a group chat cannot do."
        />
        <div className={styles.layout}>
          <div className={styles.points}>
            {POINTS.map((point) => (
              <div key={point.title} className={styles.point}>
                <h3 className={`type-h3 ${styles.pointTitle}`}>{point.title}</h3>
                <p className={`type-body ${styles.pointBody}`}>{point.body}</p>
              </div>
            ))}
            <p className={`type-small ${styles.notice}`}>
              Sample content: every listing, review, organiser and date shown here is an example,
              not a live opportunity.
            </p>
          </div>
          <ProductPreview className={styles.preview} />
        </div>
      </Container>
    </Section>
  );
}
