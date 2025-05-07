import { CreateBrandDto } from "../dto/create-brand.dto";
import { UpdateBrandSettingsDto } from "../dto/update-brand-settings.dto";
import { BrandDocument } from "../entity/brand.entity";

export interface IBrandDao {
    create(brand: CreateBrandDto): Promise<BrandDocument>;
    findAll(): Promise<BrandDocument[]>;
    findById(id: string): Promise<BrandDocument>;
    findBySubdomain(subdomain: string): Promise<BrandDocument>;
    update(id: string, brand: Partial<UpdateBrandSettingsDto>): Promise<BrandDocument>;
    
    delete(id: string): Promise<void>;
}