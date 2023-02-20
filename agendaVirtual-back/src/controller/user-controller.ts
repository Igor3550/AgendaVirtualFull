import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authentication-middleware";
import httpStatus from "http-status";

import userService from "../services/user-service";

async function getUserById(req: AuthenticatedRequest, res: Response) {
  const id = req.userId;

  try {
    const user = userService.getUserById(id);
    return res.send(user)
  } catch (error) {
    if(error.name === "notFound") return res.sendStatus(httpStatus.NOT_FOUND);
    if(error.name === "badRequest") return res.sendStatus(httpStatus.BAD_REQUEST);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

const userController = {
  getUserById
}

export default userController;