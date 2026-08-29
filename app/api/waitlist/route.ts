// Validates the payload with the same lib/waitlist.ts logic the client uses,
// then hands a valid submission to the storage provider layer in
// lib/waitlist-store.ts (Upstash Redis / Vercel KV REST, or a generic
// webhook; see that file and .env.example). Nothing is ever persisted
// in-process: this route has no module-scope state and is safe to run on
// any number of serverless instances.
//
// Never log a raw email address, or the submission object at all. Only
// counts and outcome tags (stored / not-stored + a short machine reason)
// may be logged.

import { validateWaitlist, type WaitlistSubmission } from '@/lib/waitlist';
import { storeSubmission, type StoreResult } from '@/lib/waitlist-store';

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      {
        ok: false,
        errors: { form: 'We could not read that submission. Please try again.' },
      },
      { status: 400 }
    );
  }

  const result = validateWaitlist(body);

  if (!result.ok) {
    return Response.json({ ok: false, errors: result.errors }, { status: 400 });
  }

  const storeResult = await runStoreSubmission(result.value);

  if (storeResult.stored) {
    console.log(`[waitlist] stored 1 submission via ${storeResult.via}`);
    return Response.json(
      {
        ok: true,
        message: `You're on the list, @${result.value.handle}.`,
        handle: result.value.handle,
      },
      { status: 200 }
    );
  }

  if (process.env.NODE_ENV === 'production') {
    console.error(
      `[waitlist] submission rejected: not stored (${storeResult.reason}). Configure KV_REST_API_URL + KV_REST_API_TOKEN (Vercel KV / Upstash Redis integration) or WAITLIST_WEBHOOK_URL so sign-ups are recorded. See .env.example.`
    );
    return Response.json(
      {
        ok: false,
        errors: { form: 'We cannot take sign-ups at the moment. Please try again later.' },
      },
      { status: 503 }
    );
  }

  console.warn(
    `[waitlist] not persisted in development (${storeResult.reason}); returning success so local development still works. See .env.example.`
  );
  return Response.json(
    {
      ok: true,
      message: `You're on the list, @${result.value.handle}.`,
      handle: result.value.handle,
      stored: false,
    },
    { status: 200 }
  );
}

/** Never let a thrown storage error turn into a 500: treat it as not stored. */
async function runStoreSubmission(submission: WaitlistSubmission): Promise<StoreResult> {
  try {
    return await storeSubmission(submission);
  } catch {
    return { stored: false, reason: 'store-threw' };
  }
}

export async function GET() {
  return Response.json(
    { ok: false, errors: { form: 'This endpoint only accepts POST requests.' } },
    { status: 405, headers: { Allow: 'POST' } }
  );
}
