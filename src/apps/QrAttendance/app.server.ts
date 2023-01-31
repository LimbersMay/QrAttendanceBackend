import {Application} from "express";
import session from "express-session";
import express from "express";
import cookieParser from "cookie-parser";

import db from "../../contexts/shared/infrastructure/db/mysql.connection"

// routes
import {AuthPassportStrategyInjected as PassportLocalStrategy, container} from "./dependency-injection/container";
import {useContainer, useExpressServer} from "routing-controllers";

import {UserController} from "../../contexts/QrAttendance/user/infrastructure/controller";
import {AuthController} from "../../contexts/QrAttendance/auth/infrastructure/controller/auth.controller";
import bodyParser from "body-parser";

export class Server {
    public app: Application;
    public port: number;
    public appRoutes: Record<string, string>;

    constructor() {

        useContainer(container);

        this.app = express();

        this.port = parseInt(process.env.PORT ?? "3000")

        // routes
        this.appRoutes = {
            auth: '/api/auth',
            user: '/api/user',
            group: '/api/group',
            qrCode: '/api/qrCode',
            registry: '/api/registry'
        }

        // DB connection
        this.connectDB().then();

        // Middlewares
        this.middlewares();
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
                sameSite: true,
                maxAge: 1000 * 60 * 60 * 24 // 1 day
            }
        }));

        // passport
        this.app.use(PassportLocalStrategy.initialize());
        this.app.use(PassportLocalStrategy.session());

        useExpressServer(this.app, {
            routePrefix: "/api",
            cors: {
                credentials: true,
                origin: "http://localhost:5173",
                defaultErrorHandler: false
            },
            controllers: [UserController, AuthController]
        });
    }

    public listen() {

        this.app.listen(this.port, () => {
            console.log(`Server running on port: ${this.port}`);
        });
    }
}
