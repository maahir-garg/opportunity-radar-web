'use client';

import { useState } from 'react';
import { TriangleAlert } from 'lucide-react';
import { CategoryIcon } from '@/components/product/CategoryIcon';
import { categories } from '@/lib/data';
import type { CategoryId } from '@/lib/types';
import { MAX_INTERESTS, MIN_INTERESTS } from '@/lib/waitlist';
import styles from './InterestPicker.module.css';

export type InterestPickerProps = {
  /** Fieldset id, also used as the prefix for each checkbox's id. */
  id: string;
  selected: CategoryId[];
  onChange: (next: CategoryId[]) => void;
  error?: string;
};

/**
 * The eight canonical categories as a real checkbox group. At the maximum,
 * the remaining boxes stay enabled (never `disabled`, which would drop them
 * from the tab order) — picking a fourth is simply refused with a polite
 * announcement instead.
 */
export function InterestPicker({ id, selected, onChange, error }: InterestPickerProps) {
  const [notice, setNotice] = useState('');

  const toggle = (categoryId: CategoryId) => {
    if (selected.includes(categoryId)) {
      onChange(selected.filter((existing) => existing !== categoryId));
      setNotice('');
      return;
    }

    if (selected.length >= MAX_INTERESTS) {
      setNotice('You can pick up to three. Deselect one to change your choice.');
      return;
    }

    setNotice('');
    onChange([...selected, categoryId]);
  };

  const countId = `${id}-count`;
  const noticeId = `${id}-notice`;
  const helpId = `${id}-help`;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [helpId, countId, noticeId, errorId].filter(Boolean).join(' ');

  return (
    <fieldset
      id={id}
      className={styles.fieldset}
      aria-describedby={describedBy}
      aria-invalid={error ? true : undefined}
    >
      <legend className={`type-label ${styles.legend}`}>
        Your interests
        <span aria-hidden="true"> *</span>
      </legend>
      <p id={helpId} className={`type-small ${styles.help}`}>
        Pick between {MIN_INTERESTS} and {MAX_INTERESTS}. We use these to show you relevant matches.
      </p>
      <div className={styles.grid}>
        {categories.map((category) => {
          const isChecked = selected.includes(category.id);
          const inputId = `${id}-${category.id}`;

          return (
            <label
              key={category.id}
              htmlFor={inputId}
              className={styles.option}
              data-checked={isChecked ? 'true' : undefined}
            >
              <input
                type="checkbox"
                id={inputId}
                name="interests"
                value={category.id}
                checked={isChecked}
                onChange={() => toggle(category.id)}
                className={styles.checkbox}
              />
              <CategoryIcon categoryId={category.id} size={20} className={styles.icon} />
              <span className={`type-body ${styles.optionLabel}`}>{category.label}</span>
            </label>
          );
        })}
      </div>
      <p id={countId} className={`type-small ${styles.count} tabular`} aria-live="polite">
        {selected.length} of {MAX_INTERESTS} selected
      </p>
      <p id={noticeId} className={`type-small ${styles.notice}`} aria-live="polite">
        {notice}
      </p>
      {error ? (
        <p id={errorId} className={`type-small ${styles.error}`}>
          <TriangleAlert size={14} aria-hidden="true" className={styles.errorIcon} />
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
