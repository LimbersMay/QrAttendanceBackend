import { Router } from "express";
import { UserMysqlRepository } from '../repository/user.repository';
import {UserDeleteController, UserGetController, UserUpdateController} from "../controller";
import {UserDeleter, UserFinder} from "../../application/useCases";
import {UserUpdater} from "../../application/useCases/update/user.updater";

const userRouter = Router();

const userMysqlRepository = new UserMysqlRepository();

// Initialize use cases
const userDelete = new UserDeleter(userMysqlRepository);
const userFinder = new UserFinder(userMysqlRepository);
const userUpdate = new UserUpdater(userMysqlRepository);

// Initialize controllers
const userDeleteController = new UserDeleteController(userDelete);
const userGetController = new UserGetController(userFinder);
const userUpdateController = new UserUpdateController(userUpdate);

userRouter.get('/', userGetController.getUserById);
userRouter.put('/update', userUpdateController.update);
userRouter.delete('/delete', userDeleteController.delete);

export default userRouter;
