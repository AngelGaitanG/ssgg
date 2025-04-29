import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { RolesMetadata } from '../interfaces/roles.metada';
import { AccessService } from '../../modules/access/access.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly accessService: AccessService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const metadata = this.reflector.get<RolesMetadata>(ROLES_KEY, context.getHandler());
    if (!metadata) return true;

    const { roles, checkBrand, checkBranch } = metadata;
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Si el usuario es SUPER_ADMIN, tiene acceso a todo
    if (user.role === 'SUPER_ADMIN') return true;

    // Verificar si el rol del usuario está en los roles permitidos
    if (!roles.includes(user.role)) {
      throw new UnauthorizedException('Insufficient permissions');
    }

    // Si no necesitamos verificar acceso a brand/branch, retornamos true
    if (!checkBrand && !checkBranch) return true;

    const { brandId, branchId } = request.params;

    // Si hay brandId o branchId en los parámetros, verificar acceso
    if (brandId || branchId) {
      const access = await this.accessService.findByUserAndBusiness(user.id, brandId, branchId);

      if (!access) {
        throw new UnauthorizedException('You do not have access to this resource');
      }
    }

    return true;
  }
} 