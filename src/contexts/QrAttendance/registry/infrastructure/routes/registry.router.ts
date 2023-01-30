import { Router } from "express";
import {RegistryControllerInjected as registryController} from "../../../../../apps/QrAttendance/dependency-injection/container";

const router = Router();

router.post("/create", registryController.create);
router.get("/find", registryController.find);
router.get("/all", registryController.findByUserId);
router.put("/update", registryController.update);
router.delete("/delete", registryController.delete);

export default router;
