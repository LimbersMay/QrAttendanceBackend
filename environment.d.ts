import "reflect-metadata";

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            COOKIE_SECRET: string;
            SESSION_SECRET: string;
            MYSQL_DATABASE: string;
            MYSQL_USER: string;
            MYSQL_PASSWORD: string;
            MYSQL_HOST: string;
            MYSQL_PORT: string;
            NODE_ENV: string;
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}