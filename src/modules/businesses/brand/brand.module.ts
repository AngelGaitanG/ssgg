import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Brand, BrandSchema } from "./entity/brand.entity";
import { BrandController } from "./brand.controller";
import { BrandService } from "./brand.service";
import { BrandMongodbService } from "./db/brand-mongodb.service";
import { AccessModule } from "../../access/access.module";
import { AccessService } from "../../access/access.service";
import { AccessMongodbService } from "../../access/db/access-mongodb.service";
import { UserAccess, UserAccessSchema } from "../../access/entity/access.entity";
import { UserService } from "../../auth/user/user.service";
import { UserMongodbService } from "../../auth/user/db/user-mongodb.service";
import { RoleService } from "../../auth/role/role.service";
import { User, UserSchema } from "../../auth/user/entity/user.entity";
import { RoleMongodbService } from "../../auth/role/db/role-mongodb.service";
import { Role, RoleSchema } from "../../auth/role/entity/role.entity";
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Brand.name, schema: BrandSchema },
            { name: UserAccess.name, schema: UserAccessSchema },
            { name: User.name, schema: UserSchema },
            { name: Role.name, schema: RoleSchema }
        ]),
    ],
    controllers: [BrandController],
    providers: [
        BrandService, BrandMongodbService, 
        AccessService, AccessMongodbService, 
        UserService, UserMongodbService, 
        RoleService, RoleMongodbService
    ],
    exports: [BrandService],
})
export class BrandModule {}