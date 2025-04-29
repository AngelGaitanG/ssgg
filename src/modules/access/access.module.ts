import { MongooseModule } from "@nestjs/mongoose";
import { AccessService } from "./access.service";
import { UserAccess, UserAccessSchema } from "./entity/access.entity";
import { AccessController } from "./access.controllert";
import { Module } from "@nestjs/common";
import { AccessMongodbService } from "./db/access-mongodb.service";
import { UserService } from "../auth/user/user.service";
import { RoleService } from "../auth/role/role.service";
import { UserMongodbService } from "../auth/user/db/user-mongodb.service";
import { RoleMongodbService } from "../auth/role/db/role-mongodb.service";
import { User, UserSchema } from "../auth/user/entity/user.entity";
import { Role, RoleSchema } from "../auth/role/entity/role.entity";
import { BrandService } from "../businesses/brand/brand.service";
import { BrandMongodbService } from "../businesses/brand/db/brand-mongodb.service";
import { Brand, BrandSchema } from "../businesses/brand/entity/brand.entity";
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: UserAccess.name, schema: UserAccessSchema },
            { name: User.name, schema: UserSchema },
            { name: Role.name, schema: RoleSchema },
            { name: Brand.name, schema: BrandSchema },
        ]),
    ],
    controllers: [AccessController],
    providers: [
        AccessService, AccessMongodbService, 
        UserService, RoleService,
        UserMongodbService, RoleMongodbService,
        BrandService, BrandMongodbService
        ],
    exports: [AccessService, AccessMongodbService, ],
})
export class AccessModule {}

