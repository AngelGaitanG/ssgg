import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { ApiResponse } from "../../../core/responses/api-response";
import { JwtAuthGuard } from "../../../core/guards/jwt-auth.guard";
import { Roles } from "../../../core/decorators/roles.decorator";
import { RoleType } from "../../../modules/auth/role/entity/role.entity";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Controller("category")
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @UseGuards(JwtAuthGuard)
    @Roles(RoleType.OWNER, RoleType.SUPERADMIN)
    @Post()
    async create(@Body() createCategoryDto: CreateCategoryDto):Promise<ApiResponse> {
        try {
            const category = await this.categoryService.create(createCategoryDto);
            return ApiResponse.success("Categoria creada correctamente", category);
        } catch (error) {
            return ApiResponse.error(error);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Roles(RoleType.SUPERADMIN)
    @Get()
    async findAll():Promise<ApiResponse> {
        try {
            const categories = await this.categoryService.findAll();
            return ApiResponse.success("Categorias encontradas correctamente", categories);
        } catch (error) {
            return ApiResponse.error(error);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Roles(RoleType.OWNER, RoleType.SUPERADMIN)
    @Get(":brandId")
    async findByBrandId(@Param("brandId") brandId: string):Promise<ApiResponse> {
        try {
            const categories = await this.categoryService.findByBrandId(brandId);
            return ApiResponse.success("Categorias encontradas correctamente", categories);
        } catch (error) {
            return ApiResponse.error(error);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Roles(RoleType.OWNER, RoleType.SUPERADMIN)
    @Patch(":id")
    async update(@Param("id") id: string, @Body() updateCategoryDto: UpdateCategoryDto):Promise<ApiResponse> {
        try {
           const category = await this.categoryService.update(id, updateCategoryDto)
           return ApiResponse.success('Categoria actualizada correctamente', category)
        } catch (error) {
            return ApiResponse.error(error);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Roles(RoleType.OWNER, RoleType.SUPERADMIN)
    @Delete(":id")
    async delete(@Param("id") id: string):Promise<ApiResponse> {
        try {
            await this.categoryService.delete(id);
            return ApiResponse.success("Categoria eliminada correctamente");
        } catch (error) {
            return ApiResponse.error(error);
        }
    }

    
}

