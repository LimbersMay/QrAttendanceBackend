import {Router} from "express";
import {GroupRepository} from "../repository";
import {GroupService} from "../../application/group.service";
import {UuidAdapter} from "../adapters";
import {GroupMapper} from "../mappers";
import {GroupController} from "../controller/group.controller";

const router = Router();

const groupRepository = new GroupRepository();
const uuidGenerator = new UuidAdapter();
const groupMapper = new GroupMapper();

const groupService = new GroupService(groupRepository, uuidGenerator, groupMapper);

const groupController = new GroupController(groupService);

router.post('/create', groupController.createGroup);
router.get('/findAll/:userId', groupController.findGroupByUserId);
router.delete('/delete', groupController.deleteGroup);

export default router;
