import {Application} from "express";
import session from "express-session";
import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import {createServer} from "http";
import {SocketControllers} from "socket-controllers";
import {Socket} from "socket.io";
import { Server as SocketServer } from "socket.io";

import { RateLimiterMemory } from "rate-limiter-flexible";

import {
    AuthPassportStrategyInjected as PassportLocalStrategy,
    RegistrySocketControllerInjected as RegistrySocketController,
    container
} from "./dependency-injection/container";

import {useContainer, useExpressServer} from "routing-controllers";

import db from "../../contexts/shared/infrastructure/db/mysql.connection"
import {UserController} from "../../contexts/QrAttendance/user/infrastructure/controller";
import {AuthController} from "../../contexts/QrAttendance/auth/infrastructure/controller/auth.controller";
import {GroupController} from "../../contexts/QrAttendance/group/infrastructure/controller/group.controller";
import {QrCodeController} from "../../contexts/QrAttendance/qr_code/infrastructure/controllers";
import {RegistryController} from "../../contexts/QrAttendance/registry/infrastructure/controller/registry.controller";

export class Server {
    public app: Application;
    public port: number;
    public httpServer: any;
    public io: any;

    constructor() {

        useContainer(container);

        this.app = express();
        this.httpServer = createServer(this.app);
        this.io = new SocketServer(this.httpServer, {
            cors: {
                origin: [ "https://easyqrattendance.up.railway.app", "https://easyqrattendance.netlify.app", "http://localhost:5173"],
                methods: ["GET", "POST", "PUT", "DELETE"],
                credentials: true
            }
        });

        this.port = parseInt(process.env.PORT ?? "3000")

        // DB connection
        this.connectDB().then();

        // Middlewares
        this.middlewares();

        // websockets
        this.websockets();
    }

    public async connectDB() {
        await db.authenticate();
        await db.sync();
    }

    public middlewares() {
        this.app.use(express.json());
        this.app.use(cookieParser(process.env.COOKIE_SECRET));

        this.app.use(express.urlencoded({
            extended: true
        }));

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));

        this.app.use(session({
            secret: process.env.COOKIE_SECRET ?? "secret",
            resave: false,
            saveUninitialized: true,
            cookie: {
                sameSite: true,
                maxAge: 1000 * 60 * 60 * 24, // 1 day
                secure: false,
                httpOnly: true
            }
        }));

        // passport
        this.app.use(PassportLocalStrategy.initialize());
        this.app.use(PassportLocalStrategy.session());

        useExpressServer(this.app, {
            routePrefix: "/api",
            cors: {
                credentials: true,
                origin: ["https://easyqrattendance.up.railway.app","http://localhost:5173", "https://easyqrattendance.netlify.app"],
                defaultErrorHandler: false
            },
            controllers: [UserController, AuthController, GroupController, QrCodeController, RegistryController],
            defaultErrorHandler: false,
            currentUserChecker: async (action) => {
                return action.request.user;
            }
        });
    }

    public websockets() {

        const rateLimiter = new RateLimiterMemory({
            points: 2,
            duration: 30, // 8 hours
        });

        this.io.on("connection", (socket: Socket) => {
            console.log("Client connected");

            socket.on("disconnect", () => {
                console.log("Client disconnected");
            });

            RegistrySocketController.onConnection(socket, rateLimiter);
        });

        new SocketControllers({io: this.io, container: container});
    }

    public listen() {

        this.httpServer.listen(this.port, () => {
            console.log(`Server running on port: ${this.port}`);
        });
    }
}
