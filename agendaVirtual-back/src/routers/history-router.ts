import { Router } from "express";

import historyController from "../controller/history-controller";
import { adminVerifyToken } from "../middlewares/admin-verify-middleware";

const historyRouter = Router();

historyRouter
  .use('/', adminVerifyToken)
  .get('/', historyController.listHistory);

export { historyRouter };