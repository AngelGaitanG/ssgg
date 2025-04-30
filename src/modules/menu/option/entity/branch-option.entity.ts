import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Option } from "./option.entity";
import { Branch } from "src/modules/businesses/branch/entity/branch.entity";

@Schema({ timestamps: true })
export class BranchOption {
    @Prop()
    branchId: string;

    @Prop()
    optionId: string;

    @Prop({ default: true })
    isActive: boolean;

    @Prop({ type: Number, nullable: true })
    currentStock: number;

    @Prop({ type: Number, precision: 10, scale: 2, nullable: true })
    price: number;

    @Prop({ default: true })
    availability: boolean;

    @Prop({ default: false })
    stockControl: boolean;

    @Prop({ type: Number, nullable: true })
    maxDailyOrders: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Option" })
    option: Option;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Branch" })
    branch: Branch;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;
}