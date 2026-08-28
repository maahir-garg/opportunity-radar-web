import styles from './Disclaimer.module.css';

export type DisclaimerProps = {
  className?: string;
};

/** Renders the exact required brand-safety line. Do not alter the copy. */
export function Disclaimer({ className }: DisclaimerProps) {
  const classNames = [styles.disclaimer, className ?? ''].filter(Boolean).join(' ');

  return <p className={classNames}>Student-built for NUS students. Not an official NUS service.</p>;
}
