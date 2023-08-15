import {IsNotEmpty, IsUUID} from "class-validator";

export class RegistryIdDTO {
    @IsNotEmpty({
        message: 'Registry Id is required'
    })
    @IsUUID('all', {
        message: 'Registry Id must be a valid UUID'
    })
    id!: string;
}
