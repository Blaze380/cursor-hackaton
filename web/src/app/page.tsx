import { ListaBairros } from '@/components/lista-bairros';
import { SensorWorker } from '@/components/sensor-worker';
import { prisma } from '@/lib/prisma';

export const metadata = {
  title: 'Alerta de Cheias — Maputo',
  description: 'Monitorização colaborativa do nível de água por bairro',
};

export default async function HomePage() {
  const bairros = await prisma.bairro.findMany({
    orderBy: { nome: 'asc' },
  });

  return (
    <main className="bg-background min-h-screen">
      <SensorWorker />
      <ListaBairros bairros={bairros} />
    </main>
  );
}
