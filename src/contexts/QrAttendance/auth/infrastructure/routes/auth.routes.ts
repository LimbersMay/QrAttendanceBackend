import { Router} from "express";
import {UserMapperService} from "../../../user/infrastructure/mappers/user.mapper";
import {AuthController} from "../controller/auth.controller";
import {UserService} from "../../../user/application/user.service";
import {BcryptAdapter} from "../../../user/infrastructure/adapters/bcryptAdapter";
import {UuidAdapter} from "../../../user/infrastructure/adapters/uuid.adapter";
import {UserMysqlRepository} from "../../../user/infrastructure/repository/user.repository";
import {AuthMiddleware} from "../middlewares";

const router = Router();

const encryptService = new BcryptAdapter();
const userMapperService = new UserMapperService();
const uuidService = new UuidAdapter();
const userRepository = new UserMysqlRepository();
const userService = new UserService(userRepository, encryptService, userMapperService, uuidService);

const authController = new AuthController(userMapperService, userService);
const authMiddleware = new AuthMiddleware(userService);

router.post("/login-local", authController.loginLocal);

router.post("/register-local",[authMiddleware.emailExists], authController.registerLocal);

router.post("/logout", authController.logout);

router.get("/authenticated", authController.isAuthenticated);

export default router;
