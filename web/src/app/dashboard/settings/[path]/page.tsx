import { viewPaths } from '@better-auth-ui/core';
import { notFound } from 'next/navigation';

import { Settings } from '@/components/auth/settings/settings';

export default async function DashboardSettingsPage({
  params,
}: {
  params: Promise<{ path: string }>;
}) {
  const { path } = await params;

  if (
    !Object.values(viewPaths.settings).includes(path) &&
    path !== 'organizations'
  ) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-muted-foreground text-sm">
          Manage your account, security, and linked providers.
        </p>
      </div>
      <Settings path={path} />
    </div>
  );
}
