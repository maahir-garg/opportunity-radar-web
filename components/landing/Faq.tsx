import { Plus } from 'lucide-react';
import { Container } from '@/components/primitives/Container';
import { Section } from '@/components/primitives/Section';
import { SectionHeader } from '@/components/primitives/SectionHeader';
import styles from './Faq.module.css';

const QUESTIONS = [
  {
    question: 'Is this an official NUS product?',
    answer:
      'No. Radar is student-built for NUS students and is not affiliated with, endorsed by, or operated by the university. We do not use the NUS crest or any official wordmark.',
  },
  {
    question: 'Where would the opportunities come from?',
    answer:
      'Public organiser and faculty pages, submissions from student societies, and listings we have permission to index. Every item keeps its source, its destination link and the date we last checked it, so you can always go and verify the original.',
  },
  {
    question: 'What does the match percentage mean?',
    answer:
      'It scores how well an opportunity fits the profile details you gave us: your year, school, interests, goals and the time you have. It is never a chance of acceptance, and "Why this matches" is always one tap away so you can see exactly which factors produced it.',
  },
  {
    question: 'What is an "expected" opportunity?',
    answer:
      'A seasonal window we think is likely to open again, based on a previous year’s listing. Expected items are visually distinct from confirmed ones, state the evidence they rest on, and are labelled "Dates not announced" until an organiser publishes real dates.',
  },
  {
    question: 'What happens to my email?',
    answer:
      'We store what the form collects so we can contact you about the Radar pilot, and nothing else. There is no analytics vendor and no third-party tracking here, we never sell or share your details, and you can ask us to have your entry deleted at any time. See the privacy page for the full picture.',
  },
  {
    question: 'When can I use it?',
    answer:
      'We are testing the prototype with students now. We will email the list before the pilot opens, and we are deliberately not promising a date we cannot keep.',
  },
] as const;

export function Faq() {
  return (
    <Section tone="canvas">
      <Container>
        <SectionHeader overline="FAQ" title="Before you sign up." />
        <ul className={styles.list}>
          {QUESTIONS.map((item) => (
            <li key={item.question}>
              <details className={styles.item}>
                <summary className={styles.summary}>
                  <span className={`type-title ${styles.question}`}>{item.question}</span>
                  <Plus
                    size={20}
                    strokeWidth={1.75}
                    aria-hidden="true"
                    className={styles.marker}
                  />
                </summary>
                <p className={`type-body ${styles.answer}`}>{item.answer}</p>
              </details>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
