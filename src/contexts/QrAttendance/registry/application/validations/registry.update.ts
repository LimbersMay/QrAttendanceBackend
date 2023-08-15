import {RegistryQuery} from "../../domain";
import {IsDateString, IsOptional, IsString, ValidateIf} from "class-validator";

export class UpdateRegistryDTO implements RegistryQuery{
    @IsOptional()
    @ValidateIf((_v, value) => value !== undefined)
    @IsString({
        message: 'Name must be a string'
    })
    name!: string;

    @IsOptional()
    @IsString({
        message: 'Group must be a string'
    })
    group!: string;

    @IsOptional()
    @IsString({
        message: 'Career must be a string'
    })
    career!: string;

    @IsOptional()
    @IsString({
        message: 'First Surname must be a string'
    })
    firstSurname!: string;

    @IsOptional()
    @IsString({
        message: 'Second Surname must be a string'
    })
    secondSurname!: string;

    @IsOptional()
    @IsDateString({}, {
        message: 'Checkin Time must be a date'
    })
    checkinTime!: Date;
}
