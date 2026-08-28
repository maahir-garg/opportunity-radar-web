'use client';

import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  MouseEvent,
  ReactNode,
} from 'react';
import Link from 'next/link';
import { VisuallyHidden } from './VisuallyHidden';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
type ButtonSize = 'default' | 'large' | 'compact';

type SharedButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
};

const SHARED_KEYS = [
  'variant',
  'size',
  'iconLeft',
  'iconRight',
  'fullWidth',
  'loading',
  'disabled',
  'children',
  'className',
] as const;

function omitSharedProps<T extends Record<string, unknown>, K extends readonly string[] = []>(
  props: T,
  extraKeys: K = [] as unknown as K
): Omit<T, (typeof SHARED_KEYS)[number] | K[number]> {
  const rest: Record<string, unknown> = { ...props };
  for (const key of SHARED_KEYS) delete rest[key];
  for (const key of extraKeys) delete rest[key];
  return rest as Omit<T, (typeof SHARED_KEYS)[number] | K[number]>;
}

type ButtonAsButton = SharedButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof SharedButtonProps> & {
    href?: undefined;
    external?: undefined;
  };

type ButtonAsAnchor = SharedButtonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof SharedButtonProps | 'href'> & {
    href: string;
    external?: boolean;
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const SIZE_CLASS: Record<ButtonSize, string> = {
  default: '',
  large: styles.large,
  compact: styles.compact,
};

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
  tertiary: styles.tertiary,
};

function isExternalHref(href: string): boolean {
  return /^https?:\/\//.test(href) || href.startsWith('mailto:');
}

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'default',
    iconLeft,
    iconRight,
    fullWidth,
    loading,
    disabled,
    children,
    className,
  } = props;

  const classNames = [
    styles.button,
    VARIANT_CLASS[variant],
    SIZE_CLASS[size],
    fullWidth ? styles.fullWidth : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {iconLeft ? (
        <span className={styles.icon} aria-hidden="true">
          {iconLeft}
        </span>
      ) : null}
      {loading ? <span className={styles.spinner} aria-hidden="true" /> : null}
      <span>{children}</span>
      {iconRight ? (
        <span className={styles.icon} aria-hidden="true">
          {iconRight}
        </span>
      ) : null}
    </>
  );

  if (typeof props.href === 'string') {
    const anchorProps = props as ButtonAsAnchor;
    const { href, external, onClick } = anchorProps;
    const anchorRest = omitSharedProps(anchorProps, ['href', 'external'] as const);
    const isExternal = external ?? isExternalHref(href);
    const isDisabled = Boolean(disabled);

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
      if (isDisabled) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    };

    if (isExternal) {
      return (
        <a
          {...anchorRest}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classNames}
          aria-disabled={isDisabled || undefined}
          tabIndex={isDisabled ? -1 : undefined}
          onClick={handleClick}
        >
          {content}
          <VisuallyHidden> (opens in a new tab)</VisuallyHidden>
        </a>
      );
    }

    return (
      <Link
        {...anchorRest}
        href={href}
        className={classNames}
        aria-disabled={isDisabled || undefined}
        tabIndex={isDisabled ? -1 : undefined}
        onClick={handleClick}
      >
        {content}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  const buttonRest = omitSharedProps(buttonProps);

  return (
    <button
      {...buttonRest}
      type={buttonRest.type ?? 'button'}
      className={classNames}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
    >
      {content}
    </button>
  );
}
