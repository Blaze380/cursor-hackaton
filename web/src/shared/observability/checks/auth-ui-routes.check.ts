import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { z } from 'zod';
import type { CheckResult, IntegrationCheck } from '../check.types';

const authUiEnvSchema = z.object({
  BETTER_AUTH_SECRET: z
    .string()
    .min(32, 'BETTER_AUTH_SECRET must be at least 32 characters'),
  WEB_URL: z.string().url('WEB_URL must be a valid URL'),
  NEXT_PUBLIC_WEB_URL: z
    .string()
    .url('NEXT_PUBLIC_WEB_URL must be a valid URL'),
});

const REQUIRED_UI_FILES = [
  'src/app/auth/[path]/page.tsx',
  'src/app/dashboard/layout.tsx',
  'src/providers/auth-provider.tsx',
] as const;

export const authUiRoutesCheck: IntegrationCheck = {
  id: 'auth-ui-routes',
  critical: false,
  async runConfiguration(): Promise<Record<string, CheckResult>> {
    const parsed = authUiEnvSchema.safeParse(process.env);

    if (!parsed.success) {
      const message = Object.entries(parsed.error.flatten().fieldErrors)
        .flatMap(([field, errors]) =>
          (errors ?? []).map((error) => `${field}: ${error}`),
        )
        .join('; ');

      return {
        configuration: {
          status: 'error',
          message: message || 'Invalid auth UI configuration',
        },
      };
    }

    return { configuration: { status: 'ok' } };
  },
  async runConnectivity(): Promise<Record<string, CheckResult>> {
    const missing = REQUIRED_UI_FILES.filter(
      (file) => !existsSync(join(process.cwd(), file)),
    );

    if (missing.length > 0) {
      return {
        connectivity: {
          status: 'error',
          message: `Missing auth UI files: ${missing.join(', ')}`,
        },
      };
    }

    return { connectivity: { status: 'ok' } };
  },
};
