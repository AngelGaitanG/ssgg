import { Request } from 'express';
import { RoleType } from '../../modules/auth/role/entity/role.entity';

export interface IUserWithRole {
  id: string;
  email: string;
  fullName: string;
  role: RoleType;
  isActive: boolean;
}

export interface RequestWithUser extends Request {
  user: IUserWithRole;
} 