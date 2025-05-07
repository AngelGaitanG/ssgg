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
        return this.optionModel.create({ ...option, brand});
    }

    async findAll(): Promise<Option[]> {
        return this.optionModel.find();
    }

    async findAllByBrand(brandId: string): Promise<Option[]> {
        return this.optionModel.find({ brandId });
    }

    async removeOption(id: string): Promise<void> {
        return this.optionModel.findByIdAndDelete(id)
    }
}

