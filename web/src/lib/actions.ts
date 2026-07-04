'use server';

import { revalidatePath } from 'next/cache';

import { NivelAgua, type NivelAgua as NivelAguaType } from '@/generated/prisma/enums';
import { getSession } from '@/lib/auth-session';
import { notificarPerigo } from '@/lib/ntfy';
import { prisma } from '@/lib/prisma';

function nivelAleatorio(): NivelAguaType {
  if (Math.random() < 0.08) return NivelAgua.PERIGO;

  const outros = [
    NivelAgua.SECO,
    NivelAgua.TORNOZELO,
    NivelAgua.JOELHO,
    NivelAgua.CINTURA,
  ];

  return outros[Math.floor(Math.random() * outros.length)];
}

export async function reportarNivel(bairroId: string, nivel: NivelAguaType) {
  const bairro = await prisma.bairro.update({
    where: { id: bairroId },
    data: { nivel },
  });

  if (nivel === NivelAgua.PERIGO) {
    try {
      await notificarPerigo(bairro.nome);
    } catch (error) {
      console.error('Falha ao notificar via ntfy:', error);
    }
  }

  revalidatePath('/');

  return bairro;
}

export async function subscrever(bairroId: string) {
  const session = await getSession();

  if (!session?.user?.id) {
    throw new Error('Não autenticado');
  }

  return prisma.subscricao.upsert({
    where: {
      userId_bairroId: {
        userId: session.user.id,
        bairroId,
      },
    },
    create: {
      userId: session.user.id,
      bairroId,
    },
    update: {},
  });
}

export async function simularLeituraSensor() {
  const bairros = await prisma.bairro.findMany();

  if (bairros.length === 0) {
    throw new Error('Nenhum bairro registado');
  }

  const bairro = bairros[Math.floor(Math.random() * bairros.length)];
  const nivel = nivelAleatorio();

  return reportarNivel(bairro.id, nivel);
}
