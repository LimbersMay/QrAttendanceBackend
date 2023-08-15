import {IsNotEmpty, IsString, IsUUID} from "class-validator";

export class CreateRegistryDTO {
    @IsNotEmpty({
        message: 'qrId is required'
    })
    @IsString({
        message: 'qrId must be a string'
    })
    @IsUUID('all', {
        message: 'qrId must be a valid uuid'
    })
    qrId!: string

    @IsNotEmpty({
        message: 'name is required'
    })
    @IsString({
        message: 'name must be a string'
    })
    name!: string

    @IsNotEmpty({
        message: 'group is required'
    })
    @IsString({
        message: 'group must be a string'
    })
    group!: string;

    @IsNotEmpty({
        message: 'career is required'
    })
    @IsString({
        message: 'career must be a string'
    })
    career!: string;

    @IsNotEmpty({
        message: 'firstSurname is required'
    })
    @IsString({
        message: 'firstSurname must be a string'
    })
    firstSurname!: string;

    @IsNotEmpty({
        message: 'secondSurname is required'
    })
    @IsString({
        message: 'secondSurname must be a string'
    })
    secondSurname!: string;
}
