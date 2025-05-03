import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";
import { RoleType } from "../role/entity/role.entity";

export class SignUpDto {
    @IsEmail({}, { message: 'El email no es válido' })
    @IsNotEmpty({ message: 'El email es requerido' })
    email: string;

    @IsString({ message: 'La contraseña no debe solo contener números' })
    @IsNotEmpty({ message: 'La contraseña es requerida' })
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    @IsStrongPassword({minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}, { message: 'La contraseña debe tener al menos una letra mayúscula, una minúscula y un número' })
    password: string;

    @IsString({ message: 'El nombre completo no debe ser solo números' })
    @IsNotEmpty({ message: 'El nombre completo es requerido' })
    @MinLength(3, { message: 'El nombre completo debe tener al menos 3 caracteres' })
    @MaxLength(50, { message: 'El nombre completo debe tener menos de 100 caracteres' })
    fullName: string;

    @IsEnum(RoleType, { message: 'El tipo de rol no es válido, Roles disponibles: ' + Object.values(RoleType).join(', ') })
    @IsOptional()
    roleType: RoleType;
}

