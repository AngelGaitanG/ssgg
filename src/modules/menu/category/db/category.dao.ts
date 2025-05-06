import { CreateCategoryDto } from "../dto/create-category.dto";
import { Category } from "../entity/category.entity";

export interface ICategoryDao {
    create(category: CreateCategoryDto): Promise<Category>;
    findAll(): Promise<Category[]>;
    findById(id: string): Promise<Category>;
    findByBrandId(brandId: string): Promise<Category[]>;
    update(id: string, category: Category): Promise<Category>;
    delete(id: string): Promise<void>;
}