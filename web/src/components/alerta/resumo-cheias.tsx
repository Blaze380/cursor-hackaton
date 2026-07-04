import { AlertTriangle, Droplets, Radio } from 'lucide-react';

import type { NivelAgua } from '@/generated/prisma/enums';
import { NIVEL_CONFIG } from '@/lib/nivel-agua';

type BairroResumo = {
  nivel: NivelAgua;
};

type Props = {
  bairros: BairroResumo[];
  sseLigado: boolean;
};

export function ResumoCheias({ bairros, sseLigado }: Props) {
  const emPerigo = bairros.filter((b) => b.nivel === 'PERIGO').length;
  const elevado = bairros.filter((b) => b.nivel === 'CINTURA' || b.nivel === 'PERIGO').length;

  return (
    <section className="grid grid-cols-2 gap-2">
      <div
        className={`col-span-2 rounded-2xl border p-3 ${
          emPerigo > 0
            ? 'border-red-300 bg-red-50 dark:border-red-900 dark:bg-red-950/40'
            : 'border-sky-200 bg-white/80 dark:border-sky-900 dark:bg-slate-900/60'
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {emPerigo > 0 ? (
              <AlertTriangle className="size-5 text-red-600 dark:text-red-400" />
            ) : (
              <Droplets className="size-5 text-sky-600 dark:text-sky-400" />
            )}
            <div>
              <p className="text-sm font-semibold">
                {emPerigo > 0
                  ? `${emPerigo} bairro${emPerigo > 1 ? 's' : ''} em PERIGO`
                  : 'Sem alertas críticos'}
              </p>
              <p className="text-muted-foreground text-xs">
                {elevado > 0
                  ? `${elevado} zona${elevado > 1 ? 's' : ''} com nível elevado`
                  : `${bairros.length} bairros monitorizados`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span
              className={`size-2 rounded-full ${sseLigado ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-400'}`}
            />
            <Radio className="size-3.5" />
            {sseLigado ? 'Ao vivo' : 'Offline'}
          </div>
        </div>
      </div>

      {(['SECO', 'TORNOZELO', 'JOELHO', 'CINTURA', 'PERIGO'] as NivelAgua[]).map((nivel) => {
        const count = bairros.filter((b) => b.nivel === nivel).length;
        if (count === 0) return null;

        return (
          <div
            key={nivel}
            className="rounded-xl border border-black/5 bg-white/60 px-3 py-2 dark:border-white/5 dark:bg-slate-900/50"
          >
            <p className="text-lg font-bold leading-none">{count}</p>
            <p className="text-muted-foreground text-[11px]">{NIVEL_CONFIG[nivel].label}</p>
          </div>
        );
      })}
    </section>
  );
}
