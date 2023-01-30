import { Router} from "express";

import {
    AuthControllerInjected as authController,
    AuthMiddlewareInjected as authMiddleware
} from "../../../../../apps/QrAttendance/dependency-injection/container";

const router = Router();

router.post("/login-local", authController.login);

router.post("/register-local",[authMiddleware.emailExists], authController.register);

router.post("/logout", authController.logout);

router.get("/authenticated", authController.isAuthenticated);

export default router;
