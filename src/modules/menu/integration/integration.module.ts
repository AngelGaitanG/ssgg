import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { Category, CategorySchema } from '../category/entity/category.entity';
import { Product, ProductSchema } from '../product/entity/product.entity';
import { Modifier, ModifierSchema } from '../modifier/entity/modifier.entity';
import { Option, OptionSchema } from '../option/entity/option.entity';
import { RestpeIntegrationService } from './services/restpe-integration.service';
import { IntegrationController } from './integration.controller';
import { Brand, BrandSchema } from '../../../modules/businesses/brand/entity/brand.entity';
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Category.name, schema: CategorySchema },
            { name: Product.name, schema: ProductSchema },
            { name: Modifier.name, schema: ModifierSchema },
            { name: Option.name, schema: OptionSchema },
            { name: Brand.name, schema: BrandSchema },
        ]),
        HttpModule
    ],
    controllers: [IntegrationController],
    providers: [RestpeIntegrationService],
    exports: [RestpeIntegrationService]
})
export class IntegrationModule {}
