import { Product } from "../entity/product.entity";

export interface IProductDao {
    create(product: Product): Promise<Product>;
    findAll(): Promise<Product[]>;
    findById(id: string): Promise<Product>;
    update(id: string, product: Product): Promise<Product>;
    delete(id: string): Promise<void>;
}