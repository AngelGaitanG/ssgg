import { ApiProperty } from '@nestjs/swagger';

export class RoleResponseDto {
  @ApiProperty({
    description: 'Identificador único del rol',
    example: 1
  })
  id: number;

  @ApiProperty({
    description: 'Nombre del rol',
    example: 'ADMIN'
  })
  name: string;

  @ApiProperty({
    description: 'Descripción del rol',
    example: 'Rol con permisos de administrador',
    required: false
  })
  description?: string;

  @ApiProperty({
    description: 'Fecha de creación del rol',
    example: '2024-03-19T12:00:00Z'
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Fecha de última actualización del rol',
    example: '2024-03-19T12:00:00Z'
  })
  updatedAt: Date;
} 