'use client';

import { useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';

import { Button } from '@/components/ui/button';

const DISMISS_KEY = 'pwa-dismiss';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

export function InstalarBanner() {
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.localStorage.getItem(DISMISS_KEY) === '1') return;
    if (window.matchMedia('(display-mode: standalone)').matches) return;

    const mobile = window.matchMedia('(max-width: 768px)').matches;
    if (!mobile) return;

    function handleBeforeInstall(event: Event) {
      event.preventDefault();
      setPromptEvent(event as BeforeInstallPromptEvent);
      setVisivel(true);
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  async function handleInstalar() {
    if (!promptEvent) return;

    await promptEvent.prompt();
    const { outcome } = await promptEvent.userChoice;

    if (outcome === 'accepted') {
      setVisivel(false);
    }

    setPromptEvent(null);
  }

  function handleDismiss() {
    window.localStorage.setItem(DISMISS_KEY, '1');
    setVisivel(false);
    setPromptEvent(null);
  }

  if (!visivel) return null;

  return (
    <div className="fixed inset-x-0 bottom-20 z-40 px-4">
      <div className="mx-auto flex max-w-lg items-center gap-3 rounded-2xl border border-sky-200 bg-white/95 p-3 shadow-lg backdrop-blur-md dark:border-sky-800 dark:bg-slate-900/95">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-600 text-white">
          <Download className="size-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">Instalar Alerta Maputo</p>
          <p className="text-muted-foreground text-xs">Acesso rápido no ecrã principal</p>
        </div>
        <Button type="button" size="sm" onClick={() => void handleInstalar()}>
          Instalar
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          onClick={handleDismiss}
          aria-label="Fechar"
        >
          <X className="size-4" />
        </Button>
      </div>
    </div>
  );
}
