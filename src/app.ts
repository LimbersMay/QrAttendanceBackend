
import "dotenv/config";

import {AppServer} from "./app.server";

const app: AppServer = new AppServer();
app.listen();
