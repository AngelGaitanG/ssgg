import { Module } from "@nestjs/common";
import { OptionController } from "./option.controller";
import { OptionService } from "./option.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Option, OptionSchema } from "./entity/option.entity";
import { OptionMongodbService } from "./db/option-mongodb.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Option.name, schema: OptionSchema }
        ])
    ],
    controllers: [OptionController],
    providers: [OptionService, OptionMongodbService],
    exports: [OptionService],
})
export class OptionModule {}
