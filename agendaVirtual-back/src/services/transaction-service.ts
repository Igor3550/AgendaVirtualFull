import { TransactionType } from "@prisma/client";
import { badRequest, notFound, conflict, unauthorizedError } from "../errors/errors";
import transactionRepository from "../repositories/transaction-repository";

function verifyTransactionTypeInput(typeInput: string): TransactionType {
  if(typeInput.toUpperCase() == TransactionType.ENTRY){
    return TransactionType.ENTRY
  }
  if(typeInput.toUpperCase() === TransactionType.WITHDRAW){
    return TransactionType.WITHDRAW
  }
  return undefined;
}

async function getTransactions() {
  return await transactionRepository.getAllTransactions();
}

async function createTransaction(type: string, value: number, description: string) {
  const transactionType = verifyTransactionTypeInput(type);
  if(!transactionType) throw badRequest();
  return await transactionRepository.createTransaction(transactionType, value, description);
}

async function updateTransaction(id:number, type: string, value: number, description: string) {
  const transaction = await transactionRepository.getTransactionById(id);
  if(!transaction) throw notFound();
  const transactionType = verifyTransactionTypeInput(type);
  if(!transactionType) throw badRequest();
  return await transactionRepository.updateTransaction(id, transactionType, value, description);
}

async function deleteTransaction(id:number) {
  const transaction = await transactionRepository.getTransactionById(id);
  if(!transaction) throw notFound();
  return await transactionRepository.deleteTransaction(id);
}

const transactionService = {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction
}

export default transactionService;