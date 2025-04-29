import { Injectable, Logger } from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto';
import { RoleService } from '../role.service';

@Injectable()
export class RoleSeedService {
  private readonly logger = new Logger(RoleSeedService.name);

  constructor(private readonly roleService: RoleService) {}

  /**
   * Datos iniciales de roles
   */
  private readonly initialRoles: CreateRoleDto[] = [
    {
      name: 'SUPERADMIN',
      description: 'Administrador del sistema',
    },
    {
      name: 'OWNER', 
      description: 'Propietario del sistema',
    },
    {
      name: 'MANAGER',
      description: 'Gerente del sistema',
    },
    {
      name: 'USER',
      description: 'Usuario del sistema',
    },
  ];

  /**
   * Ejecuta el sembrado de roles iniciales
   */
  async seed(): Promise<void> {
    this.logger.log('Iniciando sembrado de roles...');

    try {
      for (const roleData of this.initialRoles) {
        const existingRole = await this.roleService.findByName(roleData.name);
        
        if (!existingRole) {
          await this.roleService.create(roleData);
          this.logger.log(`Rol ${roleData.name} creado exitosamente`);
        } else {
          this.logger.log(`Rol ${roleData.name} ya existe, omitiendo...`);
        }
      }

      this.logger.log('Sembrado de roles completado');
    } catch (error) {
      this.logger.error('Error durante el sembrado de roles:', error);
      throw error;
    }
  }
} 