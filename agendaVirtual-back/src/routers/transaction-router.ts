import { Router } from "express";

import { adminVerifyToken } from "../middlewares/admin-verify-middleware";
import transactionController from "../controller/transaction-controller";

const transactionRouter = Router();

transactionRouter
  .use('/', adminVerifyToken)
  .get('/', transactionController.getAllTransactions)
  .post('/', transactionController.createTransaction)
  .put('/:id', transactionController.updateTransaction)
  .delete('/:id', transactionController.deleteTransaction);

export { transactionRouter };