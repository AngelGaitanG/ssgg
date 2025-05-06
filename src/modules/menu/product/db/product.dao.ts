import { Product } from "../entity/product.entity";
import { CreateProductDto } from "../dto/create-product.dto";
export interface IProductDao {
    create(product: CreateProductDto): Promise<Product>;
    findAll(): Promise<Product[]>;
    findAllByBrand(brandId: string): Promise<Product[]>;
    findById(id: string): Promise<Product>;
    update(id: string, product: Product): Promise<Product>;
    delete(id: string): Promise<void>;
}