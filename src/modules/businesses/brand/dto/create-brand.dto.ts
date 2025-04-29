import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

class CurrencyDto {
    @ApiProperty({ description: 'Nombre de la moneda' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Símbolo de la moneda' })
    @IsString()
    @IsNotEmpty()
    symbol: string;

    @ApiProperty({ description: 'Código de la moneda' })
    @IsString()
    @IsNotEmpty()
    code: string;

    @ApiProperty({ description: 'Tasa de cambio' })
    @IsNotEmpty()
    exchangeRate: number;
}

export class CreateBrandDto {
    @ApiProperty({ description: 'Nombre de la marca' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Logo de la marca', required: false })
    @IsString()
    @IsOptional()
    logo?: string;

    @ApiProperty({ description: 'Descripción de la marca', required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ description: 'Subdominio de la marca', required: false })
    @IsString()
    @IsOptional()
    subdomain?: string;

    @ApiProperty({ description: 'URL del dominio', required: false })
    @IsString()
    @IsOptional()
    domainUrl?: string;

    @ApiProperty({ description: 'Categoría de negocio', required: false })
    @IsString()
    @IsOptional()
    businessCategory?: string;

    @ApiProperty({ description: 'Idioma por defecto', default: 'es' })
    @IsString()
    @IsOptional()
    language?: string;

    @ApiProperty({ description: 'Zona horaria', default: 'America/Lima' })
    @IsString()
    @IsOptional()
    timezone?: string;

    @ApiProperty({ description: 'Redes sociales', required: false })
    @IsOptional()
    socialNetworks?: { [key: string]: string };

    @ApiProperty({ description: 'Permite facturación online', default: false })
    @IsBoolean()
    @IsOptional()
    allowsOnlineInvoicing?: boolean;

    @ApiProperty({ description: 'Permite recibos', default: false })
    @IsBoolean()
    @IsOptional()
    allowsReceipts?: boolean;

    @ApiProperty({ description: 'Permite facturas', default: false })
    @IsBoolean()
    @IsOptional()
    allowsInvoices?: boolean;

    @ApiProperty({ description: 'Acepta pagos online', default: false })
    @IsBoolean()
    @IsOptional()
    acceptsOnlinePayments?: boolean;

    @ApiProperty({ description: 'Configuración de moneda', required: false })
    @ValidateNested()
    @Type(() => CurrencyDto)
    @IsOptional()
    currency?: CurrencyDto;

    @ApiProperty({ description: 'Estado de la marca', default: true })
    @IsBoolean()
    @IsOptional()
    status?: boolean;
} 