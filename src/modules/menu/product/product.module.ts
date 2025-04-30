import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "./entity/product.entity";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { ProductMongodbService } from "./db/product-mongodb.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Product.name, schema: ProductSchema }
        ])
    ],
    controllers: [ProductController],
    providers: [ProductService, ProductMongodbService],
    exports: [ProductService],
})
export class ProductModule {}
