import { CreateBrandDto } from "../dto/create-brand.dto";
import { BrandDocument } from "../entity/brand.entity";

export interface IBrandDao {
    create(brand: CreateBrandDto): Promise<BrandDocument>;
    findAll(): Promise<BrandDocument[]>;
    findById(id: string): Promise<BrandDocument>;
    update(id: string, brand: BrandDocument): Promise<BrandDocument>;
    delete(id: string): Promise<void>;
}