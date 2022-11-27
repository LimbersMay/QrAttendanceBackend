
// Incorrect email or password
import {ErrorMessage} from "../../interfaces/error/error.message";

export class AuthError implements ErrorMessage{
    code: number;
    message: string;

    constructor() {
        this.code = 5;
        this.message = 'Incorrect email or password';
    }

    get incorrectCredentials(): ErrorMessage {
        return {
            code: this.code,
            message: this.message
        }
    }
}
