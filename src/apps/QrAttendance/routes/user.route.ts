
import { Router } from "express";
import { MysqlRepository } from '../../../contexts/QrAttendance/user/infraestructure/repository/mysql.repository';
import { UserUseCase } from '../../../contexts/QrAttendance/user/application/userUseCase';
import { UserController } from '../../../contexts/QrAttendance/user/infraestructure/controller/user.controller';
import { DtoMapperService, UserMapperService } from '../../../contexts/QrAttendance/user/infraestructure/mappers/user.mapper';

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
 * Iniciamos el User controllers
 */
const userCtrl = new UserController(userUseCase);

/**
 *
 */
userRouter.get('/user', userCtrl.getCtrl);
userRouter.post('/user/signin', userCtrl.insertCtrl);

export default userRouter;
