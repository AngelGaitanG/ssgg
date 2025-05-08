import { Injectable, NotFoundException } from "@nestjs/common";
import { IProductDao } from "./db/product.dao";
import { ProductMongodbService } from "./db/product-mongodb.service";
import { Product } from "./entity/product.entity";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from './dto/update-product.dto';


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
        const product = await this._productDb.findById(id);
        if (!product) {
            throw new NotFoundException('Producto no encontrado');
        }
        return product;
    }

    async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
        const product = await this.findById(id);
        Object.assign(product, updateProductDto);
        return this._productDb.update(id, product);
    }
    
    async delete(id: string): Promise<void> {
        await this.findById(id);
        await this._productDb.delete(id);
    }
}


