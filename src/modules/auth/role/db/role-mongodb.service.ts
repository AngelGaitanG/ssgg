/**
 * REPOSITORY: Role
 * Capa de acceso a datos para roles.
 * Encapsula todas las operaciones de base de datos relacionadas con roles.
 */

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from '../entity/role.entity';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { IRoleDao } from './role.dao';

@Injectable()
export class RoleMongodbService implements IRoleDao {
  constructor(
    @InjectModel(Role.name)
    private readonly roleModel: Model<Role>,
  ) {}

  /**
   * Crea un nuevo rol en la base de datos
   * parametro createRoleDto Datos del rol a crear
   */
  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const createdRole = new this.roleModel(createRoleDto);
    return createdRole.save();
  }

  /**
   * Busca todos los roles en la base de datos
   */
  async findAll(): Promise<Role[]> {
    return this.roleModel.find().exec();
  }

  /**
   * Busca un rol por su ID
   * parametro id ID del rol
   */
  async findById(id: string): Promise<Role | null> {
    return this.roleModel.findById(id).exec();
  }

  /**
   * Busca un rol por su nombre
   * parametro name Nombre del rol
   */
  async findByName(name: string): Promise<Role | null> {
    return this.roleModel.findOne({ name }).exec();
  }

  /**
   * Actualiza un rol existente
   * parametro id ID del rol
   * parametro updateRoleDto Datos a actualizar
   */
  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role | null> {
    return this.roleModel
      .findByIdAndUpdate(id, updateRoleDto, { new: true })
      .exec();
  }

  /**
   * Elimina un rol de la base de datos
   * parametro id ID del rol
   */
  async delete(id: string): Promise<Role | null> {
    return this.roleModel.findByIdAndDelete(id).exec();
  }

  /**
   * Verifica si existe un rol con el nombre especificado
   * parametro name Nombre del rol
   */
  async existsByName(name: string): Promise<boolean> {
    const role = await this.roleModel.findOne({ name }).exec();
    return !!role;
  }
} 