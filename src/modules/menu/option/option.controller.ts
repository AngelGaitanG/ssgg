import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { OptionService } from "./option.service";
import { CreateOptionDto } from "./dto/create-option.dto";
import { ApiResponse } from "../../../core/responses/api-response";
import { JwtAuthGuard } from "../../../core/guards/jwt-auth.guard";
import { Roles } from "../../../core/decorators/roles.decorator";
import { RoleType } from "../../../modules/auth/role/entity/role.entity";

@Controller("option")
export class OptionController {
    constructor(private readonly optionService: OptionService) {}

    @UseGuards(JwtAuthGuard)
    @Roles(RoleType.OWNER, RoleType.SUPERADMIN)
    @Post()
    async createOption(@Body() createOptionDto: CreateOptionDto): Promise<ApiResponse> {
        try {
            const option = await this.optionService.create(createOptionDto);
            return ApiResponse.success('Opción creada correctamente', option)
        } catch (error) {
            return ApiResponse.error(error)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Roles(RoleType.OWNER, RoleType.SUPERADMIN)
    @Get(':brandId')
    async findAllByBrand(@Param('brandId') brandId: string): Promise<ApiResponse> {
        try {
            console.log(brandId, 'Brand')
            const options = await this.optionService.findAllByBrand(brandId)
            return ApiResponse.success('Opciones encontradas exitosamente', options);
        } catch (error) {
            return ApiResponse.error(error);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Roles(RoleType.OWNER, RoleType.SUPERADMIN)
    @Delete(':id')
    async removeOption(@Param('id') id: string): Promise<ApiResponse> {
        try {
            await this.optionService.removeOption(id)
            return ApiResponse.success('Opcion eliminada correctamente')
        } catch (error) {
            return ApiResponse.error(error)
        }
    }

    
}
