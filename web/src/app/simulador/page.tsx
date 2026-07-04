'use client';

import Link from 'next/link';
import { useActionState, useRef, useState } from 'react';
import {
  Battery,
  ChevronLeft,
  MessageSquare,
  Radio,
  Signal,
  Wifi,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { processarUSSD } from '@/lib/actions';

const COMANDOS_RAPIDOS = [
  { label: 'STATUS', mensagem: 'STATUS' },
  { label: 'ALERTA Polana', mensagem: 'ALERTA Polana PERIGO' },
  { label: 'SUB Mavalane', mensagem: 'SUB Mavalane' },
] as const;

export default function SimuladorPage() {
  const [resposta, formAction, isPending] = useActionState(processarUSSD, null);
  const [mensagem, setMensagem] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  function aplicarComando(cmd: string) {
    setMensagem(cmd);
    formRef.current?.querySelector<HTMLInputElement>('input[name="mensagem"]')?.focus();
  }

  return (
    <main className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100">
      <div className="border-b border-zinc-800 px-4 py-3">
        <div className="mx-auto flex max-w-md items-center gap-3">
          <Link
            href="/"
            className="text-muted-foreground hover:text-zinc-100 flex items-center gap-1 text-xs"
          >
            <ChevronLeft className="size-4" />
            Mapa
          </Link>
          <div className="min-w-0 flex-1 text-center">
            <p className="text-sm font-semibold">Simulador USSD / SMS</p>
            <p className="text-muted-foreground text-[11px]">Sem custo de operadora</p>
          </div>
          <Radio className="text-sky-400 size-4" />
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center p-4 pb-24">
        <div className="w-full max-w-xs">
          <div className="overflow-hidden rounded-[2rem] border-[6px] border-zinc-700 bg-black shadow-2xl shadow-black/50">
            <div className="flex items-center justify-between bg-zinc-900 px-4 py-2 text-[10px] text-zinc-400">
              <span>09:41</span>
              <div className="flex items-center gap-1">
                <Signal className="size-3" />
                <Wifi className="size-3" />
                <Battery className="size-3" />
              </div>
            </div>

            <div className="border-b border-zinc-800 px-4 py-2">
              <div className="flex items-center gap-2">
                <MessageSquare className="size-3.5 text-green-500" />
                <p className="font-mono text-xs text-zinc-400">+258 84 • SMS</p>
              </div>
            </div>

            <div className="min-h-[180px] p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap">
              {resposta ? (
                <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-wider text-zinc-500">Resposta</p>
                  <p className="text-green-400">{resposta}</p>
                </div>
              ) : (
                <div className="space-y-3 text-zinc-600">
                  <p>Digite um comando USSD:</p>
                  <ul className="space-y-1 text-xs">
                    <li>
                      <span className="text-zinc-500">STATUS</span> — níveis actuais
                    </li>
                    <li>
                      <span className="text-zinc-500">ALERTA BAIRRO NIVEL</span>
                    </li>
                    <li>
                      <span className="text-zinc-500">SUB BAIRRO</span> — subscrever
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <form ref={formRef} action={formAction} className="space-y-3 border-t border-zinc-800 p-4">
              <label className="block space-y-1">
                <span className="font-mono text-[10px] tracking-wide text-zinc-500 uppercase">
                  Número remetente
                </span>
                <input
                  name="numero"
                  type="text"
                  defaultValue="+258 84 000 0000"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5 font-mono text-sm text-zinc-100 outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
                />
              </label>

              <label className="block space-y-1">
                <span className="font-mono text-[10px] tracking-wide text-zinc-500 uppercase">
                  Mensagem
                </span>
                <input
                  name="mensagem"
                  type="text"
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  placeholder="ALERTA Polana PERIGO"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5 font-mono text-sm text-zinc-100 outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
                />
              </label>

              <div className="flex flex-wrap gap-1.5">
                {COMANDOS_RAPIDOS.map((cmd) => (
                  <button
                    key={cmd.label}
                    type="button"
                    onClick={() => aplicarComando(cmd.mensagem)}
                    className="rounded-full border border-zinc-700 bg-zinc-900 px-2.5 py-1 font-mono text-[10px] text-zinc-400 transition-colors hover:border-sky-700 hover:text-sky-300"
                  >
                    {cmd.label}
                  </button>
                ))}
              </div>

              <Button
                type="submit"
                className="w-full bg-green-700 font-mono hover:bg-green-600"
                disabled={isPending}
              >
                {isPending ? <Spinner className="size-4" /> : 'Enviar SMS'}
              </Button>
            </form>
          </div>
        </div>
      </div>

      <nav className="fixed inset-x-0 bottom-0 border-t border-zinc-800 bg-zinc-950/95 backdrop-blur">
        <div className="mx-auto grid max-w-md grid-cols-3 gap-1 p-2">
          <Button asChild variant="ghost" size="sm" className="text-zinc-400">
            <Link href="/">Mapa</Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="text-zinc-400">
            <Link href="/admin">Admin</Link>
          </Button>
          <Button size="sm" className="bg-sky-700 hover:bg-sky-600">
            USSD
          </Button>
        </div>
      </nav>
    </main>
  );
}
