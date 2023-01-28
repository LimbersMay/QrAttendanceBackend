import {isRight} from "fp-ts/Either";
import {QrCodeDeleter} from "../../application/useCases";
import {Request, Response} from "express";
import {ResponseEntity} from "../../../../shared/infrastructure/entities/response.entity";
import {QrCodeError} from "../../domain/errors/qrCode.errors";

export class QrCodeDeleteController {
    constructor(
        private readonly qrCodeDeleter: QrCodeDeleter
    ) {}

    public delete = async(req: Request, res: Response) => {

        if (!req.user) return ResponseEntity.status(400).body('NOT-AUTHENTICATED').send(res);

        const { id: userId } = req.user;
        const { id } = req.body;

        const result = await this.qrCodeDeleter.execute(id, userId);

        if (isRight(result)) return ResponseEntity.status(200).body(result.right).send(res);

        switch (result.left) {
            case QrCodeError.QR_CODE_NOT_FOUND:
                return ResponseEntity
                    .status(404)
                    .body(result.left)
                    .send(res);

            case QrCodeError.QR_CODE_CANNOT_BE_DELETED:
                return ResponseEntity
                    .status(500)
                    .body(result.left)
                    .send(res);
        }
    }
}
