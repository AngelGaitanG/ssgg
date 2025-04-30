import { Controller } from "@nestjs/common";
import { ModifierService } from "./modifier.service";

@Controller("modifier")
export class ModifierController {
    constructor(private readonly modifierService: ModifierService) {}
}
