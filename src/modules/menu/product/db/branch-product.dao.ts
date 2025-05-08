import { BranchProduct } from "../entity/branch-product.entity";

export interface IBranchProductDao {
    create(branchProduct: BranchProduct): Promise<BranchProduct>;
    update(id: string, branchProduct: Partial<BranchProduct>): Promise<BranchProduct>;
    updateMany(
        updates: { id: string; branchProducts: Partial<BranchProduct> }[]
      ): Promise<BranchProduct[]>;      
    findAllByProductId(productId: string): Promise<BranchProduct[]>;
    findAllByBranch(branchId: string): Promise<BranchProduct[]>;
}
