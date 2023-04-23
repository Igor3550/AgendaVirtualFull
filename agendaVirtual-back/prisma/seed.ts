import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  let UnavailableDate = await prisma.service.findFirst({
    where: {
      name: "UnavailableDate"
    }
  })

  if (!UnavailableDate) {
    UnavailableDate = await prisma.service.create({
      data: {
        name: "UnavailableDate",
        duration: 8,
        price: 1
      },
    });
  }

  console.log({ UnavailableDate });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
