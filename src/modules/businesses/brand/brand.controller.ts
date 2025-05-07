import { Controller, Get, Post, Req, UseGuards, Body, Patch, Param, UseInterceptors, UploadedFile, Delete } from "@nestjs/common";
import { BrandService } from "./brand.service";
import { JwtAuthGuard } from "../../../core/guards/jwt-auth.guard";
import { Roles } from "../../../core/decorators/roles.decorator";
import { RoleType } from "../../auth/role/entity/role.entity";
import { RequestWithUser } from "src/core/interfaces/request-with-user";
import { CreateBrandDto } from "./dto/create-brand.dto";
import { ApiResponse } from "src/core/responses/api-response";
import { UpdateBrandSettingsDto } from "./dto/update-brand-settings.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileUploadService } from "src/core/cloudinary/image.service";

@Controller('brand')
export class BrandController {
    constructor(
        private readonly brandService: BrandService,
        private readonly fileUploadService: FileUploadService
    ) {}

    @Post()
    @Roles(RoleType.SUPERADMIN, RoleType.OWNER)
    @UseGuards(JwtAuthGuard)
    async createBrand(@Req() req: RequestWithUser, @Body() brand: CreateBrandDto): Promise<ApiResponse> {
        try {
            const createdBrand = await this.brandService.createBrand(req.user, brand);
            return ApiResponse.success('Marca creada correctamente', createdBrand);
        } catch (error) {
            return ApiResponse.error(error);
        }
    }

    @Get('all')
    @Roles(RoleType.SUPERADMIN, RoleType.OWNER)
    @UseGuards(JwtAuthGuard)
    async getAllBrands(@Req() req: RequestWithUser) {
        return this.brandService.getAllBrands(req.user);
    }
    

    @Patch(':id/settings')
    @Roles(RoleType.SUPERADMIN, RoleType.OWNER)
    @UseGuards(JwtAuthGuard)
    async updateBrandSettings(
        @Param('id') id: string,
        @Body() settings: UpdateBrandSettingsDto,
        @Req() req: RequestWithUser
    ): Promise<ApiResponse> {
        try {
            const updatedBrand = await this.brandService.updateBrandSettings(id, settings, req.user);
            return ApiResponse.success('Configuración actualizada correctamente', updatedBrand);
        } catch (error) {
            return ApiResponse.error(error);
        }
    }

    @Post(':id/logo')
    @Roles(RoleType.SUPERADMIN, RoleType.OWNER)
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async uploadLogo(
        @Param('id') id: string,
        @UploadedFile() file: Express.Multer.File,
        @Req() req: RequestWithUser
    ): Promise<ApiResponse> {
        try {
            const logoUrl = await this.fileUploadService.uploadImage(file, 'brands');
            const updatedBrand = await this.brandService.updateBrandLogo(id, logoUrl, req.user);
            return ApiResponse.success('Logo actualizado correctamente', updatedBrand);
        } catch (error) {
            return ApiResponse.error(error);
        }
    }

    @Delete(':id/logo')
    @Roles(RoleType.SUPERADMIN, RoleType.OWNER)
    @UseGuards(JwtAuthGuard)
    async deleteLogo(
        @Param('id') id: string,
        @Req() req: RequestWithUser
    ): Promise<ApiResponse> {
        try {
            const brand = await this.brandService.getBrandById(id);
            if (brand.logo) {
                await this.fileUploadService.deleteImage(brand.logo);
                await this.brandService.updateBrandLogo(id, null, req.user);
            }
            return ApiResponse.success('Logo eliminado correctamente');
        } catch (error) {
            return ApiResponse.error(error);
        }
    }

    @Get(':id')
    @Roles(RoleType.SUPERADMIN, RoleType.OWNER)
    @UseGuards(JwtAuthGuard)
    async getBrand(
        @Param('id') id: string,
        @Req() req: RequestWithUser
    ): Promise<ApiResponse> {
        try {
            const brand = await this.brandService.getBrandById(id);
            return ApiResponse.success('Marca encontrada exitosamente', brand);
        } catch (error) {
            return ApiResponse.error(error);
        }
    }
}

