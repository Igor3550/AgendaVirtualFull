import prisma from "../database/prisma-connection";

async function getUsersList() {
  return await prisma.user.findMany({});
}

async function getUsersByName(name: string) {
  const users = await prisma.user.findMany({
    where:{
      name:{
        contains: name,
        mode: 'insensitive'
      }
    }
  });

  return users;
}

async function getUsersByEmail(email: string) {
  const users = await prisma.user.findFirst({
    where:{
      email
    }
  });

  return users;
}

async function createUser(name: string, email: string, password: string) {
  return await prisma.user.create({
    data:{
      name,
      email,
      password
    }
  });
}

async function createAdminUser(userId: number) {
  return await prisma.userAdmin.create({
    data:{
      userId
    }
  });
}

async function getUserById(id: number) {
  return await prisma.user.findFirst({
    where:{
      id
    }
  });
}

async function updateUser(id: number, name: string, email: string) {
  return await prisma.user.update({
    where:{
      id
    },
    data:{
      name,
      email
    }
  });
}

async function deleteUser(id: number) {
  return await prisma.user.delete({
    where:{
      id
    }
  });
}

const userRepository = {
  getUsersList,
  getUsersByName,
  getUserById,
  getUsersByEmail,
  createUser,
  createAdminUser,
  updateUser,
  deleteUser
}

export default userRepository;