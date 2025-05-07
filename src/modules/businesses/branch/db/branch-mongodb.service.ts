import { Injectable } from "@nestjs/common";
import { IBranchDao } from "./branch.dao";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Branch } from "../entity/branch.entity";

@Injectable()
export class BranchMongodbService implements IBranchDao {
    constructor(
        @InjectModel(Branch.name) private branchModel: Model<Branch>,
    ) {}

    async create(branch: Branch): Promise<Branch> {
        const createdBranch = await this.branchModel.create(branch);
        return createdBranch;
    }

    async findAll(): Promise<Branch[]> {
        return this.branchModel.find();
    }
    
    async findById(id: string): Promise<Branch> {
        return this.branchModel.findById(id);
    }

    async findByBrand(brandId: string): Promise<Branch[]> {
        return this.branchModel.find({ brandId })
    }
    async update(id: string, branch: Branch): Promise<Branch> {
        return this.branchModel.findByIdAndUpdate(id, branch, { new: true });
    }

    async delete(id: string): Promise<void> {
        await this.branchModel.findByIdAndDelete(id);
    }
}
