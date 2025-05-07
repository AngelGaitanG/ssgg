import { CreateOptionDto } from "../dto/create-option.dto";
import { Option } from "../entity/option.entity";

export interface IOptionDao {
    create(option: CreateOptionDto): Promise<Option>;
    findAll(): Promise<Option[]>;
    findAllByBrand(branId: string): Promise<Option[]>;
    removeOption(id: string): Promise<void>;
}