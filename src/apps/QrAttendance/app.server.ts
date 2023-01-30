import { Application } from "express";
import session from "express-session";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import db from "../../contexts/shared/infrastructure/db/mysql.connection"

// routes
import authRoutes from "../../contexts/QrAttendance/auth/infrastructure/routes/auth.routes";
import userRoutes from "../../contexts/QrAttendance/user/infrastructure/routes/user.route";
import groupRoutes from "../../contexts/QrAttendance/group/infrastructure/routes/group.route";
import qrCodeRoutes from "../../contexts/QrAttendance/qr_code/infrastructure/routes/qrCode.router";
import registryRoutes from "../../contexts/QrAttendance/registry/infrastructure/routes/registry.router";

import {AuthPassportStrategyInjected as PassportLocalStrategy} from "./dependency-injection/container";

export class Server {
    public app: Application;
    public port: number;
    public appRoutes: Record<string, string>;

    constructor() {

        this.app = express();
        this.port = parseInt(process.env.PORT ?? "3000")

        PassportLocalStrategy.init();

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

        // routes
        this.routes();
    }

    public async connectDB() {
        await db.authenticate();
    }

    public middlewares() {
        this.app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
        this.app.use(express.json());
        this.app.use(cookieParser(process.env.COOKIE_SECRET));

        this.app.use(express.urlencoded({
            extended: true
        }));

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
    }

    public routes() {
        this.app.use(this.appRoutes.auth, authRoutes);
        this.app.use(this.appRoutes.user, userRoutes);
        this.app.use(this.appRoutes.group, groupRoutes);
        this.app.use(this.appRoutes.qrCode, qrCodeRoutes);
        this.app.use(this.appRoutes.registry, registryRoutes);
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port: ${this.port}`);
        });
    }
}
