import {config} from 'dotenv';
import path from "path";

const pathToEnv = path.resolve(__dirname + '../' + '../' + '../' + '../' + '.env');

config({
    path: pathToEnv
})

import {Server} from "./app.server";

const server = new Server();
server.listen();
