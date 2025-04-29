import { Controller, Get, Post, Req, UseGuards, Body } from "@nestjs/common";
import { BrandService } from "./brand.service";
import { JwtAuthGuard } from "../../../core/guards/jwt-auth.guard";
import { Roles } from "../../../core/decorators/roles.decorator";
import { RoleType } from "../../auth/role/entity/role.entity";
import { RequestWithUser } from "src/core/interfaces/request-with-user";
import { CreateBrandDto } from "./dto/create-brand.dto";
import { ApiResponse } from "src/core/responses/api-response";
@Controller('brand')
export class BrandController {
    constructor(private readonly brandService: BrandService) {}

    @Post()
    @Roles(RoleType.SUPERADMIN, RoleType.OWNER)
    @UseGuards(JwtAuthGuard)
    async createBrand(@Req() req: RequestWithUser, @Body() brand: CreateBrandDto): Promise<ApiResponse> {
        try {
            const createdBrand = await this.brandService.createBrand(req.user, brand);
            return ApiResponse.success('Marca creada correctamente', createdBrand);
        } catch (error) {
            return ApiResponse.error('Error al crear la marca', error);
        }
    }

    @Get('all')
    @Roles(RoleType.SUPERADMIN, RoleType.OWNER)
    @UseGuards(JwtAuthGuard)
    async getAllBrands(@Req() req: RequestWithUser) {
        return this.brandService.getAllBrands(req.user);
    }
}

