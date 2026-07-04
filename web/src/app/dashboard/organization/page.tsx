'use client';

import { useListOrganizations } from '@better-auth-ui/react';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { authClient } from '@/lib/auth-client';

export default function OrganizationPage() {
  const { data: organizations, isPending, refetch } = useListOrganizations(authClient);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCreateOrganization(event: React.FormEvent) {
    event.preventDefault();
    setIsCreating(true);
    setError(null);

    const result = await authClient.organization.create({
      name,
      slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
    });

    if (result.error) {
      setError(result.error.message ?? 'Failed to create organization.');
      setIsCreating(false);
      return;
    }

    setName('');
    setSlug('');
    setIsCreating(false);
    await refetch();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Organization</h1>
        <p className="text-muted-foreground text-sm">
          Demo for the Better Auth organization plugin.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create organization</CardTitle>
          <CardDescription>
            Requires the pro subscription check configured in the server plugin.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateOrganization} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="org-name">Name</Label>
              <Input
                id="org-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Acme Inc."
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="org-slug">Slug</Label>
              <Input
                id="org-slug"
                value={slug}
                onChange={(event) => setSlug(event.target.value)}
                placeholder="acme-inc"
              />
            </div>
            {error ? <p className="text-destructive text-sm">{error}</p> : null}
            <Button type="submit" disabled={isCreating}>
              {isCreating ? <Spinner className="size-4" /> : 'Create organization'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your organizations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {isPending ? (
            <Spinner className="size-5" />
          ) : organizations && organizations.length > 0 ? (
            organizations.map((organization) => (
              <div
                key={organization.id}
                className="border-border flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <p className="font-medium">{organization.name}</p>
                  <p className="text-muted-foreground text-sm">{organization.slug}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    void authClient.organization.setActive({
                      organizationId: organization.id,
                    })
                  }
                >
                  Set active
                </Button>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground text-sm">No organizations yet.</p>
          )}
        </CardContent>
      </Card>

      <Button asChild variant="link" className="px-0">
        <Link href="/dashboard/settings/account">Open full account settings</Link>
      </Button>
    </div>
  );
}
