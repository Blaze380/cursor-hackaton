import { ListaBairros } from '@/components/lista-bairros';
import { AppShell } from '@/components/alerta/app-shell';
import { SensorWorker } from '@/components/sensor-worker';
import { getSession } from '@/lib/auth-session';
import { prisma } from '@/lib/prisma';

export const metadata = {
  title: 'Alerta de Cheias — Maputo',
  description: 'Monitorização colaborativa do nível de água por bairro',
};

export default async function HomePage() {
  const [bairros, session] = await Promise.all([
    prisma.bairro.findMany({ orderBy: { nome: 'asc' } }),
    getSession(),
  ]);

  const subscritoIds = session?.user?.id
    ? (
        await prisma.subscricao.findMany({
          where: { userId: session.user.id },
          select: { bairroId: true },
        })
      ).map((s) => s.bairroId)
    : [];

  return (
    <AppShell>
      <SensorWorker />
      <ListaBairros bairros={bairros} subscritoIds={subscritoIds} />
    </AppShell>
  );
}
