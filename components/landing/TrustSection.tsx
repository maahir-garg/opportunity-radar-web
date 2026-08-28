import { CalendarClock, FileSearch, ScanEye, ShieldOff } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Container } from '@/components/primitives/Container';
import { Section } from '@/components/primitives/Section';
import { SectionHeader } from '@/components/primitives/SectionHeader';
import styles from './TrustSection.module.css';

const ITEMS: { title: string; body: string; Icon: LucideIcon }[] = [
  {
    title: 'Every listing shows its source',
    body: 'The organiser, the destination domain and the date we last checked that page sit next to the apply button, not in a footer.',
    Icon: FileSearch,
  },
  {
    title: 'Match scores explain themselves',
    body: 'A percentage never appears without a label and a breakdown of the factors behind it. It measures profile fit, not your chance of acceptance.',
    Icon: ScanEye,
  },
  {
    title: 'Forecasts separate confirmed from expected',
    body: 'Announced deadlines are marked Confirmed with an exact date. Seasonal guesses are marked Expected, show the year they are based on, and say the dates are not announced.',
    Icon: CalendarClock,
  },
  {
    title: 'We are not an official NUS service',
    body: 'Radar is student-built. We do not use NUS marks, we do not claim a partnership, and we will only launch with sources we are allowed to use.',
    Icon: ShieldOff,
  },
];

export function TrustSection() {
  return (
    <Section id="trust" tone="navy">
      <Container>
        <SectionHeader
          overline="Trust"
          title="A tool about deadlines has to be honest about what it knows."
          className={styles.header}
        />
        <ul className={styles.grid}>
          {ITEMS.map((item) => (
            <li key={item.title} className={styles.item}>
              <span className={styles.iconWrap} aria-hidden="true">
                <item.Icon size={20} strokeWidth={1.75} />
              </span>
              <h3 className={`type-h3 ${styles.title}`}>{item.title}</h3>
              <p className={`type-body ${styles.body}`}>{item.body}</p>
            </li>
          ))}
        </ul>
        <p className={`type-body ${styles.limitation}`}>
          Radar is a student project at prototype stage. Everything shown on this page is demo
          content, there is no live NUS integration, and nothing here has been endorsed by the
          university.
        </p>
      </Container>
    </Section>
  );
}
