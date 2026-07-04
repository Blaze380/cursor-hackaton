'use client';

import { useEffect, useState } from 'react';
import { Bell, BellOff, X } from 'lucide-react';
import { toast } from 'sonner';

import { BairroCard } from '@/components/alerta/bairro-card';
import { ResumoCheias } from '@/components/alerta/resumo-cheias';
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
  subscritoIds?: string[];
};

export function ListaBairros({ bairros, subscritoIds = [] }: Props) {
  const [alerta, setAlerta] = useState<string | null>(null);
  const [subscrevendo, setSubscrevendo] = useState<string | null>(null);
  const [subscritos, setSubscritos] = useState<Set<string>>(new Set(subscritoIds));
  const [sseLigado, setSseLigado] = useState(false);

  useEffect(() => {
    setSubscritos(new Set(subscritoIds));
  }, [subscritoIds]);

  useEffect(() => {
    const source = new EventSource('https://ntfy.sh/alerta-maputo-blaze/sse');

    source.onopen = () => setSseLigado(true);
    source.onerror = () => setSseLigado(false);

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

  async function handleSubscrever(bairroId: string, nome: string) {
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
      toast.success(`Subscrito a ${nome}`, {
        description: 'Receberá alertas quando o nível subir.',
      });
    } catch (error) {
      const mensagem = error instanceof Error ? error.message : 'Erro ao subscrever';
      toast.error(mensagem);
    } finally {
      setSubscrevendo(null);
    }
  }

  const ordenados = [...bairros].sort((a, b) => {
    const ordem: Record<NivelAgua, number> = {
      PERIGO: 0,
      CINTURA: 1,
      JOELHO: 2,
      TORNOZELO: 3,
      SECO: 4,
    };
    return ordem[a.nivel] - ordem[b.nivel] || a.nome.localeCompare(b.nome);
  });

  return (
    <>
      {alerta ? (
        <div className="fixed inset-x-0 top-0 z-[60] animate-in slide-in-from-top duration-300">
          <div className="mx-auto flex max-w-lg items-start gap-3 bg-red-700 px-4 py-3 text-sm text-white shadow-xl">
            <Bell className="mt-0.5 size-4 shrink-0 animate-pulse" />
            <p className="flex-1 font-medium leading-snug">{alerta}</p>
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              className="shrink-0 text-white hover:bg-red-800 hover:text-white"
              onClick={() => setAlerta(null)}
              aria-label="Dispensar alerta"
            >
              <X className="size-4" />
            </Button>
          </div>
        </div>
      ) : null}

      <div className={`mx-auto max-w-lg space-y-4 p-4 ${alerta ? 'pt-20' : 'pt-2'}`}>
        <header className="space-y-1">
          <h1 className="text-xl font-bold tracking-tight">Bairros de Maputo</h1>
          <p className="text-muted-foreground text-sm">
            Sensores actualizam a cada 6 segundos. Subscreva para acompanhar o seu bairro.
          </p>
        </header>

        {bairros.length > 0 ? <ResumoCheias bairros={bairros} sseLigado={sseLigado} /> : null}

        {bairros.length === 0 ? (
          <div className="rounded-2xl border border-dashed p-6 text-center">
            <p className="text-muted-foreground text-sm">Nenhum bairro registado.</p>
            <p className="text-muted-foreground mt-1 text-xs">Corra `pnpm seed` para popular a demo.</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {ordenados.map((bairro) => {
              const isLoading = subscrevendo === bairro.id;
              const isSubscrito = subscritos.has(bairro.id);

              return (
                <li key={bairro.id}>
                  <BairroCard
                    nome={bairro.nome}
                    nivel={bairro.nivel}
                    atualizadoEm={bairro.atualizadoEm}
                    subscrito={isSubscrito}
                    destaque
                    acao={
                      <Button
                        type="button"
                        variant={isSubscrito ? 'secondary' : 'default'}
                        size="sm"
                        className="w-full"
                        disabled={isLoading || isSubscrito}
                        onClick={() => void handleSubscrever(bairro.id, bairro.nome)}
                      >
                        {isLoading ? (
                          <Spinner className="size-4" />
                        ) : isSubscrito ? (
                          <>
                            <BellOff className="size-4" />
                            Subscrito
                          </>
                        ) : (
                          <>
                            <Bell className="size-4" />
                            Subscrever alertas
                          </>
                        )}
                      </Button>
                    }
                  />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}
