// This sign-up form does not need to persist data, so this route
// deliberately does not. It validates the payload with the same
// lib/waitlist.ts logic the client uses, keeps a module-scope array purely
// so a single running server instance can answer "how many did we accept"
// while it's warm, and never writes that array anywhere durable. It resets
// on every deploy / cold start / restart, and this comment is the only
// place its non-persistence is asserted: do not wire it to a database.

import { validateWaitlist, type WaitlistSubmission } from '@/lib/waitlist';

// Non-persistent, in-memory only. Never logged, never written to disk.
// Resets whenever this server process restarts or redeploys.
const acceptedSubmissions: WaitlistSubmission[] = [];

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

  // Store the submission in memory only. Never log the raw email address.
  acceptedSubmissions.push(result.value);

  return Response.json(
    {
      ok: true,
      message: `You're on the list, @${result.value.handle}.`,
      handle: result.value.handle,
    },
    { status: 200 }
  );
}

export async function GET() {
  return Response.json(
    { ok: false, errors: { form: 'This endpoint only accepts POST requests.' } },
    { status: 405, headers: { Allow: 'POST' } }
  );
}
