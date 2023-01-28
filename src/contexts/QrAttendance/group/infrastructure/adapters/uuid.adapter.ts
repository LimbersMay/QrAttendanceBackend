import {UUIDGenerator} from "../../../shared/application/services/UUIDGenerator";

import { v4 as uuid } from 'uuid';

export class UuidAdapter implements UUIDGenerator {
    random(): string {
        return uuid();
    }
}