import styles from './ProseSection.module.css';

export type ProseSectionProps = {
  heading: string;
  paragraphs: string[];
  list?: string[];
  id?: string;
  headingLevel?: 'h2' | 'h3';
  className?: string;
};

/**
 * A reusable long-form text block: a heading, spaced paragraphs, and an
 * optional bulleted list. Used to give prose (e.g. /privacy) proper reading
 * rhythm without a bespoke module per section.
 */
export function ProseSection({
  heading,
  paragraphs,
  list,
  id,
  headingLevel = 'h2',
  className,
}: ProseSectionProps) {
  const classNames = [styles.prose, className ?? ''].filter(Boolean).join(' ');
  const Heading = headingLevel;
  const headingTypeClass = headingLevel === 'h2' ? 'type-h2' : 'type-h3';

  return (
    <div className={classNames} id={id}>
      <Heading className={`${headingTypeClass} ${styles.heading}`}>{heading}</Heading>
      {paragraphs.map((paragraph, index) => (
        <p className={`type-body ${styles.paragraph}`} key={index}>
          {paragraph}
        </p>
      ))}
      {list && list.length > 0 ? (
        <ul className={styles.list}>
          {list.map((item, index) => (
            <li className={`type-body ${styles.listItem}`} key={index}>
              {item}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
