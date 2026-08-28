import styles from './SkipLink.module.css';

/** Visible-on-focus link to the page's <main id="main">. First focusable element. */
export function SkipLink() {
  return (
    <a href="#main" className={styles.skipLink}>
      Skip to main content
    </a>
  );
}
