export type HealthGlobalStatus = 'healthy' | 'degraded' | 'unhealthy';

export type DependencyStatus =
  | 'up'
  | 'down'
  | 'maintenance'
  | 'degraded'
  | 'unknown';

export type CheckStatus = 'ok' | 'warn' | 'error' | 'unknown';

export interface CheckBlock {
  status: CheckStatus;
  message?: string;
}

export interface ServiceHealthBlock {
  critical: boolean;
  healthy: boolean;
  status: DependencyStatus;
  checks: Record<string, CheckBlock>;
}

export interface HealthPayload {
  status: HealthGlobalStatus;
  timestamp: string;
  uptime: number;
  responseTimeMs: number;
  environment: string;
  service: string;
  stack: string;
  deploymentServer: string;
  project: string;
  summary: {
    total: number;
    healthy: number;
    degraded: number;
    unhealthy: number;
    criticalFailures: number;
  };
  services: Record<string, ServiceHealthBlock>;
}
