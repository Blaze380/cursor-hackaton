import type { NivelAgua } from '@/generated/prisma/enums';

export type NivelConfig = {
  label: string;
  descricao: string;
  altura: number;
  badge: string;
  barra: string;
  borda: string;
  texto: string;
};

export const NIVEL_CONFIG: Record<NivelAgua, NivelConfig> = {
  SECO: {
    label: 'Seco',
    descricao: 'Sem acumulação de água',
    altura: 12,
    badge: 'bg-emerald-600 text-white',
    barra: 'bg-emerald-400',
    borda: 'border-emerald-500/30',
    texto: 'text-emerald-700 dark:text-emerald-300',
  },
  TORNOZELO: {
    label: 'Tornozelo',
    descricao: 'Água baixa — atenção',
    altura: 32,
    badge: 'bg-amber-400 text-amber-950',
    barra: 'bg-amber-400',
    borda: 'border-amber-500/40',
    texto: 'text-amber-700 dark:text-amber-300',
  },
  JOELHO: {
    label: 'Joelho',
    descricao: 'Dificulta deslocações',
    altura: 52,
    badge: 'bg-orange-500 text-white',
    barra: 'bg-orange-500',
    borda: 'border-orange-500/40',
    texto: 'text-orange-700 dark:text-orange-300',
  },
  CINTURA: {
    label: 'Cintura',
    descricao: 'Risco elevado de isolamento',
    altura: 72,
    badge: 'bg-red-500 text-white',
    barra: 'bg-red-500',
    borda: 'border-red-500/50',
    texto: 'text-red-700 dark:text-red-300',
  },
  PERIGO: {
    label: 'Perigo',
    descricao: 'Evite a zona imediatamente',
    altura: 95,
    badge: 'bg-red-900 text-white animate-pulse',
    barra: 'bg-red-700 animate-pulse',
    borda: 'border-red-600 ring-2 ring-red-500/40',
    texto: 'text-red-800 dark:text-red-200',
  },
};

export const ORDEM_NIVEL: NivelAgua[] = [
  'SECO',
  'TORNOZELO',
  'JOELHO',
  'CINTURA',
  'PERIGO',
];

export function formatarAtualizadoEm(data: Date) {
  return new Intl.DateTimeFormat('pt-MZ', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date(data));
}
