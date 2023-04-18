import dayjs from "dayjs";
import { Request, Response } from "express";
import httpStatus from "http-status";

import scheduleService from "../services/schedule-service";
import { AuthenticatedRequest } from "../middlewares/authentication-middleware";
import userService from "../services/user-service";

async function sendScheduleList(req: Request, res: Response) {
  try {
    const scheduleList = await scheduleService.getScheduleList();
    return res.send(scheduleList);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function sendClientScheduleList(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  try {
    const user = await userService.getUserById(userId);

    const scheduleList = await scheduleService.getScheduleByClientId(user.clientId);
    return res.send(scheduleList);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function createSchedule(req: Request, res: Response) {
  const { name, date, hour, service_id } = req.body;

  const tratedDate = dayjs(date).toISOString();

  try {
    const schedule = await scheduleService.insertSchedule(name, service_id, tratedDate, hour);
    return res.send(schedule);
  } catch (error) {
    if(error.name === 'BadRequest') return res.sendStatus(httpStatus.BAD_REQUEST);
    if(error.name === 'NotFound') return res.sendStatus(httpStatus.NOT_FOUND);
    if(error.name === 'Conflict') return res.sendStatus(httpStatus.CONFLICT);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function createClientSchedule(req: AuthenticatedRequest, res: Response) {
  const { date, hour, service_id } = req.body;
  const userId = req.userId;

  const tratedDate = dayjs(date).toISOString();

  try {
    const schedule = await scheduleService.insertClientSchedule(userId, service_id, tratedDate, hour);
    return res.send(schedule);
  } catch (error) {
    if(error.name === 'BadRequest') return res.sendStatus(httpStatus.BAD_REQUEST);
    if(error.name === 'NotFound') return res.sendStatus(httpStatus.NOT_FOUND);
    if(error.name === 'Conflict') return res.sendStatus(httpStatus.CONFLICT);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function updateSchedule(req: Request, res: Response) {
  const schedule_id = req.params.id;
  const { name, service_id, date, hour } = req.body;

  const tratedDate = dayjs(date).toISOString();

  try {
    const updatedSchedule = await scheduleService.updateSchedule(Number(schedule_id), name, service_id, tratedDate, hour);
    return res.send(updatedSchedule);
  } catch (error) {
    if(error.name === 'BadRequest') return res.sendStatus(httpStatus.BAD_REQUEST);
    if(error.name === 'NotFound') return res.sendStatus(httpStatus.NOT_FOUND);
    if(error.name === 'Conflict') return res.sendStatus(httpStatus.CONFLICT);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function updateClientSchedule(req: AuthenticatedRequest, res: Response) {
  const schedule_id = req.params.id;
  const { name, service_id, date, hour } = req.body;
  const userId = req.userId;

  const tratedDate = dayjs(date).toISOString();

  try {
    const user = await userService.getUserById(userId);

    const updatedSchedule = await scheduleService.updateClientSchedule(Number(schedule_id), user.clientId, name, service_id, tratedDate, hour);
    return res.send(updatedSchedule);
  } catch (error) {
    if(error.name === 'BadRequest') return res.sendStatus(httpStatus.BAD_REQUEST);
    if(error.name === 'NotFound') return res.sendStatus(httpStatus.NOT_FOUND);
    if(error.name === 'Conflict') return res.sendStatus(httpStatus.CONFLICT);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function deleteSchedule(req: Request, res: Response) {
  const schedule_id = req.params.id;
  if(!schedule_id || isNaN(Number(schedule_id))) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const deletedSchedule = await scheduleService.deleteScheduleById(Number(schedule_id));
    return res.send(deletedSchedule);
  } catch (error) {
    if(error.name === 'BadRequest') return res.sendStatus(httpStatus.BAD_REQUEST);
    if(error.name === 'NotFound') return res.sendStatus(httpStatus.NOT_FOUND);
    if(error.name === 'Conflict') return res.sendStatus(httpStatus.CONFLICT);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function deleteClientSchedule(req: AuthenticatedRequest, res: Response) {
  const schedule_id = req.params.id;
  const userId = req.userId;
  if(!schedule_id || isNaN(Number(schedule_id))) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const user = await userService.getUserById(userId);
    const deletedSchedule = await scheduleService.deleteClientScheduleById(Number(schedule_id), user.clientId);
    return res.send(deletedSchedule);
  } catch (error) {
    if(error.name === 'BadRequest') return res.sendStatus(httpStatus.BAD_REQUEST);
    if(error.name === 'NotFound') return res.sendStatus(httpStatus.NOT_FOUND);
    if(error.name === 'Conflict') return res.sendStatus(httpStatus.CONFLICT);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function finishSchedule(req: Request, res: Response) {
  const schedule_id = req.params.id;
  if(!schedule_id || isNaN(Number(schedule_id))) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const finishedSchedule = await scheduleService.finishScheduleById(Number(schedule_id));
    return res.send(finishedSchedule);
  } catch (error) {
    if(error.name === 'BadRequest') return res.sendStatus(httpStatus.BAD_REQUEST);
    if(error.name === 'NotFound') return res.sendStatus(httpStatus.NOT_FOUND);
    if(error.name === 'Conflict') return res.sendStatus(httpStatus.CONFLICT);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

const scheduleController = {
  sendScheduleList,
  sendClientScheduleList,
  createSchedule,
  createClientSchedule,
  updateSchedule,
  updateClientSchedule,
  deleteSchedule,
  deleteClientSchedule,
  finishSchedule
}

export default scheduleController;
