import { Check } from 'lucide-react';
import { Button } from '@/components/primitives/Button';
import { Chip } from '@/components/primitives/Chip';
import { CategoryIcon } from '@/components/product/CategoryIcon';
import { categories } from '@/lib/data';
import type { CategoryId } from '@/lib/types';
import { YEAR_OPTIONS, type FacultyOption, type YearValue } from '@/lib/waitlist';
import styles from './SuccessPanel.module.css';

export type SuccessPanelProps = {
  handle: string;
  year: YearValue;
  faculty: FacultyOption;
  interests: CategoryId[];
  onReset: () => void;
};

/** Replaces the form on a successful submission. Never shows a count of other sign-ups. */
export function SuccessPanel({ handle, year, faculty, interests, onReset }: SuccessPanelProps) {
  const yearLabel = YEAR_OPTIONS.find((option) => option.value === year)?.label ?? year;
  const interestCategories = interests
    .map((interestId) => categories.find((category) => category.id === interestId))
    .filter((category): category is NonNullable<typeof category> => Boolean(category));

  return (
    <div className={styles.panel}>
      <span className={styles.badge} aria-hidden="true">
        <Check size={24} strokeWidth={2} />
      </span>
      <h3 className={`type-h3 ${styles.heading}`}>{`You're on the list, @${handle}.`}</h3>
      <p className={`type-body ${styles.body}`}>
        We&apos;ll email you before the pilot opens. Nothing on this page is shared with NUS.
      </p>
      <dl className={styles.summary}>
        <div className={styles.summaryRow}>
          <dt className={`type-small ${styles.summaryLabel}`}>Year</dt>
          <dd className="type-body">{yearLabel}</dd>
        </div>
        <div className={styles.summaryRow}>
          <dt className={`type-small ${styles.summaryLabel}`}>Faculty</dt>
          <dd className="type-body">{faculty}</dd>
        </div>
        <div className={styles.summaryRow}>
          <dt className={`type-small ${styles.summaryLabel}`}>Interests</dt>
          <dd>
            <ul className={styles.chipList}>
              {interestCategories.map((category) => (
                <li key={category.id}>
                  <Chip tone="neutral" icon={<CategoryIcon categoryId={category.id} size={14} />}>
                    {category.label}
                  </Chip>
                </li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>
      <Button type="button" variant="secondary" onClick={onReset}>
        Add another response
      </Button>
    </div>
  );
}
