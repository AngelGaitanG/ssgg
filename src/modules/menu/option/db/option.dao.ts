import { CreateOptionDto } from "../dto/create-option.dto";
import { Option } from "../entity/option.entity";

export interface IOptionDao {
    create(option: CreateOptionDto): Promise<Option>;
    findAll(): Promise<Option[]>;
    findAllByBrand(brandId: string): Promise<Option[]>;
    findById(id: string): Promise<Option>;
    update(id: string, option: Option): Promise<Option>;
    delete(id: string): Promise<void>;
}