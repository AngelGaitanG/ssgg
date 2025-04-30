import { Prop, Schema } from "@nestjs/mongoose";
import { Product } from "../../product/entity/product.entity";
import mongoose from "mongoose";
import { Modifier } from "./modifier.entity";

@Schema({ timestamps: true })
export class BranchModifier {
    @Prop()
    productId: string;

    @Prop()
    modifierId: string;

    @Prop({ default: true })
    isActive: boolean;

    @Prop({ type: Number, nullable: true })
    customMinSelections: number;

    @Prop({ type: Number, nullable: true })
    customMaxSelections: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Product" })
    product: Product;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Modifier" })
    modifierGroup: Modifier;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;
}