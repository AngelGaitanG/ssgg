import { IsNotEmpty, IsString, IsOptional, IsNumber, IsBoolean, IsMongoId, IsArray, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateModifierDto {
    @ApiPropertyOptional({
        description: 'ID externo para integración con otros sistemas',
        example: 'MOD-001'
    })
    @IsString({ message: 'El ID externo debe ser una cadena de texto' })
    @IsOptional()
    externalId?: string;

    @ApiProperty({
        description: 'Sistema ERP utilizado',
        example: 'RestPE'
    })
    @IsString({ message: 'El sistema ERP debe ser una cadena de texto' })
    @IsOptional()
    erpSystem?: string;

    @ApiProperty({
        description: 'ID de la marca a la que pertenece el modificador',
        example: '507f1f77bcf86cd799439011'
    })
    @IsMongoId({ message: 'El ID de la marca debe ser un MongoID válido' })
    @IsNotEmpty({ message: 'El ID de la marca es requerido' })
    brandId: string;

    @ApiProperty({
        description: 'Nombre del modificador',
        example: 'Tipo de Cocción'
    })
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El nombre es requerido' })
    name: string;

    @ApiPropertyOptional({
        description: 'Descripción del modificador',
        example: 'Seleccione el punto de cocción de su carne'
    })
    @IsString({ message: 'La descripción debe ser una cadena de texto' })
    @IsOptional()
    description?: string;

    @ApiProperty({
        description: 'Número mínimo de opciones que se deben seleccionar',
        example: 1,
        minimum: 0
    })
    @IsNumber({}, { message: 'El número mínimo de selecciones debe ser un número' })
    @Min(0, { message: 'El número mínimo de selecciones no puede ser negativo' })
    @IsNotEmpty({ message: 'El número mínimo de selecciones es requerido' })
    minSelections: number;

    @ApiProperty({
        description: 'Número máximo de opciones que se pueden seleccionar',
        example: 1,
        minimum: 1
    })
    @IsNumber({}, { message: 'El número máximo de selecciones debe ser un número' })
    @Min(1, { message: 'El número máximo de selecciones debe ser al menos 1' })
    @IsNotEmpty({ message: 'El número máximo de selecciones es requerido' })
    maxSelections: number;

    @ApiPropertyOptional({
        description: 'Indica si el modificador es requerido',
        example: false,
        default: false
    })
    @IsBoolean({ message: 'isRequired debe ser un valor booleano' })
    @IsOptional()
    isRequired?: boolean;

    @ApiPropertyOptional({
        description: 'Orden de visualización del modificador',
        example: 1,
        default: 0
    })
    @IsNumber({}, { message: 'El orden debe ser un número' })
    @Min(0, { message: 'El orden no puede ser negativo' })
    @IsOptional()
    order?: number;

    @ApiPropertyOptional({
        description: 'Estado del modificador',
        example: true,
        default: true
    })
    @IsBoolean({ message: 'isActive debe ser un valor booleano' })
    @IsOptional()
    isActive?: boolean;

    @ApiPropertyOptional({
        description: 'IDs de las opciones asociadas al modificador',
        example: ['507f1f77bcf86cd799439011', '507f1f77bcf86cd799439012'],
        type: [String]
    })
    @IsArray({ message: 'Las opciones deben ser un array de IDs' })
    @IsMongoId({ each: true, message: 'Cada opción debe ser un MongoID válido' })
    @IsOptional()
    options?: string[];
} 