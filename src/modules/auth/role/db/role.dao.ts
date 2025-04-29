import { Role } from "../entity/role.entity";

export interface IRoleDao {
    create(role: Role): Promise<Role>;
    findByName(name: string): Promise<Role>;
    findById(id: string): Promise<Role>;
    findAll(): Promise<Role[]>;
    update(id: string, role: Role): Promise<Role>;
    delete(id: string): Promise<Role>;
    existsByName(name: string): Promise<boolean>;
}
