import { Router} from "express";
import {AuthController} from "../controller/auth.controller";
import { BcryptAdapter, UuidAdapter } from "../../../user/infrastructure/adapters";
import {UserMysqlRepository} from "../../../user/infrastructure/repository/user.repository";
import {AuthMiddleware} from "../middlewares";
import {UserCreator, UserFinder} from "../../../user/application/useCases";

const router = Router();

const userMysqlRepository = new UserMysqlRepository();
const bcryptAdapter = new BcryptAdapter();
const uuidAdapter = new UuidAdapter();

const userCreator = new UserCreator(userMysqlRepository, uuidAdapter, bcryptAdapter);
const userFinder = new UserFinder(userMysqlRepository);

const authController = new AuthController(userCreator);
const authMiddleware = new AuthMiddleware(userFinder);

router.post("/login-local", authController.login);

router.post("/register-local",[authMiddleware.emailExists], authController.register);

router.post("/logout", authController.logout);

router.get("/authenticated", authController.isAuthenticated);

export default router;
