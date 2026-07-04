import { z } from 'zod';
import type { CheckResult, IntegrationCheck } from '../check.types';

const databaseEnvSchema = z.object({
  DATABASE_URL: z.string().url('DATABASE_URL must be a valid URL'),
});

async function createPrismaClient() {
  const { PrismaClient } = await import('@/generated/prisma/client');
  const { PrismaPg } = await import('@prisma/adapter-pg');
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL as string,
  });

  return new PrismaClient({ adapter });
}

export const databaseCheck: IntegrationCheck = {
  id: 'database',
  critical: true,
  async runConfiguration(): Promise<Record<string, CheckResult>> {
    const parsed = databaseEnvSchema.safeParse(process.env);

    if (!parsed.success) {
      const message =
        parsed.error.flatten().fieldErrors.DATABASE_URL?.join('; ') ??
        'Invalid DATABASE_URL';

      return {
        configuration: { status: 'error', message },
      };
    }

    return { configuration: { status: 'ok' } };
  },
  async runConnectivity(): Promise<Record<string, CheckResult>> {
    let prisma: Awaited<ReturnType<typeof createPrismaClient>> | undefined;

    try {
      prisma = await createPrismaClient();
      await prisma.$queryRaw`SELECT 1`;
      return { connectivity: { status: 'ok' } };
    } catch (error) {
      return {
        connectivity: {
          status: 'error',
          message: error instanceof Error ? error.message : String(error),
        },
      };
    } finally {
      await prisma?.$disconnect();
    }
  },
  async runMigration(): Promise<Record<string, CheckResult>> {
    let prisma: Awaited<ReturnType<typeof createPrismaClient>> | undefined;

    try {
      prisma = await createPrismaClient();
      await prisma.$queryRaw`SELECT 1 FROM "_prisma_migrations" LIMIT 1`;
      return { migration: { status: 'ok' } };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);

      if (message.includes('_prisma_migrations')) {
        return {
          migration: {
            status: 'warn',
            message: 'No migrations table found — run prisma migrate dev',
          },
        };
      }

      return { migration: { status: 'error', message } };
    } finally {
      await prisma?.$disconnect();
    }
  },
};
