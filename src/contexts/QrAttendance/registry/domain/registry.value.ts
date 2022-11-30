import { RegistryEntity } from "./registry.entity";

export class RegistryValue implements RegistryEntity {
    registryId: string;
    name: string;
    mothersName: string;
    fathersName: string;
    updatedAt: Date | undefined;
    createdAt: Date | undefined;
    
    constructor({registryId, name, mothersName, fathersName, createdAt, updatedAt}: RegistryEntity) {
        this.name = name;
        this.mothersName = mothersName;
        this.fathersName = fathersName;

        this.registryId = registryId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
