# Módulo de Negocios

Este módulo gestiona la estructura de negocios, dividida en dos componentes principales: Marcas (Brands) y Sucursales (Branches).

## Estructura

### Marcas (Brands)
Una marca representa la entidad comercial principal y puede tener una o múltiples sucursales asociadas. Cada marca contiene:

- Información general de la empresa
- Configuración de marca
- Preferencias generales
- Datos de contacto
- Configuraciones de facturación
- Moneda y región

Para más detalles, consultar [brand.entity.ts](./brand/entity/brand.entity.ts)

### Sucursales (Branches) 
Las sucursales son los establecimientos físicos asociados a una marca. Cada sucursal puede tener:

- Configuración independiente
- Horarios propios
- Métodos de pago específicos
- Tipos de servicio (delivery, pickup, etc.)
- Ubicación geográfica
- Información de contacto específica

Para más detalles, consultar [branch.entity.ts](./branch/entity/branch.entity.ts)

## Relación Brand-Branch

- Una marca (Brand) puede tener cero o múltiples sucursales (Branches)
- Cada sucursal (Branch) debe pertenecer a una única marca (Brand)
- Las sucursales heredan configuraciones base de la marca pero pueden personalizarlas
