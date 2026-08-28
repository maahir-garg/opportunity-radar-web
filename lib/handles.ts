// Deterministic, local-only handle rules for the waitlist "claim your handle"
// hook. See docs/BUILD-CONTRACT.md §10. Nothing here calls a server. The
// same reserved list is used to render the live availability hint on the
// client and to re-validate the submission in app/api/waitlist/route.ts, so
// the two can never disagree.

export const HANDLE_MIN_LENGTH = 3;
export const HANDLE_MAX_LENGTH = 20;

/** Small hard-coded reserved list: a pilot-scale placeholder, not a directory lookup. */
export const RESERVED_HANDLES = [
  'admin',
  'radar',
  'nus',
  'support',
  'help',
  'hello',
  'avery',
  'test',
  'root',
  'official',
  'staff',
  'team',
] as const;

const HANDLE_PATTERN = /^[a-z0-9_]+$/;

/**
 * Normalises free-typed text into the handle alphabet as the user types:
 * lowercase, `a-z 0-9 _` only, capped at the max length. Used for the
 * client-side input only. The API route validates the raw string instead of
 * silently rewriting it (see lib/waitlist.ts).
 */
export function normalizeHandle(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, '')
    .slice(0, HANDLE_MAX_LENGTH);
}

/** 3–20 chars, lowercase letters, digits and underscores only. */
export function isValidHandleFormat(handle: string): boolean {
  return (
    handle.length >= HANDLE_MIN_LENGTH &&
    handle.length <= HANDLE_MAX_LENGTH &&
    HANDLE_PATTERN.test(handle)
  );
}

export function isHandleReserved(handle: string): boolean {
  return (RESERVED_HANDLES as readonly string[]).includes(handle);
}

export type HandleAvailability = 'available' | 'taken';

/** Deterministic local availability check: reserved list only, no persistence. */
export function checkHandleAvailability(handle: string): HandleAvailability {
  return isHandleReserved(handle) ? 'taken' : 'available';
}
