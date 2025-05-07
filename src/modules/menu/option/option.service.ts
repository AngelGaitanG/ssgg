import { Injectable } from "@nestjs/common";
import { IOptionDao } from "./db/option.dao";
import { OptionMongodbService } from "./db/option-mongodb.service";
import { Option } from "./entity/option.entity";
import { CreateOptionDto } from "./dto/create-option.dto";
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
        return this._optionDb.removeOption(id)
    }
    
}


