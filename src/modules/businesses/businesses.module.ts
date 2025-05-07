import { Module } from "@nestjs/common";
import { BrandModule } from "./brand/brand.module";
import { BranchModule } from "./branch/branch.module";
import { IntegrationBranchModule } from "./integration-branch/integration-branch.module";

@Module({
    imports: [
        BrandModule,
        BranchModule,
        IntegrationBranchModule
    ],
})
export class BusinessesModule {}
    