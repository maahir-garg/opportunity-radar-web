'use client';

import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { TriangleAlert } from 'lucide-react';
import { Button } from '@/components/primitives/Button';
import { VisuallyHidden } from '@/components/primitives/VisuallyHidden';
import { categories } from '@/lib/data';
import type { CategoryId } from '@/lib/types';
import {
  CHANNEL_OPTIONS,
  CHANNEL_OTHER_MAX_LENGTH,
  FACULTY_OPTIONS,
  NOTE_MAX_LENGTH,
  YEAR_OPTIONS,
  validateWaitlist,
  type WaitlistSubmission,
} from '@/lib/waitlist';
import { Field } from './Field';
import { HandleField } from './HandleField';
import { InterestPicker } from './InterestPicker';
import { SuccessPanel } from './SuccessPanel';
import styles from './WaitlistForm.module.css';

type FormValues = {
  handle: string;
  email: string;
  year: string;
  faculty: string;
  interests: CategoryId[];
  channel: string;
  channelOther: string;
  note: string;
  consent: boolean;
};

const EMPTY_VALUES: FormValues = {
  handle: '',
  email: '',
  year: '',
  faculty: '',
  interests: [],
  channel: '',
  channelOther: '',
  note: '',
  consent: false,
};

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

const FIELD_ORDER = [
  'handle',
  'email',
  'year',
  'faculty',
  'interests',
  'channel',
  'channelOther',
  'note',
  'consent',
] as const;

type FieldKey = (typeof FIELD_ORDER)[number];

const SUBMIT_ERROR_MESSAGE =
  'Something went wrong sending your details. Your answers are still here, try again.';

/**
 * The waitlist sign-up form and its success state (contract §10). Renders
 * only the form itself: no section wrapper, heading or lead; the landing
 * page supplies those around this component.
 */
export function WaitlistForm() {
  const uid = useId();
  const fieldId = (key: string) => `${uid}-${key}`;
  const interestsFieldId = fieldId('interests');
  const firstInterestId = `${interestsFieldId}-${categories[0].id}`;
  const consentErrorId = `${fieldId('consent')}-error`;

  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [announcement, setAnnouncement] = useState('');
  const [submitted, setSubmitted] = useState<WaitlistSubmission | null>(null);

  const channelOtherInputRef = useRef<HTMLInputElement>(null);
  const showChannelOther = values.channel === 'Other';
  const [channelOtherOpen, setChannelOtherOpen] = useState(false);

  // Reveal the "Other" free-text field only while it is selected. The field
  // mounts closed (grid-template-rows: 0fr) and a rAF flips it open on the
  // next frame so the CSS transition actually animates instead of snapping,
  // then focus moves into it immediately so keyboard/screen-reader users
  // land on the newly revealed label without waiting for the animation.
  useEffect(() => {
    if (!showChannelOther) {
      // Reset for next time (the block is unmounted while hidden, so this
      // does not itself need to animate): scheduled rather than called
      // straight from the effect body, matching the open branch below.
      const raf = requestAnimationFrame(() => setChannelOtherOpen(false));
      return () => cancelAnimationFrame(raf);
    }
    channelOtherInputRef.current?.focus();
    const raf = requestAnimationFrame(() => setChannelOtherOpen(true));
    return () => cancelAnimationFrame(raf);
  }, [showChannelOther]);

  function setField<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((previous) => ({ ...previous, [key]: value }));
  }

  function fieldElementId(key: FieldKey): string {
    return key === 'interests' ? firstInterestId : fieldId(key);
  }

  function focusField(key: FieldKey) {
    document.getElementById(fieldElementId(key))?.focus();
  }

  async function runSubmit(current: FormValues) {
    const result = validateWaitlist({
      handle: current.handle,
      email: current.email,
      year: current.year,
      faculty: current.faculty,
      interests: current.interests,
      channel: current.channel || undefined,
      channelOther: current.channelOther || undefined,
      note: current.note || undefined,
      consent: current.consent,
    });

    if (!result.ok) {
      setErrors(result.errors);
      setStatus('idle');
      setAnnouncement('There is a problem with your submission. Check the list above the form.');
      return;
    }

    setErrors({});
    setStatus('submitting');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.value),
      });

      let data: unknown = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      const parsed = data as { ok?: boolean; errors?: Record<string, string>; handle?: string } | null;

      if (!response.ok || !parsed || parsed.ok !== true) {
        if (parsed?.errors) {
          setErrors(parsed.errors);
          setStatus('idle');
          setAnnouncement('There is a problem with your submission. Check the list above the form.');
          return;
        }
        setStatus('error');
        setAnnouncement(SUBMIT_ERROR_MESSAGE);
        return;
      }

      setSubmitted(result.value);
      setStatus('success');
      setAnnouncement(`You're on the list, @${parsed.handle ?? result.value.handle}.`);
    } catch {
      setStatus('error');
      setAnnouncement(SUBMIT_ERROR_MESSAGE);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void runSubmit(values);
  }

  function handleRetry() {
    void runSubmit(values);
  }

  function handleReset() {
    setValues(EMPTY_VALUES);
    setErrors({});
    setSubmitted(null);
    setStatus('idle');
    setAnnouncement('');
    const targetId = fieldId('handle');
    requestAnimationFrame(() => {
      document.getElementById(targetId)?.focus();
    });
  }

  const errorKeys = FIELD_ORDER.filter((key) => errors[key]);
  const liveRegion = (
    <div aria-live="polite" role="status">
      <VisuallyHidden>{announcement}</VisuallyHidden>
    </div>
  );

  if (status === 'success' && submitted) {
    return (
      <div className={styles.card}>
        {liveRegion}
        <SuccessPanel
          handle={submitted.handle}
          year={submitted.year}
          faculty={submitted.faculty}
          interests={submitted.interests}
          onReset={handleReset}
        />
      </div>
    );
  }

  return (
    <div className={styles.card}>
      {liveRegion}

      {errorKeys.length > 0 ? (
        <div className={styles.summary} role="alert">
          <p className={`type-label ${styles.summaryTitle}`}>
            <TriangleAlert size={16} aria-hidden="true" className={styles.summaryIcon} />
            {errorKeys.length === 1
              ? 'Fix this before we can add you to the list'
              : 'Fix these before we can add you to the list'}
          </p>
          <ul className={styles.summaryList}>
            {errorKeys.map((key) => (
              <li key={key}>
                <a
                  href={`#${fieldElementId(key)}`}
                  className={styles.summaryLink}
                  onClick={(event) => {
                    event.preventDefault();
                    focusField(key);
                  }}
                >
                  {errors[key]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <HandleField
          id={fieldId('handle')}
          value={values.handle}
          onChange={(value) => setField('handle', value)}
          error={errors.handle}
        />

        <Field
          id={fieldId('email')}
          label="Email"
          required
          help="Any email works. We only write to you about the pilot."
          error={errors.email}
        >
          {(fieldProps) => (
            <input
              {...fieldProps}
              type="email"
              name="email"
              autoComplete="email"
              className={styles.control}
              data-invalid={errors.email ? 'true' : undefined}
              value={values.email}
              onChange={(event) => setField('email', event.target.value)}
            />
          )}
        </Field>

        <div className={styles.row}>
          <Field id={fieldId('year')} label="Year" required error={errors.year}>
            {(fieldProps) => (
              <select
                {...fieldProps}
                name="year"
                className={styles.control}
                data-invalid={errors.year ? 'true' : undefined}
                value={values.year}
                onChange={(event) => setField('year', event.target.value)}
              >
                <option value="" disabled>
                  Select your year
                </option>
                {YEAR_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          </Field>

          <Field id={fieldId('faculty')} label="Faculty" required error={errors.faculty}>
            {(fieldProps) => (
              <select
                {...fieldProps}
                name="faculty"
                className={styles.control}
                data-invalid={errors.faculty ? 'true' : undefined}
                value={values.faculty}
                onChange={(event) => setField('faculty', event.target.value)}
              >
                <option value="" disabled>
                  Select your faculty
                </option>
                {FACULTY_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
          </Field>
        </div>

        <InterestPicker
          id={interestsFieldId}
          selected={values.interests}
          onChange={(next) => setField('interests', next)}
          error={errors.interests}
        />

        <Field
          id={fieldId('channel')}
          label="How did you hear about Radar?"
          help="Optional: this tells us which channels are working."
          error={errors.channel}
        >
          {(fieldProps) => (
            <select
              {...fieldProps}
              name="channel"
              className={styles.control}
              value={values.channel}
              onChange={(event) => setField('channel', event.target.value)}
            >
              <option value="">Prefer not to say</option>
              {CHANNEL_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
        </Field>

        {showChannelOther ? (
          <div className={styles.channelOtherReveal} data-open={channelOtherOpen ? 'true' : undefined}>
            <div className={styles.channelOtherRevealInner}>
              <Field
                id={fieldId('channelOther')}
                label="Where did you hear about it?"
                help={`Optional, up to ${CHANNEL_OTHER_MAX_LENGTH} characters.`}
                error={errors.channelOther}
              >
                {(fieldProps) => (
                  <input
                    {...fieldProps}
                    ref={channelOtherInputRef}
                    type="text"
                    name="channelOther"
                    maxLength={CHANNEL_OTHER_MAX_LENGTH}
                    className={styles.control}
                    data-invalid={errors.channelOther ? 'true' : undefined}
                    value={values.channelOther}
                    onChange={(event) => setField('channelOther', event.target.value)}
                  />
                )}
              </Field>
            </div>
          </div>
        ) : null}

        <Field
          id={fieldId('note')}
          label="What do you miss out on most right now?"
          error={errors.note}
          hint={
            <span className={`type-small ${styles.counter} tabular`}>
              {values.note.length}/{NOTE_MAX_LENGTH}
            </span>
          }
        >
          {(fieldProps) => (
            <textarea
              {...fieldProps}
              name="note"
              rows={3}
              maxLength={NOTE_MAX_LENGTH}
              className={`${styles.control} ${styles.textarea}`}
              value={values.note}
              onChange={(event) => setField('note', event.target.value)}
            />
          )}
        </Field>

        <div className={styles.consentRow}>
          <input
            id={fieldId('consent')}
            name="consent"
            type="checkbox"
            className={styles.consentCheckbox}
            checked={values.consent}
            onChange={(event) => setField('consent', event.target.checked)}
            aria-describedby={errors.consent ? consentErrorId : undefined}
            aria-invalid={errors.consent ? true : undefined}
          />
          <label htmlFor={fieldId('consent')} className="type-body">
            I&apos;m happy to be contacted about the Radar pilot.
          </label>
        </div>
        {errors.consent ? (
          <p id={consentErrorId} className={`type-small ${styles.error}`}>
            <TriangleAlert size={14} aria-hidden="true" className={styles.errorIcon} />
            {errors.consent}
          </p>
        ) : null}

        {status === 'error' ? (
          <div className={styles.errorBanner} role="alert">
            <p className="type-small">{SUBMIT_ERROR_MESSAGE}</p>
            <Button type="button" variant="secondary" onClick={handleRetry}>
              Try again
            </Button>
          </div>
        ) : null}

        <div className={styles.submitRow}>
          <Button
            type="submit"
            variant="primary"
            size="large"
            className={styles.submit}
            loading={status === 'submitting'}
          >
            {status === 'submitting' ? 'Reserving your spot…' : 'Reserve your spot'}
          </Button>
        </div>
      </form>
    </div>
  );
}
