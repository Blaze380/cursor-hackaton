import type { CheckBlock, CheckStatus } from './health-response.types';

export type CheckPhase = 'configuration' | 'connectivity' | 'migration';

export interface CheckResult {
  status: CheckStatus;
  message?: string;
}

export interface CheckContext {
  skipConnectivity: boolean;
}

export interface IntegrationCheck {
  id: string;
  critical: boolean;
  runConfiguration?: () => Promise<Record<string, CheckResult>>;
  runConnectivity?: (ctx: CheckContext) => Promise<Record<string, CheckResult>>;
  runMigration?: (ctx: CheckContext) => Promise<Record<string, CheckResult>>;
}

export function mergeCheckResults(
  ...groups: Array<Record<string, CheckResult>>
): Record<string, CheckBlock> {
  const merged: Record<string, CheckBlock> = {};

  for (const group of groups) {
    for (const [key, result] of Object.entries(group)) {
      merged[key] = {
        status: result.status,
        ...(result.message ? { message: result.message } : {}),
      };
    }
  }

  return merged;
}

export function isCheckHealthy(checks: Record<string, CheckBlock>): boolean {
  return Object.values(checks).every(
    (check) => check.status === 'ok' || check.status === 'warn',
  );
}

export function hasCheckError(checks: Record<string, CheckBlock>): boolean {
  return Object.values(checks).some((check) => check.status === 'error');
}
