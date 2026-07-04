import { ActiveSessions } from '@/components/auth/settings/security/active-sessions';

export default function SessionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Sessions</h1>
        <p className="text-muted-foreground text-sm">
          Multi-session plugin demo — view and revoke active sessions.
        </p>
      </div>

      <ActiveSessions />
    </div>
  );
}
