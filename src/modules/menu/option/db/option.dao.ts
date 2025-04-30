import { Option } from "../entity/option.entity";

export interface IOptionDao {
    create(option: Option): Promise<Option>;
    findAll(): Promise<Option[]>;
    
}