import { CreateModifierDto } from "../dto/create-modifier.dto";
import { Modifier } from "../entity/modifier.entity";

export interface IModifierDao {
    create(modifier: CreateModifierDto): Promise<Modifier>;
    findAll(): Promise<Modifier[]>;
    findAllByBrand(brandId: string): Promise<Modifier[]>;
    findById(id: string): Promise<Modifier>;
    update(id: string, modifier: Modifier): Promise<Modifier>;
    delete(id: string): Promise<void>;
}