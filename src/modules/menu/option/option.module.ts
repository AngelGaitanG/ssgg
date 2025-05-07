import { Module } from "@nestjs/common";
import { OptionController } from "./option.controller";
import { OptionService } from "./option.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Option, OptionSchema } from "./entity/option.entity";
import { OptionMongodbService } from "./db/option-mongodb.service";
import { Brand, BrandSchema } from "../../../modules/businesses/brand/entity/brand.entity";
import { Modifier, ModifierSchema } from "../modifier/entity/modifier.entity";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Option.name, schema: OptionSchema },
            { name: Brand.name, schema: BrandSchema },
            { name: Modifier.name, schema: ModifierSchema }
        ])
    ],
    controllers: [OptionController],
    providers: [OptionService, OptionMongodbService],
    exports: [OptionService],
})
export class OptionModule {}
