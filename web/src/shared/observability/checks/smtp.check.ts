import nodemailer from 'nodemailer';
import { z } from 'zod';
import type { CheckResult, IntegrationCheck } from '../check.types';

const smtpEnvSchema = z.object({
  SMTP_HOST: z.string().min(1, 'SMTP_HOST is required'),
  SMTP_PORT: z.coerce.number().int().positive('SMTP_PORT must be a positive integer'),
  EMAIL_FROM: z.string().email('EMAIL_FROM must be a valid email'),
});

function buildSmtpAuth() {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();

  if (!user || !pass) {
    return undefined;
  }

  return { user, pass };
}

export const smtpCheck: IntegrationCheck = {
  id: 'smtp',
  critical: false,
  async runConfiguration(): Promise<Record<string, CheckResult>> {
    const parsed = smtpEnvSchema.safeParse(process.env);

    if (!parsed.success) {
      const message = Object.entries(parsed.error.flatten().fieldErrors)
        .flatMap(([field, errors]) => (errors ?? []).map((error) => `${field}: ${error}`))
        .join('; ');

      return {
        configuration: { status: 'error', message: message || 'Invalid SMTP configuration' },
      };
    }

    return { configuration: { status: 'ok' } };
  },
  async runConnectivity(): Promise<Record<string, CheckResult>> {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 1025),
      secure: process.env.SMTP_SECURE === 'true',
      auth: buildSmtpAuth(),
      connectionTimeout: 2_000,
      greetingTimeout: 2_000,
    });

    try {
      await transporter.verify();
      return { connectivity: { status: 'ok' } };
    } catch (error) {
      return {
        connectivity: {
          status: 'error',
          message: error instanceof Error ? error.message : String(error),
        },
      };
    } finally {
      transporter.close();
    }
  },
};
