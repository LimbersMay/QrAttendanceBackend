import {QrCodeCreator} from "../../application/useCases";
import {Request, Response} from "express";
import {ResponseEntity} from "../../../../shared/infrastructure/entities/response.entity";
import {isRight} from "fp-ts/Either";
import {QrCodeError} from "../../domain/errors/qrCode.errors";

export class QrCodeCreateController {

    constructor(
        private readonly qrCodeCreator: QrCodeCreator
    ){}

    public create = async(req: Request, res: Response) => {
        if (!req.user) return ResponseEntity.status(401).body('NOT-AUTHENTICATED').send(res);

        const { id: idUser } = req.user;
        const { name, groupId, enabled } = req.body;

        const result = await this.qrCodeCreator.execute(name, groupId, idUser, enabled);

        if (isRight(result)) return ResponseEntity.status(200).body(result.right).send(res);

        switch (result.left) {
            case QrCodeError.QR_CODE_NOT_FOUND:
                return ResponseEntity
                    .status(404)
                    .body(result.left)
                    .send(res);

            case QrCodeError.QR_CODE_CANNOT_BE_CREATED:
                return ResponseEntity
                    .status(500)
                    .body(result.left)
                    .send(res);
        }
    }

}