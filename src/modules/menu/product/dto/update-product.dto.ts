import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsNumber, IsBoolean, IsArray } from "class-validator";

export class UpdateProductDto {
    @ApiProperty({ description: 'Nombre del producto', required: false })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({ description: 'ID externo del producto', required: false })
    @IsString()
    @IsOptional()
    externalId?: string;

    @ApiProperty({ description: 'Descripción del producto', required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ description: 'ID de la categoría', required: false })
    @IsString()
    @IsOptional()
    categoryId?: string;

    @ApiProperty({ description: 'Precio base del producto', required: false })
    @IsNumber()
    @IsOptional()
    basePrice?: number;

    @ApiProperty({ description: 'Indica si es un combo', required: false })
    @IsBoolean()
    @IsOptional()
    isCombo?: boolean;

    @ApiProperty({ description: 'Sistema ERP', required: false })
    @IsString()
    @IsOptional()
    erpSystem?: string;

    @ApiProperty({ description: 'URL de la imagen', required: false })
    @IsString()
    @IsOptional()
    image?: string;

    @ApiProperty({ description: 'Tiempo de preparación en minutos', required: false })
    @IsNumber()
    @IsOptional()
    preparationTime?: number;

    @ApiProperty({ description: 'Lista de ingredientes', required: false })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    ingredients?: string[];

    @ApiProperty({ description: 'Información nutricional', required: false })
    @IsOptional()
    nutritionalInfo?: {
        calories?: number;
        proteins?: number;
        carbs?: number;
        fats?: number;
    };

    @ApiProperty({ description: 'Estado activo/inactivo del producto', required: false })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
} 