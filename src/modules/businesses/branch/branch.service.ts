import { Injectable } from "@nestjs/common";
import { IBranchDao } from "./db/branch.dao";
import { BranchMongodbService } from "./db/branch-mongodb.service";
import { Branch } from "./entity/branch.entity";
@Injectable()
export class BranchService {

    private readonly _branchDB: IBranchDao;

    constructor(
        private readonly branchMongodbService: BranchMongodbService,
    ) {
        this._branchDB = this.branchMongodbService;
    }

    async createBranch(branch: Branch): Promise<Branch> {
        return this._branchDB.create(branch);
    }

    async findAllBranches(): Promise<Branch[]> {
        return this._branchDB.findAll();
    }
    
}
