// Shared waitlist types, option lists and validation. Imported by BOTH
// components/waitlist/WaitlistForm.tsx (client) and app/api/waitlist/route.ts
// (server) so the two can never disagree about what is a valid submission.
// See docs/BUILD-CONTRACT.md §10.

import { categories } from './data';
import type { CategoryId } from './types';
import {
  HANDLE_MAX_LENGTH,
  HANDLE_MIN_LENGTH,
  isHandleReserved,
  isValidHandleFormat,
} from './handles';

export const MIN_INTERESTS = 1;
export const MAX_INTERESTS = 3;
export const NOTE_MAX_LENGTH = 300;
export const CHANNEL_OTHER_MAX_LENGTH = 80;

export const YEAR_OPTIONS = [
  { value: 'year-1', label: 'Year 1' },
  { value: 'year-2', label: 'Year 2' },
  { value: 'year-3', label: 'Year 3' },
  { value: 'year-4', label: 'Year 4' },
  { value: 'year-5-plus', label: 'Year 5+' },
  { value: 'graduate', label: 'Graduate student' },
  { value: 'alumni', label: 'Alumni' },
  { value: 'staff', label: 'Staff' },
] as const;

export type YearValue = (typeof YEAR_OPTIONS)[number]['value'];

export const FACULTY_OPTIONS = [
  'Computing',
  'Business',
  'Science',
  'Engineering',
  'Design and Engineering',
  'Arts and Social Sciences',
  'Law',
  'Medicine',
  'Dentistry',
  'Nursing',
  'Music',
  'College of Humanities and Sciences',
  'NUS College',
  'Other',
] as const;

export type FacultyOption = (typeof FACULTY_OPTIONS)[number];

export const CHANNEL_OPTIONS = [
  'Telegram',
  'Instagram or TikTok',
  'A friend',
  'A poster on campus',
  'A student society',
  'Other',
] as const;

export type ChannelOption = (typeof CHANNEL_OPTIONS)[number];

const CATEGORY_IDS: readonly CategoryId[] = categories.map((category) => category.id);

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type WaitlistSubmission = {
  handle: string;
  email: string;
  year: YearValue;
  faculty: FacultyOption;
  interests: CategoryId[];
  channel?: ChannelOption;
  channelOther?: string;
  note?: string;
  consent: true;
};

export type WaitlistValidationResult =
  | { ok: true; value: WaitlistSubmission }
  | { ok: false; errors: Record<string, string> };

function isYearValue(value: string): value is YearValue {
  return YEAR_OPTIONS.some((option) => option.value === value);
}

function isFacultyOption(value: string): value is FacultyOption {
  return (FACULTY_OPTIONS as readonly string[]).includes(value);
}

function isChannelOption(value: string): value is ChannelOption {
  return (CHANNEL_OPTIONS as readonly string[]).includes(value);
}

/**
 * Pure validation shared by the client form and the API route. Accepts
 * `unknown` because it is the first thing to touch a parsed JSON body (or a
 * plain object built from form state). Nothing here is assumed to already
 * be well-shaped.
 */
export function validateWaitlist(input: unknown): WaitlistValidationResult {
  const errors: Record<string, string> = {};

  if (typeof input !== 'object' || input === null) {
    return { ok: false, errors: { form: 'We could not read your submission. Please try again.' } };
  }

  const data = input as Record<string, unknown>;

  // Handle: the client always sends an already-normalised string (see
  // lib/handles.ts normalizeHandle), so we validate the shape rather than
  // silently rewriting whatever was sent.
  const handle = typeof data.handle === 'string' ? data.handle : '';
  if (!handle) {
    errors.handle = 'Choose a handle so we know what to call you.';
  } else if (!isValidHandleFormat(handle)) {
    errors.handle = `Handles are ${HANDLE_MIN_LENGTH}-${HANDLE_MAX_LENGTH} characters: lowercase letters, numbers and underscores only.`;
  } else if (isHandleReserved(handle)) {
    errors.handle = 'This handle is already reserved. Try another.';
  }

  // Email: shape only. Never reject a non-NUS domain.
  const email = typeof data.email === 'string' ? data.email.trim() : '';
  if (!email) {
    errors.email = 'Enter an email address so we can reach you.';
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Enter a valid email address, like you@example.com.';
  }

  // Year
  const year = typeof data.year === 'string' ? data.year : '';
  if (!isYearValue(year)) {
    errors.year = 'Select your year so we know who you are.';
  }

  // Faculty
  const faculty = typeof data.faculty === 'string' ? data.faculty : '';
  if (!isFacultyOption(faculty)) {
    errors.faculty = 'Select your faculty.';
  }

  // Interests: 1 to 3 of the canonical categories.
  const interestsRaw = Array.isArray(data.interests) ? data.interests : [];
  const interests = interestsRaw.filter(
    (candidate): candidate is CategoryId =>
      typeof candidate === 'string' && CATEGORY_IDS.includes(candidate as CategoryId)
  );
  if (interests.length === 0) {
    errors.interests = 'Pick at least one interest so we can show you relevant matches.';
  } else if (interests.length > MAX_INTERESTS) {
    errors.interests = `Pick up to ${MAX_INTERESTS}. Deselect one to change your choice.`;
  }

  // Channel: optional.
  const channelRaw = typeof data.channel === 'string' ? data.channel : '';
  let channel: ChannelOption | undefined;
  if (channelRaw) {
    if (isChannelOption(channelRaw)) {
      channel = channelRaw;
    } else {
      errors.channel = 'Select an option from the list, or leave this blank.';
    }
  }

  // Channel "Other": free text, only meaningful when channel is literally
  // 'Other'. Trimmed and capped; ignored entirely (never validated, never
  // carried through) for every other channel value, including when the
  // client sends a stray leftover value from a previous selection.
  const channelOtherRaw = typeof data.channelOther === 'string' ? data.channelOther.trim() : '';
  let channelOther: string | undefined;
  if (channel === 'Other') {
    if (channelOtherRaw.length > CHANNEL_OTHER_MAX_LENGTH) {
      errors.channelOther = `Keep this to ${CHANNEL_OTHER_MAX_LENGTH} characters or fewer.`;
    } else if (channelOtherRaw) {
      channelOther = channelOtherRaw;
    }
  }

  // Note: optional, capped length.
  const noteRaw = typeof data.note === 'string' ? data.note : '';
  if (noteRaw.length > NOTE_MAX_LENGTH) {
    errors.note = `Keep this to ${NOTE_MAX_LENGTH} characters or fewer.`;
  }
  const note = noteRaw.trim() ? noteRaw.trim() : undefined;

  // Consent: required.
  const consent = data.consent === true;
  if (!consent) {
    errors.consent = "Check the box to say we can contact you about the pilot.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    value: {
      handle,
      email,
      year: year as YearValue,
      faculty: faculty as FacultyOption,
      interests,
      channel,
      channelOther,
      note,
      consent: true,
    },
  };
}
