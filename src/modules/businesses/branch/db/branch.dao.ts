import { Branch } from "../entity/branch.entity";

export interface IBranchDao {
    create(branch: Branch): Promise<Branch>;
    findAll(): Promise<Branch[]>;
    findById(id: string): Promise<Branch>;
    findByBrand(brandId: string): Promise<Branch[]>;
    update(id: string, branch: Branch): Promise<Branch>;
    delete(id: string): Promise<void>;
}