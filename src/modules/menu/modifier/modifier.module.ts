import { Module } from "@nestjs/common";
import { Modifier } from "./entity/modifier.entity";
import { MongooseModule } from "@nestjs/mongoose";
import { ModifierSchema } from "./entity/modifier.entity";
import { ModifierController } from "./modifier.controller";
import { ModifierService } from "./modifier.service";
import { ModifierMongodbService } from "./db/modifier-mongodb.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Modifier.name, schema: ModifierSchema }
        ])
    ],
    controllers: [ModifierController],
    providers: [ModifierService, ModifierMongodbService],
    exports: [ModifierService],
})
export class ModifierModule {}
