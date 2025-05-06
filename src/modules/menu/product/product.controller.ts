import { Controller, Post, UseGuards, Body, Get, Param, Delete } from "@nestjs/common";
import { ProductService } from "./product.service";
import { Roles } from "src/core/decorators/roles.decorator";
import { RoleType } from "src/modules/auth/role/entity/role.entity";
import { JwtAuthGuard } from "src/core/guards/jwt-auth.guard";
import { CreateProductDto } from "./dto/create-product.dto";
import { ApiResponse } from "src/core/responses/api-response";

@Controller("product")
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @UseGuards(JwtAuthGuard)
    @Roles(RoleType.OWNER, RoleType.SUPERADMIN)
    @Post()
    async create(@Body() product: CreateProductDto):Promise<ApiResponse> {
        try {
            const createdProduct = await this.productService.create(product);
            return ApiResponse.success("Producto creado correctamente", createdProduct);
        } catch (error) {
            return ApiResponse.error(error);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Roles(RoleType.OWNER, RoleType.SUPERADMIN)
    @Get(':brandId')
    async findAllByBrand(@Param("brandId") brandId: string):Promise<ApiResponse> {
        try {
            const products = await this.productService.findAllByBrand(brandId);
            return ApiResponse.success("Productos encontrados correctamente", products);
        } catch (error) {
            return ApiResponse.error(error);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Roles(RoleType.OWNER, RoleType.SUPERADMIN)
    @Delete(":id")
    async delete(@Param("id") id: string):Promise<ApiResponse> {
        try {
            await this.productService.delete(id);
            return ApiResponse.success("Producto eliminado correctamente");
        } catch (error) {
            return ApiResponse.error(error);
        }
    }
}

