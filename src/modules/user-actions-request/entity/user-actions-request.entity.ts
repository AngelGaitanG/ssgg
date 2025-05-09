import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Document } from 'mongoose';

export enum UserActionRequestType {
  REGISTER = 'REGISTER',
  FRIEND_REQUEST = 'FRIEND_REQUEST',
  ACCESS = 'ACCESS',
  INVITATION = 'INVITATION',
  REPORT = 'REPORT',
}

export enum UserActionRequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCELED = 'CANCELED',
}

export type UserActionPayload =
  | RegisterPayload
  | FriendRequestPayload
  | AccessPayload
  | InvitationPayload
  | ReportPayload;

export interface RegisterPayload {
  email: string;
  name: string;
  password: string;
}

export interface FriendRequestPayload {
  targetUserId: string;
  message?: string;
}

export interface AccessPayload {
  resource: string;
  reason: string;
}

export interface InvitationPayload {
  invitedEmail: string;
  role?: string;
}

export interface ReportPayload {
  reportedUserId: string;
  reason: string;
  evidenceUrls?: string[];
}

@Schema({ timestamps: true })
export class UserActionRequest extends Document {
  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  requesterUserId: Types.ObjectId;

  @Prop({ enum: UserActionRequestType, required: true })
  type: UserActionRequestType;

  @Prop({ type: Object, required: true })
  payload: UserActionPayload;

  @Prop({ enum: UserActionRequestStatus, default: UserActionRequestStatus.PENDING })
  status: UserActionRequestStatus;

  @Prop()
  reviewedAt?: Date;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  reviewedBy?: Types.ObjectId;

  @Prop()
  responseMessage?: string;
}

export const UserActionRequestSchema = SchemaFactory.createForClass(UserActionRequest);
