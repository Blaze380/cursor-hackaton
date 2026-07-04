'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import type { NivelAgua } from '@/generated/prisma/enums';
import { subscrever } from '@/lib/actions';
import { authClient } from '@/lib/auth-client';

type BairroItem = {
  id: string;
  nome: string;
  nivel: NivelAgua;
  atualizadoEm: Date;
};

type Props = {
  bairros: BairroItem[];
};

const NIVEL_CLASSES: Record<NivelAgua, string> = {
  SECO: 'bg-green-600 text-white',
  TORNOZELO: 'bg-yellow-500 text-black',
  JOELHO: 'bg-orange-500 text-white',
  CINTURA: 'bg-red-500 text-white',
  PERIGO: 'bg-red-900 text-white animate-pulse',
};

export function ListaBairros({ bairros }: Props) {
  const [alerta, setAlerta] = useState<string | null>(null);
  const [subscrevendo, setSubscrevendo] = useState<string | null>(null);
  const [subscritos, setSubscritos] = useState<Set<string>>(new Set());

  useEffect(() => {
    const source = new EventSource('https://ntfy.sh/alerta-maputo-blaze/sse');

    source.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as { message?: string };
        setAlerta(data.message ?? event.data);
      } catch {
        setAlerta(event.data);
      }
    };

    return () => source.close();
  }, []);

  async function handleSubscrever(bairroId: string) {
    setSubscrevendo(bairroId);

    try {
      const session = await authClient.getSession();

      if (!session.data?.user) {
        const result = await authClient.signIn.anonymous();

        if (result.error) {
          throw new Error(result.error.message ?? 'Falha ao iniciar sessão');
        }
      }

      await subscrever(bairroId);
      setSubscritos((prev) => new Set(prev).add(bairroId));
    } catch (error) {
      console.error('Falha ao subscrever:', error);
    } finally {
      setSubscrevendo(null);
    }
  }

  return (
    <>
      {alerta ? (
        <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-3 bg-red-700 px-4 py-3 text-sm font-semibold text-white shadow-lg">
          <p className="flex-1 text-center">{alerta}</p>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="shrink-0 text-white hover:bg-red-800 hover:text-white"
            onClick={() => setAlerta(null)}
          >
            Dispensar
          </Button>
        </div>
      ) : null}

      <div className={`mx-auto max-w-lg space-y-4 p-4 ${alerta ? 'pt-16' : ''}`}>
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Alerta de Cheias — Maputo</h1>
          <p className="text-muted-foreground text-sm">
            Níveis actualizados automaticamente por sensores simulados.
          </p>
        </header>

        {bairros.length === 0 ? (
          <p className="text-muted-foreground text-sm">Nenhum bairro registado.</p>
        ) : (
          <ul className="space-y-3">
            {bairros.map((bairro) => {
              const isLoading = subscrevendo === bairro.id;
              const isSubscrito = subscritos.has(bairro.id);

              return (
                <li
                  key={bairro.id}
                  className="border-border flex items-center justify-between gap-3 rounded-lg border p-3"
                >
                  <div className="min-w-0 space-y-1">
                    <p className="truncate font-medium">{bairro.nome}</p>
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${NIVEL_CLASSES[bairro.nivel]}`}
                    >
                      {bairro.nivel}
                    </span>
                  </div>

                  <Button
                    type="button"
                    variant={isSubscrito ? 'secondary' : 'outline'}
                    size="sm"
                    disabled={isLoading || isSubscrito}
                    onClick={() => void handleSubscrever(bairro.id)}
                  >
                    {isLoading ? (
                      <Spinner className="size-4" />
                    ) : isSubscrito ? (
                      'Subscrito'
                    ) : (
                      'Subscrever'
                    )}
                  </Button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}
