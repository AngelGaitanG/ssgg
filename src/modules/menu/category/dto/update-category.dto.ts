import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsNumber, IsBoolean } from "class-validator";

export class UpdateCategoryDto {
    @ApiProperty({ description: 'Nombre de la categoría', required: false })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({ description: 'Descripción de la categoría', required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ description: 'ID externo de la categoría', required: false })
    @IsString()
    @IsOptional()
    externalId?: string;

    @ApiProperty({ description: 'Sistema ERP', required: false })
    @IsString()
    @IsOptional()
    erpSystem?: string;

    @ApiProperty({ description: 'Tamaño de la porción', required: false })
    @IsNumber()
    @IsOptional()
    servingSize?: number;

    @ApiProperty({ description: 'Orden de la categoría', required: false })
    @IsNumber()
    @IsOptional()
    order?: number;

    @ApiProperty({ description: 'Estado activo/inactivo de la categoría', required: false })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
} 