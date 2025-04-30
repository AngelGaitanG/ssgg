import { Injectable } from "@nestjs/common";
import { IOptionDao } from "./db/option.dao";
import { OptionMongodbService } from "./db/option-mongodb.service";
import { Option } from "./entity/option.entity";
@Injectable()
export class OptionService {
    private readonly _optionDb: IOptionDao;
    constructor(
        private readonly optionMongodbService: OptionMongodbService
    ) {
        this._optionDb = optionMongodbService;
    }

    async create(option: Option): Promise<Option> {
        return this._optionDb.create(option);
    }

    async findAll(): Promise<Option[]> {
        return this._optionDb.findAll();
    }
    
    
}


