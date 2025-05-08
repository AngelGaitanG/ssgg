import { Injectable, NotFoundException } from "@nestjs/common";
import { IProductDao } from "./product.dao";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "../entity/product.entity";
import { Brand } from "../../../businesses/brand/entity/brand.entity";
import { CreateProductDto } from "../dto/create-product.dto";
import { Category } from "../../category/entity/category.entity";

@Injectable()
export class ProductMongodbService implements IProductDao {
    constructor(
        @InjectModel(Product.name) private productModel: Model<Product>,
        @InjectModel(Brand.name) private brandModel: Model<Brand>,
        @InjectModel(Category.name) private categoryModel: Model<Category>
    ) {}

    async create(product: CreateProductDto): Promise<Product> {
        const brand = await this.brandModel.findById(product.brandId);
        const category = await this.categoryModel.findById(product.categoryId);
        if (!brand) {
            throw new NotFoundException("Marca no encontrada");
        }
        if (!category) {    
            throw new NotFoundException("Categoria no encontrada");
        }
        const createdProduct = new this.productModel({ ...product, brand, category });
        return await createdProduct.save();
    }

    async findAll(): Promise<Product[]> {
        return await this.productModel.find().exec();
    }

    async findAllByBrand(brandId: string): Promise<Product[]> {
        return await this.productModel.find({ brandId }).exec();
    }

    async findById(id: string): Promise<Product> {
        return await this.productModel.findById(id).exec();
    }

    async update(id: string, product: Product): Promise<Product> {
        return await this.productModel.findByIdAndUpdate(
            id,
            { $set: product },
            { new: true }
        ).exec();
    }

    async delete(id: string): Promise<void> {
        await this.productModel.findByIdAndDelete(id).exec();
    }
}