/**
 * SERVICE: Role
 * Implementa la lógica de negocio para la gestión de roles.
 * Incluye operaciones CRUD y validaciones específicas.
 */

import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { Role } from './entity/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleMongodbService } from './db/role-mongodb.service';

@Injectable()
export class RoleService {
  constructor(
    private readonly roleRepository: RoleMongodbService,
  ) {}

  /**
   * Crea un nuevo rol
   */
  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    // Verificar si ya existe un rol con el mismo nombre
    const exists = await this.roleRepository.existsByName(createRoleDto.name);
    if (exists) {
      throw new ConflictException(`Ya existe un rol con el nombre ${createRoleDto.name}`);
    }
    return this.roleRepository.create(createRoleDto);
  }

  /**
   * Obtiene todos los roles
   */
  async findAll(): Promise<Role[]> {
    return this.roleRepository.findAll();
  }

  /**
   * Obtiene un rol por su ID
   */
  async findOne(id: string): Promise<Role> {
    const role = await this.roleRepository.findById(id);
    if (!role) {
      throw new NotFoundException(`No se encontró el rol con ID ${id}`);
    }
    return role;
  }

  /**
   * Obtiene un rol por su nombre
   */
  async findByName(name: string): Promise<Role> {
    const role = await this.roleRepository.findByName(name);
    if (!role) {
      throw new NotFoundException(`No se encontró el rol con nombre ${name}`);
    }
    return role;
  }

  /**
   * Actualiza un rol
   */
  async update(id: string, updateRoleDto: Partial<CreateRoleDto>): Promise<Role> {
    // Si se está actualizando el nombre, verificar que no exista otro rol con ese nombre
    if (updateRoleDto.name) {
      const existingRole = await this.roleRepository.findByName(updateRoleDto.name);
      if (existingRole && existingRole._id.toString() !== id) {
        throw new ConflictException(`Ya existe un rol con el nombre ${updateRoleDto.name}`);
      }
    }

    const updatedRole = await this.roleRepository.update(id, updateRoleDto);
    if (!updatedRole) {
      throw new NotFoundException(`No se encontró el rol con ID ${id}`);
    }
    return updatedRole;
  }

  /**
   * Elimina un rol
   */
  async remove(id: string): Promise<Role> {
    const deletedRole = await this.roleRepository.delete(id);
    if (!deletedRole) {
      throw new NotFoundException(`No se encontró el rol con ID ${id}`);
    }
    return deletedRole;
  }
} 