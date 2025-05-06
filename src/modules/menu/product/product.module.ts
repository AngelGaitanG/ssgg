import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "./entity/product.entity";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { ProductMongodbService } from "./db/product-mongodb.service";
import { Brand, BrandSchema } from "../../businesses/brand/entity/brand.entity";
import { Category, CategorySchema } from "../category/entity/category.entity";
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Product.name, schema: ProductSchema },
            { name: Brand.name, schema: BrandSchema },
            { name: Category.name, schema: CategorySchema }
        ])
    ],
    controllers: [ProductController],
    providers: [ProductService, ProductMongodbService],
    exports: [ProductService],
})
export class ProductModule {}
