import {Router} from "express";
import { GroupControllerInjected as groupController } from "../../../../../apps/QrAttendance/dependency-injection/container";
import {isAuthenticated} from "../../../auth/infrastructure/middlewares";

const router = Router();

router.post('/create', isAuthenticated, groupController.create);
router.get('/all', isAuthenticated, groupController.getGroups);

router.put('/update', [
    isAuthenticated,
], groupController.update);

router.delete('/delete', [
    isAuthenticated,
], groupController.delete);

export default router;
