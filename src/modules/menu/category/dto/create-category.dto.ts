import { IsNotEmpty, IsString, IsOptional, IsNumber, IsBoolean, IsMongoId } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
    @ApiProperty({ 
        description: 'Nombre de la categoría',
        example: 'Bebidas' 
    })
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El nombre es requerido' })
    name: string;

    @ApiPropertyOptional({ 
        description: 'Descripción de la categoría',
        example: 'Todas las bebidas disponibles' 
    })
    @IsString({ message: 'La descripción debe ser una cadena de texto' })
    @IsOptional()
    description?: string;

    @ApiProperty({ 
        description: 'ID de la marca a la que pertenece la categoría',
        example: '507f1f77bcf86cd799439011' 
    })
    @IsMongoId({ message: 'El ID de la marca debe ser un MongoID válido' })
    @IsNotEmpty({ message: 'El ID de la marca es requerido' })
    brandId: string;

    @ApiPropertyOptional({ 
        description: 'ID externo para integración con otros sistemas',
        example: 'EXT-123' 
    })
    @IsString({ message: 'El ID externo debe ser una cadena de texto' })
    @IsOptional()
    externalId?: string;

    @ApiPropertyOptional({ 
        description: 'Sistema ERP utilizado',
        example: 'SAP' 
    })
    @IsString({ message: 'El sistema ERP debe ser una cadena de texto' })
    @IsOptional()
    erpSystem?: string;

    @ApiPropertyOptional({ 
        description: 'Tamaño de la porción',
        example: 1 
    })
    @IsNumber({}, { message: 'El tamaño de la porción debe ser un número' })
    @IsOptional()
    servingSize?: number;

    @ApiPropertyOptional({ 
        description: 'Orden de la categoría',
        example: 1,
        default: 0 
    })
    @IsNumber({}, { message: 'El orden debe ser un número' })
    @IsOptional()
    order?: number;

    @ApiPropertyOptional({ 
        description: 'Estado de la categoría',
        example: true,
        default: true 
    })
    @IsBoolean({ message: 'El estado debe ser un valor booleano' })
    @IsOptional()
    isActive?: boolean;
} 