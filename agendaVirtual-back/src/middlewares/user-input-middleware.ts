import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import Joi from 'joi';

const scheduleSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required()
});

export function verifyUserInput(req: Request, res: Response, next: NextFunction) {
  const body = req.body;

  try {
    const bodyVerify = scheduleSchema.validate(body);
    if(bodyVerify.error) return res.sendStatus(httpStatus.BAD_REQUEST);
    return next();
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
