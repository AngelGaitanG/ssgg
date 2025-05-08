import { Injectable, NotFoundException } from "@nestjs/common";
import { IBranchProductDao } from "./branch-product.dao";
import { BranchProduct } from "../entity/branch-product.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Product } from "../entity/product.entity";
import { Model } from "mongoose";
import { Branch } from "../../../../modules/businesses/branch/entity/branch.entity";

@Injectable()
export class BranchProductMongodbService implements IBranchProductDao {
    constructor(
        @InjectModel(Product.name) private productModel: Model<Product>,
        @InjectModel(BranchProduct.name) private branchProductModel: Model<BranchProduct>,
        @InjectModel(Branch.name) private branchModel: Model<Branch>
    ){}

    async create(branchProduct: BranchProduct): Promise<BranchProduct> {
        const branch = await this.branchModel.findById(branchProduct.branchId);
        const product = await this.productModel.findById(branchProduct.productId);
        if(!branch) {
            throw new NotFoundException('Sucursal no encontrada');
        }
        if(!product) {
            throw new NotFoundException('Producto no encontrado');
        }

        return this.branchProductModel.create({...branchProduct, branch, product});
        
    }

    async update(id: string, branchProduct: Partial<BranchProduct>): Promise<BranchProduct> {
        const branchProductFound = await this.branchProductModel.findById(id);
        if(!branchProductFound) {
            throw new NotFoundException('Configuracion de producto no encontrada');
        }
        return this.branchProductModel.findByIdAndUpdate(id, branchProduct)
    }

    async updateMany(
        updates: { id: string; branchProducts: Partial<BranchProduct> }[]
      ): Promise<BranchProduct[]> {
        let notFoundCounter = 0;
      
        const updatedBranchProducts = await Promise.all(
          updates.map(async (b) => {
            const found = await this.branchProductModel.findById(b.id);
            if (!found) {
              notFoundCounter++;
              return null;
            }
      
            Object.assign(found, b.branchProducts);
            return await found.save();
          })
        );
      
        // Filtramos los que sí fueron actualizados
        return updatedBranchProducts.filter(
            (bp): bp is typeof this.branchProductModel.prototype => bp !== null
          );
      }
      

    async findAllByBranch(branchId: string): Promise<BranchProduct[]> {
        const branch = await this.branchModel.findById(branchId)
        if(!branch) {
            throw new NotFoundException('Sucursal no encontrada');
        }
        return this.branchProductModel.find({ branchId })
    }

    async findAllByProductId(productId: string): Promise<BranchProduct[]> {
        const product = await this.productModel.findById(productId);
        if(!product){
            throw new NotFoundException('Producto no encontrado');
        }
        return this.branchProductModel.find({ productId })
    }


}