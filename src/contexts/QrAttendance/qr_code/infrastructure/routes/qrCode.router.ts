import {Router} from "express";
import {QrCodeCreator, QrCodeDeleter, QrCodeFinder, QrCodeUpdater} from "../../application/useCases";
import {QrCodeMysqlRepository} from "../repository/qrCode.repository";
import {UuidAdapter} from "../adapters";
import {
    QrCodeCreateController,
    QrCodeDeleteController,
    QrCodeFindController,
    QrCodeUpdateController
} from "../controllers";

const router = Router();

// inicializamos casos de uso

const qrCodeMysqlRepository = new QrCodeMysqlRepository();
const uuidAdapter = new UuidAdapter();

const qrCodeFinder = new QrCodeFinder(qrCodeMysqlRepository);
const qrCodeUpdater = new QrCodeUpdater(qrCodeMysqlRepository);
const qrCodeDeleter = new QrCodeDeleter(qrCodeMysqlRepository);
const qrCodeCreator = new QrCodeCreator(qrCodeMysqlRepository, uuidAdapter);

// inicializamos controladores
const qrCodeFindController = new QrCodeFindController(qrCodeFinder);
const qrCodeUpdateController = new QrCodeUpdateController(qrCodeUpdater);
const qrCodeDeleteController = new QrCodeDeleteController(qrCodeDeleter);
const qrCodeCreateController = new QrCodeCreateController(qrCodeCreator);

// definimos rutas
router.get('/all', qrCodeFindController.findByUserId);
router.post('/create', qrCodeCreateController.create);
router.put('/update', qrCodeUpdateController.update);
router.delete('/delete', qrCodeDeleteController.delete);

export default router;
