import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { RoleType } from "../role/entity/role.entity";

export class SignUpDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsEnum(RoleType)
    @IsNotEmpty()
    roleType: RoleType;
}

