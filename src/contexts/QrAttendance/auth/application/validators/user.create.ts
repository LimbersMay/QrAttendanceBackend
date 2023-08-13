import {IsEmail, IsNotEmpty, IsString, MinLength} from "class-validator";

export class CreateUserDTO {
    @IsNotEmpty({
        message: "Name is required"
    })
    @IsString({
        message: "Name must be a string"
    })
    @MinLength(3, {
        message: "Name must be at least 3 characters",
    })
    name!: string;

    @IsNotEmpty({
        message: "Lastname is required"
    })
    @IsString({
        message: "Lastname must be a string"
    })
    @MinLength(3, {
        message: "Lastname must be at least 3 characters"
    })
    lastname!: string;

    @IsNotEmpty({
        message: "Email is required"
    })
    @IsEmail({}, {
        message: "Email must be a valid email"
    })
    email!: string;

    @IsNotEmpty({
        message: "Password is required"
    })
    @IsString({
        message: "Password must be a string"
    })
    @MinLength(6, {
        message: "Password must be at least 6 characters"
    })
    password!: string;
}
