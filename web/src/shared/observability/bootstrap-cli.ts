import type { HealthPayload } from './health-response.types';

function printLine(ok: boolean, title: string, detail?: string) {
  const mark = ok ? '✔' : '✖';
  console.log(`${mark} [${title}]`, detail ?? '');
}

function printServiceResults(payload: HealthPayload) {
  for (const [id, service] of Object.entries(payload.services)) {
    const ok = service.healthy;
    printLine(ok, id, service.status);

    for (const [checkName, check] of Object.entries(service.checks)) {
      const checkOk = check.status === 'ok' || check.status === 'unknown';
      printLine(
        checkOk,
        `  ${checkName}`,
        check.message ?? check.status,
      );
    }
  }
}

export function printBootstrapResults(payload: HealthPayload): boolean {
  console.info('\n[bootstrap] observability checks\n');
  printLine(payload.summary.criticalFailures === 0, 'summary', payload.status);
  printServiceResults(payload);
  console.info('');

  return payload.summary.criticalFailures === 0;
}

export function printBootstrapSkipMessage() {
  console.info('\n[bootstrap] BOOTSTRAP_SKIP_CONNECTIVITY is active — skipping strict checks.');
  console.info('            Copy .env.example → .env and run: pnpm run bootstrap\n');
}
