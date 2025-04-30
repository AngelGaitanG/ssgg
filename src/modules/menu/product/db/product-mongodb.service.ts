import { Injectable } from "@nestjs/common";
import { IProductDao } from "./product.dao";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "../entity/product.entity";

@Injectable()
export class ProductMongodbService implements IProductDao {
    constructor(
        @InjectModel(Product.name) private productModel: Model<Product>
    ) {}

    async create(product: Product): Promise<Product> {
        return this.productModel.create(product);
    }

    async findAll(): Promise<Product[]> {
        return this.productModel.find();
    }

    async findById(id: string): Promise<Product> {
        return this.productModel.findById(id);
    }

    async update(id: string, product: Product): Promise<Product> {
        return this.productModel.findByIdAndUpdate(id, product, { new: true });
    }

    async delete(id: string): Promise<void> {
        await this.productModel.findByIdAndDelete(id);
    }
}