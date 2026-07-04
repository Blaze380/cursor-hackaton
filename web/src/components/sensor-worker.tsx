'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { simularLeituraSensor } from '@/lib/actions';

export function SensorWorker() {
  const router = useRouter();

  useEffect(() => {
    async function tick() {
      try {
        await simularLeituraSensor();
        router.refresh();
      } catch (error) {
        console.error('Falha ao simular leitura de sensor:', error);
      }
    }

    const interval = setInterval(() => {
      void tick();
    }, 6000);

    return () => clearInterval(interval);
  }, [router]);

  return null;
}
