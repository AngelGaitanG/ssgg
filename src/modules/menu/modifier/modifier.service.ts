import { Injectable } from "@nestjs/common";
import { IModifierDao } from "./db/modifier.dao";
import { ModifierMongodbService } from "./db/modifier-mongodb.service";
import { Modifier } from "./entity/modifier.entity";    

@Injectable()
export class ModifierService {
    private readonly _modifierDb: IModifierDao;
    constructor(
        private readonly modifierMongodbService: ModifierMongodbService
    ) {
        this._modifierDb = modifierMongodbService;
    }

    async create(modifier: Modifier): Promise<Modifier> {
        return this._modifierDb.create(modifier);
    }

    async findAll(): Promise<Modifier[]> {
        return this._modifierDb.findAll();
    }
    
    
}

