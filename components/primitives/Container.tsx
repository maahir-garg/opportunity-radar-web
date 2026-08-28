import type { ReactNode } from 'react';
import styles from './Container.module.css';

export type ContainerProps = {
  size?: 'landing' | 'text';
  children: ReactNode;
  className?: string;
};

export function Container({ size = 'landing', children, className }: ContainerProps) {
  const sizeClass = size === 'text' ? styles.text : styles.landing;
  const classNames = [styles.container, sizeClass, className ?? ''].filter(Boolean).join(' ');

  return <div className={classNames}>{children}</div>;
}
