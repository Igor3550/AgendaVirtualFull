import prisma from "../database/prisma-connection";

async function getAll() {
  return await prisma.invalidDate.findMany({});
}

async function getById(id: number) {
  return await prisma.invalidDate.findFirst({
    where:{
      id
    }
  });
}

async function getByDate(date: string) {
  return await prisma.invalidDate.findFirst({
    where:{
      date
    }
  });
}

async function createInvalidDate(userId: number, date: string, description: string) {
  return await prisma.invalidDate.create({
    data:{
      userId,
      date: date,
      description
    }
  });
}

async function deletetInvalidDate(id: number) {
  return await prisma.invalidDate.delete({
    where:{
      id
    }
  });
}

const invalidDateRepository = {
  getAll,
  getById,
  getByDate,
  createInvalidDate,
  deletetInvalidDate
}

export default invalidDateRepository;