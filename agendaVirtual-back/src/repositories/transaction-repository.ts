import { TransactionType } from "@prisma/client";
import prisma from "../database/prisma-connection";

async function getAllTransactions() {
  return await prisma.transaction.findMany({});
}

async function getTransactionById(id: number) {
  return await prisma.transaction.findFirst({
    where:{
      id
    }
  });
}

async function createTransaction(type: TransactionType, value: number, description: string) {
  return await prisma.transaction.create({
    data:{
      type,
      value,
      description
    }
  });
}

async function updateTransaction(id: number, type: TransactionType, value: number, description: string) {
  return await prisma.transaction.update({
    where:{
      id
    },
    data:{
      type,
      value,
      description
    }
  });
}

async function deleteTransaction(id: number) {
  return await prisma.transaction.delete({
    where:{
      id
    }
  });
}

const transactionRepository = {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction
}

export default transactionRepository;