export interface ResponseData {
    data: {
        categorias: Array<{
            categoria_id: string;
            categoria_descripcion: string;
        }>;
        menu: Array<{
            productogeneral_id: string;
            productogeneral_descripcion: string;
            productogeneral_descripcionplato: string;
            categoria_id: string;
            productogeneral_preciominimopresentacion: string;
            productogeneral_escombo: string;
            productogeneral_agotado: string;
            productogeneral_urlimagen: string;
            lista_presentacion?: Array<{
                producto_id: string;
                producto_nombre: string;
                producto_precio: string;
                producto_delivery: string;
                producto_stock: string;
            }>;
            lista_agrupadores?: Array<{
                modificador_id: string;
                modificador_nombre: string;
                modificador_esmultiple: string;
                modificador_cantidadminima: string;
                modificador_cantidadmaxima: string;
                listaModificadores?: Array<{
                    modificadorseleccion_id: string;
                    modificadorseleccion_nombre: string;
                    modificadorseleccion_precio: string;
                    productogeneralmodificador_stock: string;
                }>;
            }>;
        }>;
    };
} 