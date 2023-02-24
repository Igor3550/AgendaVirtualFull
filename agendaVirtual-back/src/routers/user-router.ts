import { Router } from "express";
import userController from "../controller/user-controller";
import { authenticateToken } from "../middlewares/authentication-middleware";
import { verifyUserInput } from "../middlewares/user-input-middleware";

const userRouter = Router();

userRouter
  .get('/', authenticateToken, userController.getUserById)
  .post('/', verifyUserInput, userController.createUser)
  .post('/adm', verifyUserInput, userController.createUserAdmin)
  .put('/', authenticateToken, userController.updateUser)
  .delete('/', authenticateToken, userController.deleteUser);

export { userRouter };