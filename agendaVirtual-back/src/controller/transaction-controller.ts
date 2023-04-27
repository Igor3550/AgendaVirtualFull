import { Response, Request } from "express";
import { AuthenticatedRequest } from "../middlewares/authentication-middleware";
import httpStatus from "http-status";

import transactionService from "../services/transaction-service";

async function getAllTransactions(req: AuthenticatedRequest, res: Response) {
  try {
    const transactions = await transactionService.getTransactions();
    return res.send(transactions);
  } catch (error) {
    if(error.name === "NotFound") return res.sendStatus(httpStatus.NOT_FOUND);
    if(error.name === "BadRequest") return res.sendStatus(httpStatus.BAD_REQUEST);
    if(error.name === "Conflict") return res.sendStatus(httpStatus.CONFLICT);
    if(error.name === "Unauthorized") return res.sendStatus(httpStatus.UNAUTHORIZED);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function createTransaction(req: Request, res: Response) {
  const { type, value } = req.body;

  try {
    const transactions = await transactionService.createTransaction(type, Number(value));
    return res.send(transactions);
  } catch (error) {
    if(error.name === "NotFound") return res.sendStatus(httpStatus.NOT_FOUND);
    if(error.name === "BadRequest") return res.sendStatus(httpStatus.BAD_REQUEST);
    if(error.name === "Conflict") return res.sendStatus(httpStatus.CONFLICT);
    if(error.name === "Unauthorized") return res.sendStatus(httpStatus.UNAUTHORIZED);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function updateTransaction(req: AuthenticatedRequest, res: Response) {
  const { type, value } = req.body;
  const id = req.params.id;

  try {
    const transactions = await transactionService.updateTransaction(Number(id), type, Number(value));
    return res.send(transactions);
  } catch (error) {
    if(error.name === "NotFound") return res.sendStatus(httpStatus.NOT_FOUND);
    if(error.name === "BadRequest") return res.sendStatus(httpStatus.BAD_REQUEST);
    if(error.name === "Conflict") return res.sendStatus(httpStatus.CONFLICT);
    if(error.name === "Unauthorized") return res.sendStatus(httpStatus.UNAUTHORIZED);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function deleteTransaction(req: AuthenticatedRequest, res: Response) {
  const id = req.params.id;

  try {
    const transactions = await transactionService.deleteTransaction(Number(id));
    return res.send(transactions);
  } catch (error) {
    if(error.name === "NotFound") return res.sendStatus(httpStatus.NOT_FOUND);
    if(error.name === "BadRequest") return res.sendStatus(httpStatus.BAD_REQUEST);
    if(error.name === "Conflict") return res.sendStatus(httpStatus.CONFLICT);
    if(error.name === "Unauthorized") return res.sendStatus(httpStatus.UNAUTHORIZED);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

const transactionController = {
  getAllTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction
}

export default transactionController;