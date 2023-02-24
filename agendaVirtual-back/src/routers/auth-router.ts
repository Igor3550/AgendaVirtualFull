import { Router } from "express";
import authController from "../controller/auth-controller";

const auhtRouter = Router();

auhtRouter
  .post('/', authController.signIn);

export { auhtRouter };