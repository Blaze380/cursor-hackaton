import { NextResponse } from 'next/server';
import { runHealthChecks } from '@/shared/observability';

function isAuthorized(request: Request): boolean {
  const expected = process.env.SERVICE_ACCESS_TOKEN ?? '';
  const header = request.headers.get('authorization') ?? '';
  const match = /^Bearer\s+(.+)$/i.exec(header);

  if (!expected.trim()) {
    return false;
  }

  return Boolean(match?.[1] && match[1] === expected);
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { message: 'Missing or invalid Bearer token.' },
      { status: 401 },
    );
  }

  const payload = await runHealthChecks();
  return NextResponse.json(payload);
}
