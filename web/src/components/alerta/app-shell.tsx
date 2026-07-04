'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Radio, ShieldAlert, Waves } from 'lucide-react';

import { InstalarBanner } from '@/components/pwa/instalar-banner';
import { cn } from '@/lib/utils';

const NAV = [
  { href: '/', label: 'Mapa', icon: Home },
  { href: '/admin', label: 'Admin', icon: ShieldAlert },
  { href: '/simulador', label: 'USSD', icon: Radio },
] as const;

type Props = {
  children: React.ReactNode;
  variant?: 'default' | 'dark';
};

export function AppShell({ children, variant = 'default' }: Props) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        'relative min-h-screen pb-20',
        variant === 'dark'
          ? 'bg-zinc-950 text-zinc-100'
          : 'bg-gradient-to-b from-sky-50 via-white to-sky-100/80 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-sky-950 dark:text-slate-100',
      )}
    >
      <div
        className={cn(
          'pointer-events-none absolute inset-x-0 top-0 h-48 opacity-40',
          variant === 'dark'
            ? 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900/30 via-transparent to-transparent'
            : 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-300/50 via-transparent to-transparent dark:from-sky-800/20',
        )}
      />

      <header className="relative z-10 border-b border-sky-200/60 bg-white/70 px-4 py-3 backdrop-blur-md dark:border-sky-900/50 dark:bg-slate-950/70">
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-sky-600 text-white shadow-lg shadow-sky-600/25">
            <Waves className="size-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold tracking-tight">Alerta Maputo</p>
            <p className="text-muted-foreground truncate text-xs">Monitor de cheias em tempo real</p>
          </div>
        </div>
      </header>

      <div className="relative z-10">{children}</div>

      <InstalarBanner />

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-sky-200/70 bg-white/90 backdrop-blur-lg dark:border-sky-900/50 dark:bg-slate-950/90">
        <div className="mx-auto grid max-w-lg grid-cols-3 gap-1 p-2">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-xs font-medium transition-colors',
                  active
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                    : 'text-muted-foreground hover:bg-sky-50 hover:text-sky-900 dark:hover:bg-sky-950/50 dark:hover:text-sky-100',
                )}
              >
                <Icon className="size-5" />
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
