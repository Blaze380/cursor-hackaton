'use client';

import { TanstackProvider } from '@/providers/tanstack-provider';

import { AuthProvider } from '@/providers/auth-provider';

import { NuqsAdapter } from 'nuqs/adapters/next/app';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NuqsAdapter>
      {/* forge:providers-inner-start */}
        <TanstackProvider>
        <AuthProvider>
        {children}
      </AuthProvider>
      </TanstackProvider>
        {/* forge:providers-inner-end */}
    </NuqsAdapter>
  );
}
