import { Injectable } from "@nestjs/common";
import { IOptionDao } from "./option.dao";
import { Option } from "../entity/option.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class OptionMongodbService implements IOptionDao {
    constructor(
        @InjectModel(Option.name) private optionModel: Model<Option>
    ) {}

    async create(option: Option): Promise<Option> {
        return this.optionModel.create(option);
    }

    async findAll(): Promise<Option[]> {
        return this.optionModel.find();
    }
}

