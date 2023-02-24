import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import userRepository from "../repositories/user-repository";
import { conflict, notFound } from "../errors/errors";
import { exclude } from "../utils/prisma-utils";

async function verifyEmail(email: string) {
  const user = await userRepository.getUsersByEmail(email);
  return user;
}

async function getUsersList() {
  const user = await userRepository.getUsersList();
  return user;
}

async function getUserById(id: number) {
  const user = await userRepository.getUserById(id);
  if(!user) throw notFound();
  delete user.password;
  return user;
}

async function getUsersByName(name: string) {
  const user = await userRepository.getUsersByName(name);
  return user;
}

async function createUser(name: string, email: string, password: string): Promise<CreateRes> {
  const userExists = await verifyEmail(email);
  if(userExists) throw conflict();

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userRepository.createUser(name, email, hashedPassword);

  return {
    user: exclude(user, "password")
  };
}

async function createUserAdm(name: string, email: string, password: string): Promise<CreateRes> {
  const userExists = await verifyEmail(email);
  if(userExists) throw conflict();

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userRepository.createUser(name, email, hashedPassword);

  await userRepository.createAdminUser(user.id);

  return {
    user: exclude(user, "password")
  };
}

async function updateUser(id: number, name: string, email: string) {
  const userExists = await userRepository.getUserById(id);
  if(!userExists) throw notFound();

  const user = await userRepository.updateUser(id, name, email);
  delete user.password;
  return user;
}

async function deleteUser(id: number) {
  const userExists = await userRepository.getUserById(id);
  if(!userExists) throw notFound();

  const user = await userRepository.getUserById(id);
  delete user.password;
  return user;
}

type CreateRes = {
  user: Pick<User, "id" | "email">;
};

const userService = {
  getUserById,
  getUsersList,
  getUsersByName,
  createUser,
  createUserAdm,
  updateUser,
  deleteUser
};

export default userService;