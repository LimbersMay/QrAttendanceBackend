import {UuiService} from "../../../shared/infraestructure/adapters/uui.service";

import { v4 as uuid } from 'uuid';

export class UuidAdapter implements UuiService {
    random(): string {
        return uuid();
    }
}
