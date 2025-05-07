import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { IntegrationBranchController } from './integration-branch.controller';
import { IntegrationBranchService } from './integration-branch.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Brand, BrandSchema } from '../brand/entity/brand.entity';
import { Branch, BranchSchema } from '../branch/entity/branch.entity';

@Module({
    imports: [
        HttpModule,
        MongooseModule.forFeature([
            { name: Brand.name, schema: BrandSchema },
            { name: Branch.name, schema: BranchSchema }
        ])
    ],
    controllers: [IntegrationBranchController],
    providers: [IntegrationBranchService],
    exports: [IntegrationBranchService]
})
export class IntegrationBranchModule {}