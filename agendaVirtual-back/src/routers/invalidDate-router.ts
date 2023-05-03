import { Router } from "express";
import userController from "../controller/user-controller";
import { adminVerifyToken } from "../middlewares/admin-verify-middleware";
import invalidDateController from "../controller/invalidDate-controller";

const invalidDateRouter = Router();

invalidDateRouter
  .use('/', adminVerifyToken)
  .get('/', invalidDateController.getInvalidDates)
  .get('/:date', invalidDateController.getInvalidDatesByDate)
  .post('/', invalidDateController.createInvalidDate)
  .delete('/:id', invalidDateController.deleteInvalidDate);

export { invalidDateRouter };