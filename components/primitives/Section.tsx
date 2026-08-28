import type { ReactNode } from 'react';
import styles from './Section.module.css';

export type SectionTone = 'canvas' | 'surface' | 'subdued' | 'navy';

export type SectionProps = {
  id?: string;
  tone?: SectionTone;
  children: ReactNode;
  className?: string;
};

const TONE_CLASS: Record<SectionTone, string> = {
  canvas: styles.canvas,
  surface: styles.surface,
  subdued: styles.subdued,
  navy: styles.navy,
};

export function Section({ id, tone = 'canvas', children, className }: SectionProps) {
  const classNames = [styles.section, TONE_CLASS[tone], className ?? ''].filter(Boolean).join(' ');

  return (
    <section id={id} className={classNames}>
      {children}
    </section>
  );
}
