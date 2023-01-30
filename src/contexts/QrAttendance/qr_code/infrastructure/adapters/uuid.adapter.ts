import { v4 as uuid } from 'uuid';
import {injectable} from "inversify";

import {UUIDGenerator} from "../../../shared/application/services/UUIDGenerator";

@injectable()
export class UuidAdapter implements UUIDGenerator {
    random(): string {
        return uuid();
    }
}
