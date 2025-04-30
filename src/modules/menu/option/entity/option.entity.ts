import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Brand } from "src/modules/businesses/brand/entity/brand.entity";
import { Modifier } from "../../modifier/entity/modifier.entity";

@Schema()
export class Option {
    
    @Prop()
    externalId: string;

    @Prop()
    erpSystem: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Brand" })
    brand: Brand;

    @Prop()
    brandId: string;

    @Prop()
    modifierId: string;

    @Prop()
    name: string;

    @Prop({ type: Number, precision: 10, scale: 2 })
    basePrice: number;

    @Prop({ type: Number, default: 0 })
    order: number;

    @Prop({ default: false })
    isDefault: boolean;

    @Prop({ default: true })
    isActive: boolean;

    @Prop({ default: false })
    stockControl: boolean;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Modifier" })
    modifier: Modifier

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;
}

export const OptionSchema = SchemaFactory.createForClass(Option);
