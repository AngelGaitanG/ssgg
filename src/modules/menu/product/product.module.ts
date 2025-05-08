import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "./entity/product.entity";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { ProductMongodbService } from "./db/product-mongodb.service";
import { Brand, BrandSchema } from "../../businesses/brand/entity/brand.entity";
import { Category, CategorySchema } from "../category/entity/category.entity";
import { BranchProduct, BranchProductSchema } from "./entity/branch-product.entity";
import { Branch, BranchSchema } from "../../../modules/businesses/branch/entity/branch.entity";
import { BranchProductMongodbService } from "./db/branch-product-mongodb.service";
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Product.name, schema: ProductSchema },
            { name: Brand.name, schema: BrandSchema },
            { name: Category.name, schema: CategorySchema },
            { name: BranchProduct.name, schema: BranchProductSchema },
            { name: Branch.name, schema: BranchSchema}
        ])
    ],
    controllers: [ProductController],
    providers: [ProductService, ProductMongodbService, BranchProductMongodbService],
    exports: [ProductService],
})
export class ProductModule {}
