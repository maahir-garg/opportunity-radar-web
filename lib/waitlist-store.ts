// Storage provider layer for waitlist submissions. Nothing in this file
// prints a submission or an email address to the server console: callers may
// log the returned `StoreResult` (an outcome tag and a short reason string),
// never the `WaitlistSubmission` itself. The email provider below is the one
// deliberate exception to that rule in spirit rather than letter -- it
// transmits the submission to the site owner's own inbox, which is the whole
// point of configuring it, not a leak. See app/api/waitlist/route.ts and
// docs/BUILD-CONTRACT.md.
//
// Resolution order, first configured provider wins:
//   1. Email via Resend (RESEND_API_KEY + WAITLIST_NOTIFY_EMAIL) -- the
//      quickest way to "just get an email when someone signs up."
//   2. Upstash Redis / Vercel KV REST API (KV_REST_API_URL + KV_REST_API_TOKEN)
//   3. A generic webhook (WAITLIST_WEBHOOK_URL)
//   4. None configured -> not stored.
//
// No npm dependency is added for any of this: every provider is a plain
// HTTPS call made with the platform `fetch`.

import type { WaitlistSubmission } from './waitlist';
import { YEAR_OPTIONS } from './waitlist';

export type StoreResult = { stored: true; via: string } | { stored: false; reason: string };

const REQUEST_TIMEOUT_MS = 5000;
const SUBMISSIONS_KEY = 'waitlist:submissions';
const HANDLE_KEY_PREFIX = 'waitlist:handle:';

type UpstashResponse = { result?: unknown; error?: string };

/**
 * Calls one Upstash/Vercel KV REST "pipeline-free" command:
 * `POST {baseUrl}/{command}/{key}` with the remaining arguments (already
 * strings) as a JSON array body, per the Upstash REST API contract. Returns
 * `null` on any non-2xx response or transport failure so the caller can
 * treat it as a single failure case without inspecting HTTP internals.
 */
async function upstashCommand(
  baseUrl: string,
  token: string,
  command: string,
  key: string,
  args: string[]
): Promise<UpstashResponse | null> {
  const url = `${baseUrl.replace(/\/+$/, '')}/${command}/${encodeURIComponent(key)}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  if (!response.ok) {
    return null;
  }

  try {
    return (await response.json()) as UpstashResponse;
  } catch {
    return null;
  }
}

/**
 * Upstash Redis / Vercel KV REST provider. Reserves the handle first with
 * SETNX (so two submissions for the same handle can never both silently
 * "succeed") before RPUSHing the full submission onto the running list.
 */
async function storeViaKv(
  submission: WaitlistSubmission,
  baseUrl: string,
  token: string
): Promise<StoreResult> {
  try {
    const handleKey = `${HANDLE_KEY_PREFIX}${submission.handle}`;
    const claim = await upstashCommand(baseUrl, token, 'setnx', handleKey, [
      new Date().toISOString(),
    ]);

    if (claim === null) {
      return { stored: false, reason: 'kv-request-failed' };
    }
    if (claim.result === 0) {
      // The handle was already reserved by an earlier submission.
      return { stored: false, reason: 'handle-already-reserved' };
    }

    const push = await upstashCommand(baseUrl, token, 'rpush', SUBMISSIONS_KEY, [
      JSON.stringify(submission),
    ]);

    if (push === null) {
      return { stored: false, reason: 'kv-request-failed' };
    }

    return { stored: true, via: 'kv' };
  } catch {
    return { stored: false, reason: 'kv-request-failed' };
  }
}

function yearLabel(value: WaitlistSubmission['year']): string {
  return YEAR_OPTIONS.find((option) => option.value === value)?.label ?? value;
}

/** Plain-text body: one line per field, skipping anything the visitor left blank. */
function formatSubmissionEmail(submission: WaitlistSubmission): string {
  const lines = [
    `Handle: @${submission.handle}`,
    `Email: ${submission.email}`,
    `Year: ${yearLabel(submission.year)}`,
    `Faculty: ${submission.faculty}`,
    `Interests: ${submission.interests.join(', ')}`,
  ];

  if (submission.channel) {
    const detail = submission.channelOther ? ` (${submission.channelOther})` : '';
    lines.push(`Heard about Radar via: ${submission.channel}${detail}`);
  }

  if (submission.note) {
    lines.push(`What they miss out on: ${submission.note}`);
  }

  return lines.join('\n');
}

/**
 * Email provider via the Resend HTTPS API (https://resend.com). Without a
 * verified sending domain, Resend only accepts `onboarding@resend.dev` as the
 * sender and only delivers to the address the account was created with -- the
 * README explains this, so a misconfigured "to" address fails obviously in
 * testing rather than silently in production.
 */
async function storeViaEmail(
  submission: WaitlistSubmission,
  apiKey: string,
  toEmail: string,
  fromEmail: string
): Promise<StoreResult> {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject: `New Radar waitlist sign-up: @${submission.handle}`,
        text: formatSubmissionEmail(submission),
      }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    if (!response.ok) {
      return { stored: false, reason: 'email-request-failed' };
    }

    return { stored: true, via: 'email' };
  } catch {
    return { stored: false, reason: 'email-request-failed' };
  }
}

/** Generic webhook provider: POST the submission as JSON to an owner-configured URL. */
async function storeViaWebhook(submission: WaitlistSubmission, webhookUrl: string): Promise<StoreResult> {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submission),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    if (!response.ok) {
      return { stored: false, reason: 'webhook-request-failed' };
    }

    return { stored: true, via: 'webhook' };
  } catch {
    return { stored: false, reason: 'webhook-request-failed' };
  }
}

/**
 * Stores one waitlist submission through whichever provider is configured,
 * first match wins. Never throws: every branch resolves to a `StoreResult`
 * so the route can always answer with a clean HTTP response.
 */
export async function storeSubmission(submission: WaitlistSubmission): Promise<StoreResult> {
  const resendApiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.WAITLIST_NOTIFY_EMAIL;
  if (resendApiKey && notifyEmail) {
    const fromEmail = process.env.WAITLIST_FROM_EMAIL || 'Radar Waitlist <onboarding@resend.dev>';
    return storeViaEmail(submission, resendApiKey, notifyEmail, fromEmail);
  }

  const kvUrl = process.env.KV_REST_API_URL;
  const kvToken = process.env.KV_REST_API_TOKEN;
  if (kvUrl && kvToken) {
    return storeViaKv(submission, kvUrl, kvToken);
  }

  const webhookUrl = process.env.WAITLIST_WEBHOOK_URL;
  if (webhookUrl) {
    return storeViaWebhook(submission, webhookUrl);
  }

  return { stored: false, reason: 'not-configured' };
}
