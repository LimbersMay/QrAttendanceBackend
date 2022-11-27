
import express, {Application} from "express";
import session from "express-session";

import cors from "cors";

import dbConnection from './db/mysql.connection';
import passport from './auth/passport';

// Routes
import userRoute from "./routes/user.route";

export class AppServer {

    app: Application;
    port: string | number;
    paths: any;

    constructor() {

        this.app = express();
        this.port = process.env.PORT || 3000;

        // Routes
        this.paths = {
            userPath: '/api/user',
            homePath: '/'
        }

        // Connect DB
        this.dbConnect().then();

        // Middlewares
        this.middleWares();

        // Routes
        this.routes();
    }

    async dbConnect() {
        await dbConnection.authenticate();
    }

    middleWares = () => {
        // Cors
        this.app.use(cors());

        // Body parsing
        this.app.use(express.json());

        this.app.use(express.urlencoded({
            extended: true
        }));

        // Sessions
        this.app.use(session({
            secret: `${process.env.SESSION_SECRET}`,
            resave: false,
            saveUninitialized: true,
            cookie: {
                sameSite: 'none',
                maxAge: 1000 * 60 * 60 * 24 // 1 day
            }
        }));

        // Passport configuration
        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }

    routes = () => {
        this.app.use(this.paths.userPath, userRoute);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto: ', this.port);
        });
    }
}
