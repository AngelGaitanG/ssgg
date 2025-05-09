export enum OrderStatus {
        PREORDER = 'Pre Orden',
        ACEPTED = 'Aceptado',
        EN_COCINA = 'En cocina',
        EN_CAMINO = 'En camino',
        ENTREGADO = 'Entregado',
        CANCELADO = 'Cancelado',
    }

    export enum OrderSource {
        WHATSAPP = 1,
        DIGITAL_MENU = 0,
      }
      
      export enum INTEGRATION_STATUS {
        PENDING = 'PENDING',
        SUCCESS = 'SUCCESS',
        ERROR = 'ERROR',
        NONE = 'NONE',
      }

      export enum ComboType {
        BUY_X_GET_Y = 'buy_x_get_y',  // Ejemplo: 2x1, 3x2, etc.
        DISCOUNT_SET = 'discount_set', // Descuento por llevar un set específico
        BUNDLE = 'bundle'             // Paquete completo a precio fijo
      }
      
      export enum PriceStrategy {
        FIXED = 'fixed',                // Precio fijo sin importar los productos
        SUM = 'sum',                    // Suma de todos los productos
        MOST_EXPENSIVE = 'most_expensive', // El más caro determina el precio
        TOP_TWO_EXPENSIVE = 'top_two_expensive', // Los dos más caros
        CUSTOM_FORMULA = 'custom_formula' // Fórmula personalizada
      } 
      