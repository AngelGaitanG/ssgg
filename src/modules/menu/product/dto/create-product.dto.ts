import { IsNotEmpty, IsString, IsOptional, IsNumber, IsBoolean, IsMongoId, IsArray, IsUrl, ValidateNested, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class NutritionalInfoDto {
    @ApiPropertyOptional({
        description: 'Calorías del producto',
        example: 250
    })
    @IsNumber({}, { message: 'Las calorías deben ser un número' })
    @IsOptional()
    calories?: number;

    @ApiPropertyOptional({
        description: 'Proteínas del producto en gramos',
        example: 15
    })
    @IsNumber({}, { message: 'Las proteínas deben ser un número' })
    @IsOptional()
    proteins?: number;

    @ApiPropertyOptional({
        description: 'Carbohidratos del producto en gramos',
        example: 30
    })
    @IsNumber({}, { message: 'Los carbohidratos deben ser un número' })
    @IsOptional()
    carbs?: number;

    @ApiPropertyOptional({
        description: 'Grasas del producto en gramos',
        example: 10
    })
    @IsNumber({}, { message: 'Las grasas deben ser un número' })
    @IsOptional()
    fats?: number;
}

export class CreateProductDto {
    @ApiProperty({
        description: 'Nombre del producto',
        example: 'Hamburguesa Clásica'
    })
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El nombre es requerido' })
    name: string;

    @ApiPropertyOptional({
        description: 'ID externo para integración con otros sistemas',
        example: 'PROD-001'
    })
    @IsString({ message: 'El ID externo debe ser una cadena de texto' })
    @IsOptional()
    externalId?: string;

    @ApiPropertyOptional({
        description: 'Descripción del producto',
        example: 'Deliciosa hamburguesa con carne 100% de res, lechuga, tomate y queso cheddar'
    })
    @IsString({ message: 'La descripción debe ser una cadena de texto' })
    @IsOptional()
    description?: string;

    @ApiProperty({
        description: 'ID de la categoría a la que pertenece el producto',
        example: '507f1f77bcf86cd799439011'
    })
    @IsMongoId({ message: 'El ID de la categoría debe ser un MongoID válido' })
    @IsNotEmpty({ message: 'El ID de la categoría es requerido' })
    categoryId: string;

    @ApiProperty({
        description: 'Precio base del producto',
        example: 99.99,
        minimum: 0
    })
    @IsNumber({}, { message: 'El precio base debe ser un número' })
    @Min(0, { message: 'El precio base no puede ser negativo' })
    @IsNotEmpty({ message: 'El precio base es requerido' })
    basePrice: number;

    @ApiPropertyOptional({
        description: 'Indica si el producto es un combo',
        example: false,
        default: false
    })
    @IsBoolean({ message: 'isCombo debe ser un valor booleano' })
    @IsOptional()
    isCombo?: boolean;

    @ApiProperty({
        description: 'Sistema ERP utilizado',
        example: 'RestPE'
    })
    @IsString({ message: 'El sistema ERP debe ser una cadena de texto' })
    @IsOptional()
    erpSystem?: string;

    @ApiPropertyOptional({
        description: 'URL de la imagen del producto',
        example: 'https://ejemplo.com/imagen.jpg'
    })
    @IsUrl({}, { message: 'La imagen debe ser una URL válida' })
    @IsOptional()
    image?: string;

    @ApiProperty({
        description: 'Tiempo de preparación en minutos',
        example: 15,
        minimum: 1
    })
    @IsNumber({}, { message: 'El tiempo de preparación debe ser un número' })
    @Min(1, { message: 'El tiempo de preparación debe ser al menos 1 minuto' })
    @IsNotEmpty({ message: 'El tiempo de preparación es requerido' })
    preparationTime: number;

    @ApiPropertyOptional({
        description: 'Lista de ingredientes',
        example: ['Pan', 'Carne', 'Lechuga', 'Tomate', 'Queso']
    })
    @IsArray({ message: 'Los ingredientes deben ser un array de strings' })
    @IsString({ each: true, message: 'Cada ingrediente debe ser una cadena de texto' })
    @IsOptional()
    ingredients?: string[];

    @ApiPropertyOptional({
        description: 'Información nutricional del producto'
    })
    @ValidateNested()
    @Type(() => NutritionalInfoDto)
    @IsOptional()
    nutritionalInfo?: NutritionalInfoDto;

    @ApiPropertyOptional({
        description: 'Estado del producto',
        example: true,
        default: true
    })
    @IsBoolean({ message: 'isActive debe ser un valor booleano' })
    @IsOptional()
    isActive?: boolean;

    @ApiProperty({
        description: 'ID de la marca a la que pertenece el producto',
        example: '507f1f77bcf86cd799439011'
    })
    @IsMongoId({ message: 'El ID de la marca debe ser un MongoID válido' })
    @IsNotEmpty({ message: 'El ID de la marca es requerido' })
    brandId: string;
} 