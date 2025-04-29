import { Injectable } from "@nestjs/common";
import { UserMongodbService } from "./db/user-mongodb.service";
import { IUserDao } from "./db/user.dao";
import { User, UserDocument } from "./entity/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService {
    private readonly _userDb: IUserDao;

    constructor(private readonly _userMongoDbService: UserMongodbService) {
        this._userDb = _userMongoDbService;
    }

    async createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
        const user = new User();
        user.fullName = createUserDto.fullName;
        user.email = createUserDto.email;
        user.password = createUserDto.password;
        user.isActive = true;
        return this._userDb.create(user);
    }

    async findByEmail(email: string): Promise<UserDocument> {
        return this._userDb.findByEmail(email);
    }
    
    async findById(id: string): Promise<UserDocument> {
        return this._userDb.findById(id);
    }
}

