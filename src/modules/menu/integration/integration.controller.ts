import { Controller, Get, Param } from '@nestjs/common';
import { RestpeIntegrationService } from './services/restpe-integration.service';
import { IntegrationComparisonResponse } from './interfaces/integration-comparison.interface';

@Controller('menu/integration')
export class IntegrationController {
    constructor(
        private readonly restpeIntegrationService: RestpeIntegrationService
    ) {}

    @Get('compare/:subDomain/:localId')
    async compareData(
        @Param('subDomain') subDomain: string,
        @Param('localId') localId: string
    ): Promise<IntegrationComparisonResponse> {
        return this.restpeIntegrationService.getIntegrationComparison(subDomain, localId);
    }
}

