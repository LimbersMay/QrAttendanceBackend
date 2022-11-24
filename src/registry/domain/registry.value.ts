import { v4 as uuid } from 'uuid';
import { RegistryEntity } from "./registry.entity";

export class RegistryValue implements RegistryEntity {
    registryId: string;
    name: string;
    mothersName: string;
    fathersName: string;
    
    constructor({name, mothersName, fathersName}: RegistryEntity) {
        this.name = name;
        this.mothersName = mothersName;
        this.fathersName = fathersName;

        this.registryId = uuid();
    }
}
