import { BadRequestException, ForbiddenException, forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { RoleType } from "src/modules/auth/role/entity/role.entity";
import { IBrandDao } from "./db/brand.dao";
import { BrandMongodbService } from "./db/brand-mongodb.service";
import { AccessService } from "src/modules/access/access.service";
import { IUserWithRole } from "src/core/interfaces/request-with-user";
import { CreateBrandDto } from "./dto/create-brand.dto";
import { BrandDocument } from "./entity/brand.entity";
import { UpdateBrandSettingsDto } from "./dto/update-brand-settings.dto";

@Injectable()
export class BrandService {
    private readonly _brandDb: IBrandDao;
    constructor(
        private readonly brandMongodbService: BrandMongodbService,
        @Inject(forwardRef(() => AccessService)) private readonly accessService: AccessService
    ) {
        this._brandDb = brandMongodbService;
    }

    /**
     * Crea una nueva marca y asigna los accesos correspondientes al usuario
     * Este método implementa el siguiente flujo:
     * 1. Verifica que el usuario tenga rol de SUPERADMIN u OWNER
     * 2. Valida que no exista otra marca con el mismo subdominio
     * 3. Busca accesos disponibles del usuario
     * 4. Crea la marca con el dominio completo
     * 5. Si hay un acceso disponible, lo actualiza con la nueva marca
     * 6. Si no hay acceso disponible, crea uno nuevo
     */
    async createBrand(user: IUserWithRole, brand: CreateBrandDto) {
        // 1. Verificar permisos del usuario
        if (user.role === RoleType.SUPERADMIN || user.role === RoleType.OWNER) {
            // 2. Validar subdominio único
            const existingBrand = await this._brandDb.findBySubdomain(brand.subdomain);
            if (existingBrand) {
                throw new BadRequestException('Ya existe una marca con este subdominio');
            }

            // 3. Buscar accesos del usuario
            const userAccesses = await this.accessService.findByUserId(user.id);
            
            // 4. Buscar acceso disponible
            const availableUserAccess = userAccesses.find(access => !access.brand);
            const domain = brand.subdomain + '.agiliza360.com';
            
            // 5. Crear la marca
            const createdBrand = await this._brandDb.create({...brand, domainUrl: domain});
            
            // 6. Asignar acceso a la marca
            if (availableUserAccess) {
                // Actualizar acceso existente
                await this.accessService.update(availableUserAccess._id.toString(), {
                    ...availableUserAccess,
                    brandId: createdBrand._id.toString(),
                    brand: createdBrand
                });
            } else {
                // Crear nuevo acceso
                await this.accessService.createUserAccessWithBrand(user.id, user.role, createdBrand._id.toString());
            }
            
            return createdBrand;
        }
        throw new ForbiddenException('No tienes permisos para crear una marca');
    }

    async getAllBrands(user: IUserWithRole) {
        
        if ( user.role === RoleType.SUPERADMIN) {
            return this._brandDb.findAll();
          }
      
        //   Para otros roles, obtener solo las marcas a las que tiene acceso
          const accesses = await this.accessService.findByUserId(user.id);
          
          const brands = accesses
            .filter(access => access.brand)
            .map(access => access.brand);
      
          return brands;
    }

    async findById(id: string): Promise<BrandDocument> {
        return this._brandDb.findById(id);
    }

    async getBrandById(id: string): Promise<BrandDocument> {
        const brand = await this._brandDb.findById(id);
        if (!brand) {
            throw new NotFoundException('Marca no encontrada');
        }
        return brand;
    }

    async updateBrandSettings(
        id: string,
        settings: UpdateBrandSettingsDto,
        user: IUserWithRole
    ): Promise<BrandDocument> {
        // Verificar que la marca existe
        const brand = await this.getBrandById(id);
        if(!brand) {
            throw new NotFoundException('Marca no encontrada')
        }

        // Verificar permisos
        if (user.role !== RoleType.SUPERADMIN) {
            const hasAccess = await this.accessService.userHasAccessToBrand(user.id, id);
            if (!hasAccess) {
                throw new ForbiddenException('No tienes permisos para actualizar esta marca');
            }
        }

        // Actualizar la marca
        return this._brandDb.update(id, settings);
    }

    async updateBrandLogo(
        id: string,
        logoUrl: string | null,
        user: IUserWithRole
    ): Promise<BrandDocument> {
        // Verificar que la marca existe
        const brand = await this.getBrandById(id);

        // Verificar permisos
        if (user.role !== RoleType.SUPERADMIN) {
            const hasAccess = await this.accessService.userHasAccessToBrand(user.id, id);
            if (!hasAccess) {
                throw new ForbiddenException('No tienes permisos para actualizar esta marca');
            }
        }

        // Actualizar el logo
        return this._brandDb.update(id, { logo: logoUrl });
    }
}

