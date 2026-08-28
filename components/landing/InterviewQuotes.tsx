import { Quote } from 'lucide-react';
import { Container } from '@/components/primitives/Container';
import { Section } from '@/components/primitives/Section';
import { SectionHeader } from '@/components/primitives/SectionHeader';
import styles from './InterviewQuotes.module.css';

const QUOTES = [
  {
    quote: 'Talk quality is hard to gauge upfront. There is no verification system.',
    attribution: 'NUS undergraduate · interview 1',
  },
  {
    quote: 'Everyone discovers and applies through Telegram, which is fragmented.',
    attribution: 'NUS undergraduate · interview 2',
  },
  {
    quote: 'There are not enough NUS events on the centralised platforms we already use.',
    attribution: 'NUS undergraduate · interview 3',
  },
] as const;

export function InterviewQuotes() {
  return (
    <Section tone="canvas">
      <Container>
        <SectionHeader
          overline="What students told us"
          title="The problem is not a shortage of opportunities."
          lead="We spoke to NUS students about how they find opportunities today. The same three frustrations came up, and they shaped what we built."
        />
        <ul className={styles.grid}>
          {QUOTES.map((item) => (
            <li key={item.attribution} className={styles.card}>
              <Quote
                size={20}
                strokeWidth={1.75}
                aria-hidden="true"
                className={styles.icon}
              />
              <blockquote className={`type-body-large ${styles.quote}`}>
                <p>{item.quote}</p>
              </blockquote>
              <p className={`type-small ${styles.attribution}`}>{item.attribution}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
