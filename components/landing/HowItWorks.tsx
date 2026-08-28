import { ListChecks, SlidersHorizontal, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Container } from '@/components/primitives/Container';
import { Section } from '@/components/primitives/Section';
import { SectionHeader } from '@/components/primitives/SectionHeader';
import styles from './HowItWorks.module.css';

const STEPS: { title: string; body: string; Icon: LucideIcon }[] = [
  {
    title: 'Set up your Radar',
    body: 'Tell Radar your year, school, up to three interests and how much time you have. It takes about a minute, and you can change any of it later.',
    Icon: SlidersHorizontal,
  },
  {
    title: 'See what actually fits',
    body: 'A short list instead of a full inbox. Every recommendation shows the deadline, the organiser, the source it came from, and why it matched you.',
    Icon: Sparkles,
  },
  {
    title: 'Plan the deadline',
    body: 'Save it, set a reminder, mark it applied, and see everything due in the next 30 days in one view.',
    Icon: ListChecks,
  },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works" tone="surface">
      <Container>
        <SectionHeader
          overline="How it works"
          title="Three steps, then it works in the background."
        />
        <ol className={styles.steps}>
          {STEPS.map((step, index) => (
            <li key={step.title} className={styles.step}>
              <p className={`type-caption ${styles.number} tabular`}>
                Step {index + 1}
              </p>
              <span className={styles.iconWrap} aria-hidden="true">
                <step.Icon size={20} strokeWidth={1.75} />
              </span>
              <h3 className={`type-h3 ${styles.title}`}>{step.title}</h3>
              <p className={`type-body ${styles.body}`}>{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
