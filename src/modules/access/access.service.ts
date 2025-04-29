import { Injectable } from "@nestjs/common";
import { IAccessDao } from "./db/access.dao";
import { AccessMongodbService } from "./db/access-mongodb.service";
import { UserAccess, UserAccessDocument } from "./entity/access.entity";
import { UserService } from "../auth/user/user.service";
import { RoleService } from "../auth/role/role.service";
import { BrandService } from "../businesses/brand/brand.service";

@Injectable()
export class AccessService {
    private readonly _accessDb: IAccessDao;
    constructor(
        private readonly accessMongodbService: AccessMongodbService,
        private readonly userService: UserService,
        private readonly roleService: RoleService,
        private readonly brandService: BrandService,
    ) {
        this._accessDb = accessMongodbService;
    }

    async findByUserAndBusiness(userId: string, brandId?: string, branchId?: string): Promise<UserAccessDocument> {
        return this._accessDb.findByUserAndBusiness(userId, brandId, branchId);
    }

    async userAccess(userId: string): Promise<UserAccessDocument> {
        return this._accessDb.userAccess(userId);
    }

    async createUserAccess(userId: string, roleId: string): Promise<UserAccessDocument> {
        const user = await this.userService.findById(userId);
        const role = await this.roleService.findOne(roleId);
        const userAccess = new UserAccess();
        userAccess.user = user;
        userAccess.role = role;
        userAccess.userId = userId;
        userAccess.roleId = roleId;
        userAccess.createdAt = new Date();
        userAccess.updatedAt = new Date();


        return this._accessDb.createUserAccess(userAccess);
    }

    async createUserAccessWithBrand(userId: string, roleId: string, brandId: string): Promise<UserAccessDocument> {
        const user = await this.userService.findById(userId);
        const role = await this.roleService.findOne(roleId);
        const brand = await this.brandService.findById(brandId);
        const userAccess = new UserAccess();
        userAccess.user = user;
        userAccess.role = role;
        userAccess.userId = userId;
        userAccess.roleId = roleId;
        userAccess.brand = brand;
        userAccess.createdAt = new Date();
        return this._accessDb.createUserAccess(userAccess);
    }

    async findByUserId(userId: string): Promise<UserAccessDocument[]> {
        return this._accessDb.findByUserId(userId);
    }

    async update(userAccessId: string, userAccess: UserAccess): Promise<UserAccessDocument> {
        return this._accessDb.update(userAccessId, userAccess);
    }
}   
