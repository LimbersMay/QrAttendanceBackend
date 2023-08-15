import {IsNotEmpty, IsOptional, IsString, ValidateIf} from "class-validator";
import {GroupQuery} from "../../domain";

export class UpdateGroupDTO implements GroupQuery {
    @IsOptional()
    @ValidateIf((_v, value) => value !== undefined)
    @IsNotEmpty({
        message: 'The name is required'
    })
    @IsString({
        message: 'The name must be a string'
    })
    name!: string;
}
