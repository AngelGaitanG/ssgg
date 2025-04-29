# Módulo de Autenticación

Este módulo contiene toda la funcionalidad necesaria para la autenticación de usuarios en el sistema, incluyendo:

- Inicio de sesión (Sign In)
- Registro de usuarios (Sign Up)

## Entidades principales

El módulo trabaja con dos entidades fundamentales:

### Usuario ([user.entity.ts](./user/entity/user.entity.ts))
- Almacena información básica del usuario
- Datos como nombre completo, email y contraseña
- Control de estado activo/inactivo
- Timestamps de creación y actualización

### Rol ([role.entity.ts](./role/entity/role.entity.ts)) 
- Define los diferentes niveles de acceso
- Tipos de roles: SUPERADMIN, OWNER, MANAGER, USER
- Incluye permisos específicos para cada rol
- Descripción y metadata del rol

El módulo gestiona la relación entre estas entidades para proporcionar un sistema de autenticación y autorización robusto y seguro. Además, implementa:

- Encriptación de contraseñas utilizando bcrypt para almacenamiento seguro
- Generación y validación de tokens JWT (JSON Web Tokens) para mantener las sesiones de usuario