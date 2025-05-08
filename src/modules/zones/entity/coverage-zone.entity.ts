import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Branch } from "src/modules/businesses/branch/entity/branch.entity";

@Schema({ timestamps: true })
export class CoverageZone {
  @Prop()
  externalId: string;

  @Prop()
  branchId: string;

  @Prop({ nullable: true })
  originalBranchId: string;

  @Prop()
  name: string;

  @Prop()
  deliveryCost: string;

  @Prop({
    type: [
      {
        id: String,
        latitude: Number,
        longitude: Number,
      },
    ],
  })
  route: {
    id: string;
    latitude: number;
    longitude: number;
  }[];

  @Prop()
  status: string;

  @Prop()
  color: string;

  @Prop({ nullable: true })
  startTime: string;

  @Prop({ nullable: true })
  endTime: string;

  @Prop()
  minOrderForFreeDelivery: string;

  @Prop()
  allowFreeDelivery: string;

  @Prop()
  coverageType: string;

  @Prop()
  coverageRadiusKm: string;

  @Prop()
  centerLatitude: string;

  @Prop()
  centerLongitude: string;

  @Prop()
  minimumOrder: string;

  @Prop({ nullable: true })
  scheduledDeliveryCost: string;

  @Prop()
  estimatedDeliveryTime: string;

  @Prop({ type: [Object], default: [] })
  deliveryList: any[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Branch" })
  branch: Branch;
}

export const CoverageZoneSchema = SchemaFactory.createForClass(CoverageZone);
