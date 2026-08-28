'use client';

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { handleHashClick } from '@/lib/hash-navigation';

export type AnchorLinkProps = {
  href: string;
  children: ReactNode;
  onNavigate?: () => void;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'children'>;

/** A Link that actually scrolls when its href carries a fragment. */
export function AnchorLink({ href, children, onNavigate, onClick, ...rest }: AnchorLinkProps) {
  const pathname = usePathname();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    handleHashClick(event, href, pathname);
    onNavigate?.();
  }

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
