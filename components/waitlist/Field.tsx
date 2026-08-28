import type { ReactNode } from 'react';
import { TriangleAlert } from 'lucide-react';
import { VisuallyHidden } from '@/components/primitives/VisuallyHidden';
import styles from './Field.module.css';

export type FieldRenderProps = {
  id: string;
  'aria-describedby': string | undefined;
  'aria-invalid': true | undefined;
};

export type FieldProps = {
  id: string;
  label: string;
  help?: string;
  error?: string;
  required?: boolean;
  /** Optional inline element rendered beside the label, e.g. a character counter. */
  hint?: ReactNode;
  children: (renderProps: FieldRenderProps) => ReactNode;
};

/**
 * Presentational field shell: label, help text and inline error, wired
 * together with matching ids so the control the caller renders in
 * `children` gets correct `aria-describedby` / `aria-invalid` for free.
 */
export function Field({ id, label, help, error, required, hint, children }: FieldProps) {
  const helpId = help ? `${id}-help` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [helpId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={styles.field}>
      <div className={styles.labelRow}>
        <label htmlFor={id} className={`type-label ${styles.label}`}>
          {label}
          {required ? (
            <>
              <span aria-hidden="true"> *</span>
              <VisuallyHidden> (required)</VisuallyHidden>
            </>
          ) : null}
        </label>
        {hint}
      </div>
      {children({ id, 'aria-describedby': describedBy, 'aria-invalid': error ? true : undefined })}
      {help ? (
        <p id={helpId} className={`type-small ${styles.help}`}>
          {help}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className={`type-small ${styles.error}`}>
          <TriangleAlert size={14} aria-hidden="true" className={styles.errorIcon} />
          {error}
        </p>
      ) : null}
    </div>
  );
}
