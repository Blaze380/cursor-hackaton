'use client';

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

type AdminUser = {
  id: string;
  name: string | null;
  email: string;
  role?: string | null;
};

export default function AdminPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUsers() {
      const result = await authClient.admin.listUsers({
        query: { limit: 20 },
      });

      if (result.error) {
        setError(result.error.message ?? 'Failed to load users.');
        setIsLoading(false);
        return;
      }

      setUsers(result.data?.users ?? []);
      setIsLoading(false);
    }

    void loadUsers();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Admin</h1>
        <p className="text-muted-foreground text-sm">
          Demo for the Better Auth admin plugin. Requires an admin role.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>Latest users from `admin.listUsers`.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {isLoading ? (
            <Spinner className="size-5" />
          ) : error ? (
            <p className="text-destructive text-sm">{error}</p>
          ) : users.length > 0 ? (
            users.map((user) => (
              <div
                key={user.id}
                className="border-border flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <p className="font-medium">{user.name ?? user.email}</p>
                  <p className="text-muted-foreground text-sm">{user.email}</p>
                </div>
                <span className="text-muted-foreground text-xs">{user.role ?? 'user'}</span>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground text-sm">No users found.</p>
          )}
          <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
            Refresh
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
