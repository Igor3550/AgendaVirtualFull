import prisma from "../database/prisma-connection";

async function create(userId: number, token: string) {
  const session = await prisma.session.create({
    data:{
      userId,
      token
    }
  });

  return session;
}

const sessionRepository = {
  create
}

export default sessionRepository;