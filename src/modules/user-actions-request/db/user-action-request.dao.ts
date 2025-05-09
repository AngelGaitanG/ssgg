import { CreateUserActionRequestDto } from "../dto/create-user-action-request.dto";
import { UpdateUserActionRequestStatusDto } from "../dto/update-user-action-request-status.dto";
import { UserActionRequest } from "../entity/user-actions-request.entity";

export interface IUserActionRequestDao {
    create(userActionRequest: CreateUserActionRequestDto): Promise<UserActionRequest>;
    findById(id: string): Promise<UserActionRequest>;
    updateStatus(id: string, userActionRequest: UpdateUserActionRequestStatusDto): Promise<UserActionRequest>

}