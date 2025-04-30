import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Brand } from "src/modules/businesses/brand/entity/brand.entity";
import { Product } from "../../product/entity/product.entity";

@Schema()
export class Category {

  @Prop()
  name: string;

  @Prop({ nullable: true })
  description: string;

  @Prop()
  brandId: string;

  @Prop({ nullable: true })
  externalId: string;

  @Prop()
  erpSystem: string;

  @Prop({ nullable: true })
  servingSize: number;

  @Prop({ default: 0 })
  order: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Brand" })
  brand: Brand;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: "Product" })
  products: Product[];

  @Prop()   
  createdAt: Date;

  @Prop()
  updatedAt: Date;

}

export const CategorySchema = SchemaFactory.createForClass(Category);
