import type { ElementType, ReactNode } from 'react';
import styles from './VisuallyHidden.module.css';

export type VisuallyHiddenProps = {
  children: ReactNode;
  as?: ElementType;
};

/** Screen-reader-only content: visually hidden, still in the accessibility tree. */
export function VisuallyHidden({ children, as: Component = 'span' }: VisuallyHiddenProps) {
  return <Component className={styles.visuallyHidden}>{children}</Component>;
}
