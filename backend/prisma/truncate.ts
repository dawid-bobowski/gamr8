import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearDatabase() {
  await prisma.user.deleteMany({});
  await prisma.game.deleteMany({});
  await prisma.review.deleteMany({});

  console.log('Database cleared');
}

clearDatabase()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
