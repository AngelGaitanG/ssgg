import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Brand } from "src/modules/businesses/brand/entity/brand.entity";
import { Option } from "../../option/entity/option.entity";

@Schema({ timestamps: true })
export class Modifier {
    
    @Prop()
    externalId: string;

    @Prop()
    erpSystem: string;

    @Prop()
    brandId: string;

    @Prop()
    name: string;

    @Prop({ nullable: true })
    description: string;

    @Prop()
    minSelections: number;

    @Prop()
    maxSelections: number;

    @Prop({ default: false })
    isRequired: boolean;

    @Prop({ type: Number, default: 0 })
    order: number;

    @Prop({ default: true })
    isActive: boolean;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Brand" })
    brand: Brand;

    @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: "Option" })
    options: Option[];

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;
}

export const ModifierSchema = SchemaFactory.createForClass(Modifier);
