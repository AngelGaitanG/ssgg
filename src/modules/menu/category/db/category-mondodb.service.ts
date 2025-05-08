import { Injectable, NotFoundException } from "@nestjs/common";
import { ICategoryDao } from "./category.dao";
import { Category } from "../entity/category.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { Brand } from "../../../businesses/brand/entity/brand.entity";
@Injectable()
export class CategoryMondodbService implements ICategoryDao {
    constructor(
        @InjectModel(Category.name) private categoryModel: Model<Category>,
        @InjectModel(Brand.name) private brandModel: Model<Brand>
    ) {}

    async create(category: CreateCategoryDto): Promise<Category> {
        const brand = await this.brandModel.findById(category.brandId);
        const lastCategory = await this.categoryModel.findOne({ brandId: category.brandId }).sort({ order: -1 });
        if (!brand) {
            throw new NotFoundException("Marca no encontrada");
        }
        return this.categoryModel.create({ ...category, brand, order: lastCategory ? lastCategory.order + 1 : 0 });
    }

    async findAll(): Promise<Category[]> {
        return this.categoryModel.find();
    }

    async findById(id: string): Promise<Category> {
        return this.categoryModel.findById(id);
    }

    async findByBrandId(brandId: string): Promise<Category[]> {
        return this.categoryModel.find({ brandId });
    }

    async update(id: string, category: Category): Promise<Category> {
        return this.categoryModel.findByIdAndUpdate(
            id,
            { $set: category },
            { new: true }
        ).exec();
    }

    async delete(id: string): Promise<void> {
        await this.categoryModel.findByIdAndDelete(id).exec();
    }

}

