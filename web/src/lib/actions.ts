'use server';

import { revalidatePath } from 'next/cache';

import { NivelAgua, type NivelAgua as NivelAguaType } from '@/generated/prisma/enums';
import { getSession } from '@/lib/auth-session';
import { notificarPerigo } from '@/lib/ntfy';
import { prisma } from '@/lib/prisma';

const USSD_TEST_USER_ID = 'ussd-demo-user';

const NIVEIS_VALIDOS = new Set<string>(Object.values(NivelAgua));

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

async function subscreverComUserId(userId: string, bairroId: string) {
  return prisma.subscricao.upsert({
    where: {
      userId_bairroId: {
        userId,
        bairroId,
      },
    },
    create: {
      userId,
      bairroId,
    },
    update: {},
  });
}

async function encontrarBairro(nome: string) {
  const bairros = await prisma.bairro.findMany();
  const normalizado = nome.trim().toLowerCase();

  return bairros.find((bairro) => bairro.nome.toLowerCase() === normalizado) ?? null;
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
  revalidatePath('/admin');

  return bairro;
}

export async function forcarPerigo(bairroId: string): Promise<void> {
  await reportarNivel(bairroId, NivelAgua.PERIGO);
}

export async function subscrever(bairroId: string) {
  const session = await getSession();

  if (!session?.user?.id) {
    throw new Error('Não autenticado');
  }

  return subscreverComUserId(session.user.id, bairroId);
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

export async function processarUSSD(
  _prev: string | null,
  formData: FormData,
): Promise<string> {
  const mensagem = String(formData.get('mensagem') ?? '')
    .trim()
    .toUpperCase();

  if (!mensagem) {
    return 'Mensagem vazia. Use: ALERTA, SUB ou STATUS.';
  }

  if (mensagem === 'STATUS') {
    const bairros = await prisma.bairro.findMany({
      orderBy: { nome: 'asc' },
    });

    if (bairros.length === 0) {
      return 'Nenhum bairro registado.';
    }

    return bairros.map((bairro) => `${bairro.nome}: ${bairro.nivel}`).join('\n');
  }

  if (mensagem.startsWith('ALERTA ')) {
    const partes = mensagem.split(/\s+/);

    if (partes.length < 3) {
      return 'Sintaxe: ALERTA BAIRRO NIVEL';
    }

    const nivel = partes[partes.length - 1];

    if (!NIVEIS_VALIDOS.has(nivel)) {
      return `Nivel invalido: ${nivel}. Use: SECO, TORNOZELO, JOELHO, CINTURA, PERIGO.`;
    }

    const nomeBairro = partes.slice(1, -1).join(' ');
    const bairro = await encontrarBairro(nomeBairro);

    if (!bairro) {
      return `Bairro nao encontrado: ${nomeBairro}`;
    }

    await reportarNivel(bairro.id, nivel as NivelAguaType);

    return `Nivel ${nivel} registado em ${bairro.nome}.`;
  }

  if (mensagem.startsWith('SUB ')) {
    const nomeBairro = mensagem.slice(4).trim();

    if (!nomeBairro) {
      return 'Sintaxe: SUB BAIRRO';
    }

    const bairro = await encontrarBairro(nomeBairro);

    if (!bairro) {
      return `Bairro nao encontrado: ${nomeBairro}`;
    }

    let userId = USSD_TEST_USER_ID;

    try {
      const session = await getSession();
      if (session?.user?.id) {
        userId = session.user.id;
      }
    } catch {
      // Sem contexto de pedido ou sem sessão — usa utilizador de teste USSD.
    }

    await subscreverComUserId(userId, bairro.id);

    return `Subscrito a ${bairro.nome}.`;
  }

  return 'Comando desconhecido. Use: ALERTA, SUB ou STATUS.';
}
