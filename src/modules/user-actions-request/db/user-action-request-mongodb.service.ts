import { Injectable } from "@nestjs/common";
import { IUserActionRequestDao } from "./user-action-request.dao";
import { InjectModel } from "@nestjs/mongoose";
import { UserActionRequest } from "../entity/user-actions-request.entity";
import { Model } from "mongoose";
import { CreateUserActionRequestDto } from "../dto/create-user-action-request.dto";
import { UpdateUserActionRequestStatusDto } from "../dto/update-user-action-request-status.dto";

@Injectable()
export class UserActionRequestMongodbService implements IUserActionRequestDao { 

    constructor(
        @InjectModel(UserActionRequest.name) private userActionRequestModel: Model<UserActionRequest>,
    ){}

    async create(userActionRequest: CreateUserActionRequestDto): Promise<UserActionRequest> {
        return await this.userActionRequestModel.create(userActionRequest);
    }

    async findById(id: string): Promise<UserActionRequest> {
        return await this.userActionRequestModel.findById(id);
    }

    async updateStatus(id: string, userActionRequest: UpdateUserActionRequestStatusDto): Promise<UserActionRequest> {
        return await this.userActionRequestModel.findByIdAndUpdate(id, userActionRequest);
    }
    

}