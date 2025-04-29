import { Module } from "@nestjs/common";
import { BrandModule } from "./brand/brand.module";
import { BranchModule } from "./branch/branch.module";

@Module({
    imports: [
        BrandModule,
        BranchModule,
    ],
})
export class BusinessesModule {}
    