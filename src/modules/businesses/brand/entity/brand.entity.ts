import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";
import { Branch } from "../../branch/entity/branch.entity";


@Schema({ timestamps: true })
export class Brand {

  @Prop({ required: true })
  name: string;

  @Prop({ nullable: true })
  logo: string;

  @Prop({ type: String, nullable: true })
  description: string;

  @Prop({ nullable: true })
  subdomain: string;

  @Prop({ nullable: true })
  domainUrl: string;

  @Prop({ nullable: true })
  businessCategory: string;

  @Prop({ default: 'es' })
  language: string;

  @Prop({ default: 'America/Lima' })
  timezone: string;

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