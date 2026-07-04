export type {
  HealthGlobalStatus,
  DependencyStatus,
  CheckStatus,
  CheckBlock,
  ServiceHealthBlock,
  HealthPayload,
} from './health-response.types';

export type {
  CheckPhase,
  CheckResult,
  CheckContext,
  IntegrationCheck,
} from './check.types';

export { serviceEnvSchema, parseServiceEnv } from './service-env.schema';
export type { ServiceEnv } from './service-env.schema';

export {
  mergeCheckResults,
  isCheckHealthy,
  hasCheckError,
} from './check.types';

export { integrationChecks } from './checks.registry';
export { serviceCheck } from './checks/service.check';

export {
  runAllChecks,
  runHealthChecks,
  type RunChecksOptions,
} from './check-runner';

export {
  printBootstrapResults,
  printBootstrapSkipMessage,
} from './bootstrap-cli';
