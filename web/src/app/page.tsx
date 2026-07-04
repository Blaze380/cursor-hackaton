'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { authClient } from '@/lib/auth-client';

export default function HomePage() {
  const router = useRouter();
  const [isGuestLoading, setIsGuestLoading] = useState(false);

  async function continueAsGuest() {
    setIsGuestLoading(true);

    const result = await authClient.signIn.anonymous();

    if (result.error) {
      setIsGuestLoading(false);
      return;
    }

    router.push('/dashboard');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <div className="max-w-2xl space-y-3 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Forge Web</h1>
        <p className="text-muted-foreground text-sm">
          Next.js app with Better Auth — sign in, explore plugins, and open the SaaS
          dashboard demo.
        </p>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Authentication demo</CardTitle>
          <CardDescription>
            Email/password, Google OAuth, magic link, OTP, 2FA, organizations, and more.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Button asChild>
            <Link href="/auth/sign-in">Sign in</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/auth/sign-up">Create account</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/dashboard">Open dashboard</Link>
          </Button>
          <Button
            variant="ghost"
            onClick={() => void continueAsGuest()}
            disabled={isGuestLoading}
          >
            {isGuestLoading ? <Spinner className="size-4" /> : 'Continue as guest'}
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
