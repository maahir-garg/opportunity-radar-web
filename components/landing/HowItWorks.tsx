import { Bookmark, SlidersHorizontal, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Container } from '@/components/primitives/Container';
import { FeatureCard } from '@/components/primitives/FeatureCard';
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
    title: 'Save the deadline',
    body: 'Save it, set a reminder, mark it applied, and see everything due in the next 30 days in one view.',
    Icon: Bookmark,
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
              <FeatureCard
                tone="plain"
                label={`Step ${index + 1}`}
                icon={<step.Icon size={20} strokeWidth={1.75} />}
                title={step.title}
                description={step.body}
              />
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
