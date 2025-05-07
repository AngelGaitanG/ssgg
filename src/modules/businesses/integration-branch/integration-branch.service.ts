import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { IRestaurantPEResponse, ILocal } from './interfaces/restaurant-pe.interface';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Branch } from '../branch/entity/branch.entity';
import { Brand } from '../brand/entity/brand.entity';

@Injectable()
export class IntegrationBranchService {
    private readonly logger = new Logger(IntegrationBranchService.name);

    constructor(
        private readonly httpService: HttpService,
        @InjectModel(Branch.name) private branchModel: Model<Branch>,
        @InjectModel(Brand.name) private brandModel: Model<Brand>
    ) {}

    /**
     * Obtiene la información de un local de RestaurantPE por su subdominio
     * @param subdominio - Subdominio del local en RestaurantPE
     * @returns Promise<IRestaurantPEResponse>
     */
    async getLocalBySubdomain(subdominio: string): Promise<IRestaurantPEResponse> {
        const url = `https://${subdominio}.restaurant.pe/restaurant/facebook/rest/delivery/cargarLocalesMenuEnLinea`;
        
        try {
            const { data } = await firstValueFrom(
                this.httpService.get<IRestaurantPEResponse>(url).pipe(
                    catchError((error: AxiosError) => {
                        this.logger.error(`Error al obtener datos de RestaurantPE: ${error.message}`);
                        if (error.response?.status === 404) {
                            throw new NotFoundException('Local no encontrado en RestaurantPE');
                        }
                        throw error;
                    }),
                ),
            );

            if (!data || !data.locales || data.locales.length === 0) {
                throw new NotFoundException('No se encontraron datos del local en RestaurantPE');
            }

            return data;
        } catch (error) {
            this.logger.error(`Error en getLocalBySubdomain: ${error.message}`);
            throw error;
        }
    }

    /**
     * Mapea un local de RestaurantPE a nuestro modelo de Branch
     */
    private mapLocalToBranch(local: ILocal, brandId: string): Partial<Branch> {
        return {
            externalId: local.local_id,
            name: local.local_nombrecomercial,
            address: local.local_direccion,
            phone: local.local_telefono,
            email: '', // No viene en la respuesta de RestaurantPE
            description: local.local_descripcion,
            minimumDeliveryTime: local.local_tiempominimodelivery,
            minimumOrderAmount: parseFloat(local.local_montominimo),
            whatsappNumber: local.local_wpp || null,
            taxPercentage: parseFloat(local.local_porcentajeImpuesto),
            isDeliveryEnabled: local.local_aceptadelivery === '1',
            isPickupEnabled: local.local_aceptarecojo === '1',
            isSchedulingEnabled: local.local_aceptaprogramados === '1',
            acceptsCardOnDelivery: local.local_aceptatarjetapordelivery === '1',
            acceptsCashOnDelivery: local.local_aceptaefectivopordelivery === '1',
            acceptsBankTransfer: local.local_pagotransferenciamenuonline === '1',
            isOperating: true,
            locationLatitude: local.local_latitud,
            locationLongitude: local.local_longitud,
            department: local.local_departamento || null,
            province: local.local_provincia || null,
            district: local.local_distrito || null,
            image: local.local_imagen,
            brandId,
            status: true
        };
    }

    /**
     * Sincroniza los locales de RestaurantPE con nuestro sistema
     */
    async syncBranchesFromRestaurantPE(brandId: string): Promise<Branch[]> {
        // 1. Obtener la brand
        const brand = await this.brandModel.findById(brandId);
        if (!brand) {
            throw new NotFoundException('Marca no encontrada');
        }

        // 2. Obtener datos de RestaurantPE
        const restaurantPEData = await this.getLocalBySubdomain(brand.subdomain);

        // 3. Procesar cada local
        const syncedBranches: Branch[] = [];
        for (const local of restaurantPEData.locales) {
            // Mapear datos
            const branchData = this.mapLocalToBranch(local, brandId);

            // Buscar si ya existe el branch por externalId
            let branch = await this.branchModel.findOne({ 
                externalId: local.local_id,
                brandId 
            });

            if (branch) {
                // Actualizar branch existente
                Object.assign(branch, branchData);
                branch = await branch.save();
            } else {
                // Crear nuevo branch
                branch = await this.branchModel.create({
                    ...branchData,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });

                // Actualizar la referencia en la brand
                await this.brandModel.findByIdAndUpdate(
                    brandId,
                    { $push: { branches: branch._id } }
                );
            }

            syncedBranches.push(branch);
        }

        return syncedBranches;
    }
}