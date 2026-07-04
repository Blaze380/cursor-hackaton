import 'dotenv/config';
import { PrismaClient } from '../../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL as string,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Running dev seed...');

  const bairros = ['Polana', 'Mavalane', 'Baixa', 'Malhangalene'];

  for (const nome of bairros) {
    await prisma.bairro.upsert({
      where: { nome },
      create: { nome },
      update: {},
    });
  }

  console.log(`Dev seed completed (${bairros.length} bairros).`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
