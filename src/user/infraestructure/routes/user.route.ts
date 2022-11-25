
import { Router } from "express";
import { MysqlRepository } from '../repository/mysql.repository';
import { UserUseCase } from '../../application/userUseCase';
import { UserController } from '../controller/user.controller';
import { UserMapperService } from '../mappers/user.mapper';

const userRouter = Router();

/**
 * Iniciamos el repositorio
 */

const mysqlRepository = new MysqlRepository(new UserMapperService());

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

export default userRouter;
