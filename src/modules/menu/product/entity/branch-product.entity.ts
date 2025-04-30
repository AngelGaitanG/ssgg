import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Branch } from "src/modules/businesses/branch/entity/branch.entity";
import { Product } from "./product.entity";

@Schema({ timestamps: true })
export class BranchProduct {
  
    @Prop()
    productId: string;
  
    @Prop({ default: true })
    isActive: boolean;
  
    @Prop({ type: Number, precision: 10, scale: 2, nullable: true })
    price: number;
  
    @Prop({ default: true })
    availability: boolean;
  
    @Prop({ default: false })
    stockControl: boolean;
  
    @Prop({ type: Number, nullable: true })
    maxDailyOrders: number;
  
    @Prop({ type: String, nullable: true })
    startTime: string;
  
    @Prop({ type: String, nullable: true })
    endTime: string;
  
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Product" })
    product: Product;
  
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Branch" })
    branch: Branch;
  
    @Prop()
    createdAt: Date;
  
    @Prop()
    updatedAt: Date;
}

export const BranchProductSchema = SchemaFactory.createForClass(BranchProduct);
