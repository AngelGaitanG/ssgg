/**
 * MODULE: Role
 * Configura el módulo de roles, incluyendo:
 * - Controlador de roles
 * - Servicio de roles
 * - Modelo de MongoDB
 */

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { Role, RoleSchema } from './entity/role.entity';
import { RoleMongodbService } from './db/role-mongodb.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Role.name, schema: RoleSchema }
    ]),
  ],
  controllers: [RoleController],
  providers: [RoleService, RoleMongodbService],
  exports: [RoleService], // Exportamos el servicio para usarlo en otros módulos
})
export class RoleModule {} 