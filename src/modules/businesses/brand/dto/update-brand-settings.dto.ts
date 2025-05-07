import { IsString, IsOptional, IsEnum, IsObject, IsBoolean, IsNumber, ValidateNested } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { LANGUAGES, TIMEZONES, BUSINESS_CATEGORIES } from '../../../../core/constants';

class CurrencySettingsDto {
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    name?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    symbol?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    code?: string;

    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional()
    exchangeRate?: number;
}


export class UpdateBrandSettingsDto {
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    name?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    description?: string;

    @ApiPropertyOptional({ enum: BUSINESS_CATEGORIES })
    @IsEnum(BUSINESS_CATEGORIES)
    @IsOptional()
    businessCategory?: BUSINESS_CATEGORIES;

    @ApiPropertyOptional({ enum: LANGUAGES })
    @IsEnum(LANGUAGES)
    @IsOptional()
    language?: LANGUAGES;

    @ApiPropertyOptional({ enum: TIMEZONES })
    @IsEnum(TIMEZONES)
    @IsOptional()
    timezone?: TIMEZONES;

    @ApiPropertyOptional()
    @IsObject()
    @IsOptional()
    socialNetworks?: { [key: string]: string };

    @ApiPropertyOptional()
    @IsBoolean()
    @IsOptional()
    allowsOnlineInvoicing?: boolean;

    @ApiPropertyOptional()
    @IsBoolean()
    @IsOptional()
    allowsReceipts?: boolean;

    @ApiPropertyOptional()
    @IsBoolean()
    @IsOptional()
    allowsInvoices?: boolean;

    @ApiPropertyOptional()
    @IsBoolean()
    @IsOptional()
    acceptsOnlinePayments?: boolean;

    @ApiPropertyOptional()
    @ValidateNested()
    @Type(() => CurrencySettingsDto)
    @IsOptional()
    currency?: CurrencySettingsDto;

    @IsOptional()
    logo?: string;
} 