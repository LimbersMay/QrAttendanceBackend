
import {Router} from "express";
import {UserController} from "../controllers/user.controller";
import {UserMysqlRepository} from "../repositories/user.repository";
import {UserMapperService} from "../mappers/user.mapper";

const router = Router();

/**
 * Inicializamos el servicio del mapeo
 */
const userMapper = new UserMapperService();

/**
 * Inicializamos el repositorio
 */
const userRepository = new UserMysqlRepository(userMapper);

/**
 * Inicializamos el controlador
 */
const userController = new UserController(userRepository);

router.get('/users', userController.getUsers);

export default router;
