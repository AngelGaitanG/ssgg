import { Injectable, NotFoundException } from "@nestjs/common";
import { IOptionDao } from "./option.dao";
import { Option } from "../entity/option.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Brand } from "../../../../modules/businesses/brand/entity/brand.entity";
import { Modifier } from "../../modifier/entity/modifier.entity";
import { CreateOptionDto } from "../dto/create-option.dto";

@Injectable()
export class OptionMongodbService implements IOptionDao {
    constructor(
        @InjectModel(Option.name) private optionModel: Model<Option>,
        @InjectModel(Brand.name) private brandModel: Model<Brand>,
        @InjectModel(Modifier.name) private modifierModel: Model<Modifier> 
    ) {}

    async create(option: CreateOptionDto): Promise<Option> {
        const brand = await this.brandModel.findById(option.brandId);
        // const modifier = await this.modifierModel.findById(option.modifierId);
        if (!brand) {
            throw new NotFoundException("Marca no encontrada");
        }
        // if (!modifier) {    
        //     throw new NotFoundException("Modificador no encontrado");
        // }
        const createdOption = new this.optionModel(option);
        return await createdOption.save();
    }

    async findAll(): Promise<Option[]> {
        return await this.optionModel.find().exec();
    }

    async findById(id: string): Promise<Option> {
        return await this.optionModel.findById(id).exec();
    }

    async findAllByBrand(brandId: string): Promise<Option[]> {
        return await this.optionModel.find({ brandId }).exec();
    }

    async update(id: string, option: Option): Promise<Option> {
        return await this.optionModel.findByIdAndUpdate(
            id,
            { $set: option },
            { new: true }
        ).exec();
    }

    async delete(id: string): Promise<void> {
        await this.optionModel.findByIdAndDelete(id).exec();
    }
}

