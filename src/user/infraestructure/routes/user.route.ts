
import { Router } from "express";
import { MysqlRepository } from '../repository/mysql.repository';
import { UserUseCase } from '../../application/userUseCase';
import { UserController } from '../controller/user.controller';
import { DtoMapperService, UserMapperService } from '../mappers/user.mapper';

const userRouter = Router();

/**
 * Iniciamos el repositorio
 */

const mysqlRepository = new MysqlRepository(new UserMapperService(), new DtoMapperService());

/**
 * Iniciamos casos de uso 
 */
const userUseCase = new UserUseCase(mysqlRepository);

/**
 * Iniciamos el User controller
 */
const userCtrl = new UserController(userUseCase);

/**
 * 
 */
userRouter.get('/user', userCtrl.getCtrl);
userRouter.post('/user/signin', userCtrl.insertCtrl);

export default userRouter;
