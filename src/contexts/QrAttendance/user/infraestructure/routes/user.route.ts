
import { Router } from "express";
import { UserMysqlRepository } from '../repository/userMysqlRepository';
import { UserUseCase } from '../../application/userUseCase';
import { UserController } from '../controller/user.controller';
import { UserMapperService } from '../mappers/user.mapper';
import {BcryptAdapter} from "../adapters/bcryptAdapter";
import {UuidAdapter} from "../adapters/uuid.adapter";

const userRouter = Router();

/**
 * Iniciamos los adaptadores
 */
const bycriptAdapter = new BcryptAdapter();
const uuidAdapter = new UuidAdapter();

/**
 * Iniciamos el repositorio
 */

const mysqlRepository = new UserMysqlRepository(new UserMapperService());

/**
 * Iniciamos casos de uso 
 */
const userUseCase = new UserUseCase(mysqlRepository);

/**
 * Iniciamos el User controllers
 */
const userCtrl = new UserController(userUseCase, bycriptAdapter, uuidAdapter);

/**
 * 
 */
userRouter.get('/user', userCtrl.getCtrl);
userRouter.post('/api/user/signin', userCtrl.insertCtrl);

export default userRouter;
