'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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

export default function AcceptInvitationPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function acceptInvitation() {
      try {
        const result = await authClient.organization.acceptInvitation({
          invitationId: params.id,
        });

        if (cancelled) {
          return;
        }

        if (result.error) {
          setError(result.error.message ?? 'Failed to accept invitation.');
          setIsLoading(false);
          return;
        }

        router.replace('/dashboard/organization');
      } catch {
        if (!cancelled) {
          setError('Failed to accept invitation.');
          setIsLoading(false);
        }
      }
    }

    void acceptInvitation();

    return () => {
      cancelled = true;
    };
  }, [params.id, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Organization invitation</CardTitle>
          <CardDescription>
            {error ?? 'Your invitation could not be accepted.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => router.push('/auth/sign-in')} className="w-full">
            Go to sign in
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
