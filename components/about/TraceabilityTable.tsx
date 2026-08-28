import type { TraceabilityRow } from '@/lib/content/about';
import styles from './TraceabilityTable.module.css';

export type TraceabilityTableProps = {
  rows: TraceabilityRow[];
};

/**
 * Goal -> feature -> surface -> observable-outcome traceability table.
 * Wrapped in a scrollable region so it never forces horizontal page scroll
 * at narrow widths, per docs/BUILD-CONTRACT.md §3.
 */
export function TraceabilityTable({ rows }: TraceabilityTableProps) {
  return (
    <div
      className={styles.scroller}
      tabIndex={0}
      role="region"
      aria-label="Requirement traceability: goal, features, surfaces and observable outcome"
    >
      <table className={styles.table}>
        <caption className={`type-small ${styles.caption}`}>
          How each product goal maps to supporting features, the surfaces that carry them, and what
          we would look for while observing a student use the prototype.
        </caption>
        <thead>
          <tr>
            <th scope="col">Goal</th>
            <th scope="col">Features</th>
            <th scope="col">Main surfaces</th>
            <th scope="col">What we would observe</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.goal}>
              <th scope="row">{row.goal}</th>
              <td>{row.features}</td>
              <td>{row.surfaces}</td>
              <td>{row.observe}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
