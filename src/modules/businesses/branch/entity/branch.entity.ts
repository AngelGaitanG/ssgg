import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Brand } from "../../brand/entity/brand.entity";
import mongoose from "mongoose";

@Schema({ timestamps: true })
export class Branch {

  @Prop({ nullable: true})
  externalId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  phone: string;

  @Prop()
  email: string;

  @Prop({ default: true })
  status: boolean;

  @Prop({ type: String, nullable: true })
  description: string;

  @Prop({ default: '30' })
  minimumDeliveryTime: string;

  @Prop({ type: Number, default: 20 })
  minimumOrderAmount: number;

  @Prop({ nullable: true })
  whatsappNumber: string;

  @Prop({ type: Number, default: 18 })
  taxPercentage: number;

  @Prop({ type: Number, default: 1 })
  zoneType: number;

  @Prop({ default: false })
  isDeliveryEnabled: boolean;

  @Prop({ default: false })
  isDineInEnabled: boolean;

  @Prop({ default: false })
  isPickupEnabled: boolean;

  @Prop({ default: false })
  isSchedulingEnabled: boolean;

  @Prop({ default: false })
  acceptsCardOnDelivery: boolean;

  @Prop({ default: false })
  acceptsCashOnDelivery: boolean;

  @Prop({ default: false })
  acceptsBankTransfer: boolean;

  @Prop({ default: true })
  isOperating: boolean;

  @Prop({ nullable: true })
  statusReason: string;

  @Prop({ type: String, nullable: true })
  locationLatitude: string;

  @Prop({ type: String, nullable: true })
  locationLongitude: string;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  updatedAt: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Brand' })
  brand: Brand;

  @Prop({ required: true })
  brandId: string;

  @Prop({ nullable: true })
  department?: string;

  @Prop({ nullable: true })
  province?: string;

  @Prop({ nullable: true })
  district?: string;

  @Prop({ nullable: true })
  image?: string;

} 

export const BranchSchema = SchemaFactory.createForClass(Branch);