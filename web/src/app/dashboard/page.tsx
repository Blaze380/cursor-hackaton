import Link from 'next/link';
import { Activity, Building2, KeyRound, Users } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const stats = [
  {
    title: 'Active sessions',
    value: 'Multi-session',
    description: 'Manage devices in Sessions',
    icon: Users,
  },
  {
    title: 'Organization',
    value: 'Teams plugin',
    description: 'Invites, members, and roles',
    icon: Building2,
  },
  {
    title: 'Auth plugins',
    value: '12 enabled',
    description: '2FA, magic link, OTP, phone, admin',
    icon: KeyRound,
  },
  {
    title: 'API reference',
    value: 'OpenAPI',
    description: 'Better Auth native routes',
    icon: Activity,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground text-sm">
            Demo SaaS shell powered by Better Auth on Next.js.
          </p>
        </div>
        <Badge variant="secondary">Demo workspace</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="text-muted-foreground size-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{stat.value}</div>
              <CardDescription>{stat.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick links</CardTitle>
          <CardDescription>
            Explore the auth flows and plugin demos included with this module.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href="/dashboard/settings/account">Account settings</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/dashboard/settings/security">Security & 2FA</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/dashboard/organization">Organization</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/api/auth/reference" target="_blank">
              OpenAPI reference
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
