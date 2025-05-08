import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsNumber, IsBoolean } from "class-validator";

export class UpdateModifierDto {
    @ApiProperty({ description: 'ID externo del modificador', required: false })
    @IsString()
    @IsOptional()
    externalId?: string;

    @ApiProperty({ description: 'Sistema ERP', required: false })
    @IsString()
    @IsOptional()
    erpSystem?: string;

    @ApiProperty({ description: 'Nombre del modificador', required: false })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({ description: 'Descripción del modificador', required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ description: 'Mínimo de selecciones permitidas', required: false })
    @IsNumber()
    @IsOptional()
    minSelections?: number;

    @ApiProperty({ description: 'Máximo de selecciones permitidas', required: false })
    @IsNumber()
    @IsOptional()
    maxSelections?: number;

    @ApiProperty({ description: 'Indica si el modificador es requerido', required: false })
    @IsBoolean()
    @IsOptional()
    isRequired?: boolean;

    @ApiProperty({ description: 'Orden del modificador', required: false })
    @IsNumber()
    @IsOptional()
    order?: number;

    @ApiProperty({ description: 'Estado activo/inactivo del modificador', required: false })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
} 