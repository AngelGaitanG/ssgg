import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Branch, BranchSchema } from "./entity/branch.entity";
import { BranchController } from "./branch.controller";
import { BranchService } from "./branch.service";
import { BranchMongodbService } from "./db/branch-mongodb.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Branch.name, schema: BranchSchema }]),
    ],
    controllers: [BranchController],
    providers: [BranchService, BranchMongodbService],
    exports: [BranchService],
})
export class BranchModule {}