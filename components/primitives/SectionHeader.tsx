import styles from './SectionHeader.module.css';

export type SectionHeaderProps = {
  overline?: string;
  title: string;
  lead?: string;
  align?: 'start' | 'center';
  className?: string;
};

export function SectionHeader({
  overline,
  title,
  lead,
  align = 'start',
  className,
}: SectionHeaderProps) {
  const classNames = [
    styles.header,
    align === 'center' ? styles.center : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames}>
      {overline ? <p className={`type-caption ${styles.overline}`}>{overline}</p> : null}
      <h2 className="type-h2">{title}</h2>
      {lead ? <p className={`type-body-large ${styles.lead}`}>{lead}</p> : null}
    </div>
  );
}
