import { User } from '../../auth/user/entity/user.entity';
import { Role } from '../../auth/role/entity/role.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Brand } from '../../businesses/brand/entity/brand.entity';
import { Branch } from '../../businesses/branch/entity/branch.entity';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class UserAccess {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ required: true })
  userId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Brand', nullable: true })
  brand: Brand;

  @Prop({ nullable: true })
  brandId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Branch', nullable: true })
  branch: Branch;

  @Prop({ nullable: true })
  branchId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role' })
  role: Role;

  @Prop({ required: true })
  roleId: string;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: false })
  updatedAt: Date;
}

export type UserAccessDocument = UserAccess & Document;

export const UserAccessSchema = SchemaFactory.createForClass(UserAccess);