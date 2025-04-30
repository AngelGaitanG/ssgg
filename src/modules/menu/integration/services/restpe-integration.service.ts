import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { ResponseData } from '../interfaces/restaurant-pe.interface';
import { Category } from '../../category/entity/category.entity';
import { Product } from '../../product/entity/product.entity';
import { Modifier } from '../../modifier/entity/modifier.entity';
import { Option } from '../../option/entity/option.entity';
import { Brand } from '../../../businesses/brand/entity/brand.entity';
import { IntegrationComparisonResponse, IntegrationSideData, ORIGINS, StatusProductCategory } from '../interfaces/integration-comparison.interface';

@Injectable()
export class RestpeIntegrationService {
    private readonly RESTAURANT_PE_URL = 'https://${subDomain}.restaurant.pe/restaurant/facebook/rest/delivery/cargarCartaMenuEnLinea/${localId}/0';

    constructor(
        @InjectModel(Category.name) private categoryModel: Model<Category>,
        @InjectModel(Product.name) private productModel: Model<Product>,
        @InjectModel(Modifier.name) private modifierModel: Model<Modifier>,
        @InjectModel(Option.name) private optionModel: Model<Option>,
        @InjectModel(Brand.name) private brandModel: Model<Brand>,
        private readonly httpService: HttpService,
    ) {}

    async getIntegrationComparison(subDomain: string, localId: string): Promise<IntegrationComparisonResponse> {
        // Primero buscamos el Brand por subdomain
        const brand = await this.brandModel.findOne({ subdomain: subDomain });
        if (!brand) {
            throw new NotFoundException(`No se encontró ninguna marca con el subdominio ${subDomain}`);
        }

        const [agiliza360, restpeData] = await Promise.all([
            this.getAgiliza360Data(brand._id.toString(), localId),
            this.getRestaurantPeData(subDomain, localId)
        ]);

        const comparisonData = {
            categories: this.generateComparisonStatus(
                restpeData.categories.map(c => c.id),
                agiliza360.categories.map(c => c.id)
            ),
            products: this.generateComparisonStatus(
                restpeData.products.map(p => p.id),
                agiliza360.products.map(p => p.id)
            ),
            modifiers: this.generateComparisonStatus(
                restpeData.modifiers.map(m => m.id),
                agiliza360.modifiers.map(m => m.id)
            ),
        };

        return {
            restpe: restpeData,
            agiliza360: agiliza360,
            comparison: comparisonData,
        };
    }

    private generateComparisonStatus(restpeIds: string[], agiliza360Ids: string[]): Array<{
        id: string;
        existsInRestpe: boolean;
        existsInAgiliza360: boolean;
        status: 'integrated' | 'pending';
    }> {
        const allIds = [...new Set([...restpeIds, ...agiliza360Ids])];
        return allIds.map(id => ({
            id,
            existsInRestpe: restpeIds.includes(id),
            existsInAgiliza360: agiliza360Ids.includes(id),
            status: agiliza360Ids.includes(id) ? 'integrated' : 'pending'
        }));
    }

    async getAgiliza360Data(brandId: string, localId: string): Promise<IntegrationSideData> {
        // BUSQUEDA DE CATEGORIAS EN NUESTRA DB
        const categories = await this.categoryModel.find({ brandId });
        const categoriesFormatted = categories.map(cat => ({
            id: cat.externalId,
            name: cat.name,
            status: cat.isActive ? StatusProductCategory.ACTIVE : StatusProductCategory.INACTIVE,
            source: ORIGINS.CARTA_AI,
            localId,
            subDomain: localId, // Usamos localId como subDomain temporalmente
        }));

        // BUSQUEDA DE PRODUCTOS EN NUESTRA DB
        const products = await this.productModel.find({ brandId });
        const productsFormatted = products.map(prod => ({
            id: prod.externalId,
            name: prod.name,
            status: prod.isActive ? StatusProductCategory.ACTIVE : StatusProductCategory.INACTIVE,
            source: ORIGINS.CARTA_AI,
            localId,
            subDomain: localId, // Usamos localId como subDomain temporalmente
            description: prod.description,
            categoryId: prod.categoryId,
            basePrice: prod.basePrice,
            isCombo: prod.isCombo,
            isOutOfStock: false,
            imageUrl: prod.image,
            modifiers: [], // Los modificadores en Carta.ai son independientes
        }));

        // BUSQUEDA DE MODIFICADORES EN NUESTRA DB
        const modifiers = await this.modifierModel.find({ brandId });
        
        // BUSQUEDA DE OPCIONES EN NUESTRA DB
        const options = await this.optionModel.find({ 
            brandId,
            modifierId: { $in: modifiers.map(m => m._id) }
        });

        const optionsByModifier = options.reduce((acc, opt) => {
            if (!acc[opt.modifierId.toString()]) {
                acc[opt.modifierId.toString()] = [];
            }
            acc[opt.modifierId.toString()].push(opt);
            return acc;
        }, {});

        const modifiersFormatted = modifiers.map(mod => ({
            id: mod.externalId,
            name: mod.name,
            status: mod.isActive ? StatusProductCategory.ACTIVE : StatusProductCategory.INACTIVE,
            source: ORIGINS.CARTA_AI,
            localId,
            subDomain: localId, // Usamos localId como subDomain temporalmente
            isMultiple: mod.maxSelections > 1,
            minQuantity: mod.minSelections,
            maxQuantity: mod.maxSelections,
            options: (optionsByModifier[mod._id.toString()] || []).map(opt => ({
                id: opt.externalId,
                name: opt.name,
                status: opt.isActive ? StatusProductCategory.ACTIVE : StatusProductCategory.INACTIVE,
                source: ORIGINS.CARTA_AI,
                localId,
                subDomain: localId, // Usamos localId como subDomain temporalmente
                price: opt.basePrice,
                stock: opt.stockControl ? 0 : 999,
            })),
        }));

        return {
            categories: categoriesFormatted,
            products: productsFormatted,
            modifiers: modifiersFormatted,
        };
    }

    async getRestaurantPeData(subDomain: string, localId: string): Promise<IntegrationSideData> {
        const url = this.RESTAURANT_PE_URL
            .replace('${subDomain}', subDomain)
            .replace('${localId}', localId);

        try {
            const response = await this.httpService.get<ResponseData>(url).toPromise();

            if (!response.data || !response.data.data) {
                console.error('La respuesta no tiene el formato esperado:', response.data);
                return {
                    categories: [],
                    products: [],
                    modifiers: []
                };
            }

            const data = response.data.data;

            if (!data.categorias || !data.menu) {
                console.error('Faltan datos requeridos en la respuesta:', {
                    tieneCategorias: !!data.categorias,
                    tieneMenu: !!data.menu
                });
                return {
                    categories: [],
                    products: [],
                    modifiers: []
                };
            }

            // FORMATO DE CATEGORIAS DE RESTAURANT.PE
            const categoriesFormatted = data.categorias.map(cat => ({
                id: cat.categoria_id,
                name: cat.categoria_descripcion,
                status: StatusProductCategory.ACTIVE,
                source: ORIGINS.RESTAURANT_PE,
                localId,
                subDomain,
            }));

            // Función para formatear los modificadores
            const formatModifiers = (lista_agrupadores: any[]) => {
                if (!lista_agrupadores) return [];
                return lista_agrupadores.map(mod => ({
                    id: mod.modificador_id,
                    name: mod.modificador_nombre,
                    status: StatusProductCategory.ACTIVE,
                    source: ORIGINS.RESTAURANT_PE,
                    localId,
                    subDomain,
                    isMultiple: mod.modificador_esmultiple === '1',
                    minQuantity: parseInt(mod.modificador_cantidadminima),
                    maxQuantity: parseInt(mod.modificador_cantidadmaxima),
                    options: mod.listaModificadores?.map(opt => ({
                        id: opt.modificadorseleccion_id,
                        name: opt.modificadorseleccion_nombre,
                        status: StatusProductCategory.ACTIVE,
                        source: ORIGINS.RESTAURANT_PE,
                        localId,
                        subDomain,
                        price: parseFloat(opt.modificadorseleccion_precio),
                        stock: parseInt(opt.productogeneralmodificador_stock),
                    })) || [],
                }));
            };

            // FORMATO DE PRODUCTOS Y PRESENTACIONES DE RESTAURANT.PE
            const productsFormatted = data.menu.flatMap(prod => {
                const productModifiers = formatModifiers(prod.lista_agrupadores);

                // Si no tiene presentaciones, el producto general es un producto
                if (!prod.lista_presentacion || prod.lista_presentacion.length === 0) {
                    return [{
                        id: prod.productogeneral_id,
                        name: prod.productogeneral_descripcion,
                        status: StatusProductCategory.ACTIVE,
                        source: ORIGINS.RESTAURANT_PE,
                        localId,
                        subDomain,
                        description: prod.productogeneral_descripcionplato,
                        categoryId: prod.categoria_id,
                        basePrice: parseFloat(prod.productogeneral_preciominimopresentacion),
                        isCombo: prod.productogeneral_escombo === '1',
                        isOutOfStock: prod.productogeneral_agotado === '1',
                        imageUrl: prod.productogeneral_urlimagen,
                        modifiers: productModifiers,
                    }];
                }

                // Si tiene presentaciones, cada presentación es un producto
                return prod.lista_presentacion.map(pres => ({
                    id: pres.producto_id,
                    name: pres.producto_nombre || prod.productogeneral_descripcion,
                    status: StatusProductCategory.ACTIVE,
                    source: ORIGINS.RESTAURANT_PE,
                    localId,
                    subDomain,
                    description: prod.productogeneral_descripcionplato,
                    categoryId: prod.categoria_id,
                    basePrice: parseFloat(pres.producto_precio),
                    isCombo: prod.productogeneral_escombo === '1',
                    isOutOfStock: prod.productogeneral_agotado === '1',
                    imageUrl: prod.productogeneral_urlimagen,
                    modifiers: productModifiers,
                }));
            });

            // FORMATO DE MODIFICADORES DE RESTAURANT.PE
            const allModifiers = data.menu.flatMap(prod => {
                if (!prod.lista_agrupadores) return [];
                return formatModifiers(prod.lista_agrupadores);
            });

            const modifiersMap = new Map();
            allModifiers.forEach(mod => {
                if (!modifiersMap.has(mod.id)) {
                    modifiersMap.set(mod.id, mod);
                }
            });
            
            const modifiersFormatted = Array.from(modifiersMap.values());

            return {
                categories: categoriesFormatted,
                products: productsFormatted,
                modifiers: modifiersFormatted,
            };
        } catch (error) {
            console.error('Error al obtener datos de Restaurant.pe:', error);
            return {
                categories: [],
                products: [],
                modifiers: []
            };
        }
    }
}

