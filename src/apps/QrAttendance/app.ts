import "reflect-metadata";

import {config} from 'dotenv';
import path from "path";
const pathToEnv = path.resolve(__dirname + `../../../../.${process.env.NODE_ENV}.env`);

config({
    path: pathToEnv
})

import {Server} from "./app-server";

const server = new Server();
server.listen();
