import {Router} from "express";
import {GroupMysqlRepository} from "../repository";
import {UuidAdapter} from "../adapters";
import {isAuthenticated} from "../../../auth/infrastructure/middlewares";
import {GroupMiddleware} from "../middlewares/group.middleware";
import {GroupCreator, GroupDeleter, GroupFinder, GroupUpdater} from "../../application/useCases";
import {GroupController} from "../controller/group.controller";

const router = Router();

const groupRepository = new GroupMysqlRepository();
const uuidAdapter = new UuidAdapter();

const groupCreator = new GroupCreator(groupRepository, uuidAdapter);
const groupUpdater = new GroupUpdater(groupRepository);
const groupDeleter = new GroupDeleter(groupRepository);
const groupFinder = new GroupFinder(groupRepository);

const groupController = new GroupController(groupCreator, groupFinder, groupUpdater, groupDeleter);

const groupMiddleware = new GroupMiddleware(groupFinder);

router.post('/create', isAuthenticated, groupController.create);
router.get('/all', isAuthenticated, groupController.getGroups);

router.put('/update', [
    isAuthenticated,
    groupMiddleware.validateGroupExists
], groupController.update);

router.delete('/delete', [
    isAuthenticated,
    groupMiddleware.validateGroupExists
], groupController.delete);

export default router;
