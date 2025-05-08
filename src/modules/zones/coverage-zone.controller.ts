import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { CoverageZoneService } from "./coverage-zone.service";
import { CoverageZone } from "./entity/coverage-zone.entity";
import { ApiResponse as SwaggerResponse, ApiTags, ApiOperation, ApiParam, ApiBearerAuth, ApiBody } from "@nestjs/swagger";
import { ApiResponse } from "src/core/responses/api-response";
import { JwtAuthGuard } from "src/core/guards/jwt-auth.guard";
import { Roles } from "src/core/decorators/roles.decorator";
import { RoleType } from "../auth/role/entity/role.entity";

@ApiTags('Coverage Zones')
@ApiBearerAuth()
@Controller('coverage-zone')
export class CoverageZoneController {
  constructor(private readonly coverageZoneService: CoverageZoneService) {}

  @UseGuards(JwtAuthGuard)
  @Roles(RoleType.OWNER, RoleType.SUPERADMIN)
  @Post()
  @ApiOperation({ summary: 'Create a coverage zone' })
  @SwaggerResponse({ status: 201, description: 'Coverage zone created successfully' })
  @SwaggerResponse({ status: 400, description: 'Bad Request' })
  @ApiBody({ type: CoverageZone })
  async create(@Body() coverageZone: CoverageZone): Promise<ApiResponse> {
    try {
      const coverageZoneCreated = await this.coverageZoneService.create(coverageZone);
      return ApiResponse.success('Zona Creada correctamente', coverageZoneCreated);
    } catch (error) {
      return ApiResponse.error(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Roles(RoleType.OWNER, RoleType.SUPERADMIN)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a coverage zone by ID' })
  @SwaggerResponse({ status: 200, description: 'Coverage zone updated successfully' })
  @SwaggerResponse({ status: 404, description: 'Coverage zone not found' })
  @ApiParam({ name: 'id', type: String })
  async update(@Param('id') id: string, @Body() coverageZone: Partial<CoverageZone>): Promise<ApiResponse> {
    try {
      const coverageZoneUpdated = await this.coverageZoneService.update(id, coverageZone);
      return ApiResponse.success('Zona actualizada correctamente', coverageZoneUpdated);
    } catch (error) {
      return ApiResponse.error(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Roles(RoleType.OWNER, RoleType.SUPERADMIN)
  @Get('by-branch/:id')
  @ApiOperation({ summary: 'Get all coverage zones for a specific branch' })
  @SwaggerResponse({ status: 200, description: 'Coverage zones retrieved successfully' })
  @SwaggerResponse({ status: 404, description: 'Branch not found or has no coverage zones' })
  @ApiParam({ name: 'id', type: String })
  async findAllByBranch(@Param('id') id: string): Promise<ApiResponse> {
    try {
      const coverageZones = await this.coverageZoneService.findAllByBranch(id);
      return ApiResponse.success('Zonas obtenidas correctamente', coverageZones);
    } catch (error) {
      return ApiResponse.error(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Roles(RoleType.OWNER, RoleType.SUPERADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a coverage zone by ID' })
  @SwaggerResponse({ status: 200, description: 'Coverage zone deleted successfully' })
  @SwaggerResponse({ status: 404, description: 'Coverage zone not found' })
  @ApiParam({ name: 'id', type: String })
  async delete(@Param('id') id: string): Promise<ApiResponse> {
    try {
      const result = await this.coverageZoneService.delete(id);
      return ApiResponse.success('Zona eliminada correctamente', result);
    } catch (error) {
      return ApiResponse.error(error);
    }
  }
}
