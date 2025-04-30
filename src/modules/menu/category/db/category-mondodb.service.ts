import { Injectable } from "@nestjs/common";
import { ICategoryDao } from "./category.dao";
import { Category } from "../entity/category.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
@Injectable()
export class CategoryMondodbService implements ICategoryDao {
    constructor(
        @InjectModel(Category.name) private categoryModel: Model<Category>
    ) {}

    async create(category: Category): Promise<Category> {
        return this.categoryModel.create(category);
    }

    async findAll(): Promise<Category[]> {
        return this.categoryModel.find();
    }

    async findById(id: string): Promise<Category> {
        return this.categoryModel.findById(id);
    }

    async update(id: string, category: Category): Promise<Category> {
        return this.categoryModel.findByIdAndUpdate(id, category, { new: true });
    }

    async delete(id: string): Promise<void> {
        await this.categoryModel.findByIdAndDelete(id);
    }

}

