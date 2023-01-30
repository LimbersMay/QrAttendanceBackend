import {Router} from "express";
import {QrCodeControllerInjected as qrCodeController} from "../../../../../apps/QrAttendance/dependency-injection/container";

const router = Router();

// definimos rutas
router.get('/all', qrCodeController.findByUserId);
router.post('/create', qrCodeController.create);
router.put('/update', qrCodeController.update);
router.delete('/delete', qrCodeController.delete);

export default router;
