import "reflect-metadata";

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            JWT_SECRET: string;
            COOKIE_SECRET: string;
            SESSION_SECRET: string;
            MYSQL_DATABASE: string;
            MYSQL_USER: string;
            MYSQL_PASSWORD: string;
            MYSQL_HOST: string;
            MYSQL_PORT: string;
            NODE_ENV: string;
            GOOGLE_CLIENT_ID: string;
            GOOGLE_CLIENT_SECRET: string;
            GOOGLE_CALLBACK_URL: string;
            API_URL: string;
            CLIENT_URL: string;
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}