/**
 * CONTROLLER: Role
 * Maneja las rutas y endpoints relacionados con roles.
 * Implementa operaciones CRUD y documentación Swagger.
 */

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiResponse as CustomApiResponse } from '../../../core/responses/api-response';

@ApiTags('roles')
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo rol' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'El rol ha sido creado exitosamente.',
  })
  async create(@Body() createRoleDto: CreateRoleDto) {
    const role = await this.roleService.create(createRoleDto);
    return CustomApiResponse.success('Rol creado exitosamente', role, HttpStatus.CREATED);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los roles' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de roles obtenida exitosamente.',
  })
  async findAll() {
    const roles = await this.roleService.findAll();
    return CustomApiResponse.success('Roles obtenidos exitosamente', roles);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un rol por ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Rol encontrado exitosamente.',
  })
  async findOne(@Param('id') id: string) {
    const role = await this.roleService.findOne(id);
    return CustomApiResponse.success('Rol encontrado exitosamente', role);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un rol' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Rol actualizado exitosamente.',
  })
  async update(@Param('id') id: string, @Body() updateRoleDto: Partial<CreateRoleDto>) {
    const role = await this.roleService.update(id, updateRoleDto);
    return CustomApiResponse.success('Rol actualizado exitosamente', role);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un rol' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Rol eliminado exitosamente.',
  })
  async remove(@Param('id') id: string) {
    const role = await this.roleService.remove(id);
    return CustomApiResponse.success('Rol eliminado exitosamente', role);
  }
} 