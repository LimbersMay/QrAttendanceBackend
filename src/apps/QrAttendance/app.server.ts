import { Application } from "express";
import express from "express";
import cors from "cors";

import db from "../../contexts/shared/infraestructure/db/mysql.connection"
import {PassportLocalStrategy} from "../../contexts/QrAttendance/auth/infraestructure/passport/config";
import {UserRepository} from "../../contexts/QrAttendance/user/infraestructure/repository/userRepository";
import {BcryptAdapter} from "../../contexts/QrAttendance/user/infraestructure/adapters/bcryptAdapter";

// services
import {UserMapperService} from "../../contexts/QrAttendance/user/infraestructure/mappers/user.mapper";

// routes
import authRoutes from "../../contexts/QrAttendance/auth/infraestructure/routes/auth.routes";
import userRoutes from "../../contexts/QrAttendance/user/infraestructure/routes/user.route";

import cookieParser from "cookie-parser";
import session from "express-session";
import {UserService} from "../../contexts/QrAttendance/user/application/user.service";
import {UuidAdapter} from "../../contexts/QrAttendance/user/infraestructure/adapters/uuid.adapter";

export class Server {
    public app: Application;
    public port: number;
    public appRoutes: Record<string, string>;
    public authService: PassportLocalStrategy;

    constructor() {

        this.app = express();
        this.port = parseInt(process.env.PORT ?? "3000")

        const encryptService = new BcryptAdapter();
        const userMapperService = new UserMapperService();
        const uuidService = new UuidAdapter();
        const userRepository = new UserRepository();
        const userService = new UserService(userRepository, encryptService, userMapperService, uuidService);

        this.authService = new PassportLocalStrategy(userService, encryptService);
        this.authService.init();

        // routes
        this.appRoutes = {
            auth: '/api/auth',
            user: '/api/user',
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
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port: ${this.port}`);
        });
    }
}
