import {IsNotEmpty, IsString, IsUUID} from "class-validator";

export class QrCodeIdDTO {
    @IsNotEmpty({
        message: 'QrCodeId is required'
    })
    @IsString({
        message: 'QrCodeId must be a string'
    })
    @IsUUID('all', {
        message: 'QrCodeId must be a valid UUID'
    })
    id!: string;
}
