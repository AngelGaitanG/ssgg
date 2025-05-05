import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { RestpeIntegrationService } from './services/restpe-integration.service';
import { ApiResponse } from '../../../core/responses/api-response';
import { JwtAuthGuard } from '../../../core/guards/jwt-auth.guard';
import { Roles } from '../../../core/decorators/roles.decorator';
import { RoleType } from '../../../modules/auth/role/entity/role.entity';

@Controller('integration')
export class IntegrationController {
    constructor(
        private readonly restpeIntegrationService: RestpeIntegrationService
    ) {}

    @Roles(RoleType.SUPERADMIN, RoleType.OWNER)
    @UseGuards(JwtAuthGuard)
    @Get('compare/:subDomain/:localId')
    async compareData(
        @Param('subDomain') subDomain: string,
        @Param('localId') localId: string
    ): Promise<ApiResponse> {
        try {
            const data = await this.restpeIntegrationService.getIntegrationComparison(subDomain, localId);
            return ApiResponse.success('Integración comparativa obtenida correctamente', data);
        } catch (error) {
            return ApiResponse.error(error);
        }
    }
}

