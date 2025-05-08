import { Injectable, NotFoundException } from "@nestjs/common";
import { IModifierDao } from "./modifier.dao";
import { InjectModel } from "@nestjs/mongoose";
import { Modifier } from "../entity/modifier.entity";
import { Model } from "mongoose";
import { Brand } from "src/modules/businesses/brand/entity/brand.entity";
import { Option } from "../../option/entity/option.entity";
import { CreateModifierDto } from "../dto/create-modifier.dto";
@Injectable()
export class ModifierMongodbService implements IModifierDao {
    constructor(
        @InjectModel(Modifier.name) private modifierModel: Model<Modifier>,
        @InjectModel(Brand.name) private brandModel: Model<Brand>,
        @InjectModel(Option.name) private optionModel: Model<Option>
    ) {}

    async create(modifier: CreateModifierDto): Promise<Modifier> {
        const brand = await this.brandModel.findById(modifier.brandId);
        if (!brand) {
            throw new NotFoundException("Marca no encontrada");
        }
        const options = await this.optionModel.find({ _id: { $in: modifier.options } });
        if (options.length !== modifier.options.length) {
            throw new NotFoundException("Opciones no encontradas");
        }
        return this.modifierModel.create({ ...modifier, brand, options });
    }

    async findById(id: string): Promise<Modifier> {
        return this.modifierModel.findById(id);
    }

    async update(id: string, modifier: Modifier): Promise<Modifier> {
        return this.modifierModel.findByIdAndUpdate(id, modifier)
    }

    async findAll(): Promise<Modifier[]> {
        return this.modifierModel.find();
    }

    async findAllByBrand(brandId: string): Promise<Modifier[]> {
        return this.modifierModel.find({ brandId });
    }

    async delete(id: string): Promise<void> {
        return this.modifierModel.findByIdAndDelete(id);
    }
}