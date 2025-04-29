import { ForbiddenException, forwardRef, Inject, Injectable } from "@nestjs/common";
import { RoleType } from "src/modules/auth/role/entity/role.entity";
import { IBrandDao } from "./db/brand.dao";
import { BrandMongodbService } from "./db/brand-mongodb.service";
import { AccessService } from "src/modules/access/access.service";
import { IUserWithRole } from "src/core/interfaces/request-with-user";
import { CreateBrandDto } from "./dto/create-brand.dto";
import { BrandDocument } from "./entity/brand.entity";

@Injectable()
export class BrandService {
    private readonly _brandDb: IBrandDao;
    constructor(
        private readonly brandMongodbService: BrandMongodbService,
        @Inject(forwardRef(() => AccessService)) private readonly accessService: AccessService
    ) {
        this._brandDb = brandMongodbService;
    }

    async createBrand(user: IUserWithRole, brand: CreateBrandDto) {
        if (user.role === RoleType.SUPERADMIN || user.role === RoleType.OWNER) {
            const userAccesses = await this.accessService.findByUserId(user.id);
            
            // Buscamos un userAccess sin brand asignado
            const availableUserAccess = userAccesses.find(access => !access.brand);
            
            const createdBrand = await this._brandDb.create(brand);
            
            if (availableUserAccess) {
               
                // Si encontramos un userAccess disponible, lo actualizamos
                await this.accessService.update(availableUserAccess._id.toString(), {
                    ...availableUserAccess,
                    brandId: createdBrand._id.toString(),
                    brand: createdBrand
                });
            } else {

                // Si no hay userAccess disponible, creamos uno nuevo
                await this.accessService.createUserAccessWithBrand(user.id, user.role, createdBrand._id.toString());

            }
            
            return createdBrand;
        }
        throw new ForbiddenException('No tienes permisos para crear una marca');
    }

    async getAllBrands(user: IUserWithRole) {
        console.log(user, 'user');
        if ( user.role === RoleType.SUPERADMIN) {
            return this._brandDb.findAll();
          }
      
        //   Para otros roles, obtener solo las marcas a las que tiene acceso
          const accesses = await this.accessService.findByUserId(user.id);
          console.log(accesses, 'accesses');
          const brands = accesses
            .filter(access => access.brand)
            .map(access => access.brand);
      
          return brands;
    }

    async findById(id: string): Promise<BrandDocument> {
        return this._brandDb.findById(id);
    }
}

