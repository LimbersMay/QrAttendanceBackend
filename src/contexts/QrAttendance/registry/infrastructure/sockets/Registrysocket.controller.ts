import { Socket } from "socket.io";
import { injectable } from "inversify";
import {RegistryCreator} from "../../application/useCases";
import {QrCodeFindByFormId} from "../../../qr_code/application/useCases/find/qrCodeFindByFormId";
import {isLeft} from "fp-ts/Either";

@injectable()
export class RegistrySocketController {
    private clients: Map<string, Set<string>> = new Map();

    constructor(
        private readonly qrCodeFinder: QrCodeFindByFormId,
        private readonly registryCreator: RegistryCreator
    ) {}

    public onConnection(socket: Socket) {
        socket.on("register-attendance", async(data: any) => {

            const { name, firstSurname, secondSurname, formId } = data;
            const qrCode = await this.qrCodeFinder.execute(formId);

            // if the qrCode creation fails
            if (isLeft(qrCode))
                return socket.emit("register-attendance-error", qrCode.left);

            const { id, ownerId } = qrCode.right;

            const registry = await this.registryCreator.execute(id, ownerId, name, firstSurname, secondSurname);

            // if the registry creation fails
            if (isLeft(registry))
                return socket.emit("register-attendance-error", registry.left);

            // if the registry creation succeeds
            socket.to(ownerId).emit("new-attendance", registry.right);
            socket.emit("register-attendance-success", "Attendance registered successfully");
        });

        socket.on("authenticated", (data: string) => {

            // if the client has not been registered yet
            if (!this.clients.has(data)) {
                this.clients.set(data, new Set())
            }

            // eveytime a client connects we verify if is the same client
            // and if it is we add join the client at the same room
            const roomId = data;
            this.clients.get(data)?.add(roomId);

            socket.join(roomId);
        });
    }
}

