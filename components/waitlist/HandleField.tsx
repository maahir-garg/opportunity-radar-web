'use client';

import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { Check, TriangleAlert } from 'lucide-react';
import { VisuallyHidden } from '@/components/primitives/VisuallyHidden';
import {
  HANDLE_MAX_LENGTH,
  HANDLE_MIN_LENGTH,
  checkHandleAvailability,
  normalizeHandle,
} from '@/lib/handles';
import styles from './HandleField.module.css';

const DEBOUNCE_MS = 250;

export type HandleFieldProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

type Status = 'idle' | 'available' | 'taken';

/**
 * The waitlist's hook field: a `radar.nus/@` prefix rendered inside the same
 * visual control as the real `<input>`, with a debounced local availability
 * check against the reserved list in lib/handles.ts.
 */
export function HandleField({ id, value, onChange, error }: HandleFieldProps) {
  const [status, setStatus] = useState<Status>('idle');
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // Both branches resolve via a timer callback (never a synchronous
    // setState in the effect body itself) so a fast typist never triggers
    // cascading renders. The short-input case just resolves on the next tick.
    const delay = value.length < HANDLE_MIN_LENGTH ? 0 : DEBOUNCE_MS;
    timeoutRef.current = setTimeout(() => {
      setStatus(value.length < HANDLE_MIN_LENGTH ? 'idle' : checkHandleAvailability(value));
    }, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [value]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(normalizeHandle(event.target.value));
  };

  const helpId = `${id}-help`;
  const statusId = `${id}-status`;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [helpId, statusId, errorId].filter(Boolean).join(' ');

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={`type-label ${styles.label}`}>
        Claim your Radar handle
        <span aria-hidden="true"> *</span>
        <VisuallyHidden> (required)</VisuallyHidden>
      </label>
      <div
        className={styles.control}
        data-invalid={error ? 'true' : undefined}
        onClick={() => inputRef.current?.focus()}
      >
        <span className={styles.prefix} aria-hidden="true">
          radar.nus/@
        </span>
        <input
          ref={inputRef}
          id={id}
          name="handle"
          type="text"
          inputMode="text"
          className={styles.input}
          value={value}
          onChange={handleChange}
          minLength={HANDLE_MIN_LENGTH}
          maxLength={HANDLE_MAX_LENGTH}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          required
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
        />
      </div>
      <p id={helpId} className={`type-small ${styles.help}`}>
        Your handle is only a reservation for the pilot. It is not public.
      </p>
      <p
        id={statusId}
        className={[
          'type-small',
          styles.status,
          status === 'available' ? styles.available : '',
          status === 'taken' ? styles.taken : '',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-live="polite"
      >
        {status === 'available' ? (
          <>
            <Check size={14} aria-hidden="true" className={styles.statusIcon} />
            {`@${value} is available`}
          </>
        ) : null}
        {status === 'taken' ? (
          <>
            <TriangleAlert size={14} aria-hidden="true" className={styles.statusIcon} />
            {`@${value} is taken, try another`}
          </>
        ) : null}
      </p>
      {error ? (
        <p id={errorId} className={`type-small ${styles.error}`}>
          <TriangleAlert size={14} aria-hidden="true" className={styles.errorIcon} />
          {error}
        </p>
      ) : null}
    </div>
  );
}
