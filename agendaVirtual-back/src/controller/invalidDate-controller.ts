import { Response, Request } from "express";
import { AuthenticatedRequest } from "../middlewares/authentication-middleware";
import httpStatus from "http-status";

import invalidDateService from "../services/invalidDate-service";
import dayjs from "dayjs";

async function getInvalidDates(req: AuthenticatedRequest, res: Response) {

  try {
    const invalidDates = await invalidDateService.getAllInvalidDates();
    return res.send(invalidDates);
  } catch (error) {
    if(error.name === "NotFound") return res.sendStatus(httpStatus.NOT_FOUND);
    if(error.name === "BadRequest") return res.sendStatus(httpStatus.BAD_REQUEST);
    if(error.name === "Conflict") return res.sendStatus(httpStatus.CONFLICT);
    if(error.name === "Unauthorized") return res.sendStatus(httpStatus.UNAUTHORIZED);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function getInvalidDatesByDate(req: AuthenticatedRequest, res: Response) {

  const { date } = req.body;

  if(!date) return res.sendStatus(httpStatus.BAD_REQUEST);

  const tratedDate = dayjs(date).toISOString();

  try {
    const invalidDates = await invalidDateService.getInvalidByDate(tratedDate);
    return res.send(invalidDates);
  } catch (error) {
    if(error.name === "NotFound") return res.sendStatus(httpStatus.NOT_FOUND);
    if(error.name === "BadRequest") return res.sendStatus(httpStatus.BAD_REQUEST);
    if(error.name === "Conflict") return res.sendStatus(httpStatus.CONFLICT);
    if(error.name === "Unauthorized") return res.sendStatus(httpStatus.UNAUTHORIZED);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function createInvalidDate(req: AuthenticatedRequest, res: Response) {

  const { date, description } = req.body;
  const userId = req.userId;

  if(!date || !description) return res.sendStatus(httpStatus.BAD_REQUEST);

  const tratedDate = dayjs(date).toISOString();

  try {
    const invalidDates = await invalidDateService.createInvalidDate(Number(userId), tratedDate, description);
    return res.send(invalidDates);
  } catch (error) {
    console.log(error);
    if(error.name === "NotFound") return res.sendStatus(httpStatus.NOT_FOUND);
    if(error.name === "BadRequest") return res.sendStatus(httpStatus.BAD_REQUEST);
    if(error.name === "Conflict") return res.sendStatus(httpStatus.CONFLICT);
    if(error.name === "Unauthorized") return res.sendStatus(httpStatus.UNAUTHORIZED);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function deleteInvalidDate(req: AuthenticatedRequest, res: Response) {

  const id = req.params.id;

  if(!id) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const invalidDates = await invalidDateService.deleteInvalidDate(Number(id));
    return res.send(invalidDates);
  } catch (error) {
    if(error.name === "NotFound") return res.sendStatus(httpStatus.NOT_FOUND);
    if(error.name === "BadRequest") return res.sendStatus(httpStatus.BAD_REQUEST);
    if(error.name === "Conflict") return res.sendStatus(httpStatus.CONFLICT);
    if(error.name === "Unauthorized") return res.sendStatus(httpStatus.UNAUTHORIZED);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
} 

const invalidDateController = {
  getInvalidDates,
  getInvalidDatesByDate,
  createInvalidDate,
  deleteInvalidDate
}

export default invalidDateController;