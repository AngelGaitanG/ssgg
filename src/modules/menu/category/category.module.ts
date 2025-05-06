import { Module } from "@nestjs/common";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Category, CategorySchema } from "./entity/category.entity";
import { CategoryMondodbService } from "./db/category-mondodb.service";
import { Brand, BrandSchema } from "../../businesses/brand/entity/brand.entity";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Category.name, schema: CategorySchema },
            { name: Brand.name, schema: BrandSchema }
        ])
    ],
    controllers: [CategoryController],
    providers: [CategoryService, CategoryMondodbService],
    exports: [CategoryService],
})
export class CategoryModule {}
