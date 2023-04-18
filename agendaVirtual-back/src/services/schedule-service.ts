import scheduleRepository from '../repositories/schedule-repository';
import serviceRepository from '../repositories/service-repository';
import { notFound, badRequest, conflict } from '../errors/errors';
import { verifyDate } from '../utils/verify-date';
import clientService from './client-service';
import userService from './user-service';

async function verifyServiceAndDate(schedule_id: number, service_id: number, date: string, hour: number) {
  const service = await serviceRepository.findById(service_id);
  
  if(!service) {
    throw badRequest();
  };

  const dateVerify = await verifyDate(schedule_id, date, hour, service);

  if(!dateVerify.hourIsAvailable) {
    throw badRequest();
  };
}

async function getScheduleList() {
  const scheduleList = await scheduleRepository.listSchedule();

  return scheduleList;
}

async function getScheduleByClientId(clientId: number) {
  const scheduleList = await scheduleRepository.listScheduleByClient(clientId);

  return scheduleList;
}

async function insertSchedule(name: string, service_id: number, date: string, hour: number) {
  await verifyServiceAndDate(null, service_id, date, hour);

  let client = await clientService.getClientByName(name);

  if(!client) {
    client = await clientService.createClient(name);
  }

  const schedule = await scheduleRepository.insertSchedule(name, client.id, service_id, date, hour);

  return schedule;
}

async function insertClientSchedule(userId: number, service_id: number, date: string, hour: number) {
  await verifyServiceAndDate(null, service_id, date, hour);
  const user = await userService.getUserById(userId);
  const name = user.name;

  let client = await clientService.getClientByName(name);

  if(!client) {
    client = await clientService.createClient(name);
  }

  const openSchedule = await scheduleRepository.getOpenClientSchedule(client.id);

  if(openSchedule) throw conflict();

  const schedule = await scheduleRepository.insertSchedule(name, client.id, service_id, date, hour);

  return schedule;
}

async function updateSchedule(id: number, name: string, service_id: number, date: string, hour: number){
  const schedule = await scheduleRepository.getScheduleById(id);
  
  await verifyServiceAndDate(id, service_id, date, hour);

  if(!schedule) throw notFound();

  const updatedSchedule = await scheduleRepository.updateSchedule(id, name, service_id, date, hour);

  return updatedSchedule;
}

async function updateClientSchedule(id: number, clientId: number, name: string, service_id: number, date: string, hour: number){
  const schedule = await scheduleRepository.verifyClientSchedule(clientId, id);
  
  await verifyServiceAndDate(id, service_id, date, hour);

  if(!schedule) throw notFound();

  const updatedSchedule = await scheduleRepository.updateSchedule(id, name, service_id, date, hour);

  return updatedSchedule;
}

async function deleteScheduleById(id: number) {
  const schedule = await scheduleRepository.getScheduleById(id);
  if(!schedule) throw notFound();

  const deletedSchedule = await scheduleRepository.deleteScheduleById(id);
  return deletedSchedule;
}

async function deleteClientScheduleById(id: number, clientId: number,) {
  const schedule = await scheduleRepository.verifyClientSchedule(clientId, id);
  if(!schedule) throw notFound();

  const deletedSchedule = await scheduleRepository.deleteScheduleById(id);
  return deletedSchedule;
}

async function finishScheduleById(id: number) {
  const schedule = await scheduleRepository.getScheduleById(id);
  if(!schedule) throw notFound();
  if(schedule.finished) throw badRequest();

  const finishedSchedule = await scheduleRepository.finishSchedule(id);
  return finishedSchedule;
}

const scheduleService = {
  getScheduleList,
  getScheduleByClientId,
  insertSchedule,
  insertClientSchedule,
  updateSchedule,
  updateClientSchedule,
  deleteScheduleById,
  deleteClientScheduleById,
  finishScheduleById
}

export default scheduleService;
