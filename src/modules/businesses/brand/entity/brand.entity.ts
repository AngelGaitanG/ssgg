import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";
import { Branch } from "../../branch/entity/branch.entity";
import { LANGUAGES, TIMEZONES, BUSINESS_CATEGORIES } from "../../../../core/constants";

@Schema({ timestamps: true })
export class Brand {

  @Prop({ required: true })
  name: string;

  @Prop({ nullable: true })
  logo: string;

  @Prop({ type: String, nullable: true })
  description: string;

  @Prop({ required: true, unique: true })
  subdomain: string;

  @Prop({ nullable: true })
  domainUrl: string;

  @Prop({ nullable: true, enum: BUSINESS_CATEGORIES })
  businessCategory: BUSINESS_CATEGORIES;

  @Prop({ default: LANGUAGES.SPANISH, enum: LANGUAGES })
  language: LANGUAGES;

  @Prop({ default: TIMEZONES.LIMA, enum: TIMEZONES })
  timezone: TIMEZONES;

  @Prop({ type: Object, nullable: true })
  socialNetworks: { [key: string]: string };

  @Prop({ default: false })
  allowsOnlineInvoicing: boolean;

  @Prop({ default: false })
  allowsReceipts: boolean;

  @Prop({ default: false })
  allowsInvoices: boolean;

  @Prop({ default: false })
  acceptsOnlinePayments: boolean;

  @Prop({ type: Object, nullable: true })
  currency: {
    name: string;
    symbol: string;
    code: string;
    exchangeRate: number;
  };

  @Prop({ default: true })
  status: boolean;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Branch' })
  branches: Branch[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
} 
export type BrandDocument = Brand & Document;

export const BrandSchema = SchemaFactory.createForClass(Brand);