import type { NivelAgua } from '@/generated/prisma/enums';
import { formatarAtualizadoEm, NIVEL_CONFIG } from '@/lib/nivel-agua';
import { cn } from '@/lib/utils';

type Props = {
  nome: string;
  nivel: NivelAgua;
  atualizadoEm: Date;
  subscrito?: boolean;
  acao?: React.ReactNode;
  destaque?: boolean;
};

export function BairroCard({
  nome,
  nivel,
  atualizadoEm,
  subscrito,
  acao,
  destaque,
}: Props) {
  const config = NIVEL_CONFIG[nivel];

  return (
    <article
      className={cn(
        'overflow-hidden rounded-2xl border bg-white/80 shadow-sm backdrop-blur-sm dark:bg-slate-900/80',
        config.borda,
        destaque && nivel === 'PERIGO' && 'shadow-red-500/20 shadow-lg',
      )}
    >
      <div className="flex gap-3 p-3">
        <div className="relative h-20 w-10 shrink-0 overflow-hidden rounded-lg bg-sky-100 dark:bg-slate-800">
          <div
            className={cn('absolute inset-x-0 bottom-0 transition-all duration-700', config.barra)}
            style={{ height: `${config.altura}%` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        </div>

        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="truncate font-semibold tracking-tight">{nome}</h3>
              <p className={cn('text-xs', config.texto)}>{config.descricao}</p>
            </div>
            <span
              className={cn(
                'shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide',
                config.badge,
              )}
            >
              {config.label}
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 text-[11px] text-muted-foreground">
            <span>Actualizado {formatarAtualizadoEm(atualizadoEm)}</span>
            {subscrito ? <span className="font-medium text-sky-600 dark:text-sky-400">Subscrito</span> : null}
          </div>
        </div>
      </div>

      {acao ? <div className="border-t border-black/5 px-3 py-2 dark:border-white/5">{acao}</div> : null}
    </article>
  );
}
