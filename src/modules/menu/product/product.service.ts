import { Injectable } from "@nestjs/common";
import { IProductDao } from "./db/product.dao";
import { ProductMongodbService } from "./db/product-mongodb.service";
import { Product } from "./entity/product.entity";
import { CreateProductDto } from "./dto/create-product.dto";


@Injectable()
export class ProductService {
    private readonly _productDb: IProductDao;
    constructor(
        private readonly productMongodbService: ProductMongodbService
    ) {
        this._productDb = productMongodbService;
    }

    async create(product: CreateProductDto): Promise<Product> {
        return this._productDb.create(product);
    }

    async findAll(): Promise<Product[]> {
        return this._productDb.findAll();
    }

    async findAllByBrand(brandId: string): Promise<Product[]> {
        return this._productDb.findAllByBrand(brandId);
    }

    async findById(id: string): Promise<Product> {
        return this._productDb.findById(id);
    }

    async update(id: string, product: Product): Promise<Product> {
        return this._productDb.update(id, product);
    }
    
    async delete(id: string): Promise<void> {
        return this._productDb.delete(id);
    }
}


