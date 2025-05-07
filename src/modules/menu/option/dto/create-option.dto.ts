import { IsNotEmpty, IsString, IsOptional, IsNumber, IsBoolean, IsMongoId, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateOptionDto {
    @ApiPropertyOptional({
        description: 'ID externo para integración con otros sistemas',
        example: 'OPT-001'
    })
    @IsString({ message: 'El ID externo debe ser una cadena de texto' })
    @IsOptional()
    externalId?: string;

    @ApiPropertyOptional({
        description: 'Sistema ERP utilizado',
        example: 'RestPE'
    })
    @IsString({ message: 'El sistema ERP debe ser una cadena de texto' })
    @IsOptional()
    erpSystem?: string;

    @ApiProperty({
        description: 'ID de la marca a la que pertenece la opción',
        example: '507f1f77bcf86cd799439011'
    })
    @IsMongoId({ message: 'El ID de la marca debe ser un MongoID válido' })
    @IsNotEmpty({ message: 'El ID de la marca es requerido' })
    brandId: string;

    @ApiProperty({
        description: 'ID del modificador al que pertenece la opción',
        example: '507f1f77bcf86cd799439012'
    })
    @IsMongoId({ message: 'El ID del modificador debe ser un MongoID válido' })
    @IsOptional()
    modifierId: string;

    @ApiProperty({
        description: 'Nombre de la opción',
        example: 'Término medio'
    })
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El nombre es requerido' })
    name: string;

    @ApiProperty({
        description: 'Precio base de la opción',
        example: 10.50,
        minimum: 0
    })
    @IsNumber({ maxDecimalPlaces: 2 }, { message: 'El precio base debe ser un número con máximo 2 decimales' })
    @Min(0, { message: 'El precio base no puede ser negativo' })
    @Type(() => Number)
    @IsNotEmpty({ message: 'El precio base es requerido' })
    basePrice: number;

    @ApiPropertyOptional({
        description: 'Orden de visualización de la opción',
        example: 1,
        default: 0
    })
    @IsNumber({}, { message: 'El orden debe ser un número' })
    @Min(0, { message: 'El orden no puede ser negativo' })
    @IsOptional()
    order?: number;

    @ApiPropertyOptional({
        description: 'Indica si la opción es la predeterminada',
        example: false,
        default: false
    })
    @IsBoolean({ message: 'isDefault debe ser un valor booleano' })
    @IsOptional()
    isDefault?: boolean;

    @ApiPropertyOptional({
        description: 'Estado de la opción',
        example: true,
        default: true
    })
    @IsBoolean({ message: 'isActive debe ser un valor booleano' })
    @IsOptional()
    isActive?: boolean;

    @ApiPropertyOptional({
        description: 'Indica si la opción tiene control de stock',
        example: false,
        default: false
    })
    @IsBoolean({ message: 'stockControl debe ser un valor booleano' })
    @IsOptional()
    stockControl?: boolean;
} 