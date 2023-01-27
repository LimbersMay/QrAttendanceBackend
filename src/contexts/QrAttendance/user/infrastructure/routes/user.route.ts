
import { Router } from "express";
import { UserMysqlRepository } from '../repository/user.repository';
import { UserService } from '../../application/user.service';
import { UserController } from '../controller/user.controller';
import { UserMapperService } from '../mappers/user.mapper';
import {BcryptAdapter} from "../adapters/bcryptAdapter";
import {UuidAdapter} from "../adapters/uuid.adapter";

const userRouter = Router();

/**
 * Iniciamos los adaptadores
 */
const bcryptAdapter = new BcryptAdapter();
const uuidAdapter = new UuidAdapter();

const userMapperService = new UserMapperService();

/**
 * Iniciamos el repositorio
 */

const mysqlRepository = new UserMysqlRepository();

/**
 * Iniciamos casos de uso 
 */
const userService = new UserService(mysqlRepository, bcryptAdapter, userMapperService, uuidAdapter);

/**
 * Iniciamos el User controllers
 */
const userCtrl = new UserController(userService);

/**
 * 
 */
userRouter.get('/', userCtrl.getUserById);
userRouter.post('/register', userCtrl.createUser);
userRouter.put('/update', userCtrl.updateUser);
userRouter.delete('/delete', userCtrl.deleteUser);

export default userRouter;
