'use client';

import { useAuthenticate } from '@better-auth-ui/react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { UserAvatar } from '@/components/auth/user/user-avatar';
import { authClient } from '@/lib/auth-client';

export function DashboardHeader() {
  const { data: session } = useAuthenticate(authClient);
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <header className="border-border flex h-14 items-center justify-between border-b px-4 md:px-6">
      <div className="text-muted-foreground text-sm">
        {session?.user.email ?? 'Loading session...'}
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle theme"
        >
          {resolvedTheme === 'dark' ? <Sun /> : <Moon />}
        </Button>
        {session?.user ? <UserAvatar user={session.user} /> : null}
        <Button variant="outline" size="sm" asChild>
          <Link href="/auth/sign-out">Sign out</Link>
        </Button>
      </div>
    </header>
  );
}
