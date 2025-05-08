import { Injectable, NotFoundException } from "@nestjs/common";
import { IModifierDao } from "./db/modifier.dao";
import { ModifierMongodbService } from "./db/modifier-mongodb.service";
import { Modifier } from "./entity/modifier.entity";    
import { CreateModifierDto } from "./dto/create-modifier.dto";
import { UpdateModifierDto } from './dto/update-modifier.dto';

@Injectable()
export class ModifierService {
    private readonly _modifierDb: IModifierDao;
    constructor(
        private readonly modifierMongodbService: ModifierMongodbService
    ) {
        this._modifierDb = modifierMongodbService;
    }

    async create(modifier: CreateModifierDto): Promise<Modifier> {
        return this._modifierDb.create(modifier);
    }

    async findAll(): Promise<Modifier[]> {
        return this._modifierDb.findAll();
    }
    
    async findAllByBrand(brandId: string): Promise<Modifier[]> {
        return this._modifierDb.findAllByBrand(brandId);
    }
    
    async findById(id: string): Promise<Modifier> {
        const modifier = await this._modifierDb.findById(id);
        if (!modifier) {
            throw new NotFoundException('Modificador no encontrado');
        }
        return modifier;
    }

    async update(id: string, updateModifierDto: UpdateModifierDto): Promise<Modifier> {
        const modifier = await this.findById(id);
        Object.assign(modifier, updateModifierDto);
        return this._modifierDb.update(id, modifier);
    }

    async delete(id: string): Promise<void> {
        await this.findById(id);
        await this._modifierDb.delete(id);
    }
}

