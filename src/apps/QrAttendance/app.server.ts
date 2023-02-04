import {Application} from "express";
import session from "express-session";
import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import {useContainer, useExpressServer} from "routing-controllers";
import db from "../../contexts/shared/infrastructure/db/mysql.connection"
// routes

import {
    AuthPassportStrategyInjected as PassportLocalStrategy,
    RegistrySocketControllerInjected as RegistrySocketController,
    container
} from "./dependency-injection/container";
import {UserController} from "../../contexts/QrAttendance/user/infrastructure/controller";
import {AuthController} from "../../contexts/QrAttendance/auth/infrastructure/controller/auth.controller";
import {GroupController} from "../../contexts/QrAttendance/group/infrastructure/controller/group.controller";
import {QrCodeController} from "../../contexts/QrAttendance/qr_code/infrastructure/controllers";
import {RegistryController} from "../../contexts/QrAttendance/registry/infrastructure/controller/registry.controller";

import {createServer} from "https";
import {SocketControllers} from "socket-controllers";
import {Socket} from "socket.io";
import { Server as SocketServer } from "socket.io";

import { RateLimiterMemory } from "rate-limiter-flexible";

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
                origin: ["http://localhost:5173", "https://easyqrattendance.netlify.app"],
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
                sameSite: 'none',
                maxAge: 1000 * 60 * 60 * 24, // 1 day
                secure: true,
                domain: "https://easyqrattendance.netlify.app/"
            }
        }));

        // passport
        this.app.use(PassportLocalStrategy.initialize());
        this.app.use(PassportLocalStrategy.session());

        useExpressServer(this.app, {
            routePrefix: "/api",
            cors: {
                credentials: true,
                origin: ["http://localhost:5173", "https://easyqrattendance.netlify.app"],
                defaultErrorHandler: false
            },
            controllers: [UserController, AuthController, GroupController, QrCodeController, RegistryController],
        });

        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "https://easyqrattendance.netlify.app");
            res.header("Access-Control-Allow-Credentials", "true");
            res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            next();
        });
    }

    public websockets() {

        const rateLimiter = new RateLimiterMemory({
            points: 1,
            duration: 60, // 8 hours
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
