import { Module } from "@nestjs/common";
import { Modifier } from "./entity/modifier.entity";
import { MongooseModule } from "@nestjs/mongoose";
import { ModifierSchema } from "./entity/modifier.entity";
import { ModifierController } from "./modifier.controller";
import { ModifierService } from "./modifier.service";
import { ModifierMongodbService } from "./db/modifier-mongodb.service";
import { Brand, BrandSchema } from "../../businesses/brand/entity/brand.entity";
import { Option, OptionSchema } from "../option/entity/option.entity";
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Modifier.name, schema: ModifierSchema },
            { name: Brand.name, schema: BrandSchema },
            { name: Option.name, schema: OptionSchema }
        ])
    ],
    controllers: [ModifierController],
    providers: [ModifierService, ModifierMongodbService],
    exports: [ModifierService],
})
export class ModifierModule {}
