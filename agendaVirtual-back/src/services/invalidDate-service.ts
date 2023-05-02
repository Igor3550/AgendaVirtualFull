import invalidDateRepository from "../repositories/invalidDate-repository";
import { badRequest, notFound, conflict, unauthorizedError } from "../errors/errors";
import userService from "./user-service";

async function getAllInvalidDates() {
  return await invalidDateRepository.getAll();
}

async function getInvalidByDate(date: string) {
  return await invalidDateRepository.getByDate(date);
}

async function createInvalidDate(userId: number, date: string, description: string) {
  const user = await userService.getUserById(userId);
  if(!user) throw badRequest();
  const Idate = await invalidDateRepository.getByDate(date);
  if(Idate) throw conflict();
  return await invalidDateRepository.createInvalidDate(userId, date, description);
}

async function deleteInvalidDate(id: number) {
  const date = await invalidDateRepository.getById(id);
  if(!date) throw notFound();
  return await invalidDateRepository.deletetInvalidDate(id);
}

const invalidDateService = {
  getAllInvalidDates,
  getInvalidByDate,
  createInvalidDate,
  deleteInvalidDate
}

export default invalidDateService;
