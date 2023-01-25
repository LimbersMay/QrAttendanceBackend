import {Router} from "express";
import {GroupRepository} from "../repository";
import {GroupService} from "../../application/group.service";
import {UuidAdapter} from "../adapters";
import {GroupMapper} from "../mappers";
import {GroupController} from "../controller/group.controller";
import {isAuthenticated} from "../../../auth/infraestructure/middlewares";
import {GroupMiddleware} from "../middlewares/group.middleware";

const router = Router();

const groupRepository = new GroupRepository();
const uuidGenerator = new UuidAdapter();
const groupMapper = new GroupMapper();

const groupService = new GroupService(groupRepository, uuidGenerator, groupMapper);

const groupController = new GroupController(groupService);
const groupMiddleware = new GroupMiddleware(groupService);

router.post('/create', isAuthenticated, groupController.createGroup);

router.get('/all', isAuthenticated, groupController.getUserGroups);

router.put('/update', [
    isAuthenticated,
    groupMiddleware.validateGroupExists
], groupController.updateGroup);

router.delete('/delete', [
    isAuthenticated,
    groupMiddleware.validateGroupExists
], groupController.deleteGroup);

export default router;
