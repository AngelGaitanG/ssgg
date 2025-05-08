import { Controller, Post, Body, UseGuards, Get, Param, Delete, Patch } from "@nestjs/common";
import { ModifierService } from "./modifier.service";
import { CreateModifierDto } from "./dto/create-modifier.dto";
import { ApiResponse } from "../../../core/responses/api-response";
import { JwtAuthGuard } from "../../../core/guards/jwt-auth.guard";
import { Roles } from "../../../core/decorators/roles.decorator";
import { RoleType } from "../../../modules/auth/role/entity/role.entity";
import { UpdateModifierDto } from "./dto/update-modifier.dto";

@Controller("modifier")
export class ModifierController {
    constructor(private readonly modifierService: ModifierService) {}

    @UseGuards(JwtAuthGuard)
    @Roles(RoleType.SUPERADMIN, RoleType.OWNER)
    @Post()
    async create(@Body() modifier: CreateModifierDto): Promise<ApiResponse> {
        try {
            const createdModifier = await this.modifierService.create(modifier);
            return ApiResponse.success("Modificador creado correctamente", createdModifier);
        } catch (error) {
            return ApiResponse.error(error);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Roles(RoleType.SUPERADMIN, RoleType.OWNER)
    @Get(':brandId')
    async findAllByBrand(@Param("brandId") brandId: string): Promise<ApiResponse> {
        try {
            const modifiers = await this.modifierService.findAllByBrand(brandId);
            return ApiResponse.success("Modificadores encontrados correctamente", modifiers);
        } catch (error) {
            return ApiResponse.error(error);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Roles(RoleType.OWNER, RoleType.SUPERADMIN)
    @Patch(":id")
    async update(@Param("id") id: string, @Body() updateModifierDto: UpdateModifierDto):Promise<ApiResponse> {
        try {
           const modifier = await this.modifierService.update(id, updateModifierDto)
           return ApiResponse.success('Modificador actualizada correctamente', modifier)
        } catch (error) {
            return ApiResponse.error(error);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Roles(RoleType.SUPERADMIN, RoleType.OWNER)
    @Delete(':id')
    async delete(@Param("id") id: string): Promise<ApiResponse> {
        try {
            const modifier = await this.modifierService.delete(id);
            return ApiResponse.success("Modificador eliminado correctamente", modifier);
        } catch (error) {
            return ApiResponse.error(error);
        }
    }
    
    

}
