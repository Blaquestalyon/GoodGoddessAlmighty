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
 * Contact form handler — writes submissions to Airtable.
 *
 * Required env vars (set in Railway):
 *   AIRTABLE_TOKEN       — Personal access token with data.records:write
 *   AIRTABLE_BASE_ID     — appXXXXXXXXXXXXXX
 *   AIRTABLE_TABLE_NAME  — e.g. "GGA-Contacts"
 *
 * Expected columns in the table (exact, case-sensitive):
 *   Name, Email, Company, Service, Timeline, Budget, Message, ReceivedAt
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

  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME;

  if (!token || !baseId || !tableName) {
    console.error('[contact] Airtable env vars missing', {
      hasToken: Boolean(token),
      hasBaseId: Boolean(baseId),
      hasTableName: Boolean(tableName),
    });
    // Don't leak which var is missing to the client; just fail soft.
    return NextResponse.json(
      { error: 'The contact form is temporarily unavailable. Please email us directly.' },
      { status: 503 },
    );
  }

  const receivedAt = new Date().toISOString();
  const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;

  const body = {
    records: [
      {
        fields: {
          Name: payload.name!.trim(),
          Email: payload.email!.trim(),
          Company: payload.company?.trim() || '',
          Service: payload.service?.trim() || '',
          Timeline: payload.timeline?.trim() || '',
          Budget: payload.budget?.trim() || '',
          Message: payload.message!.trim(),
          ReceivedAt: receivedAt,
        },
      },
    ],
    typecast: true,
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      console.error('[contact] Airtable error', {
        status: res.status,
        statusText: res.statusText,
        body: errText.slice(0, 500),
      });
      return NextResponse.json(
        { error: 'We could not save your message. Please try again in a moment.' },
        { status: 502 },
      );
    }

    console.log('[contact] saved to Airtable', {
      name: payload.name,
      email: payload.email,
      receivedAt,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] Airtable request failed', err);
    return NextResponse.json(
      { error: 'We could not save your message. Please try again in a moment.' },
      { status: 502 },
    );
  }
}
