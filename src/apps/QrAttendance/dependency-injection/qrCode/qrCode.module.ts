import {Container} from "inversify";
import {QrCodeCreator, QrCodeDeleter, QrCodeUpdater, QrCodeFinder} from "../../../../contexts/QrAttendance/qr_code/application/useCases";
import {QrCodeController} from "../../../../contexts/QrAttendance/qr_code/infrastructure/controllers";
import {QrCodeRepository} from "../../../../contexts/QrAttendance/qr_code/domain/qrCode.repository";
import {TYPES} from "./types";
import {
    QrCodeMysqlRepository
} from "../../../../contexts/QrAttendance/qr_code/infrastructure/repository/qrCode.repository";
import {UUIDGenerator} from "../../../../contexts/QrAttendance/shared/application/services/UUIDGenerator";
import {UuidAdapter} from "../../../../contexts/QrAttendance/qr_code/infrastructure/adapters";
import {
    QrCodeFindByFormId
} from "../../../../contexts/QrAttendance/qr_code/application/useCases/find/qrCodeFindByFormId";

export const qrCodeModule = (container: Container) => {
    container.bind<QrCodeController>(QrCodeController).toSelf();

    container.bind<QrCodeCreator>(QrCodeCreator).toSelf();
    container.bind<QrCodeUpdater>(QrCodeUpdater).toSelf();
    container.bind<QrCodeDeleter>(QrCodeDeleter).toSelf();
    container.bind<QrCodeFinder>(QrCodeFinder).toSelf();
    container.bind<QrCodeFindByFormId>(QrCodeFindByFormId).toSelf();

    container.bind<QrCodeRepository>(TYPES.QrCodeRepository).to(QrCodeMysqlRepository);
    container.bind<UUIDGenerator>(TYPES.QrCodeUUIDGenerator).to(UuidAdapter);
}
