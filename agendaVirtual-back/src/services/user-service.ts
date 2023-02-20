import userRepository from "../repositories/user-repository";
import { conflict, notFound } from "../errors/errors";

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

async function createUser(name: string, email: string, password: string) {
  const userExists = await verifyEmail(email);
  if(userExists) throw conflict();

  const user = await userRepository.createUser(name, email, password);
  delete user.password;
  return user;
}

async function updateUser(id: number, name: string, email: string, password: string) {
  const userExists = await userRepository.getUserById(id);
  if(!userExists) throw notFound();

  const user = await userRepository.updateUser(id, name, email, password);
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

const userService = {
  getUserById,
  getUsersList,
  getUsersByName,
  createUser,
  updateUser,
  deleteUser
};

export default userService;