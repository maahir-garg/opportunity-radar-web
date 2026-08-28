import { Container } from '@/components/primitives/Container';
import { Section } from '@/components/primitives/Section';
import { SectionHeader } from '@/components/primitives/SectionHeader';
import { ProductPreview } from '@/components/product/ProductPreview';
import styles from './PreviewSection.module.css';

const POINTS = [
  {
    title: 'An explainable match',
    body: 'Radar shows a percentage only next to a plain-language label and a "Why this matches" breakdown: what fits, what it does not know about you, and what could block you. It measures profile fit, never your chance of acceptance.',
  },
  {
    title: 'A 30-day view that admits what it does not know',
    body: 'Confirmed deadlines sit on a solid mark with the exact date and time. Seasonal windows that have not been announced are dashed, labelled Expected, and show the previous year they are based on.',
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
