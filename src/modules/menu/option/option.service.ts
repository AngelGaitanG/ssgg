import { Injectable, NotFoundException } from "@nestjs/common";
import { IOptionDao } from "./db/option.dao";
import { OptionMongodbService } from "./db/option-mongodb.service";
import { Option } from "./entity/option.entity";
import { CreateOptionDto } from "./dto/create-option.dto";
import { UpdateOptionDto } from './dto/update-option.dto';

@Injectable()
export class OptionService {
    private readonly _optionDb: IOptionDao;
    constructor(
        private readonly optionMongodbService: OptionMongodbService
    ) {
        this._optionDb = optionMongodbService;
    }

    async create(option: CreateOptionDto): Promise<Option> {
        return this._optionDb.create(option);
    }

    async findAll(): Promise<Option[]> {
        return this._optionDb.findAll();
    }
    
    async findAllByBrand(brandId: string): Promise<Option[]> {
        return this._optionDb.findAllByBrand(brandId);
    }

    async removeOption(id: string): Promise<void> {
        return this._optionDb.delete(id)
    }

    async findById(id: string): Promise<Option> {
        const option = await this._optionDb.findById(id);
        if (!option) {
            throw new NotFoundException('Opción no encontrada');
        }
        return option;
    }

    async update(id: string, updateOptionDto: UpdateOptionDto): Promise<Option> {
        const option = await this.findById(id);
        Object.assign(option, updateOptionDto);
        return await this._optionDb.update(id, option);
    }

    async delete(id: string): Promise<void> {
        await this.findById(id);
        await this._optionDb.delete(id);
    }
}


