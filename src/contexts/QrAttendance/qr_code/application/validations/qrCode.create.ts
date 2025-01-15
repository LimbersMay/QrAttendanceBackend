import {IsBoolean, IsNotEmpty, IsString, IsUUID} from "class-validator";

export class CreateQrCodeDTO {
    @IsNotEmpty({
        message: 'Name is required'
    })
    @IsString({
        message: 'Name must be a string'
    })
    name!: string;

    @IsNotEmpty({
        message: 'Group Id is required'
    })
    @IsUUID('all', {
        message: 'Group Id must be a valid UUID'
    })
    groupId!: string;

    @IsNotEmpty({
        message: 'Enabled is required'
    })
    @IsBoolean({
        message: 'Enabled must be a boolean'
    })
    enabled!: boolean;
    url!: string;
    manualRegistrationDate!: Date
}
