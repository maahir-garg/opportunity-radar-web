import { Ban } from 'lucide-react';
import styles from './NotList.module.css';

export type NotListProps = {
  items: string[];
};

/** "What Radar is not" — a short, honest out-of-scope list. */
export function NotList({ items }: NotListProps) {
  return (
    <ul className={styles.list}>
      {items.map((item, index) => (
        <li className={styles.item} key={index}>
          <Ban className={styles.icon} size={18} strokeWidth={1.75} aria-hidden="true" />
          <span className={`type-body ${styles.text}`}>{item}</span>
        </li>
      ))}
    </ul>
  );
}
