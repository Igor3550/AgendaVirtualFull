import { Request, Response, Router } from "express";
import httpStatus from "http-status";
import { adminVerifyToken } from "../middlewares/admin-verify-middleware";

const verifyRouter = Router();

verifyRouter
  .get('/', adminVerifyToken, (req: Request, res: Response) => {return (res.sendStatus(httpStatus.OK))})

export { verifyRouter };