import { Injectable } from "@nestjs/common";
import { IModifierDao } from "./modifier.dao";
import { InjectModel } from "@nestjs/mongoose";
import { Modifier } from "../entity/modifier.entity";
import { Model } from "mongoose";

@Injectable()
export class ModifierMongodbService implements IModifierDao {
    constructor(
        @InjectModel(Modifier.name) private modifierModel: Model<Modifier>
    ) {}

    async create(modifier: Modifier): Promise<Modifier> {
        return this.modifierModel.create(modifier);
    }

    async findAll(): Promise<Modifier[]> {
        return this.modifierModel.find();
    }
}