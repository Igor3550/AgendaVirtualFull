import prisma from "../database/prisma-connection";

async function getClientByName(name: string) {
  return await prisma.client.findFirst({
    where: {
      name
    }
  })
}

async function findAllClients() {
  return await prisma.client.findMany();
}

async function findClientByName(name: string) {
  return await prisma.client.findFirst({
    where: {
      name: {
        contains: name,
        mode: "insensitive"
      }
    }
  })
}

async function createClient(name: string) {
  return await prisma.client.create({
    data: {
      name
    }
  })
}

async function deleteClient(id: number) {
  return await prisma.client.delete({
    where: {
      id
    }
  })
}

const clientRepository = {
  findAllClients,
  getClientByName,
  findClientByName,
  createClient,
  deleteClient
}

export default clientRepository;
