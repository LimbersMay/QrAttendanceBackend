import { Router} from "express";
import {UserMapperService} from "../../../user/infrastructure/mappers/user.mapper";
import {AuthController} from "../controller/auth.controller";

const router = Router();

const userMapper = new UserMapperService();
const authController = new AuthController(userMapper);

router.post("/login-local", authController.loginLocal);

router.post("/logout", authController.logout);

router.get("/authenticated", authController.isAuthenticated);

export default router;
