import "reflect-metadata";
import {UserDTO} from "./src/contexts/QrAttendance/user/application/entities/user.dto";

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            COOKIE_SECRET: string;
            SESSION_SECRET: string;
        }
    }
}

declare global {
    namespace Express {
        interface User extends UserDTO {
        }
        interface Request{
            authenticatedUser: User;
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}