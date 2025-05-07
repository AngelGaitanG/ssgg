/**
 * Interfaces que representan la estructura de datos de la respuesta de RestaurantPE
 */

export interface IRestaurantPEResponse {
    mensajes: string[];
    tipo: string;
    locales: ILocal[];
}

export interface ILocal {
    subdominio: string;
    dominio: string;
    linkdominio: string;
    local_id: string;
    local_descripcion: string;
    local_nombrecomercial: string;
    local_direccion: string;
    local_latitud: string;
    local_longitud: string;
    local_condicionesmenuonline: string | null;
    local_tiempominimodelivery: string;
    local_montominimo: string;
    local_categorianegocio: string | null;
    local_idioma: string;
    local_zonahoraria: string;
    local_redessociales: string;
    local_cartagenerica: string;
    local_departamento: string | null;
    local_provincia: string | null;
    local_distrito: string | null;
    local_urlcatalogo: string | null;
    local_pixel: string | null;
    local_telefono: string;
    local_wpp: string | null;
    local_permitecomprobantemenuonline: string;
    monedafacturacion: IMonedaFacturacion;
    local_porcentajeImpuesto: string;
    local_logo: string;
    local_imagen: string | null;
    local_imagenfondomenuonline: string;
    local_fondomenuonlineselector: string;
    local_aceptapagoenlinea: string;
    local_solopagoenlinea: string;
    local_pagotransferenciamenuonline: string;
    local_aceptatarjetapordelivery: string;
    local_aceptaefectivopordelivery: string;
    local_correodeliverypersonalizado: string;
    local_aceptadelivery: string;
    local_aceptarecojo: string;
    local_aceptaprogramados: string;
    estaAbiertoParaDelivery: boolean;
    estaAbiertoParaRecojo: boolean;
    estaAbiertoParaProgramarPedidos: boolean;
    horarioParaDelivery: IHorarioAtencionDia[];
    horarioParaRecojo: IHorarioAtencionDia[];
    horarioParaProgramarPedidos: IHorarioAtencionDia[];
    horarioParaRepartoPedidos: IHorarioAtencionDia[];
    integracionlocal: any[];
    zona_cobertura: IZonaCobertura[];
    local_listacuentastransferencia: any[];
    listaImagenesMenuOnline: any[];
    tarjetas: any[];
    listaimpuestos: IImpuesto[];
    configuracionpreciosproductossinimpuesto: string;
    configuracionimpuestospormodalidad: string;
    configuracionpreciosproductossinimpuestoaplicanotaventa: string;
    configuracionimpuestoInafectaVenta: string;
    configuracionimpuestoInafactaCostoEnvio: string;
    configuracionMarcasActiva: string;
    configuracionMarcasMenuEnLineaActiva: string;
    marcaList: any[];
    marcasLocalList: any[];
    personalizacion: IPersonalizacion;
}

export interface IMonedaFacturacion {
    monedafacturacion_id: string;
    monedafacturacion_descripcion: string;
    monedafacturacion_simbolo: string;
    monedafacturacion_isocode: string;
    monedafacturacion_checksum: string;
    monedafacturacion_estado: string;
    monedaList: any[];
    preciolocalproductoList: any[];
    preciolocalproductomonedaList: any[];
}

export interface IHorarioAtencion {
    horarioatencion_id: string;
    horarioatencion_inicio: string;
    horarioatencion_fin: string;
    horarioatenciondia_id: string;
    horarioatenciondia_horasanticipacion: string;
    horarioatenciondia: any | null;
}

export interface IHorarioAtencionDia {
    horarioatenciondia_id: string;
    horarioatenciondia_estado: string;
    horarioatenciondia_dia: string;
    local_id: string;
    horarioatenciondia_tipo: string;
    horarioatencionList: IHorarioAtencion[];
    local: any | null;
}

export interface ICoordinate {
    id: string;
    latitude: number;
    longitude: number;
}

export interface IZonaCobertura {
    coberturalocal_id: string;
    local_id: string;
    local_idoriginal: string | null;
    coberturalocal_nombre: string;
    coberturalocal_costoenvio: string;
    coberturalocal_ruta: ICoordinate[];
    coberturalocal_estado: string;
    coberturalocal_color: string;
    coberturalocal_horainicio: string | null;
    coberturalocal_horafin: string | null;
    coberturalocal_minimoparaenviogratis: string;
    coberturalocal_permiteenviogratis: string;
    coberturalocal_tipocobertura: string;
    coberturalocal_radiokmcobertura: string;
    coberturalocal_latitudradio: string;
    coberturalocal_longitudradio: string;
    coberturalocal_pedidominimo: string;
    coberturalocal_costoenvioprogramado: string | null;
    coberturalocal_tiempoestimado: string;
    deliveryList: any[];
    local: any | null;
}

export interface IImpuesto {
    tieneErrores: boolean;
    mensajes: any[];
    igv_id: string;
    igv_porcentajeigv: string;
    igv_nombre: string;
    igv_estado: string;
    igv_fiscalizado: string;
    local_id: string;
    impuestomultipais_id: string | null;
    igv_modsalon: string;
    igv_modrapida: string;
    igv_moddelivery: string;
    igv_modreserva: string;
    detalleconsumoventaimpuestoList: any[];
    detallenotacreditoimpuestoList: any[];
    detallenotadebitoimpuestoList: any[];
    detalleventaimpuestoList: any[];
    impuestoventacategoriaList: any[];
    impuestoventaproductogeneralList: any[];
    notacreditoigvList: any[];
    notadebitoigvList: any[];
    ventaigvList: any[];
    local: any | null;
    impuestomultipais: boolean;
}

export interface IComponentProperties {
    underline: boolean;
    bold: boolean;
    font: string;
    color: {
        type: string;
        value: string;
    };
}

export interface IComponent {
    id: string;
    title: string;
    properties: IComponentProperties;
    styleClass: string;
    status: string;
}

export interface IPersonalizacion {
    components: IComponent[];
} 