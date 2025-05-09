import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Customer extends Document {
  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: false })
  lastName: string;

  @Prop({ type: String, required: false })
  dniOrRuc: string;

  @Prop({ type: String, required: false })
  address: string;

  @Prop({ type: String, required: false })
  email: string;

  @Prop({ type: String, required: true })
  phone: string;

  @Prop({ type: Number, required: false })
  type: number;

  @Prop({ type: Number, required: false })
  validationStatus: number;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
