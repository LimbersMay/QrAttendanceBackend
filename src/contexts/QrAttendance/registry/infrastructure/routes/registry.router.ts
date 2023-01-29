
import { Router } from "express";
const router = Router();

import {RegistryCreator, RegistryDeleter, RegistryFinder, RegistryUpdater} from "../../application/useCases";
import {RegistryMysqlRepository} from "../repository/registry.repository";
import {UuidAdapter} from "../adapters";
import {RegistryController} from "../controller/registry.controller";

const registryRepository = new RegistryMysqlRepository();
const uuidAdapter = new UuidAdapter();

const registryFinder = new RegistryFinder(registryRepository);
const registryDeleter = new RegistryDeleter(registryRepository);
const registryUpdater = new RegistryUpdater(registryRepository);
const registryCreator = new RegistryCreator(registryRepository, uuidAdapter);

const registryController = new RegistryController(registryCreator, registryFinder, registryDeleter, registryUpdater);

router.post("/create", registryController.create);
router.get("/find", registryController.find);
router.get("/findByUserId", registryController.findByUserId);
router.put("/update", registryController.update);
router.delete("/delete", registryController.delete);

export default router;
