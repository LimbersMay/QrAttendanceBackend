import {QrCodeCreator, QrCodeDeleter, QrCodeFinder, QrCodeUpdater} from "../../application/useCases";
import {Request, Response} from "express";
import {ResponseEntity} from "../../../../shared/infrastructure/entities/response.entity";
import {isRight} from "fp-ts/Either";
import {QrCodeError} from "../../domain/errors/qrCode.errors";

export class QrCodeController {
    constructor(
        private qrCodeFinder: QrCodeFinder,
        private qrCodeUpdater: QrCodeUpdater,
        private qrCodeDeleter: QrCodeDeleter,
        private qrCodeCreator: QrCodeCreator
    ) {}

    public find = async(req: Request, res: Response) => {

        if (!req.user) return ResponseEntity.status(401).body('NOT-AUTHENTICATED').send(res);

        const { id: userId } = req.user;
        const { id } = req.body;

        const qrCode = await this.qrCodeFinder.execute(id, userId);

        if (isRight(qrCode))
            return ResponseEntity
                .status(200)
                .body(qrCode.right)
                .send(res);

        return this.handleError(qrCode.left, res);
    }

    public findByUserId = async(req: Request, res: Response) => {

        if (!req.user) return ResponseEntity.status(401).body('NOT-AUTHENTICATED').send(res);

        const { id: userId } = req.user;

        const qrCode = await this.qrCodeFinder.executeByUserId(userId);

        if (isRight(qrCode))
            return ResponseEntity
                .status(200)
                .body(qrCode.right)
                .send(res);

       return this.handleError(qrCode.left, res);
    }

    public create = async(req: Request, res: Response) => {
        if (!req.user) return ResponseEntity.status(401).body('NOT-AUTHENTICATED').send(res);

        const { id: idUser } = req.user;
        const { name, groupId, enabled } = req.body;

        const result = await this.qrCodeCreator.execute(name, groupId, idUser, enabled);

        if (isRight(result))
            return ResponseEntity
                .status(200)
                .body(result.right)
                .send(res);

        return this.handleError(result.left, res);
    }

    public update = async(req: Request, res: Response) => {

        if (!req.user) return ResponseEntity.status(401).body('NOT-AUTHENTICATED').send(res);

        const { id: idUser } = req.user;
        const { id, updatedFields } = req.body;

        const result = await this.qrCodeUpdater.execute(updatedFields, id, idUser);

        if (isRight(result))
            return ResponseEntity
                .status(200)
                .body(result.right)
                .send(res);

        return this.handleError(result.left, res)
    }

    public delete = async(req: Request, res: Response) => {

        if (!req.user) return ResponseEntity.status(400).body('NOT-AUTHENTICATED').send(res);

        const { id: userId } = req.user;
        const { id } = req.body;

        const result = await this.qrCodeDeleter.execute(id, userId);

        if (isRight(result))
            return ResponseEntity
                .status(200)
                .body(result.right)
                .send(res);

        return this.handleError(result.left, res);
    }

    private handleError = (result: QrCodeError, res: Response) => {
        switch (result) {
            case QrCodeError.QR_CODE_NOT_FOUND:
                return ResponseEntity
                    .status(404)
                    .body(result)
                    .send(res);

            case QrCodeError.QR_CODE_CANNOT_BE_FOUND:
                return ResponseEntity
                    .status(500)
                    .body(result)
                    .send(res);

            case QrCodeError.QR_CODE_CANNOT_BE_CREATED:
                return ResponseEntity
                    .status(500)
                    .body(result)
                    .send(res);

            case QrCodeError.QR_CODE_CANNOT_BE_UPDATED:
                return ResponseEntity
                    .status(500)
                    .body(result)
                    .send(res);

            case QrCodeError.QR_CODE_CANNOT_BE_DELETED:
                return ResponseEntity
                    .status(500)
                    .body(result)
                    .send(res);

            default:
                return ResponseEntity
                    .status(500)
                    .body(result)
                    .send(res);
        }
    }
}
