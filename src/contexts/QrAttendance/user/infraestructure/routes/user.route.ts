
import { Router } from "express";
import { UserMysqlRepository } from '../repository/userMysqlRepository';
import { UserService } from '../../application/user.service';
import { UserController } from '../controller/user.controller';
import { UserMapperService } from '../mappers/user.mapper';
import {BcryptAdapter} from "../adapters/bcryptAdapter";
import {UuidAdapter} from "../adapters/uuid.adapter";
import {QrCodeMysqlRepository} from "../../../qr_code/infraestructure/repository/QrCodeMysqlRepository";

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

const mysqlRepository = new UserMysqlRepository(new UserMapperService());
const qrCodeRepository = new QrCodeMysqlRepository();

/**
 * Iniciamos casos de uso 
 */
const userService = new UserService(mysqlRepository, qrCodeRepository, bcryptAdapter, userMapperService, uuidAdapter);

/**
 * Iniciamos el User controllers
 */
const userCtrl = new UserController(userService);

/**
 * 
 */
userRouter.get('/user', userCtrl.getUserById);
userRouter.post('/api/user/signin', userCtrl.createUser);
userRouter.put('/api/user/update', userCtrl.updateUser);
userRouter.delete('/api/user/delete', userCtrl.deleteUser);

export default userRouter;
