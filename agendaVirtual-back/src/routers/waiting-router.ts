import { Router } from "express";
import waitingController from "../controller/waiting-controller";
import { adminVerifyToken } from "../middlewares/admin-verify-middleware";

const waitingRouter = Router();

waitingRouter
  .get('/', waitingController.getWaitingList)
  .use('/', adminVerifyToken)
  .post('/', waitingController.createWaiting)
  .put('/:id', waitingController.updateWaiting)
  .delete('/:id', waitingController.deleteWaiting);

export { waitingRouter };