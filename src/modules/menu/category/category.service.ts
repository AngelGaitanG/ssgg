import { Injectable } from "@nestjs/common";
import { ICategoryDao } from "./db/category.dao";
import { CategoryMondodbService } from "./db/category-mondodb.service";
import { Category } from "./entity/category.entity";

@Injectable()
export class CategoryService {
    private readonly _categoryDb: ICategoryDao;
    constructor(
        private readonly categoryMongodbService: CategoryMondodbService
    ) {
        this._categoryDb = categoryMongodbService;
    }

    async create(category: Category): Promise<Category> {
        return this._categoryDb.create(category);
    }

    async findAll(): Promise<Category[]> {
        return this._categoryDb.findAll();
    }

    async findById(id: string): Promise<Category> {
        return this._categoryDb.findById(id);
    }

    async update(id: string, category: Category): Promise<Category> {
        return this._categoryDb.update(id, category);
    }
    
    async delete(id: string): Promise<void> {
        return this._categoryDb.delete(id);
    }
    
}
