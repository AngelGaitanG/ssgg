import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Category } from "../../category/entity/category.entity";
import { Brand } from "src/modules/businesses/brand/entity/brand.entity";
import { BranchProductSchema } from "./branch-product.entity";
import { BranchProduct } from "./branch-product.entity";

@Schema({ timestamps: true })
export class Product {
    @Prop()
    name: string;

    @Prop({ nullable: true })
    externalId: string;

    @Prop({ nullable: true })
    description: string;

    @Prop()
    categoryId: string;

    @Prop({ type: Number })
    basePrice: number;

    @Prop({ default: false })
    isCombo: boolean;

    @Prop()
    erpSystem: string;

    @Prop({ nullable: true })
    image: string;

    @Prop({ type: Number })
    preparationTime: number;

    @Prop({ type: [String], nullable: true })
    ingredients: string[];

    @Prop({ type: Object, nullable: true })
    nutritionalInfo: {
        calories?: number;
        proteins?: number;
        carbs?: number;
        fats?: number;
    };

    @Prop({ default: true })
    isActive: boolean;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Category" })
    category: Category;

    @Prop({ type: [BranchProductSchema], nullable: true })
    branchProducts: BranchProduct[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Brand" })
    brand: Brand;

    @Prop()
    brandId: string;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
