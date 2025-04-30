import { Modifier } from "../entity/modifier.entity";

export interface IModifierDao {
    create(modifier: Modifier): Promise<Modifier>;
    findAll(): Promise<Modifier[]>;
    
}