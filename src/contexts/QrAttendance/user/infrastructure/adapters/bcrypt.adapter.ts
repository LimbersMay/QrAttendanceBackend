import {injectable} from "inversify";
import bcryptjs from 'bcryptjs';
import {EncryptService} from "../../../shared/application/services/encrypt.service";

@injectable()
export class BcryptAdapter implements EncryptService {
    async hash(text:string): Promise<string>{
        const salt = await bcryptjs.genSalt();
        return await bcryptjs.hash(text, salt);
    }
    async compare(text: string, verify: string): Promise<boolean> {
        return await bcryptjs.compare(text, verify);
    }
}
