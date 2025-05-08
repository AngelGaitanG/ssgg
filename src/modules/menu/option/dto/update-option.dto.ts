import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsNumber, IsBoolean } from "class-validator";

export class UpdateOptionDto {
    @ApiProperty({ description: 'ID externo de la opción', required: false })
    @IsString()
    @IsOptional()
    externalId?: string;

    @ApiProperty({ description: 'Sistema ERP', required: false })
    @IsString()
    @IsOptional()
    erpSystem?: string;

    @ApiProperty({ description: 'ID del modificador', required: false })
    @IsString()
    @IsOptional()
    modifierId?: string;

    @ApiProperty({ description: 'Nombre de la opción', required: false })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({ description: 'Precio base de la opción', required: false })
    @IsNumber()
    @IsOptional()
    basePrice?: number;

    @ApiProperty({ description: 'Orden de la opción', required: false })
    @IsNumber()
    @IsOptional()
    order?: number;

    @ApiProperty({ description: 'Indica si es la opción por defecto', required: false })
    @IsBoolean()
    @IsOptional()
    isDefault?: boolean;

    @ApiProperty({ description: 'Estado activo/inactivo de la opción', required: false })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;

    @ApiProperty({ description: 'Control de stock de la opción', required: false })
    @IsBoolean()
    @IsOptional()
    stockControl?: boolean;
} 