import { Router } from "express";
import { UserMysqlRepository } from '../repository/user.repository';
import {UserDeleter, UserFinder, UserUpdater} from "../../application/useCases";
import {UserController} from "../controller";

const userRouter = Router();

const userMysqlRepository = new UserMysqlRepository();

// Initialize use cases
const userDelete = new UserDeleter(userMysqlRepository);
const userFinder = new UserFinder(userMysqlRepository);
const userUpdate = new UserUpdater(userMysqlRepository);

// Initialize controllers
const userController = new UserController(userFinder, userUpdate, userDelete);

userRouter.get('/', userController.getUserById);
userRouter.put('/update', userController.update);
userRouter.delete('/delete', userController.delete);

export default userRouter;
