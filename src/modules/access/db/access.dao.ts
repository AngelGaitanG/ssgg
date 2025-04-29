import { UserAccess, UserAccessDocument } from "../entity/access.entity";

export interface IAccessDao {
    create(access: UserAccess): Promise<UserAccessDocument>;
    findAll(): Promise<UserAccess[]>;
    findById(id: string): Promise<UserAccessDocument>;
    update(id: string, access: UserAccess): Promise<UserAccessDocument>;
    delete(id: string): Promise<void>;
    findByUserAndBusiness(userId: string, brandId?: string, branchId?: string): Promise<UserAccessDocument>;
    userAccess(userId: string): Promise<UserAccessDocument>;
    createUserAccess(userAccess: UserAccess): Promise<UserAccessDocument>;
    findByUserId(userId: string): Promise<UserAccessDocument[]>;
}   
