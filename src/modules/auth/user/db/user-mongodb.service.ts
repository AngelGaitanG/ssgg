import { Injectable } from "@nestjs/common";
import { IUserDao } from "./user.dao";
import { User, UserDocument } from "../entity/user.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class UserMongodbService implements IUserDao {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async create(user: User): Promise<UserDocument> {
        return this.userModel.create(user);
    }

    async findByEmail(email: string): Promise<UserDocument> {
        return this.userModel.findOne({ email });
    }

    async findById(id: string): Promise<UserDocument> {
        return this.userModel.findById(id);
    }
}