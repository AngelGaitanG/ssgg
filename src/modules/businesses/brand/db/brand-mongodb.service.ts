import { Injectable } from "@nestjs/common";
import { IBrandDao } from "./brand.dao";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Brand, BrandDocument } from "../entity/brand.entity";
import { CreateBrandDto } from "../dto/create-brand.dto";

@Injectable()
export class BrandMongodbService implements IBrandDao {
    constructor(
        @InjectModel(Brand.name) private brandModel: Model<Brand>,
    ) {}
    

    async create(brand: CreateBrandDto): Promise<BrandDocument> {
        const createdBrand = await this.brandModel.create(brand);
        return createdBrand;
    }

    async findAll(): Promise<BrandDocument[]> {
        return this.brandModel.find();
    }

    async findById(id: string): Promise<BrandDocument> {
        return this.brandModel.findById(id);
    }

    async findBySubdomain(subdomain: string): Promise<BrandDocument> {
        return this.brandModel.findOne({ subdomain }).exec();
    }

    async update(id: string, brand: BrandDocument): Promise<BrandDocument> {
        return this.brandModel.findByIdAndUpdate(id, brand, { new: true });
    }

    async delete(id: string): Promise<void> {
        await this.brandModel.findByIdAndDelete(id);
    }   

    async findByOwner(ownerId: string): Promise<BrandDocument[]> {
        return this.brandModel.find({ owner: ownerId });
    }
}
