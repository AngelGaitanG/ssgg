import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { RoleModule } from "./role/role.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { envConfig } from "../../core/config/env.config";
import { AccessService } from "../access/access.service";
import { AccessMongodbService } from "../access/db/access-mongodb.service";
import { UserAccess, UserAccessSchema } from "../access/entity/access.entity";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtStrategy } from "../../core/strategies/jwt-strategy";
import { BrandService } from "../businesses/brand/brand.service";
import { BrandMongodbService } from "../businesses/brand/db/brand-mongodb.service";
import { Brand, BrandSchema } from "../businesses/brand/entity/brand.entity";
import { User, UserSchema } from "../auth/user/entity/user.entity";
import { Role, RoleSchema } from "../auth/role/entity/role.entity";
import { MailModule } from "../mail/mail.module";
@Module({
    imports: [
        UserModule,
        RoleModule,
        JwtModule.register({
            secret: envConfig().jwtSecret,
            signOptions: { expiresIn: '10h' },
        }),
        MongooseModule.forFeature([
            { name: UserAccess.name, schema: UserAccessSchema },
            { name: Brand.name, schema: BrandSchema },
            { name: User.name, schema: UserSchema },
            { name: Role.name, schema: RoleSchema }
        ]),
        MailModule
    ],
    controllers: [AuthController],
    providers: [
        AuthService, AccessService, 
        AccessMongodbService, JwtStrategy,
        BrandService, BrandMongodbService
    ],
    exports: [AuthService],
})
export class AuthModule {}
