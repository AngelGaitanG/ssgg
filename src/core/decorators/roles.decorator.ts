import { SetMetadata } from '@nestjs/common';
import { RoleType } from '../../modules/auth/role/entity/role.entity';

export const ROLES_KEY = 'roles';

export const Roles = (
  ...roles: RoleType[] | string[]
) => SetMetadata(ROLES_KEY, { roles, checkBrand: true, checkBranch: true });

export const RolesWithoutBrandCheck = (
  ...roles: RoleType[] | string[]
) => SetMetadata(ROLES_KEY, { roles, checkBrand: false, checkBranch: false }); 