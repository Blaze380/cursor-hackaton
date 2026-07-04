import { ensureSession } from '@better-auth-ui/react/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { auth } from '@/lib/auth';
import { getQueryClient } from '@/lib/auth-query-client';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();
  const requestHeaders = await headers();

  const session = await ensureSession(queryClient, auth, {
    headers: requestHeaders,
  });

  if (!session) {
    redirect('/auth/sign-in?redirectTo=/dashboard');
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardShell>{children}</DashboardShell>
    </HydrationBoundary>
  );
}
