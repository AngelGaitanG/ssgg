/**
 * ENTITY: Role
 * Representa los roles de usuario en el sistema.
 * Campos según el DER:
 * - id: Identificador único
 * - name: Nombre único del rol
 * - description: Descripción del rol
 * - permissions: Array de permisos (JSON)
 */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum RoleType {
  SUPERADMIN = 'SUPERADMIN',
  OWNER = 'OWNER',
  MANAGER = 'MANAGER',
  USER = 'USER'
}

@Schema({ timestamps: true })
export class Role extends Document {
  @Prop({ required: true, unique: true })
  name: string; 

  @Prop()
  description: string;

  @Prop({ type: Object })
  permissions: Record<string, any>;
}

export const RoleSchema = SchemaFactory.createForClass(Role); 