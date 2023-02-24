import { Request, Response } from "express";
import httpStatus from "http-status";
import authenticationService from "../services/auth-service";

async function signIn(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const session = await authenticationService.signIn({email, password});
    return res.send(session);
  } catch (error) {
    if(error.name === "NotFound") return res.sendStatus(httpStatus.NOT_FOUND);
    if(error.name === "BadRequest") return res.sendStatus(httpStatus.BAD_REQUEST);
    if(error.name === "Conflict") return res.sendStatus(httpStatus.CONFLICT);
    if(error.name === "Unauthorized") return res.sendStatus(httpStatus.UNAUTHORIZED);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

const authController = {
  signIn
};

export default authController;
