import type { IntegrationCheck, CheckResult } from '../check.types';
import { parseServiceEnv } from '../service-env.schema';

export const serviceCheck: IntegrationCheck = {
  id: 'service',
  critical: true,
  async runConfiguration(): Promise<Record<string, CheckResult>> {
    const parsed = parseServiceEnv();

    if (!parsed.success) {
      const messages = Object.entries(parsed.errors)
        .flatMap(([field, errors]) =>
          (errors ?? []).map((error) => `${field}: ${error}`),
        )
        .join('; ');

      return {
        configuration: {
          status: 'error',
          message: messages || 'Invalid SERVICE_* environment variables',
        },
      };
    }

    return {
      configuration: { status: 'ok' },
    };
  },
};
