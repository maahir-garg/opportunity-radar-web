/**
 * Next's App Router treats `/#section` as a route change and does not act on
 * the fragment, so a hash link updates the URL and leaves the page where it
 * was. These helpers restore the behaviour a browser would give us natively.
 *
 * DOM-only: import from client components.
 */

import type { MouseEvent } from 'react';

export function splitHref(href: string): { path: string; hash: string } {
  const index = href.indexOf('#');
  if (index === -1) return { path: href, hash: '' };
  return { path: href.slice(0, index), hash: href.slice(index + 1) };
}

function normalisePath(path: string): string {
  return path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
}

/** An empty path (`#waitlist`) means "this page". */
export function isSamePath(path: string, pathname: string): boolean {
  if (path === '') return true;
  return normalisePath(path) === normalisePath(pathname);
}

/**
 * Scroll a section into view and take focus with it, so keyboard users carry
 * on from the place the link pointed at rather than the top of the document.
 * Smooth vs instant is left to the `scroll-behavior` in globals.css, which is
 * already guarded by prefers-reduced-motion.
 */
export function scrollToId(id: string): boolean {
  const element = document.getElementById(id);
  if (!element) return false;

  // Scroll the viewport explicitly rather than calling scrollIntoView, which
  // does nothing when an ancestor clips overflow. scroll-margin-top is read
  // from the element so the sticky header never covers the heading.
  const marginTop = Number.parseFloat(getComputedStyle(element).scrollMarginTop) || 0;
  const top = element.getBoundingClientRect().top + window.scrollY - marginTop;
  window.scrollTo({ top: Math.max(top, 0) });

  if (!element.hasAttribute('tabindex')) element.setAttribute('tabindex', '-1');
  element.focus({ preventScroll: true });
  return true;
}

/**
 * Click handler for an in-page hash link. Cross-page links fall through to the
 * router untouched; HashScroll picks the fragment up once the new page mounts.
 */
export function handleHashClick(
  event: MouseEvent<HTMLAnchorElement>,
  href: string,
  pathname: string
): void {
  // Leave modified clicks alone so "open in new tab" still works.
  if (event.defaultPrevented) return;
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

  const { path, hash } = splitHref(href);
  if (!hash || !isSamePath(path, pathname)) return;
  if (!scrollToId(decodeURIComponent(hash))) return;

  event.preventDefault();
  window.history.pushState(null, '', href);
}
