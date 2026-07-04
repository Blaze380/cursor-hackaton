import { z } from 'zod';

const isProduction =
  process.env.SERVICE_ENVIRONMENT === 'production' ||
  process.env.NODE_ENV === 'production';

export const serviceEnvSchema = z.object({
  SERVICE_NAME: z.string().min(1, 'SERVICE_NAME is required'),
  SERVICE_ENVIRONMENT: z.string().min(1, 'SERVICE_ENVIRONMENT is required'),
  SERVICE_STACK: z.string().min(1, 'SERVICE_STACK is required'),
  SERVICE_DEPLOYMENT_SERVER: z
    .string()
    .min(1, 'SERVICE_DEPLOYMENT_SERVER is required'),
  SERVICE_PROJECT: z
    .string()
    .min(1, 'SERVICE_PROJECT is required')
    .regex(
      /^[a-z][a-z0-9_]*$/,
      'SERVICE_PROJECT must be lowercase with underscores only',
    ),
  SERVICE_ACCESS_TOKEN: isProduction
    ? z.string().min(32, 'SERVICE_ACCESS_TOKEN must be at least 32 characters in production')
    : z.string().min(1, 'SERVICE_ACCESS_TOKEN is required'),
});

export type ServiceEnv = z.infer<typeof serviceEnvSchema>;

export function parseServiceEnv(): {
  success: true;
  data: ServiceEnv;
} | {
  success: false;
  errors: Record<string, string[] | undefined>;
} {
  const parsed = serviceEnvSchema.safeParse(process.env);

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  return { success: true, data: parsed.data };
}
