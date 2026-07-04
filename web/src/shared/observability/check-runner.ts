import type {
  CheckContext,
  IntegrationCheck,
} from './check.types';
import {
  hasCheckError,
  isCheckHealthy,
  mergeCheckResults,
} from './check.types';
import type {
  DependencyStatus,
  HealthGlobalStatus,
  HealthPayload,
  ServiceHealthBlock,
} from './health-response.types';
import { integrationChecks } from './checks.registry';

const DEFAULT_CHECK_TIMEOUT_MS = 3_000;
const startedAtMs = Date.now();

export interface RunChecksOptions {
  skipConnectivity?: boolean;
  checkTimeoutMs?: number;
  checks?: IntegrationCheck[];
}

function dedupeChecks(checks: IntegrationCheck[]): IntegrationCheck[] {
  const seen = new Set<string>();
  const result: IntegrationCheck[] = [];

  for (const check of checks) {
    if (seen.has(check.id)) {
      continue;
    }

    seen.add(check.id);
    result.push(check);
  }

  return result;
}

async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  label: string,
): Promise<T> {
  let timer: NodeJS.Timeout | undefined;

  try {
    return await Promise.race([
      promise,
      new Promise<T>((_, reject) => {
        timer = setTimeout(
          () => reject(new Error(`${label} timed out after ${timeoutMs}ms`)),
          timeoutMs,
        );
      }),
    ]);
  } finally {
    if (timer) {
      clearTimeout(timer);
    }
  }
}

async function runPhase(
  fn: ((ctx: CheckContext) => Promise<Record<string, import('./check.types').CheckResult>>) | undefined,
  ctx: CheckContext,
  timeoutMs: number,
  label: string,
): Promise<Record<string, import('./check.types').CheckResult>> {
  if (!fn) {
    return {};
  }

  if (ctx.skipConnectivity && label !== 'configuration') {
    return {
      [label]: {
        status: 'unknown',
        message: 'Skipped (BOOTSTRAP_SKIP_CONNECTIVITY)',
      },
    };
  }

  try {
    return await withTimeout(fn(ctx), timeoutMs, label);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      [label]: { status: 'error', message },
    };
  }
}

function resolveDependencyStatus(
  checks: ServiceHealthBlock['checks'],
  healthy: boolean,
): DependencyStatus {
  if (healthy) {
    return 'up';
  }

  if (Object.values(checks).some((check) => check.status === 'error')) {
    return 'down';
  }

  if (Object.values(checks).some((check) => check.status === 'warn')) {
    return 'degraded';
  }

  return 'unknown';
}

function resolveGlobalStatus(
  services: Record<string, ServiceHealthBlock>,
): HealthGlobalStatus {
  const blocks = Object.values(services);
  const criticalFailures = blocks.filter(
    (block) => block.critical && !block.healthy,
  ).length;

  if (criticalFailures > 0) {
    return 'unhealthy';
  }

  const anyUnhealthy = blocks.some((block) => !block.healthy);

  if (anyUnhealthy) {
    return 'degraded';
  }

  return 'healthy';
}

async function runIntegrationCheck(
  check: IntegrationCheck,
  ctx: CheckContext,
  timeoutMs: number,
): Promise<ServiceHealthBlock> {
  const configuration = check.runConfiguration
    ? await runPhase(
        () => check.runConfiguration!(),
        ctx,
        timeoutMs,
        'configuration',
      )
    : {};

  const connectivity = check.runConnectivity
    ? await runPhase(check.runConnectivity, ctx, timeoutMs, 'connectivity')
    : {};

  const migration = check.runMigration
    ? await runPhase(check.runMigration, ctx, timeoutMs, 'migration')
    : {};

  const checks = mergeCheckResults(configuration, connectivity, migration);
  const healthy = isCheckHealthy(checks) && !hasCheckError(checks);

  return {
    critical: check.critical,
    healthy,
    status: resolveDependencyStatus(checks, healthy),
    checks,
  };
}

export async function runAllChecks(
  options: RunChecksOptions = {},
): Promise<HealthPayload> {
  const started = Date.now();
  const ctx: CheckContext = {
    skipConnectivity: options.skipConnectivity ?? false,
  };
  const timeoutMs = options.checkTimeoutMs ?? DEFAULT_CHECK_TIMEOUT_MS;
  const checks = dedupeChecks(options.checks ?? integrationChecks);
  const services: Record<string, ServiceHealthBlock> = {};

  for (const check of checks) {
    services[check.id] = await runIntegrationCheck(check, ctx, timeoutMs);
  }

  const blocks = Object.values(services);
  const summary = {
    total: blocks.length,
    healthy: blocks.filter((block) => block.healthy).length,
    degraded: blocks.filter(
      (block) => !block.healthy && block.status === 'degraded',
    ).length,
    unhealthy: blocks.filter(
      (block) => !block.healthy && block.status === 'down',
    ).length,
    criticalFailures: blocks.filter(
      (block) => block.critical && !block.healthy,
    ).length,
  };

  return {
    status: resolveGlobalStatus(services),
    timestamp: new Date().toISOString(),
    uptime: (Date.now() - startedAtMs) / 1000,
    responseTimeMs: Date.now() - started,
    environment: process.env.SERVICE_ENVIRONMENT ?? 'development',
    service: process.env.SERVICE_NAME ?? 'api',
    stack: process.env.SERVICE_STACK ?? 'nestjs',
    deploymentServer: process.env.SERVICE_DEPLOYMENT_SERVER ?? 'local',
    project: process.env.SERVICE_PROJECT ?? 'unknown',
    summary,
    services,
  };
}

export async function runHealthChecks(): Promise<HealthPayload> {
  return runAllChecks({ skipConnectivity: false });
}
