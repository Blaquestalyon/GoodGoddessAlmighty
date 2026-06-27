import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

interface Payload {
  name?: string;
  email?: string;
  company?: string;
  service?: string;
  timeline?: string;
  budget?: string;
  message?: string;
  honeypot?: string;
}

function isValid(p: Payload): { ok: true } | { ok: false; error: string } {
  if (!p.name || p.name.trim().length < 2) return { ok: false, error: 'Name is required.' };
  if (!p.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) {
    return { ok: false, error: 'A valid email is required.' };
  }
  if (!p.message || p.message.trim().length < 10) {
    return { ok: false, error: 'Please include a few sentences about your project.' };
  }
  if (p.honeypot && p.honeypot.length > 0) {
    return { ok: false, error: 'Submission blocked.' };
  }
  return { ok: true };
}

/**
 * Contact form handler.
 *
 * Until an email provider is configured (see .env.example), this endpoint
 * validates input, logs the submission server-side, and returns 200. Replace
 * the `// TODO email delivery` block with a Resend / SMTP / SES call before launch.
 */
export async function POST(request: Request) {
  let payload: Payload;
  try {
    payload = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const valid = isValid(payload);
  if (!valid.ok) {
    return NextResponse.json({ error: valid.error }, { status: 400 });
  }

  // ----- TODO email delivery -----
  // Option A — Resend:
  //   if (process.env.RESEND_API_KEY) {
  //     const { Resend } = await import('resend');
  //     const resend = new Resend(process.env.RESEND_API_KEY);
  //     await resend.emails.send({
  //       from: process.env.CONTACT_FROM_EMAIL!,
  //       to: process.env.CONTACT_TO_EMAIL!,
  //       subject: `New inquiry from ${payload.name}`,
  //       reply_to: payload.email!,
  //       text: formatBody(payload),
  //     });
  //   }
  //
  // Option B — SMTP via nodemailer (install `nodemailer` first).
  // ---------------------------------

  // Until then, log to the server so submissions aren't lost during the build.
  // Railway captures stdout — visible in the deployment logs.
  console.log('[contact] new inquiry', {
    name: payload.name,
    email: payload.email,
    company: payload.company,
    service: payload.service,
    timeline: payload.timeline,
    budget: payload.budget,
    message: payload.message,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
