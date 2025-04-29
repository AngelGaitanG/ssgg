/**
 * CONSTANTS: Default Roles
 * Define los roles por defecto que deben existir en el sistema
 */

export const DEFAULT_ROLES = [
  {
    name: 'SUPERADMIN',
    description: 'Administrador del sistema con acceso total',
    permissions: {
      users: ['create', 'read', 'update', 'delete'],
      roles: ['create', 'read', 'update', 'delete'],
      // Añade aquí más permisos según sea necesario
    }
  },
  {
    name: 'OWNER',
    description: 'Propietario del sistema',
    permissions: {
      users: ['read'],
      roles: ['read'],
      // Añade aquí más permisos según sea necesario
    }
    },
  {
    name: 'MANAGER',
    description: 'Gerente del sistema',
    permissions: {
      users: ['read'],
    }
  },
  {
    name: 'USER',
    description: 'Usuario del sistema',
    permissions: {
      users: ['read'],
    }
  }
]; 