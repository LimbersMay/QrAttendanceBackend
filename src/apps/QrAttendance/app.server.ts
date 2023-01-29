import { Application } from "express";
import express from "express";
import cors from "cors";

import db from "../../contexts/shared/infrastructure/db/mysql.connection"
import {PassportLocalStrategy} from "../../contexts/QrAttendance/auth/infrastructure/passport/config";
import {UserMysqlRepository} from "../../contexts/QrAttendance/user/infrastructure/repository/user.repository";
import {BcryptAdapter} from "../../contexts/QrAttendance/user/infrastructure/adapters";

// routes
import authRoutes from "../../contexts/QrAttendance/auth/infrastructure/routes/auth.routes";
import userRoutes from "../../contexts/QrAttendance/user/infrastructure/routes/user.route";
import groupRoutes from "../../contexts/QrAttendance/group/infrastructure/routes/group.route";
import qrCodeRoutes from "../../contexts/QrAttendance/qr_code/infrastructure/routes/qrCode.router";
import registryRoutes from "../../contexts/QrAttendance/registry/infrastructure/routes/registry.router";

import cookieParser from "cookie-parser";
import session from "express-session";
import {AuthenticateUser} from "../../contexts/QrAttendance/auth/application/authentication/auth";
import {UserFinder} from "../../contexts/QrAttendance/user/application/useCases";

export class Server {
    public app: Application;
    public port: number;
    public appRoutes: Record<string, string>;
    public authService: PassportLocalStrategy;

    constructor() {

        this.app = express();
        this.port = parseInt(process.env.PORT ?? "3000")

        const userRepo = new UserMysqlRepository();
        const encryptService = new BcryptAdapter();

        const authenticateUser = new AuthenticateUser(userRepo, encryptService);
        const userFinder = new UserFinder(userRepo);

        this.authService = new PassportLocalStrategy(authenticateUser, userFinder);
        this.authService.init();

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
        this.app.use(this.authService.initialize());
        this.app.use(this.authService.session());
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
