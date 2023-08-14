import {QrCodeQuery} from "../../domain";
import {IsBoolean, IsDateString, IsNotEmpty, IsOptional, IsString, ValidateIf} from "class-validator";

export class UpdateQrCodeDTO implements QrCodeQuery {
    @IsOptional()
    @ValidateIf((_v, value) => value !== undefined)
    @IsNotEmpty({
        message: 'Enabled is required'
    })
    @IsBoolean({
        message: 'Enabled must be a boolean'
    })
    enabled!: boolean;

    @IsOptional()
    @IsNotEmpty({
        message: 'Manual Registration Date is required'
    })
    @IsDateString({}, {
        message: 'Manual Registration Date must be a date'
    })
    manualRegistrationDate!: Date;

    @IsOptional()
    @IsNotEmpty({
        message: 'Name is required'
    })
    @IsString({
        message: 'Name must be a string'
    })
    name!: string;
}
