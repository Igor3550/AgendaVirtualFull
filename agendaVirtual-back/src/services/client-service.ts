import { badRequest } from '../errors/errors';
import clientRepository from "../repositories/client-repository";

async function getAllClients() {
  return await clientRepository.findAllClients();
}

async function getClientByName(name: string) {
  return await clientRepository.getClientByName(name);
}

async function createClient(name: string) {
  if(name.length <= 2) throw badRequest();
  return await clientRepository.createClient(name);
}

const clientService = {
  getAllClients,
  getClientByName,
  createClient
}

export default clientService;
