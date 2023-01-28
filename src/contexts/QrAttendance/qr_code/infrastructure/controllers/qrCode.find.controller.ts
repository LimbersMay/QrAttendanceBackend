import {QrCodeFinder} from "../../application/useCases";
import {Request, Response} from "express";
import {ResponseEntity} from "../../../../shared/infrastructure/entities/response.entity";
import {isRight} from "fp-ts/Either";
import {QrCodeError} from "../../domain/errors/qrCode.errors";

export class QrCodeFindController {

    constructor(
        private readonly qrCodeFinder: QrCodeFinder
    ) {}

    public find = async(req: Request, res: Response) => {

        if (!req.user) return ResponseEntity.status(401).body('NOT-AUTHENTICATED').send(res);

        const { id: userId } = req.user;
        const { id } = req.body;

        const qrCode = await this.qrCodeFinder.execute(id, userId);

        if (isRight(qrCode)) return ResponseEntity.status(200).body(qrCode.right).send(res);

        this.validateResult(qrCode.left, res);
    }

    public findByUserId = async(req: Request, res: Response) => {

            if (!req.user) return ResponseEntity.status(401).body('NOT-AUTHENTICATED').send(res);

            const { id: userId } = req.user;

            const qrCode = await this.qrCodeFinder.executeByUserId(userId);

            if (isRight(qrCode)) return ResponseEntity.status(200).body(qrCode.right).send(res);

            this.validateResult(qrCode.left, res);
    }

    private validateResult = (result: QrCodeError, res: Response) => {
        switch (result) {
            case QrCodeError.QR_CODE_NOT_FOUND:
                return ResponseEntity
                    .status(404)
                    .body(QrCodeError.QR_CODE_NOT_FOUND)
                    .send(res);

            case QrCodeError.QR_CODE_CANNOT_BE_FOUND:
                return ResponseEntity
                    .status(500)
                    .body(QrCodeError.QR_CODE_CANNOT_BE_FOUND)
                    .send(res);
        }
    }
}
