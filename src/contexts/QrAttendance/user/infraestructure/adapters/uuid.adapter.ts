import {UuiService} from "../../../shared/application/services/uui.service";

import { v4 as uuid } from 'uuid';

export class UuidAdapter implements UuiService {
    random(): string {
        return uuid();
    }
}
