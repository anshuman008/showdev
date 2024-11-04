const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Add your demo data here. Example:
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
  });

  await prisma.user.create({
    data: {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
    },
  });

  console.log("Demo data seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
