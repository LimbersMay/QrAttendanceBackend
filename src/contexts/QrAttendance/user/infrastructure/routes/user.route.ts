import { Router } from "express";
import {UserControllerInjected as userController} from "../../../../../apps/QrAttendance/dependency-injection/container";

const userRouter = Router();

userRouter.get('/', userController.getUserById);
userRouter.put('/update', userController.update);
userRouter.delete('/delete', userController.delete);

export default userRouter;
