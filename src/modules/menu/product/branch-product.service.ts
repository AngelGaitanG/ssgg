import { Injectable } from "@nestjs/common";
import { IBranchProductDao } from "./db/branch-product.dao";
import { BranchProductMongodbService } from "./db/branch-product-mongodb.service";
import { BranchProduct } from "./entity/branch-product.entity";

@Injectable()
export class BranchProductService {

    private readonly _branchProductDb: IBranchProductDao

    constructor(
        private readonly branchProductMongodbService: BranchProductMongodbService
    ){
        this._branchProductDb = branchProductMongodbService;
    }

    async findAllByBranch(branchId: string ):Promise <BranchProduct[]>{
        return this._branchProductDb.findAllByBranch(branchId);
    }

    async findAllByProduct(productId: string ):Promise <BranchProduct[]> {
        return this._branchProductDb.findAllByProductId(productId);
    }
}