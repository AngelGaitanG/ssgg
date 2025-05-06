import { Injectable } from "@nestjs/common";
import { ICategoryDao } from "./db/category.dao";
import { CategoryMondodbService } from "./db/category-mondodb.service";
import { Category } from "./entity/category.entity";
import { CreateCategoryDto } from "./dto/create-category.dto";

@Injectable()
export class CategoryService {
    private readonly _categoryDb: ICategoryDao;
    constructor(
        private readonly categoryMongodbService: CategoryMondodbService
    ) {
        this._categoryDb = categoryMongodbService;
    }

    async create(category: CreateCategoryDto): Promise<Category> {
        return this._categoryDb.create(category);
    }

    async findAll(): Promise<Category[]> {
        return this._categoryDb.findAll();
    }

    async findById(id: string): Promise<Category> {
        return this._categoryDb.findById(id);
    }

    async findByBrandId(brandId: string): Promise<Category[]> {
        return this._categoryDb.findByBrandId(brandId);
    }

    async update(id: string, category: Category): Promise<Category> {
        return this._categoryDb.update(id, category);
    }
    
    async delete(id: string): Promise<void> {
        return this._categoryDb.delete(id);
    }
    
}
