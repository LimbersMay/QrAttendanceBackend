import {IsOptional, IsString, ValidateIf} from "class-validator";
import {UserQuery} from "../../domain";

export class UpdateUserDTO implements UserQuery{

    @IsOptional()
    @ValidateIf((_v, value) => value !== undefined)
    @IsString({
        message: 'Name must be a string'
    })
    name!: string;

    @IsOptional()
    @IsString({
        message: 'Lastname must be a string'
    })
    lastname!: string;

    @IsOptional()
    @IsString({
        message: 'Email must be a string'
    })
    email!: string;

    @IsOptional()
    @IsString({
        message: 'Password must be a string'
    })
    password!: string;
}