import {Router} from "express";
import {QrCodeCreator, QrCodeDeleter, QrCodeFinder, QrCodeUpdater} from "../../application/useCases";
import {QrCodeMysqlRepository} from "../repository/qrCode.repository";
import {UuidAdapter} from "../adapters";
import { QrCodeController } from "../controllers";

const router = Router();

// inicializamos casos de uso
const qrCodeMysqlRepository = new QrCodeMysqlRepository();
const uuidAdapter = new UuidAdapter();

const qrCodeFinder = new QrCodeFinder(qrCodeMysqlRepository);
const qrCodeUpdater = new QrCodeUpdater(qrCodeMysqlRepository);
const qrCodeDeleter = new QrCodeDeleter(qrCodeMysqlRepository);
const qrCodeCreator = new QrCodeCreator(qrCodeMysqlRepository, uuidAdapter);

// inicializamos controladores
const qrCodeController = new QrCodeController(qrCodeFinder, qrCodeUpdater, qrCodeDeleter, qrCodeCreator);

// definimos rutas
router.get('/all', qrCodeController.findByUserId);
router.post('/create', qrCodeController.create);
router.put('/update', qrCodeController.update);
router.delete('/delete', qrCodeController.delete);

export default router;
