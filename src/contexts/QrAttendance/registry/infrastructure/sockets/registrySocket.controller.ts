import { Socket } from "socket.io";
import { injectable } from "inversify";
import {isLeft} from "fp-ts/Either";
import {RateLimiterMemory} from "rate-limiter-flexible";
import {QrCodeFinder, FormIdSpecification, QrCodeError} from "../../../qr_code";
import {RegistryCreator} from "../../application";
import {RegistryError} from "../../domain";

@injectable()
export class RegistrySocketController {
    private clients: Map<string, Set<string>> = new Map();

    constructor(
        private readonly qrCodeFinder: QrCodeFinder,
        private readonly registryCreator: RegistryCreator
    ) {}

    public onConnection(socket: Socket, rateLimiter: RateLimiterMemory) {
        socket.on("register-attendance", async(data: any) => {

            try {
                await rateLimiter.consume(socket.handshake.address);

                const { name, group, career, firstSurname, secondSurname, formId } = data;

                const qrCode = await this.qrCodeFinder.findOne(
                    new FormIdSpecification(formId)
                );

                // if the search fails
                if (isLeft(qrCode))
                    return socket.emit("register-attendance-error", qrCode.left);

                // if the qrCode enabled is false
                if (!qrCode.right.enabled) {
                    return socket.emit("register-attendance-error", QrCodeError.FORM_DEACTIVATED_BY_THE_TEACHER);
                }

                const { id, ownerId } = qrCode.right;

                const registry = await this.registryCreator.execute({qrId: id, name, group, career, firstSurname, secondSurname}, ownerId);

                // if the registry creation fails
                if (isLeft(registry))
                    return socket.emit("register-attendance-error", registry.left);

                // if the registry creation succeeds
                socket.to(ownerId).emit("new-attendance", registry.right);
                socket.emit("register-attendance-success", "Attendance registered successfully");

            } catch (rejRes) {
                socket.emit("already-registered-attendance", RegistryError.YOU_HAS_ALREADY_REGISTERED_ATTENDANCE);
            }
        });

        socket.on("authenticated", (data: string) => {

            // if the client has not been registered yet
            if (!this.clients.has(data)) {
                this.clients.set(data, new Set())
            }

            // everytime a client connects we verify if is the same client
            // and if it is we add join the client at the same room
            const roomId = data;
            this.clients.get(data)?.add(roomId);

            socket.join(roomId);
        });
    }
}

