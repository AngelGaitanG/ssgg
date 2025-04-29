import { Module } from "@nestjs/common";
import { UserSchema , User} from "./entity/user.entity";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserMongodbService } from "./db/user-mongodb.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    controllers: [UserController],
    providers: [UserService, UserMongodbService],
    exports: [UserService],
})
export class UserModule {}