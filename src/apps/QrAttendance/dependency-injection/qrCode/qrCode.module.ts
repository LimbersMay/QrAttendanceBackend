import {Container} from "inversify";
import {UUIDGenerator} from "../../../../contexts/QrAttendance/shared";
import {
    QrCodeController,
    QrCodeCreator,
    QrCodeDeleter,
    QrCodeFinder, QrCodeMysqlRepository, QrCodeRepository,
    QrCodeUpdater, UuidAdapter
} from "../../../../contexts/QrAttendance/qr_code";
import {TYPES} from "./types";


export const qrCodeModule = (container: Container) => {
    container.bind<QrCodeController>(QrCodeController).toSelf();

    container.bind<QrCodeCreator>(QrCodeCreator).toSelf();
    container.bind<QrCodeUpdater>(QrCodeUpdater).toSelf();
    container.bind<QrCodeDeleter>(QrCodeDeleter).toSelf();
    container.bind<QrCodeFinder>(QrCodeFinder).toSelf();

    container.bind<QrCodeRepository>(TYPES.QrCodeRepository).to(QrCodeMysqlRepository);
    container.bind<UUIDGenerator>(TYPES.QrCodeUUIDGenerator).to(UuidAdapter);
}
