import { Injectable } from "@nestjs/common";
import { IAccessDao } from "./access.dao";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserAccess, UserAccessDocument } from "../entity/access.entity";

@Injectable()
export class AccessMongodbService implements IAccessDao {
    constructor(
        @InjectModel(UserAccess.name) private accessModel: Model<UserAccessDocument>,
    ) {}

    async create(access: UserAccess): Promise<UserAccessDocument> {
        const createdAccess = await this.accessModel.create(access);
        return createdAccess;
    }

    async findAll(): Promise<UserAccess[]> {
        return this.accessModel.find();
    }

    async findById(id: string): Promise<UserAccessDocument> {
        return this.accessModel.findById(id);
    }   

    async update(id: string, access: UserAccess): Promise<UserAccessDocument> {
        return this.accessModel.findByIdAndUpdate(id, access, { new: true });
    }

    async delete(id: string): Promise<void> {
        await this.accessModel.findByIdAndDelete(id);
    }   
    
    async findByUserAndBusiness(userId: string, brandId?: string, branchId?: string): Promise<UserAccessDocument> {
        return this.accessModel.findOne({ userId, brandId, branchId });
    }

    async userAccess(userId: string): Promise<UserAccessDocument> {
        return this.accessModel.findOne({ userId }).populate('role').exec();
    }

    async userHasAccessToBrand(userId: string, brandId: string): Promise<Boolean> {
      const hasAccess = this.accessModel.findOne({ userId, brandId});
      return hasAccess ? true : false;
    }

    async createUserAccess(userAccess: UserAccess): Promise<UserAccessDocument> {
        return this.create(userAccess);
    }

    async findByUserId(userId: string): Promise<UserAccessDocument[]> {
        return this.accessModel.find({ userId }).populate(['brand', 'role', 'branch']).lean();
    }
}

