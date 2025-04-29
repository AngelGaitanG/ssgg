/**
 * DTO: Create Role
 * Define la estructura de datos para crear un nuevo rol.
 * Incluye validaciones usando class-validator.
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    description: 'Nombre del rol',
    example: 'ADMIN',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @ApiProperty({
    description: 'Descripción del rol',
    example: 'Administrador del sistema',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  description?: string;
} 