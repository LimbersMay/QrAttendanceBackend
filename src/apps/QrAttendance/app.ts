import {config} from 'dotenv';

config({
    path: __dirname + '/.production.example.env'
})

import {Server} from "./app.server";

const server = new Server();
server.listen();
