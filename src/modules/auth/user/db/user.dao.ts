import { User, UserDocument } from "../entity/user.entity";

export interface IUserDao {
    create(user: User): Promise<UserDocument>;
    findByEmail(email: string): Promise<UserDocument>;
    findById(id: string): Promise<UserDocument>;
}
