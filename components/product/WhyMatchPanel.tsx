import { Check, CircleHelp, TriangleAlert } from 'lucide-react';
import type { OpportunityMatch } from '@/lib/types';
import { MatchIndicator } from './MatchIndicator';
import styles from './WhyMatchPanel.module.css';

export type WhyMatchPanelProps = {
  match: OpportunityMatch;
  className?: string;
};

type GroupProps = {
  title: string;
  items: string[];
  icon: 'check' | 'help' | 'alert';
};

const ICONS = {
  check: Check,
  help: CircleHelp,
  alert: TriangleAlert,
} as const;

const TONE_CLASS = {
  check: styles.satisfied,
  help: styles.unknown,
  alert: styles.blocker,
} as const;

function Group({ title, items, icon }: GroupProps) {
  if (items.length === 0) return null;
  const Icon = ICONS[icon];

  return (
    <div className={styles.group}>
      <h4 className={`type-caption ${styles.groupTitle}`}>{title}</h4>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item} className={`type-small ${styles.item}`}>
            <span className={`${styles.itemIcon} ${TONE_CLASS[icon]}`} aria-hidden="true">
              <Icon size={14} strokeWidth={2} />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * The explanation behind a match number. Satisfied factors, facts Radar does
 * not know, and hard blockers, always with the "profile fit" disclaimer.
 */
export function WhyMatchPanel({ match, className }: WhyMatchPanelProps) {
  const classNames = [styles.panel, className ?? ''].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      <MatchIndicator match={match} />
      <p className={`type-small ${styles.helper}`}>{match.disclaimer}</p>
      <Group title="What fits" items={match.reasons} icon="check" />
      <Group title="What Radar does not know" items={match.missing} icon="help" />
      <Group title="What could block you" items={match.blockers} icon="alert" />
      <p className={`type-caption ${styles.note}`}>
        Matching uses only the profile details you give Radar. You can change or remove any of them.
      </p>
    </div>
  );
}
