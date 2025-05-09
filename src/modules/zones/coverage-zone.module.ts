import { Module } from "@nestjs/common";
import { CoverageZoneService } from "./coverage-zone.service";
import { CoverageZoneMongodbService } from "./db/coverage-zone-mogondb.service";
import { CoverageZoneController } from "./coverage-zone.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { CoverageZone, CoverageZoneSchema } from "./entity/coverage-zone.entity";
import { Branch, BranchSchema } from "../businesses/branch/entity/branch.entity";

@Module({
    controllers: [CoverageZoneController],
    imports: [MongooseModule.forFeature([
        { name: CoverageZone.name, schema: CoverageZoneSchema},
        { name: Branch.name, schema: BranchSchema }
    ])],
    providers: [CoverageZoneService, CoverageZoneMongodbService],
    exports: []
})
export class CoverageZoneModule {

}