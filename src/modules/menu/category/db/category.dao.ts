import { Category } from "../entity/category.entity";

export interface ICategoryDao {
    create(category: Category): Promise<Category>;
    findAll(): Promise<Category[]>;
    findById(id: string): Promise<Category>;
    update(id: string, category: Category): Promise<Category>;
    delete(id: string): Promise<void>;
}