import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

import { AppShell } from '@/components/alerta/app-shell';
import { BairroCard } from '@/components/alerta/bairro-card';
import { Button } from '@/components/ui/button';
import { forcarPerigo } from '@/lib/actions';
import { prisma } from '@/lib/prisma';

export const metadata = {
  title: 'Admin — Alerta de Cheias',
  description: 'Painel de demonstração para forçar alertas de PERIGO',
};

export default async function AdminPage() {
  const bairros = await prisma.bairro.findMany({
    orderBy: { nome: 'asc' },
  });

  const emPerigo = bairros.filter((b) => b.nivel === 'PERIGO').length;

  return (
    <AppShell>
      <div className="mx-auto max-w-lg space-y-4 p-4 pt-2">
        <header className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-900 dark:bg-amber-950 dark:text-amber-200">
            <AlertTriangle className="size-3.5" />
            Modo demonstração
          </div>
          <h1 className="text-xl font-bold tracking-tight">Painel de controlo</h1>
          <p className="text-muted-foreground text-sm">
            Plano B para o pitch: force PERIGO num bairro e veja o alerta na home e no ntfy.
          </p>
        </header>

        {emPerigo > 0 ? (
          <div className="rounded-2xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/50 dark:text-red-200">
            {emPerigo} bairro{emPerigo > 1 ? 's' : ''} em PERIGO neste momento.
          </div>
        ) : null}

        {bairros.length === 0 ? (
          <p className="text-muted-foreground text-sm">Nenhum bairro registado.</p>
        ) : (
          <ul className="space-y-3">
            {bairros.map((bairro) => (
              <li key={bairro.id}>
                <BairroCard
                  nome={bairro.nome}
                  nivel={bairro.nivel}
                  atualizadoEm={bairro.atualizadoEm}
                  destaque={bairro.nivel === 'PERIGO'}
                  acao={
                    <form action={forcarPerigo.bind(null, bairro.id)}>
                      <Button
                        type="submit"
                        variant="destructive"
                        size="sm"
                        className="w-full"
                        disabled={bairro.nivel === 'PERIGO'}
                      >
                        <AlertTriangle className="size-4" />
                        {bairro.nivel === 'PERIGO'
                          ? 'Já em PERIGO'
                          : `Forçar PERIGO em ${bairro.nome}`}
                      </Button>
                    </form>
                  }
                />
              </li>
            ))}
          </ul>
        )}

        <p className="text-muted-foreground text-center text-xs">
          Também pode testar via{' '}
          <Link href="/simulador" className="font-medium text-sky-600 underline dark:text-sky-400">
            simulador USSD
          </Link>
        </p>
      </div>
    </AppShell>
  );
}
