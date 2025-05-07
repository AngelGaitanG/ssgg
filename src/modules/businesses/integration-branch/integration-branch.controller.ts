import { Controller, Get, Param, UseGuards, Post } from '@nestjs/common';
import { IntegrationBranchService } from './integration-branch.service';
import { ApiOperation, ApiParam, ApiResponse as SwaggerResponse, ApiTags } from '@nestjs/swagger';
import { IRestaurantPEResponse } from './interfaces/restaurant-pe.interface';
import { JwtAuthGuard } from '../../../core/guards/jwt-auth.guard';
import { Roles } from '../../../core/decorators/roles.decorator';
import { RoleType } from '../../../modules/auth/role/entity/role.entity';
import { Branch } from '../branch/entity/branch.entity';
import { ApiResponse } from 'src/core/responses/api-response';

@ApiTags('Integration Branch')
@Controller('integration-branch')
export class IntegrationBranchController {
    constructor(private readonly integrationBranchService: IntegrationBranchService) {}

    @Get(':subdominio')
    @Roles(RoleType.SUPERADMIN, RoleType.OWNER)
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Obtiene la información de un local de RestaurantPE por su subdominio' })
    @ApiParam({ name: 'subdominio', description: 'Subdominio del local en RestaurantPE' })
    @SwaggerResponse({ 
        status: 200, 
        description: 'Datos del local obtenidos correctamente'
    })
    @SwaggerResponse({ status: 404, description: 'Local no encontrado' })
    async getLocalBySubdomain(
        @Param('subdominio') subdominio: string
    ): Promise<IRestaurantPEResponse> {
        return this.integrationBranchService.getLocalBySubdomain(subdominio);
    }

    @Post('brand/:brandId/sync')
    @Roles(RoleType.SUPERADMIN)
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Sincroniza los locales de RestaurantPE con nuestro sistema para una marca específica' })
    @ApiParam({ name: 'brandId', description: 'ID de la marca a sincronizar' })
    @SwaggerResponse({ 
        status: 200, 
        description: 'Locales sincronizados correctamente',
        type: [Branch]
    })
    @SwaggerResponse({ status: 404, description: 'Marca no encontrada' })
    async syncBranchesFromRestaurantPE(
        @Param('brandId') brandId: string
    ): Promise<ApiResponse> {
        try {
            const content = await this.integrationBranchService.syncBranchesFromRestaurantPE(brandId);
            return ApiResponse.success('Locales integrados correctamente', content)
        } catch (error) {
            return ApiResponse.error(error);
        }
    }
}