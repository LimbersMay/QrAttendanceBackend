import {EncryptService} from "../../../shared/infraestructure/adapters/encrypt.service";
import bcryptjs from 'bcryptjs';
export class BcryptAdapter implements EncryptService {
    async hash(text:string): Promise<string>{
        const salt = await bcryptjs.genSalt();
        return await bcryptjs.hash(text, salt);
    }
    async compare(text: string, verify: string): Promise<boolean> {
        return await bcryptjs.compare(text, verify);
    }
}
