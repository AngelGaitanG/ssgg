import { Injectable, NotFoundException } from '@nestjs/common';
import { ICategoryDao } from "./db/category.dao";
import { CategoryMondodbService } from "./db/category-mondodb.service";
import { Category } from "./entity/category.entity";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from './dto/update-category.dto';

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
        const category = await this._categoryDb.findById(id);
        if (!category) {
            throw new NotFoundException('Categoría no encontrada');
        }
        return category;
    }

    async findByBrandId(brandId: string): Promise<Category[]> {
        return this._categoryDb.findByBrandId(brandId);
    }

    async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
        const category = await this.findById(id);
        Object.assign(category, updateCategoryDto);
        return this._categoryDb.update(id, category);
    }
    
    async delete(id: string): Promise<void> {
        await this.findById(id);
        await this._categoryDb.delete(id);
    }
    
}
