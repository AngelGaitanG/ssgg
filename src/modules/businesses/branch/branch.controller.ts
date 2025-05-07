import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { BranchService } from "./branch.service";
import { ApiResponse } from "src/core/responses/api-response";
import { JwtAuthGuard } from "src/core/guards/jwt-auth.guard";
import { Roles } from "src/core/decorators/roles.decorator";
import { RoleType } from "src/modules/auth/role/entity/role.entity";

@Controller('branch')
export class BranchController {
    constructor(private readonly branchService: BranchService) {}

    @UseGuards(JwtAuthGuard)
    @Roles(RoleType.OWNER, RoleType.SUPERADMIN)
    @Get(':brandId')
    async findByBrand(@Param('brandId') brandId: string):Promise<ApiResponse> {
        try {
            const branches = await this.branchService.findByBrand(brandId);
            return ApiResponse.success('Locales obtenidos correctamente', branches)
        } catch (error) {
            return ApiResponse.error(error);
        }
    }

}

