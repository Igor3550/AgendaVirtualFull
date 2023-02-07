import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  let service_test = await prisma.service.findFirst({
    where: {
      name: "service_test"
    }
  })

  if (!service_test) {
    service_test = await prisma.service.create({
      data: {
        name: "service_test",
        duration: 2,
        price: 100
      },
    });
  }

  console.log({ service_test });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
