import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { NotificationType, NotificationPriority, NotificationCategory } from '../enums/notitication.enum';
import { NotificationMetadata } from '../utils/notication.metadata';

@Schema()
export class Notification extends Document {
  @Prop({ required: true })
  message: string;

  @Prop({ required: true, enum: NotificationType })
  type: NotificationType;

  @Prop({ required: true, enum: NotificationPriority })
  priority: NotificationPriority;

  @Prop({ required: true, enum: NotificationCategory })
  category: NotificationCategory;

  @Prop({ type: Types.ObjectId, ref: 'Brand' })
  brandId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Branch' })
  branchId?: Types.ObjectId;

  @Prop({ type: Object })
  metadata?: NotificationMetadata;

  @Prop({ default: false })
  isRead: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
