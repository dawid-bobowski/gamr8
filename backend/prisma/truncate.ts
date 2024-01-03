import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearDatabase() {
  await prisma.review.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.game.deleteMany({});

  await prisma.$executeRaw`ALTER TABLE Review AUTO_INCREMENT = 1;`;
  await prisma.$executeRaw`ALTER TABLE User AUTO_INCREMENT = 1;`;
  await prisma.$executeRaw`ALTER TABLE Game AUTO_INCREMENT = 1;`;


  console.log('Database cleared');
}

clearDatabase()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
