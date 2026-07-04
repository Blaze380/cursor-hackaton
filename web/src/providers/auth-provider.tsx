'use client';

import {
  magicLinkPlugin,
  multiSessionPlugin,
  organizationPlugin,
  usernamePlugin,
} from '@better-auth-ui/core/plugins';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { AuthProvider as AuthUIProvider } from '@/components/auth/auth-provider';
import { Toaster } from '@/components/ui/sonner';
import { authClient } from '@/lib/auth-client';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <>
      <AuthUIProvider
      authClient={authClient}
      navigate={({ to, replace }) =>
        replace ? router.replace(to) : router.push(to)
      }
      Link={Link}
      redirectTo="/dashboard"
      socialProviders={['google']}
      emailAndPassword={{
        enabled: true,
        forgotPassword: true,
        name: true,
        rememberMe: false,
      }}
      plugins={[
        usernamePlugin(),
        magicLinkPlugin(),
        organizationPlugin(),
        multiSessionPlugin(),
      ]}
      basePaths={{
        auth: '/auth',
        settings: '/dashboard/settings',
        organization: '/dashboard/organization',
      }}
    >
      {children}
    </AuthUIProvider>
    <Toaster richColors position="top-center" />
    </>
  );
}

export { authClient };
