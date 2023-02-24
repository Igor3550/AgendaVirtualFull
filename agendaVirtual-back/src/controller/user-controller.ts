import { Response, Request } from "express";
import { AuthenticatedRequest } from "../middlewares/authentication-middleware";
import httpStatus from "http-status";

import userService from "../services/user-service";

async function getUserById(req: AuthenticatedRequest, res: Response) {
  const id = req.userId;

  try {
    const user = await userService.getUserById(id);
    return res.send(user);
  } catch (error) {
    if(error.name === "NotFound") return res.sendStatus(httpStatus.NOT_FOUND);
    if(error.name === "BadRequest") return res.sendStatus(httpStatus.BAD_REQUEST);
    if(error.name === "Conflict") return res.sendStatus(httpStatus.CONFLICT);
    if(error.name === "Unauthorized") return res.sendStatus(httpStatus.UNAUTHORIZED);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function createUser(req: Request, res: Response) {
  const { name, email, password } = req.body;

  try {
    const user = await userService.createUser(name, email, password);
    return res.send(user);
  } catch (error) {
    if(error.name === "NotFound") return res.sendStatus(httpStatus.NOT_FOUND);
    if(error.name === "BadRequest") return res.sendStatus(httpStatus.BAD_REQUEST);
    if(error.name === "Conflict") return res.sendStatus(httpStatus.CONFLICT);
    if(error.name === "Unauthorized") return res.sendStatus(httpStatus.UNAUTHORIZED);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function createUserAdmin(req: Request, res: Response) {
  const { name, email, password } = req.body;

  try {
    const user = await userService.createUserAdm(name, email, password);
    return res.send(user);
  } catch (error) {
    if(error.name === "NotFound") return res.sendStatus(httpStatus.NOT_FOUND);
    if(error.name === "BadRequest") return res.sendStatus(httpStatus.BAD_REQUEST);
    if(error.name === "Conflict") return res.sendStatus(httpStatus.CONFLICT);
    if(error.name === "Unauthorized") return res.sendStatus(httpStatus.UNAUTHORIZED);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function updateUser(req: AuthenticatedRequest, res: Response) {
  const id = req.userId;
  const { name, email } = req.body;

  if(!name || !email) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const user = await userService.updateUser(id, name, email);
    return res.send(user);
  } catch (error) {
    if(error.name === "NotFound") return res.sendStatus(httpStatus.NOT_FOUND);
    if(error.name === "BadRequest") return res.sendStatus(httpStatus.BAD_REQUEST);
    if(error.name === "Conflict") return res.sendStatus(httpStatus.CONFLICT);
    if(error.name === "Unauthorized") return res.sendStatus(httpStatus.UNAUTHORIZED);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function deleteUser(req: AuthenticatedRequest, res: Response) {
  const id = req.userId;

  try {
    const user = await userService.deleteUser(id);
    return res.send(user);
  } catch (error) {
    if(error.name === "NotFound") return res.sendStatus(httpStatus.NOT_FOUND);
    if(error.name === "BadRequest") return res.sendStatus(httpStatus.BAD_REQUEST);
    if(error.name === "Conflict") return res.sendStatus(httpStatus.CONFLICT);
    if(error.name === "Unauthorized") return res.sendStatus(httpStatus.UNAUTHORIZED);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

const userController = {
  getUserById,
  createUser,
  createUserAdmin,
  updateUser,
  deleteUser
}

export default userController;