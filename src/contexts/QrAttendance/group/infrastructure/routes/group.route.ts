import {Router} from "express";
import {GroupMysqlRepository} from "../repository";
import {UuidAdapter} from "../adapters";
import {isAuthenticated} from "../../../auth/infrastructure/middlewares";
import {GroupMiddleware} from "../middlewares/group.middleware";
import {GroupCreateController, GroupDeleteController, GroupGetController, GroupUpdateController} from "../controller";
import {GroupCreator, GroupDeleter, GroupFinder, GroupUpdater} from "../../application/useCases";

const router = Router();

const groupRepository = new GroupMysqlRepository();
const uuidAdapter = new UuidAdapter();

const groupCreator = new GroupCreator(groupRepository, uuidAdapter);
const groupUpdater = new GroupUpdater(groupRepository);
const groupDeleter = new GroupDeleter(groupRepository);
const groupFinder = new GroupFinder(groupRepository);

const groupCreateController = new GroupCreateController(groupCreator);
const groupDeleteController = new GroupDeleteController(groupDeleter);
const groupUpdateController = new GroupUpdateController(groupUpdater);
const groupGetController = new GroupGetController(groupFinder);

const groupMiddleware = new GroupMiddleware(groupFinder);

router.post('/create', isAuthenticated, groupCreateController.create);

router.get('/all', isAuthenticated, groupGetController.getGroups);

router.put('/update', [
    isAuthenticated,
    groupMiddleware.validateGroupExists
], groupUpdateController.update);

router.delete('/delete', [
    isAuthenticated,
    groupMiddleware.validateGroupExists
], groupDeleteController.delete);

export default router;
